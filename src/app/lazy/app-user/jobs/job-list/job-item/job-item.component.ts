import {
  Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {IJobEntity} from '../../user-jobs.model';
import {CoreUtilitiesService} from '../../../../../core/services/core-utilities.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AlertModalComponent} from '../../../../../modules/alert-modal/alert-modal.component';
import {JobItemApplyEvent} from './job-item.model';
import {CustomChanges} from '../../../../../core/models/core.model';
import {PlatformCheckService} from '../../../../../core/services/platform-check.service';

require('../../../../../../assets/images/logo-company.png');

@Component({
  selector: 'fmp-job-item-component',
  templateUrl: 'job-item.html',
  styles: [require('./job-item.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class JobItemComponent implements OnChanges {

  @ViewChild('uploadCover')
  uploadCoverSelector: any;

  @Input()
  item: IJobEntity;

  @Input()
  rates: Array<string>=['N/A','0','1','2','3','4','5','6','7','8','9','10'];

  @Input()
  statuses: Array<string>;

  @Output()
  onFileUpload: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onStatusChanged: EventEmitter<CustomChanges<string>> = new EventEmitter<CustomChanges<string>>();

  @Output()
  onRateChanged: EventEmitter<CustomChanges<number>> = new EventEmitter<CustomChanges<number>>();

  @Output()
  onJobRemove: EventEmitter<IJobEntity> = new EventEmitter<IJobEntity>();

  @Output()
  onJobEdit: EventEmitter<IJobEntity> = new EventEmitter<IJobEntity>();

  @Output()
  onJobEditNote: EventEmitter<IJobEntity> = new EventEmitter<IJobEntity>();

  @Output()
  onApplyStateChanged: EventEmitter<JobItemApplyEvent> = new EventEmitter<JobItemApplyEvent>();

  @Output()
  onFileSelected: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onCoverLetterRemove: EventEmitter<IJobEntity> = new EventEmitter<IJobEntity>();

  public acceptFormats: Array<string>;
  private defaultIcon: string = 'src/assets/images/logo-company.png';

  constructor(private modalService: NgbModal,
              private platformCheck: PlatformCheckService) {
    this.acceptFormats = CoreUtilitiesService.fileAcceptFormats;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const item: SimpleChange = changes['item'];
    if (item && item.currentValue) {
      this.item.linkForAvatar = CoreUtilitiesService.parseJobLink(this.item.link);
    }
  }

  /**
   * Method to log error if img not loaded
   * @param event
   */
  public logoError(event: ErrorEvent): void {
    if (event.target) {
      (<HTMLSourceElement>event.target).src = this.defaultIcon;
    }
  }

  public applyStatusChanged(event: MouseEvent): void {
    this.onApplyStateChanged.emit({
      id: this.item.id,
      state: event.target['checked'],
      event: event,
      item: this.item
    });
  }

  public statusChanged(status: CustomChanges<string>): void {
    this.onStatusChanged.emit(status);
  }

  public rateChanged(rate: CustomChanges<number>): void {
    this.onRateChanged.emit(rate);
  }

  public downloadAttachment(jobItem: IJobEntity, $event: MouseEvent): void {
    $event.preventDefault();
    this.onFileUpload.emit({
      link: jobItem.attachment,
      fileName: jobItem.attachment_name
    });
  }

  public editJobNote(job:IJobEntity) : void {
      this.onJobEditNote.emit(job);
  }

  public removeJob(job: IJobEntity): void {
    this.onJobRemove.emit(job);
  }

  public uploadCoverLetterClick(): void {
    this.uploadCoverSelector.nativeElement.click();
  }

  public editJob(job:IJobEntity): void{ 
    this.onJobEdit.emit(job);
  }

  public uploadCoverLetter($event: any): void {
    let fileList: FileList = $event.target.files;
    if (fileList[0]) {
      const file: File = fileList[0];
      const isFormatValid: boolean = CoreUtilitiesService.checkFileExtension(file);
      if (!isFormatValid) {
        const modalRef: NgbModalRef = this.modalService.open(AlertModalComponent);
        modalRef.componentInstance.showButtons = false;
        modalRef.componentInstance.message = `File you want upload has unsupported format. Please select another. Accept formats: ${this.acceptFormats.join(' ; ')}`;
      } else {
        this.onFileSelected.emit(file);
      }
    }
  }

  public removeCoverLetter(item: IJobEntity): void {
    this.onCoverLetterRemove.emit(item);
  }

  public openCompanyLink(link: string): void {
    if (this.platformCheck.isBrowser) {
      window.open(link , '_blank');
    }
  }
}