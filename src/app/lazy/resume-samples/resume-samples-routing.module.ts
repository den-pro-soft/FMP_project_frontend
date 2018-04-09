import {RouterModule, Routes} from "@angular/router";
import {ResumeSamplesComponent} from "./resume-samples.component";
import {ModuleWithProviders} from "@angular/core";
import {ResumeSamplesResolver} from "./resume-samples.resolver";

const routes: Routes = [
    {
        path: '',
        component: ResumeSamplesComponent,
        resolve: {
            pageContent: ResumeSamplesResolver
        }
    }
];

export const ResumeSamplesRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);