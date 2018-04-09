import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {IDocumentTemplate} from './document-template.model';

@Component({
  selector: 'fmp-document-templates-component',
  templateUrl: 'document-templates.html',
  styles: [require('./document-templates.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class DocumentTemplatesComponent {

  @Input()
  templates: Array<IDocumentTemplate>;

  @Output()
  onTemplateSelect: EventEmitter<IDocumentTemplate> = new EventEmitter<IDocumentTemplate>();

  @Output()
  onTemplatePreview: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onTemplateDownload: EventEmitter<any> = new EventEmitter<any>();

  public selectTemplate(template: IDocumentTemplate): void {
    this.onTemplateSelect.emit(template);
  }

  public seeTemplatePreview(template: IDocumentTemplate): void {
    this.onTemplatePreview.emit(template.preview);
  }

  public downloadTemplate($event: MouseEvent, doc: IDocumentTemplate): void {
    $event.preventDefault();
    this.onTemplateDownload.emit({
      link: doc.resource,
      name: doc.name
    })
  }
}