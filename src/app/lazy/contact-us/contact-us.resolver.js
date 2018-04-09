var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { TransferHttp } from '../../../modules/transfer-http/transfer-http';
import { CONTACT_US_PAGE } from '../../core/models/api-urls.model';
var ContactUsPageDataResolver = (function () {
    function ContactUsPageDataResolver(http) {
        this.http = http;
    }
    /**
     * Method to get page data
     * @returns {Observable<any>}
     */
    ContactUsPageDataResolver.prototype.resolve = function () {
        return this.http.get(TransferHttp.getUrl(CONTACT_US_PAGE, true));
    };
    return ContactUsPageDataResolver;
}());
ContactUsPageDataResolver = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [TransferHttp])
], ContactUsPageDataResolver);
export { ContactUsPageDataResolver };
//# sourceMappingURL=contact-us.resolver.js.map