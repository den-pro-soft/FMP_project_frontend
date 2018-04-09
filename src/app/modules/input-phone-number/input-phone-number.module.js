var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPhoneNumberComponent } from './input-phone-number.component';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule } from '@angular/forms';
var InputPhoneNumberModule = (function () {
    function InputPhoneNumberModule() {
    }
    return InputPhoneNumberModule;
}());
InputPhoneNumberModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            TextMaskModule,
            FormsModule
        ],
        providers: [],
        declarations: [
            InputPhoneNumberComponent
        ],
        exports: [
            InputPhoneNumberComponent
        ]
    })
], InputPhoneNumberModule);
export { InputPhoneNumberModule };
//# sourceMappingURL=input-phone-number.module.js.map