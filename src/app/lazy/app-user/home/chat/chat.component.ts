import {
  AfterViewInit, ChangeDetectorRef,ElementRef, 
  Component, Input, OnChanges, OnDestroy, SimpleChange, SimpleChanges, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {IChatMessage, UIMessage} from '../user-home.model';
import {ChatService} from './chat.service';
import {UserService} from '../../../../core/services/user.service';
import {CoreUtilitiesService} from '../../../../core/services/core-utilities.service';
import {IErrorResponse} from '../../../../core/models/core.model';
import {IUser} from '../../../../core/models/user.model';
import {Subject} from 'rxjs/Subject';
import {UserHomeComponent} from '../user-home.component';

@Component({
  selector: 'fmp-chat-component',
  templateUrl: 'chat.html',
  styles: [require('./chat.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class FmpChatComponent implements OnChanges, AfterViewInit, OnDestroy {

  @ViewChild('chatHolder')
  chatHolder: any;

  @ViewChild('contextMenuDivSel')
  contextMenuDiv: ElementRef;

  @Input()
  messages: Array<IChatMessage>;

  @Input()
  chatRefreshTime: number = 5000;

  public errorMessage: string;

  public messageIds: Object = {};

  public userId: number;
  public chatMessages: Array<IChatMessage>;

  private isPageActive: boolean = true;
  public isSending: boolean = false;
  public isUrl: boolean = false;

/**
 * Message Remove and update part
 */
  public  flagContextMenu : boolean= false;
  private selected_message_id: number = null;
  public messageEditMode : boolean = false;
  public messageContent : string="";

  public refreshingSub: Subscription;
  private destroyed$: Subject<any> = new Subject<any>();

  constructor(private userService: UserService,
              private chatService: ChatService,
              private changeDetector: ChangeDetectorRef) {
    this.subscribeToUser();
  }

  public editMessage(){
    var i;
    this.messageEditMode = true;
    this.flagContextMenu = false;
    for( i = 0 ; i < this.messages.length; i++ )
    {
      if( this.messages[i].id == this.selected_message_id )
      { 
          this.messageContent = this.messages[i].message;
          break;
      }
    }
  }

  public deleteMessage(){ 
    var selected_message_id = this.selected_message_id;
    this.flagContextMenu = false;
    if( selected_message_id  )
    { 
      this.chatService.deleteMessage(selected_message_id )
      .do(() => this.isSending = true)
      .finally(() => this.isSending = false)
      .debounceTime(500)
      .subscribe(
        (response) => {    
          var i;  
          for( i = 0 ; i < this.messages.length; i++ )
          {
            if( this.messages[i].id == selected_message_id )
            { 
                this.messages.splice(i, 1); 
                break;
            }
          }
          this.changeDetector.detectChanges(); 
        }
      );
    }
  }  

  public ngOnChanges(changes: SimpleChanges): void {
    const messages: SimpleChange = changes['messages'];
    if (messages && messages.currentValue) {
      this.messages.forEach((message: IChatMessage) => this.messageIds[message['id']] = true)
    }
  }

  public ngAfterViewInit(): void {
    this.scrollToBottom();
    this.startMessageAutoUpdate();
    this.checkForPageTab();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.changeDetector.detach();
  }

  public sendMessage(message: IChatMessage): void {
    if( this.messageEditMode )
    {
        this.chatService.updateMessage( this.selected_message_id , message.message)
        .do(() => this.isSending = true)
        .finally(() => this.isSending = false)
        .debounceTime(500)
        .subscribe(
            () => {   
                var i;   
                for( i = 0 ; i < this.messages.length; i++ )
                {
                    if( this.messages[i].id == this.selected_message_id )
                    { 
                        this.messages[i].message = message.message;
                        this.messages[i].edited = 1;
                        break;
                    }
                }
                this.changeDetector.detectChanges(); 
            }
        );
        this.messageContent = "";
        this.messageEditMode = false;
        return ;
    }
     
    message.message = this.makeToHyperlink(message.message);
    
    if(message.attachment) {
      var temp = message.message;
      message.message = '';
      this.sendToServer(message);
      message.message = temp;
    }
    
    if(message.message != '') {
      this.sendToServer(message);
    }
  }
  public sendToServer(message: IChatMessage): void {
    this.chatService.sendMessage(message)
    .do(() => this.isSending = true)
    .finally(() => this.isSending = false)
    .debounceTime(500)
    .subscribe(
      (response: IChatMessage) => {      
        this.addMessage(response, this.messages);
        this.changeDetector.detectChanges();
        this.scrollToBottom();
      }
    );
  }
  public makeToHyperlink(str: String): string {
    var urlRegex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
    return str.replace(urlRegex, function(url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
    });
  }
  /**
   * Method to auto updating chat
   */
  public startMessageAutoUpdate(): void {
    this.refreshingSub = Observable.interval(this.chatRefreshTime)
      .takeUntil(this.destroyed$)
      .subscribe(
        () => this.loadNewMessages()
      );
  }

  public showContextMenu( message_id , $event){
      $event.stopPropagation(); 
      this.flagContextMenu = true;
      this.selected_message_id = message_id;  
      this.contextMenuDiv.nativeElement.style.left = $event.pageX - 80 ;
      this.contextMenuDiv.nativeElement.style.top = $event.pageY + 20 ;
  }

  public downloadFile(message: IChatMessage, $event: Event): void {
    $event.preventDefault();
    // console.log(message.attachment.toString());
    // console.log(message.message.toString());
    this.chatService.downloadFile(message.attachment.toString())
      .subscribe(
        (data: any) => CoreUtilitiesService.saveFile(data, message.message.toString())
      );
  }

  private addMessage(message: UIMessage, list: Array<UIMessage> = []): any {
    if (message && message.id && !this.messageIds[message.id]) {
      this.messageIds[message.id] = true;
      const lastMessage: UIMessage = list[list.length - 1];
      if (lastMessage && UserHomeComponent.compareDates(lastMessage.date, message.date)) {
        message.showDay = false;
      } 
      message.message = CoreUtilitiesService.parseMessage(message.message);

      list.push(message);
    }
  }

  private checkForPageTab(): void {
    Observable.fromEvent(document, 'visibilitychange')
      .takeUntil(this.destroyed$)
      .map((e: any) => !e.target.hidden)
      .do((state: boolean) => {
       if (state && this.refreshingSub.closed) {
         this.startMessageAutoUpdate();
       }
      })
      .subscribe(
        (isPageActive: boolean) => {
          this.isPageActive = isPageActive;
        }
      );
  }

  private loadNewMessages(): void {
    this.chatService.getNewMessages()
      .filter((messages: Array<IChatMessage>) => Array.isArray(messages) && messages.length > 0)
      .subscribe(
        (messages: Array<IChatMessage>) => {
          messages.forEach((message: IChatMessage) => this.addMessage(message, this.messages));
          this.changeDetector.detectChanges();
          this.scrollToBottom();
        },
        (error: IErrorResponse) => this._handleError(error)
      );
  }

  /**
   * Scrolling to bottom of the div
   */
  private scrollToBottom(): void {
    if (this.chatHolder) {
      this.chatHolder.nativeElement.scrollTop = this.chatHolder.nativeElement.scrollHeight || 0;
    }
  }

  private subscribeToUser(): void {
    this.userService.user$
      .takeUntil(this.destroyed$)
      .filter((user: IUser) => Boolean(user))
      .subscribe(
        (user: IUser) => this.userId = user.id
      );
  }

  /**
   * Method to handle error
   * @param e
   * @private
   */
  private _handleError(e: IErrorResponse): void {
    this.errorMessage = e.message;
  }
}