import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CalendlyComponent} from './calendly.component';
import {SharedModule} from '../../shared/shared.module';
import {CircleIconLineModule} from "../circle-icon-line/circle-icon-line.module";
import {ModelCloseIconModule} from '../modal-close-icon/modal-close-icon.module';
import {UserScheduleService} from '../../lazy/app-user/schedule/user-schedule.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CircleIconLineModule,
    ModelCloseIconModule
  ],
  providers:[
      UserScheduleService
  ],
  declarations: [
    CalendlyComponent
  ],
  entryComponents: [
    CalendlyComponent
  ],
  exports: [
    CalendlyComponent
  ]
})
export class CalendlyModule {}
