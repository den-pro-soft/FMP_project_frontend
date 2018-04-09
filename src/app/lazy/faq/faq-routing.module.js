import { RouterModule } from '@angular/router';
import { FaqComponent } from './faq.component';
import { FaqPageResolver } from './faq.resolver';
var routes = [
    {
        path: '',
        component: FaqComponent,
        resolve: {
            pageData: FaqPageResolver
        }
    }
];
export var FaqRoutingModule = RouterModule.forChild(routes);
//# sourceMappingURL=faq-routing.module.js.map