import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ElementOptions, ElementsOptions, StripeCardComponent, StripeService } from 'ngx-stripe';
import { NgForm } from '@angular/forms';

import { IPayerInfo, IPaymentDetail } from './payment-info.model';
import { PaymentInfoValidator } from './payment-info.validator';
import { ShowValidationErrors } from '../../../core/validators/show-validation-errors.model';
import { PaymentInfoErrors } from './payment-info-errors.model';
import { CoreUtilitiesService } from '../../../core/services/core-utilities.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'fmp-payment-info-component',
  templateUrl: 'payment-info.html',
  styles: [require('./payment-info.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class CheckoutPaymentInfoComponent extends ShowValidationErrors implements OnChanges{
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  @Input()
  resetTime: string;

  @Input()
  isGlobalValidate: any;

  @Output()
  onModelChanged: EventEmitter<IPayerInfo> = new EventEmitter<IPayerInfo>();

  @Output()
  onModelStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  onModelDetailChanged: EventEmitter<IPaymentDetail> = new EventEmitter<IPaymentDetail>();

  public fm: any;
  public orginCountry: string;
  flagState : string;
  public countryNames: any = [
    {value: 'US', name : 'United States'},
    {value: 'AU', name : 'Australia'},
    {value: 'AT', name : 'Austria'},
    {value: 'BE', name : 'Belgium'},
    {value: 'BR', name : 'Brazil'},
    {value: 'CA', name : 'Canada'},
    {value: 'CN', name : 'China'},
    {value: 'DK', name : 'Denmark'},
    {value: 'FI', name : 'Finland'},
    {value: 'FR', name : 'France'},
    {value: 'DE', name : 'Germany'},
    {value: 'HK', name : 'Hong Kong'},
    {value: 'IE', name : 'Ireland'},
    {value: 'IT', name : 'Italy'},
    {value: 'JP', name : 'Japan'},
    {value: 'LU', name : 'Luxembourg'},
    {value: 'MX', name : 'Mexico'},
    {value: 'NL', name : 'Netherlands'},
    {value: 'NZ', name : 'New Zealand'},
    {value: 'NO', name : 'Norway'},
    {value: 'PT', name : 'Portugal'},
    {value: 'SG', name : 'Singapore'},
    {value: 'ES', name : 'Spain'},
    {value: 'SE', name : 'Sweden'},
    {value: 'CH', name : 'Switzerland'},
    {value: 'GB', name : 'United Kingdom'}
  ];

  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: ElementsOptions = {
      locale: 'en'
  };

  public ngOnChanges(changes): void {

    if (changes['resetTime'] && changes['resetTime'].currentValue) {
      this.resetForm();
    }

    if (changes['isGlobalValidate'] && changes['isGlobalValidate'].currentValue) {
      this.paymentForm.controls['isGlobalValidate'].setValue(this.isGlobalValidate);
      super.onValueChanged();
    }
  }

  public ngAfterViewInit(): void {
      this.orginCountry = 'United States';
      this.onChangeCountry();
  }

  public paymentForm: FormGroup;

  constructor(private fb: FormBuilder,
              public modelFormErrors: PaymentInfoErrors,
              private changeDetector: ChangeDetectorRef,
              private stripeService: StripeService) {

    super();
    this.paymentForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        code: ['', Validators.required],
        state: ['', Validators.required],
        selCountry: ['', Validators.required],
        isGlobalValidate: [false]
    });
    this.flagState = 'us';
    this.orginCountry = 'United States';
    this.onChangeCountry();
    this.paymentForm.statusChanges
        .subscribe(
            (value: string) => {
                let state: boolean = false;
                if (value === 'VALID') {
                    state = true;
                }
                this.onModelStateChanged.emit(state);
            });
    this.paymentForm.valueChanges
      .subscribe((res) => {
        this.onModelChanged.emit(CheckoutPaymentInfoComponent.parseModel(this.paymentForm.value));
        this.onModelDetailChanged.emit(CheckoutPaymentInfoComponent.getModelDetailInfo(this.paymentForm.value));
        super.onValueChanged();
      });
  }

//Change Country Selection
  public onChangeCountry(): void {
    this.flagState = this.countryNames.find((res) => res.name == this.orginCountry).value.toLowerCase();
  }

  public closeError(field: string): void {
    this.fm[field] = null;
  }

  private resetForm(): void {
    this.paymentForm.reset();
  }

  private getForm(name: string): AbstractControl {
    return this.paymentForm.get(name);
  }

  private static parseModel(model: any): IPayerInfo {
    return {
        number: model.number ? model.number.toString().replace(/ /g, '') : model.number,
        cvc: model.cvc,
        exp_month: model.exp_month,
        exp_year: CheckoutPaymentInfoComponent.parseYear(model.exp_year)
    };
  }


  private static getModelDetailInfo(model: any): IPaymentDetail {
    return {
        name: model.name,
        email: model.email,
        address_line1: model.address,
        address_city: model.city,
        address_state: model.state,
        address_zip: model.code,
        address_country: model.selCountry
    };
  }

  private static parseYear(year: string | number = ''): number {
    if (year && year.toString() && year.toString().length === 2) {
      return Number(`20${year}`);
    }
    return Number(year);
  }
}
