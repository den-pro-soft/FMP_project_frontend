var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { ServerTransferState } from './server-transfer-state';
import { TransferState } from './transfer-state';
var ServerTransferStateModule = (function () {
    function ServerTransferStateModule() {
    }
    return ServerTransferStateModule;
}());
ServerTransferStateModule = __decorate([
    NgModule({
        providers: [
            { provide: TransferState, useClass: ServerTransferState }
        ]
    })
], ServerTransferStateModule);
export { ServerTransferStateModule };
//# sourceMappingURL=server-transfer-state.module.js.map