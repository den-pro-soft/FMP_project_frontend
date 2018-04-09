var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CircleIconLineModule } from "../circle-icon-line/circle-icon-line.module";
import { SuccessModalComponent } from './success-modal.component';
import { ModelCloseIconModule } from '../modal-close-icon/modal-close-icon.module';
var SuccessModalModule = (function () {
    function SuccessModalModule() {
    }
    return SuccessModalModule;
}());
SuccessModalModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            NgbModalModule,
            CircleIconLineModule,
            ModelCloseIconModule
        ],
        exports: [
            SuccessModalComponent
        ],
        declarations: [
            SuccessModalComponent
        ],
        entryComponents: [
            SuccessModalComponent
        ]
    })
], SuccessModalModule);
export { SuccessModalModule };
//# sourceMappingURL=success-modal.module.js.map