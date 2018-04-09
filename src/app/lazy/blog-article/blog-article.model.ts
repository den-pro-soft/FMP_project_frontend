import {IArticleAuthor} from '../../core/models/core.model';
import {IPageData} from '../../core/models/page-data.model';
import {IBlogArticleCard} from '../../modules/articles-cards/article-preview/article-preview.model';

export interface IBlogArticle extends IPageData{
  title       : string;
  content     : string;
  image       : string;
  post_date   : string;
  url         : string;
  author      : IArticleAuthor;
  tops        : Array<IBlogArticle>;
  random_blogs: Array<IBlogArticleCard>;
  image_alt?  : string;

  readonly id?: number;
}

