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
import { HttpService } from '../../core/services/http.service';
import { TESTIMONIALS } from '../../core/models/api-urls.model';
var TestimonialsService = (function () {
    function TestimonialsService(httpService) {
        this.httpService = httpService;
    }
    TestimonialsService.prototype.getTestimonials = function (options) {
        var request = {
            url: TESTIMONIALS,
            searchParams: options
        };
        return this.httpService.sendRequest(request);
    };
    return TestimonialsService;
}());
TestimonialsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpService])
], TestimonialsService);
export { TestimonialsService };
//# sourceMappingURL=testimonials.service.js.map