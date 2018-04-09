import {NgModule} from '@angular/core'; 
import {CommonModule} from '@angular/common';

import {CongratulationsComponent} from './congratulations.component'; 
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SocialLinksModule} from '../../modules/social-links/social-links.module';  
import {ErrorModule} from '../../modules/error/error.module';
import {CongratulationsRoutingModule} from './congratulations-routing.module';

@NgModule({
  imports: [ 
    CommonModule,
    CongratulationsRoutingModule,
    ReactiveFormsModule,
    SocialLinksModule,
    ErrorModule
  ], 
  declarations: [
    CongratulationsComponent
  ],
  exports: [
    CongratulationsComponent
  ]
})
export class CongratulationsModule {}
