import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {IResources} from './resources.model';
import {HttpService} from '../../../core/services/http.service';
import {IErrorResponse, IHttpRequest} from '../../../core/models/core.model';
import {DOMAIN_URL,BACK_URL} from '../../../../main.config';

@Injectable()
export class ResourceService {

  constructor(private httpService: HttpService) {}
 
  /**
   * Method to
   * @param fileSrc
   * @returns {Observable<string | IErrorResponse>}
   */
  public downloadFile(fileSrc: string): Observable<string | IErrorResponse> {
    const request: IHttpRequest = {
      url: `${BACK_URL}${fileSrc}`,
      userToken: true,
      absolutePath: true,
      isBlob: true
    };
    return this.httpService.sendRequest(request);
  }
}