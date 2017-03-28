import { Application } from 'express';
import { API_AGREEMENTS } from '../config';
import { AgreementAPI } from '../api/agreement.api';

export class Router {
  constructor( private application: Application ) { 
    application.use( API_AGREEMENTS, new AgreementAPI().router )
  }
}

export default function registerRoutes(app: Application){ return new Router(app) }