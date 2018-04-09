var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
var TemplatePreviewModalComponent = (function () {
    function TemplatePreviewModalComponent(modalService) {
        this.modalService = modalService;
    }
    TemplatePreviewModalComponent.prototype.closeModal = function () {
        this.modalService.close();
    };
    return TemplatePreviewModalComponent;
}());
TemplatePreviewModalComponent = __decorate([
    Component({
        selector: 'fmp-template-preview-modal',
        templateUrl: 'template-preview-modal.html',
        styles: [require('./template-preview-modal.scss').toString()],
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [NgbActiveModal])
], TemplatePreviewModalComponent);
export { TemplatePreviewModalComponent };
//# sourceMappingURL=template-preview-modal.component.js.map