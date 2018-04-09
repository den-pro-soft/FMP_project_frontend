import {
  Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChange, SimpleChanges, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IChatMessage} from '../../user-home.model';
import {ResizeModeService} from '../../../../../core/services/resize-mode.service';
import {MODE_MOB} from '../../../../../core/models/core.model';
import {Subject} from 'rxjs/Subject';
require('../../../../../../assets/images/close.png');


@Component({
  selector: 'fmp-send-box-component',
  templateUrl: 'send-box.html',
  styles: [require('./send-box.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class FmpSendBoxComponent implements OnChanges, OnDestroy {

  @ViewChild('submitButton')
  submitButton: any;

  @ViewChild('sendField')
  sendField: ElementRef;
  viewHeight: number;

  @Input()
  maxSymbols: number = 10000;

  @Input()
  isMessageSending: boolean = false;

  @Input()
  messageEditMode: boolean = false;

  @Input()
  messageContent: string = "";
 
  @Output()
  onMessageSend: EventEmitter<IChatMessage> = new EventEmitter<IChatMessage>();


  public modelForm: FormGroup;
  public formError: string | null;

  public fileName: string | null;
  public isFileSelected: boolean = false;
  public isMobileMode: boolean = false;

  public attachment = new Array();
  public attachmentDefaultImage: string = require('../../../../../../assets/images/docx.png');

  private destroyed$: Subject<undefined> = new Subject<undefined>();

  /**
   * Form errors messages
   * @type {{required: string; minlength: string; maxlength: string}}
   */
  private errorMessages: Object = {
    required: `You must write something first`,
    maxlength: `Message max length is ${this.maxSymbols}`
  };

  constructor(private fb: FormBuilder,
              private resizeModeService: ResizeModeService) {

    this.subscribeToResize();
    this.createForm();
  }

  public ngOnChanges(changes: SimpleChanges) {
    const sending: SimpleChange = changes['isMessageSending'];
    if (sending && this.modelForm) {
      if (sending.currentValue) {
        this.getModel().disable()
      } else {
        this.getModel().enable();
        if (this.sendField) {
          this.sendField.nativeElement.focus();
        }
      }
    }
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public changeTextarea(): void {

    if(! this.sendField.nativeElement.value )
    {
        this.sendField.nativeElement.style.height = '60px';
    } 
      
  }

  public keyPressed(keyEvent: KeyboardEvent): void {

      if( this.sendField.nativeElement.value )
      {
        if( this.sendField.nativeElement.scrollHeight < 70 )
        {
            this.sendField.nativeElement.style.height = '60px';
        }else{
            this.sendField.nativeElement.style.height = 'auto';
            var newHeight = (this.sendField.nativeElement.scrollHeight > 30 ? this.sendField.nativeElement.scrollHeight : 30);
            if( newHeight.toString() < 185 )    
                this.sendField.nativeElement.style.overflow = "hidden";
            else 
                this.sendField.nativeElement.style.overflow = "auto";
            this.sendField.nativeElement.style.height = (newHeight.toString() == 75 ? '60px' : newHeight.toString() + 'px' );
        }
      }else{
          this.sendField.nativeElement.style.height = '60px';
      }

  }

  public sendMessage(): void { 
    const model: any = Object.assign(this.modelForm.value);
    const messageBody: string = model.message ? model.message.toString() : '';
    this.getModel().setValue('');
    // sending all files first
    var i;
    for( i = 0 ; i < this.attachment.length ; i++ )
    {
        this.getModel('attachment').setValue(this.attachment[i].file);
        if (this.modelForm.valid)
            this.onMessageSend.emit(Object.assign(this.modelForm.value));
        else
            this.showErrors();
    }

    this.getModel('attachment').setValue(null);

    if( messageBody )
    {
        this.getModel().setValue(messageBody.trim());
        if (this.modelForm.valid)
            this.onMessageSend.emit(Object.assign(this.modelForm.value));
        else
            this.showErrors();
    }

    this.attachment = [];
    setTimeout(() => {
      this.sendField.nativeElement.style.height = '60px';
    }, 200);

    this.resetForm();
    this.sendField.nativeElement.focus();
  }

  public fileSelected(file: File): void {
    if (file) {
        this.getModel('attachment_name').setValue(file.name);
        var uuid = Math.floor( Math.random() * 100000 ) ;

        this.attachment.push( { id : uuid , file : file , preview : this.attachmentDefaultImage } );
        var attach_element = this.attachment[this.attachment.length - 1];

        if( file.type.substring( 0 , 5 ) == 'image' )
        {
            var reader = new FileReader();
            var that = this;
            reader.onload = (event:any) => {
                attach_element.preview = event.target.result ;
            }
            reader.readAsDataURL(file);
        }

        this.focusSubmitButton();
    }
  }
  public delete_attach( uid ){
        var i;
        for( i = 0  ; i < this.attachment.length ; i++  )
            if( this.attachment[i].id == uid )
            {
                this.attachment.splice( i , 1 );
                break;
            }
  }


  public fileRemoved(): void {
    this.resetForm();
  }

  private showErrors(): void {
    Object.keys(this.getModel().errors)
      .forEach((key: string) => this.formError = this.errorMessages[key]);
  }

  private resetForm(): void {
    this.fileName = null;
    this.isFileSelected = false;
    if (this.getModel('attachment_name').disabled) {
      this.getModel('attachment_name').enable();
    }
    this.modelForm.reset();
  }

  private focusSubmitButton(): void {
    if (this.submitButton && this.submitButton.nativeElement) {
      (<HTMLButtonElement>this.submitButton.nativeElement).focus();
    }
  }

  private subscribeToResize(): void {
    this.resizeModeService.mode$
      .takeUntil(this.destroyed$)
      .subscribe(
        (mode: string) => this.isMobileMode = mode === MODE_MOB
      );
  }

  private createForm(): void {
    this.modelForm = this.buildModelForm();
    this.modelForm.valueChanges
      .subscribe(() => this.formError = null);
  }

  private buildModelForm(): FormGroup {
    return this.fb.group({
      message: ['', [
        //Validators.required,
        Validators.maxLength(this.maxSymbols)
      ]],
      attachment: [],
      attachment_name:[]
    });
  }

  private getModel(name: string = 'message'): AbstractControl {
    return this.modelForm.get(name);
  }
}