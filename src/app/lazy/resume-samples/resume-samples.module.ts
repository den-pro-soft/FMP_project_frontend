import {NgModule} from "@angular/core";
import {ResumeSamplesRoutingModule} from "./resume-samples-routing.module";
import {ResumeSamplesComponent} from "./resume-samples.component";
import {CommonModule} from "@angular/common";
import {ResumeItemComponent} from "./resume-item/resume-item.component";
import {ResumeSamplesResolver} from "./resume-samples.resolver";
import {ResumeSamplesService} from "./resume-samples.service";

@NgModule({
    imports: [
        ResumeSamplesRoutingModule,
        CommonModule
    ],
    providers: [
        ResumeSamplesService,
        ResumeSamplesResolver
    ],
    declarations: [
        ResumeSamplesComponent,
        ResumeItemComponent
    ],
    exports: [
        ResumeSamplesComponent
    ]
})

export class ResumeSamplesModule {}