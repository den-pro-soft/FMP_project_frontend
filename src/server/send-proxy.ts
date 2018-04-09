import {Request, Response} from "express";
import {BACK_API_URL,BACK_URL} from '../main.config';

const request = require('request');
const path = require('path');

const mime: any = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript',
  json: 'application/json'
};

export const sendProxy = (req: Request, res: Response) => {
  const token: string = req.get('token');
  let type = mime[path.extname(req.path).slice(1)] || mime.json;
// pDos Change Part
  const options: any = {
    url: BACK_API_URL+ req.url,
    method: req.method,
    headers: {}
  };

  if (type === mime.json) {
    options.json = true;
  }

  if (token) {
    options.headers.token = token;
  }

  if (req.method !== 'GET') {
    options.body = req.body || {message: 'No body'};
  }

  request(options, (err, response: Response | any, body: any) => {
    if (err) {
      return res.status(500).json({message: 'Inner server error.'});
    }

    if (response) {
      res.set('Content-Type', type);
    }
    if (type === mime.json) {
      body = JSON.stringify(body);
    }
    return res.contentType(type)
      .status(response.statusCode)
      .send(body);
  });
};