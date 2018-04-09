export interface IPayerInfo {
    number: string;
    exp_year: number;
    exp_month: number;
    cvc: string;
}

export interface IPaymentDetail {
    name: string;
    email: string;
    address_line1: string;
    address_city: string;
    address_state: string;
    address_zip: string;
    address_country: string;
}
