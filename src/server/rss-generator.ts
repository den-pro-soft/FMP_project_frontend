import { Request, Response } from "express";

import * as path from 'path';
import * as fs from 'fs';
import {DOMAIN_URL,BACK_API_URL, PROD_FILE_DIRECTORY} from '../main.config';
const request = require('request');
const URL = require('url');
const isDevMode: boolean = Boolean(process.env.isDev);

const routes = [
  '/',
  '/resume-makeover',
  '/job-interview-prep',
  '/career-finder',
  '/linkedin-profile-makeover',
  '/cover-letter-service',
  '/testimonials',
  '/contact-us',
  '/login',
  '/faq',
  '/about-us',
  '/terms-of-use',
  '/linkedin',
  '/resume-cover-letter',
  '/interviewing',
  '/job-search',
  '/career-advice',
  '/password-reset'
];

export const RssGenerator = (req: Request, res: Response) => {
 
  const filePath = path.join(isDevMode ? __dirname : PROD_FILE_DIRECTORY, 'rss_generate.xml');

  if (fs.existsSync(filePath)) {
    const options = {
      url: `${BACK_API_URL}/blog/slugs`,
      method: 'GET',
      headers: {},
      strictSSL: false
    };
    request(options, (err: any, response: Response, body: any) => {
      if (err) {
        return res.status(500).json(err);
      }
      writeToFile(JSON.parse(body), "https://www.findmyprofession.com", filePath, res);
    });
  } else {
    return res.status(404).json({message: 'File is not exist.'});
  }

  function writeToFile(blogSlugs, domain, filePath, res) {
    const blogList: Array<string> = blogSlugs && blogSlugs.map ? blogSlugs
      .map((element) => wrapUrl(`${domain}/career-advice/${URL.parse(element.url).pathname}`)) : [];

    const frontRoutes: Array<string> = routes ? routes
      .map((element) => wrapUrl(`${domain}${element}`)) : [];

    const fileBody: string = wrapSiteMapBody(`${joinArray(frontRoutes)}\n${joinArray(blogList)}`);

    fs.writeFile(filePath, fileBody, (err) => {
      if (err) {
        return res.status(500).json('Error in writing to file.');
      }
      fs.readFile(filePath, 'utf-8', (err: any, data) => {
        if (err) {
          return res.json({message: `Error in file read. ${err.ERROR}`});
        }
        return res.json(data);
      });
    });
  }

  function wrapUrl(url: string): string {
    return `<url><loc>${url}</loc></url>`;
  }

  function joinArray(list: Array<string>): string {
    return list.join('\n');
  }

  function wrapSiteMapBody(data: string): string {
    return `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">${data}</rss>`
  }
};
