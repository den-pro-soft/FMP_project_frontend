var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { UserJobsService } from '../../jobs/user-jobs.service';
var HomeUpdatesComponent = (function () {
    function HomeUpdatesComponent(jobsService) {
        var _this = this;
        this.jobsService = jobsService;
        this.added_days = 0;
        this.jobsService.getJobs('liked', 0)
            .subscribe(function (response) {
            _this.added_days = _this.Cal_added_day(response);
        });
    }
    HomeUpdatesComponent.prototype.Cal_added_day = function (obj) {
        var oneDay = 24 * 60 * 60 * 1000;
        var now = new Date();
        var latest;
        latest = new Date(Math.max.apply(null, obj.jobs.map(function (e) {
            return new Date(e.date);
        })));
        var diffDays = Math.round(Math.abs((now.getTime() - latest.getTime()) / (oneDay)));
        return diffDays;
    };
    return HomeUpdatesComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], HomeUpdatesComponent.prototype, "updates", void 0);
HomeUpdatesComponent = __decorate([
    Component({
        selector: 'fmp-home-updates-component',
        templateUrl: 'updates.html',
        styles: [require('./updates.scss').toString()],
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [UserJobsService])
], HomeUpdatesComponent);
export { HomeUpdatesComponent };
//# sourceMappingURL=updates.component.js.map