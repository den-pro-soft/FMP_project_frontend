import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {TransferHttp} from "../../../modules/transfer-http/transfer-http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ResumeSamplesResolver implements Resolve<any> {


    constructor(private http: TransferHttp) {}

    /**
     * method to get data for resume samples
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any>}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return Observable.zip(this.http.get(TransferHttp.getUrl('/resume-samples/all', true), {params: null}));
    }
}