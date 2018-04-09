import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { StripeService } from 'ngx-stripe';

import { ICredentials, IPaymentInfo, IPaymentItem, IPaymentRequest, PaymentDiscount } from './checkout.model';
import { IPayerInfo, IPaymentDetail } from './payment-info/payment-info.model';
import { IHttpRequest } from '../../core/models/core.model';
import { HttpService } from '../../core/services/http.service';
import { STRIPE_CONFIG } from '../../core/configs/stripe.config';
import { COUPON_CHECK } from '../../core/models/api-urls.model';
import { CoreUtilitiesService } from '../../core/services/core-utilities.service';

@Injectable()
export class CheckoutService {

  constructor(private httpService: HttpService,
              private stripeService: StripeService){}

  public createRequest(
    card: any,
    payer_credentials: ICredentials,
    payment_info: IPaymentInfo,
    payment_detailinfo: IPaymentDetail,
    payer_basket: Array<IPaymentItem>,
    discount: PaymentDiscount
  ): Observable<IPaymentRequest | any> {

    return Observable.create((observer: Observer<any>) => {
      Stripe.setPublishableKey(STRIPE_CONFIG.publish_key);

      this.stripeService.createToken(card, {
          name: payment_detailinfo.name,
          address_line1: payment_detailinfo.address_line1,
          address_city: payment_detailinfo.address_city,
          address_state: payment_detailinfo.address_state,
          address_zip: payment_detailinfo.address_zip,
          address_country: payment_detailinfo.address_country
      })
      .subscribe(result => {
          if (result.token) {
              observer.next({
                payer_credentials: {
                    full_name: payment_detailinfo.name,
                    email: payment_detailinfo.email,
                    password: "",
                    confirm_password: "",
                },
                payment_info: {
                    description: payment_info.description,
                    amount: payment_info.amount,
                    currency: 'usd',
                    source: result.token.id,
                    name: payment_detailinfo.name,
                    address_line1: payment_detailinfo.address_line1,
                    address_city: payment_detailinfo.address_city,
                    address_state: payment_detailinfo.address_state,
                    address_zip: payment_detailinfo.address_zip,
                    address_country: payment_detailinfo.address_country
                },
                payer_basket: payer_basket,
                discount: discount,
                timezone: CoreUtilitiesService.getTimeZone()
              });
          } else if (result.error) {
            observer.error({
              message: result.error.message,
              status: status
            });
          }
      });
    });

  }

  public sendRequest(payment: IPaymentRequest): any {
    const request: IHttpRequest = {
      method: 'POST',
      url: '/checkout',
      body: payment,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  public checkCoupon(code: string): Observable<any> {
    const request: IHttpRequest = {
      method: 'POST',
      url: COUPON_CHECK,
      body: {code},
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

}
