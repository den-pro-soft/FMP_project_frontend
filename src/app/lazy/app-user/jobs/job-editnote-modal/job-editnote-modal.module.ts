import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {FmpEditNoteComponent} from './job-editnote-modal.component'; 
import {CircleIconLineModule} from '../../../../modules/circle-icon-line/circle-icon-line.module';
import {ErrorModule} from '../../../../modules/error/error.module';
import {ModelCloseIconModule} from '../../../../modules/modal-close-icon/modal-close-icon.module';
import {UserJobsService} from '../user-jobs.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CircleIconLineModule,
    ErrorModule,
    ModelCloseIconModule
  ],
  providers: [ 
    UserJobsService
  ],
  declarations: [
    FmpEditNoteComponent
  ],
  exports: [
    FmpEditNoteComponent
  ],
  entryComponents: [
    FmpEditNoteComponent
  ]
})
export class EditNoteModule {}
