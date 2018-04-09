import {NgModule} from '@angular/core';
import {ResourcesComponent} from './resources.component';
import {ResourcesRoutingModule} from './resources-routing.module';
import {CommonModule} from '@angular/common';
import {ResourceService} from './resources.service';
import {ResourcesPageResolver} from './resources.resolver';
import {NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';
import {DocumentTemplatesComponent} from './document-templates/document-templates.component';    
import {TemplatePreviewModalModule} from '../profile/accordion-tabs/documents/template-preview-modal/template-preview-modal.module';

@NgModule({
  imports: [
    ResourcesRoutingModule,
    CommonModule,
    NgbAccordionModule,
    TemplatePreviewModalModule
  ],
  providers: [
    ResourcesPageResolver,
    ResourceService
  ],
  declarations: [
    ResourcesComponent,
    DocumentTemplatesComponent
  ],
  exports: [
    ResourcesComponent
  ],
})
export class ResourcesModule {}
