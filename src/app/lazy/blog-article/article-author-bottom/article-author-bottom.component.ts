import {Component, Input, ViewEncapsulation} from '@angular/core';
import { IArticleAuthor } from "../../../core/models/core.model";

@Component({
    selector: 'article-author-bottom',
    templateUrl: './article-author-bottom.component.html',
    styles: [require('./article-author-bottom.component.scss').toString()],
    encapsulation: ViewEncapsulation.None
})
export class ArticleAuthorBottomComponent {

  @Input()
  author: IArticleAuthor;

  public authorAvatarNotLoaded(event: ErrorEvent): void {
    if (event.target) {
      (<HTMLSourceElement>event.target).src = require('../../../../assets/images/logo-company.png');
    }
  }

}
