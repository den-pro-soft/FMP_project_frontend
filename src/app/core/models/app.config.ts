export interface IAppConfig {
  facebookLink: string;
  twitterLink: string;
  linkedInkLink: string;
  career_url: string;
  readonly calendly_url?: string;
  readonly recaptcha_key: string;
  readonly recaptcha_link: string;
  readonly google_analytics_id: string;
  readonly x_token_url: string;
  readonly cand_url: string;
  readonly cand_back_url: string;
}

export const APP_CONFIG: IAppConfig = {
  facebookLink: 'https://www.facebook.com/sfindmyprofession',
  twitterLink: 'https://twitter.com/sfmpdaily',
  linkedInkLink: 'https://www.linkedin.com/company/sfind-my-profession/',
  calendly_url: 'https://calendly.com/mike-fresno7/',
  career_url: 'https://calendly.com/mike-fresno7/',
  recaptcha_key: '6Lc9WyUUAAAAAPaadsfasdfasdfjJshndy7RuI',
  recaptcha_link: 'https://www.google.com/recaptcha/api.js',
  google_analytics_id: 'UA-7243432215-1',
  x_token_url: 'AKBDLHOMGAIUDPR4BRVAMJ23O2ARNQ23',
  cand_url: 'https://calendly.com/api/v1/hooks',
  cand_back_url: 'https://demo.findmyprofession.com:8443/api/v1/calendly'
  //cand_back_url: 'http://fdcf6b1a.ngrok.io/api/v1/calendly'
};
