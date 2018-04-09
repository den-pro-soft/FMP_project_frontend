import {ConfigEntity} from './app/core/models/core.model';

// export const PORT: ConfigEntity<number> = {
//   front: 8080,
//   back:  80
// };

export const PORT: ConfigEntity<number> = {
  front: 4200,
  back:  8443
};


const isDevMode: boolean = !!process.env.isDev;

export const PROTOCOL: ConfigEntity<string> = {
  front: 'http://',
  back:  'http://'
};
// pDos Change Part
// export const FRONT_IP = 'demo.findmyprofession.com';
// export const BACK_IP  = 'demo.findmyprofession.com';
// export const PROD_FILE_DIRECTORY: string = '/home/ubuntu/angular/dist/';

export const FRONT_IP = '192.168.1.104';
export const BACK_IP  = '192.168.1.104';
export const PROD_FILE_DIRECTORY: string = '/Users/star';

export const DOMAIN: string       = `${FRONT_IP}:${PORT.front}`;
export const DOMAIN_URL: string   = `${PROTOCOL.front}${DOMAIN}`;
export const BACK: string         = `${BACK_IP}:${PORT.back}`;
export const BACK_URL: string     = `${PROTOCOL.back}${BACK}`;
export const BACK_API_URL: string = `${PROTOCOL.back}${BACK}/api/v1`;

export const OUTER_DOMAIN: string   = 'https://www.findmyprofession.com';
