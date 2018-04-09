import {Component, OnDestroy,Output,Input,EventEmitter, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
    IJobEntity 
  } from '../user-jobs.model';

import {UserJobsService} from '../user-jobs.service';
import {CoreUtilitiesService} from '../../../../core/services/core-utilities.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JobAddErrors} from './job-add-modal-errors.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertModalComponent} from '../../../../modules/alert-modal/alert-modal.component';
import {ShowValidationErrors} from '../../../../core/validators/show-validation-errors.model';
import {WEBSITE_LINK} from '../../../../core/models/regex-patterns.model';

import {IJobResponse} from '../user-jobs.model';
import {window} from "rxjs/operator/window";
@Component({
  selector: 'fmp-add-job-modal',
  templateUrl: 'job-add-modal.html',
  styles: [require('./job-add-modal.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class FmpAddJobComponent extends ShowValidationErrors implements OnDestroy {

  @Output()
  onFileSelected: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  job: IJobEntity;

  public modelForm: FormGroup;

  public fm: any;

  public mode: string='add'; // add | edit 
  
  public jobId : number;

  public coverletter : string='Upload Cover Letter';

  public firstview: boolean = true;
  
  private jobs: Array<String> = [];

  public jobattach :any;

  constructor(private fb: FormBuilder,
              public errorsFormModel: JobAddErrors,
              private modalService: NgbActiveModal,
              private jobsService: UserJobsService) {
    super();


    this.modelForm = this.fb.group({
        link: [this.job ? this.job.link : '', [
            Validators.required,
            Validators.pattern(WEBSITE_LINK)
        ]],
        position: [this.job ? this.job.position : '', [
            Validators.required,
            Validators.maxLength(128)
        ]],
        company: [this.job ? this.job.company : '', [
            Validators.required,
            Validators.maxLength(128)
        ]],
        rate: [this.job ? this.job.rate : '-1', [
            Validators.required,
            Validators.min(0)
        ]],
        isGlobalValidate: [{
            value: false,
            disabled: true
        }] ,
        jobdescription:[], 
    });
        
    this.jobsService.getJobs('liked',0)
    .subscribe(
      (response: IJobResponse) => {
        for(var i = 0 ; i < response.jobs.length; i ++) {
          this.jobs.push(response.jobs[i].link)
        }                
      }
    ); 
    

    super.setData(this.modelForm, this.errorsFormModel);

    this.modelForm.valueChanges
      .subscribe(() => super.onValueChanged());

    this.fm = this.errorsFormModel.formErrors;
  }

  public ngOnDestroy(): void {
    super.clearErrors();
  }

  public goNextView(): void{
      this.modelForm.get('isGlobalValidate').setValue(true);
      super.onValueChanged();

      if (this.modelForm.invalid) return;

      const joblink = this.modelForm.controls.link.value.split(/[?#]/)[0];
      if( this.mode == 'add' && this.checkDuplicateJobLink(joblink) ) {
          this.fm.isExistJob = true;
          return;
      }

      this.firstview = false;
  } 

  public uploadCoverLetter($event: any): void {
    let fileList: FileList = $event.target.files; 
    if (fileList[0]) {
      this.jobattach    = fileList[0]; 
      this.coverletter  = fileList[0].name;
    }
  }

  public removeCoverLetter(): void {
      this.jobattach = null;
      this.coverletter = 'Upload Cover Letter';
  }

  public saveJob(): void {
    this.modelForm.get('isGlobalValidate').setValue(true);
    super.onValueChanged();

    if (this.modelForm.invalid) {
      return;
    }
    const joblink = this.modelForm.controls.link.value.split(/[?#]/)[0];
    if( this.mode == 'add' && this.checkDuplicateJobLink(joblink)) {
      this.fm.isExistJob = true;
      return;
    }

    if(this.mode == 'add')
    {
        if( this.jobattach  )
        {
            this.jobsService.addJob(this.modelForm.value).subscribe(
                (response: any) => this.jobsService.uploadCoverLetter( this.jobattach , response.id ).subscribe(
                (response: any) => this.modalService.close()
                )
            )
        }
        else {
            this.jobsService.addJob( this.modelForm.value).subscribe(
                (response: any) => this.modalService.close()
            )
        }
    }
    else {
        if( this.jobattach  )
        {
            this.jobsService.updateJob( this.jobId, this.modelForm.value).subscribe(
                (response: any) => this.jobsService.uploadCoverLetter( this.jobattach , response.id ).subscribe(
                (response: any) => this.modalService.close()
                )
            )
        }
        else {
            this.jobsService.updateJob( this.jobId, this.modelForm.value).subscribe(
                (response: any) => this.modalService.close()
            )
        }
    }
  }

  /**
   * Method to dismiss modal
   */
  public cancel(): void {
    this.modalService.dismiss('Client close modal.');
  }
  public setRate( rate:number ): void{ 
        this.modelForm.get('rate').setValue(rate);
  }

  public closeError(field: string): void {
    this.fm[field] = '';
  }

  private checkDuplicateJobLink(joblink): boolean {
    for(var i = 0; i < this.jobs.length; i ++) {
      if(this.jobs[i] == joblink) {
        return true;
      } 
    }
    return false;
  }
}