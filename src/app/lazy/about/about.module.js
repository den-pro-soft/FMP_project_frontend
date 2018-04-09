var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { AboutRoutingModule } from './about-routing.module';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutPageResolver } from './about.resolver';
var AboutModule = (function () {
    function AboutModule() {
    }
    return AboutModule;
}());
AboutModule = __decorate([
    NgModule({
        imports: [
            AboutRoutingModule,
            CommonModule,
        ],
        providers: [
            AboutPageResolver
        ],
        declarations: [
            AboutComponent
        ],
        exports: [
            AboutComponent
        ]
    })
], AboutModule);
export { AboutModule };
//# sourceMappingURL=about.module.js.map