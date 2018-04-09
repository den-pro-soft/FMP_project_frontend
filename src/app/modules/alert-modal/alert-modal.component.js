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
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
var AlertModalComponent = (function () {
    function AlertModalComponent(activeModal, router) {
        this.activeModal = activeModal;
        this.router = router;
        this.message = '';
        this.title = 'Warning';
        this.showButtons = true;
        this.type = 'common';
        this.defaultMessage = 'Warning alert modal';
    }
    AlertModalComponent.prototype.confirm = function () {
        this.activeModal.close('remove close');
    };
    AlertModalComponent.prototype.cancel = function () {
        this.activeModal.dismiss('Cancel close');
    };
    AlertModalComponent.prototype.goToLoginPage = function (mouseEvent) {
        mouseEvent.preventDefault();
        this.navigateToLogin();
    };
    AlertModalComponent.prototype.linkTaped = function (event) {
        event.preventDefault();
        this.navigateToLogin();
    };
    AlertModalComponent.prototype.navigateToLogin = function () {
        var _this = this;
        Observable.fromPromise(this.router.navigate(['/login']))
            .filter(function (state) { return state; })
            .subscribe(function () { return _this.activeModal.close(); });
    };
    return AlertModalComponent;
}());
AlertModalComponent = __decorate([
    Component({
        selector: 'fmp-alert-modal-component',
        templateUrl: 'alert-modal.html',
        styles: [require('./alert-modal.scss').toString()],
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [NgbActiveModal,
        Router])
], AlertModalComponent);
export { AlertModalComponent };
//# sourceMappingURL=alert-modal.component.js.map