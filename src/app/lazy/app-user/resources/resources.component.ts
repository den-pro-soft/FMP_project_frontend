import {Component, Input, Output, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import {IResources} from './resources.model';
import {MetaTags} from '../../../core/services/meta-tags.service';
import {IDocumentTemplate} from './document-templates/document-template.model';
import {TemplatePreviewModalComponent} from '../profile/accordion-tabs/documents/template-preview-modal/template-preview-modal.component';
import {CoreUtilitiesService} from '../../../core/services/core-utilities.service';
import {ResourceService} from './resources.service'; 

@Component({
  selector: 'resources-component',
  templateUrl: 'resources.component.html'
})

export class ResourcesComponent {

  @Input()
  templates: Array<IDocumentTemplate>;

  constructor(private resourceService: ResourceService,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private metaService: MetaTags) {  
    this.templates = route.snapshot.data['pageData'];
    console.log( this.templates );
    var i;

    for( i = 0 ; i < this.templates.length; i++ )
    {
        // this.templates[i].name = this.templates[i].name.replace(/\.[^/.]+$/, "");
        this.templates[i].name = this.templates[i].name; 
    }
    console.log( this.templates );
  }
  
  public getResourceByType( type: string ): Array<IDocumentTemplate> {
    var res = new Array<IDocumentTemplate>();
    for( let item of this.templates )
        if( item.type == type )
            res.push( item );
    return res;
  }

  public openPreview(link: string): void {
    const modal: NgbModalRef = this.modalService.open(TemplatePreviewModalComponent);
    modal.componentInstance.preview = link;
  }

  public downloadTemplate(object: any): void {
    this.resourceService.downloadFile(object.link)
      .subscribe(
        (data: any) => CoreUtilitiesService.saveFile(data, object.name)
      );
  }

}