var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFavoriteArticlesRoutingModule } from './user-favorite-articles-routing.module';
import { UserFavoriteArticlesComponent } from './user-favorite-articles.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleCardsModule } from '../../../modules/articles-cards/articles-cards.module';
var UserFavoriteArticlesModule = (function () {
    function UserFavoriteArticlesModule() {
    }
    return UserFavoriteArticlesModule;
}());
UserFavoriteArticlesModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            UserFavoriteArticlesRoutingModule,
            ArticleCardsModule,
            NgbPaginationModule
        ],
        declarations: [
            UserFavoriteArticlesComponent
        ],
        exports: [
            UserFavoriteArticlesComponent
        ]
    })
], UserFavoriteArticlesModule);
export { UserFavoriteArticlesModule };
//# sourceMappingURL=user-favorite-articles.module.js.map