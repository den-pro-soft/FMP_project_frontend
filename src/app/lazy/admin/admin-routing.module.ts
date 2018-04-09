import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AdminComponent} from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  }
];
export const AdminRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);