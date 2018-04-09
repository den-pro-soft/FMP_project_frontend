import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResumeUploadComponent} from "./resume-upload.component";


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ResumeUploadComponent
    ],
    exports: [
        ResumeUploadComponent
    ]
})
export class ResumeUploadModule {}