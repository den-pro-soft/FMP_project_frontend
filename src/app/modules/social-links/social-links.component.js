var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from '@angular/core';
import { APP_CONFIG } from '../../core/models/app.config';
var SocialLinksComponent = (function () {
    function SocialLinksComponent() {
        this.facebook = APP_CONFIG.facebookLink;
        this.likedIn = APP_CONFIG.linkedInkLink;
        this.twitter = APP_CONFIG.twitterLink;
    }
    return SocialLinksComponent;
}());
SocialLinksComponent = __decorate([
    Component({
        selector: 'fmp-social-links-component',
        templateUrl: 'social-links.component.html',
        styles: [require('./social-links.component.scss').toString()],
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [])
], SocialLinksComponent);
export { SocialLinksComponent };
//# sourceMappingURL=social-links.component.js.map