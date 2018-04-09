import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {ResourcesComponent} from './resources.component';
import {ResourcesPageResolver} from './resources.resolver';

const routes: Routes = [
  {
    path: '',
    component: ResourcesComponent,
    resolve: {
      pageData: ResourcesPageResolver
    }
  }
];
export const ResourcesRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);