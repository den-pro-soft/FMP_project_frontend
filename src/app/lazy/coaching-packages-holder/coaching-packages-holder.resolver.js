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
import { Observable } from 'rxjs/Observable';
import { COACHING_PACKAGES } from '../../core/models/api-urls.model';
import { TransferHttp } from '../../../modules/transfer-http/transfer-http';
import { FRONT_BACK_URL } from '../../../main.config';
var CoachingPackagesHolderResolver = (function () {
    function CoachingPackagesHolderResolver(httpService) {
        this.httpService = httpService;
    }
    CoachingPackagesHolderResolver.prototype.resolve = function () {
        return this.httpService
            .get(FRONT_BACK_URL + COACHING_PACKAGES)
            .catch(function () { return Observable.of(false); });
    };
    return CoachingPackagesHolderResolver;
}());
CoachingPackagesHolderResolver = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [TransferHttp])
], CoachingPackagesHolderResolver);
export { CoachingPackagesHolderResolver };
//# sourceMappingURL=coaching-packages-holder.resolver.js.map