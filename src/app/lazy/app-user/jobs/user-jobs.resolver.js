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
import { UserJobsService } from './user-jobs.service';
var UserJobsResolver = (function () {
    function UserJobsResolver(jobsService) {
        this.jobsService = jobsService;
    }
    UserJobsResolver.prototype.resolve = function () {
        return this.jobsService.getCareerFinderPrice();
    };
    return UserJobsResolver;
}());
UserJobsResolver = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UserJobsService])
], UserJobsResolver);
export { UserJobsResolver };
//# sourceMappingURL=user-jobs.resolver.js.map