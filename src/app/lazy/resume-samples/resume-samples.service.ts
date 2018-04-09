import {Injectable} from "@angular/core";
import {HttpService} from "../../core/services/http.service";
import {IResumeRequest} from "./resume-samples.model";
import {Observable} from "rxjs/Observable";
import {IHttpRequest} from "../../core/models/core.model";

@Injectable()
export class ResumeSamplesService {

    constructor(private httpService: HttpService) {}

    public getResumeSamples(): Observable<any>{
        const request: IHttpRequest = {
            url: '/resume-samples/all'
        };
        return this.httpService.sendRequest(request);
    }


}











