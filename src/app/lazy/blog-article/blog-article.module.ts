import {NgModule} from '@angular/core';
import {BlogArticleRoutingModule} from './blog-article-routing.module';
import {CommonModule} from '@angular/common';

import {BlogArticleComponent} from './blog-article.component';
import {BlogArticleDataResolver} from './blog-article.resolver';
import {ShareLinksComponent} from './share-links/share-links.component';
import {ArticleTopArticlesComponent} from './top-articles/top-articles.component';
import {SubscribeToArticleModule} from './subscribe-to-article/subscribe-to-article.module';
import {ArticleAuthorComponent} from './article-author/article-author.component';
import {ArticleCardsModule} from "../../modules/articles-cards/articles-cards.module";
import {LikeIconModule} from '../../modules/like-icon/like-icon.module';
import {CustomLinkModule} from '../../modules/custom-link/custom-link.module';
import {SharedModule} from '../../shared/shared.module';
import {ArticleAuthorBottomModule} from "./article-author-bottom/article-author-bottom.module";
import {ResumeUploadModule} from '../../modules/resume-upload/resume-upload.module';

@NgModule({
  imports: [
      BlogArticleRoutingModule,
      CommonModule,
      SubscribeToArticleModule,
      ArticleCardsModule,
      LikeIconModule,
      CustomLinkModule,
      SharedModule,
      ArticleAuthorBottomModule,
      ResumeUploadModule
  ],
  providers: [
    BlogArticleDataResolver
  ],
  declarations: [
    BlogArticleComponent,
    ShareLinksComponent,
    ArticleTopArticlesComponent,
    ArticleAuthorComponent
  ],
  exports: [
    BlogArticleComponent
  ]
})
export class BlogArticleModule {}
