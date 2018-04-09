import {NgModule} from '@angular/core';
import {CircleIconLineModule} from '../../../modules/circle-icon-line/circle-icon-line.module';
import {ArticleAuthorBottomComponent} from "./article-author-bottom.component";

@NgModule({
    imports: [
        CircleIconLineModule,
    ],
    providers: [
    ],
    declarations: [
        ArticleAuthorBottomComponent
    ],
    exports: [
        ArticleAuthorBottomComponent
    ]
})
export class ArticleAuthorBottomModule {}
