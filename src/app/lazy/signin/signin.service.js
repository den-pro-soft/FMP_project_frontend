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
import { SIGN_IN } from '../../core/models/api-urls.model';
import { HttpService } from '../../core/services/http.service';
var SignInService = (function () {
    function SignInService(httpService) {
        this.httpService = httpService;
    }
    /**
     * Method to Sign In existing User
     * @param body
     * @returns {Observable<IUser | IErrorResponse>}
     */
    SignInService.prototype.signInUser = function (body) {
        return this.httpService.sendRequest({
            method: 'POST',
            url: SIGN_IN,
            body: body
        });
    };
    return SignInService;
}());
SignInService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpService])
], SignInService);
export { SignInService };
//# sourceMappingURL=signin.service.js.map