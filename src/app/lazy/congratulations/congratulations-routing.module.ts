import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {CongratulationsComponent} from './congratulations.component'; 

const routes: Routes = [
  {
    path: '',
    component: CongratulationsComponent,
     
  }
];
export const CongratulationsRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
