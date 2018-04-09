var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkExperienceItemModule } from './work-experience-item/work-experience-item.module';
import { AccordionTabExperienceComponent } from './accordion-tab-experience.component';
import { EducationExperienceItemModule } from './education-experience-item/education-experience-item.module';
var AccordionTabExperienceModule = (function () {
    function AccordionTabExperienceModule() {
    }
    return AccordionTabExperienceModule;
}());
AccordionTabExperienceModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            WorkExperienceItemModule,
            EducationExperienceItemModule
        ],
        declarations: [
            AccordionTabExperienceComponent
        ],
        exports: [
            AccordionTabExperienceComponent
        ]
    })
], AccordionTabExperienceModule);
export { AccordionTabExperienceModule };
//# sourceMappingURL=accordion-tab-experience.module.js.map