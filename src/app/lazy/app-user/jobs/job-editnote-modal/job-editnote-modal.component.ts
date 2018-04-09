import {Component,ViewChild, OnDestroy,Output,Input,EventEmitter, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
    IJobEntity 
  } from '../user-jobs.model';

import {UserJobsService} from '../user-jobs.service';
import {CoreUtilitiesService} from '../../../../core/services/core-utilities.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap'; 
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertModalComponent} from '../../../../modules/alert-modal/alert-modal.component';
import {ShowValidationErrors} from '../../../../core/validators/show-validation-errors.model';
import {WEBSITE_LINK} from '../../../../core/models/regex-patterns.model';

import {IJobResponse} from '../user-jobs.model';
@Component({
  selector: 'fmp-editnote-job-modal',
  templateUrl: 'job-editnote-modal.html',
  styles: [require('./job-editnote-modal.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class FmpEditNoteComponent extends ShowValidationErrors implements OnDestroy {

  @Output()
  onFileSelected: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  job: IJobEntity;
  
  public jobId : number;

  public modelForm: FormGroup;
 

  public fm: any; 

  constructor(private fb: FormBuilder, 
              private modalService: NgbActiveModal,
              private jobsService: UserJobsService) {
    super();

    this.modelForm = this.fb.group({ 
      jobdescription:[], 
    });
  }

  public ngOnDestroy(): void {
    super.clearErrors();
  }
 
 
  public saveNote(): void { 
        this.jobsService.updateJobNote(this.jobId, this.modelForm.get('jobdescription').value ).subscribe( 
            (response: any) => this.modalService.close()  
    )
  }

  /**
   * Method to dismiss modal
   */
  public cancel(): void {
    this.modalService.dismiss('Client close modal.');
  }
   
  public closeError(field: string): void {
    this.fm[field] = '';
  }
 
}