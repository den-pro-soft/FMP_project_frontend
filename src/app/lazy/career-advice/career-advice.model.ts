import {IBlogArticle} from '../blog-article/blog-article.model';
import {IArticleAuthor} from '../../core/models/core.model';

export namespace CareerAdvice {
  export interface ICareerAdvice {
    blogs: Array<IBlogArticle>;
    content: ICareerAdviceContent;
    count: number;
    total_count: number;
    top: Array<IBlogArticle>;
    description?: string;
    seo_title?: string;
  }

  export interface ICareerAdviceContent {
    title: string;
    sub_title: string;
    description: string;
  }

  export interface IBlogArticle {
    id: number;
    title: string;
    description: string;
    image: string;
    post_date: string;
    url: string;
    author: IArticleAuthor;
    liked?: boolean;
  }
}

export interface IArticleType {
  link: string;
  title: string;
  isSelected?: boolean;
}

export interface IArticlesRequest {
  page: number;
  url: string;
  searchStr : string;

}

export interface IArticlesResponse {
  count: number;
  blogs: Array<IBlogArticle>;
}

export interface ICarerrAdvicePageContent {
  title: string;
  subTitle: string;
}