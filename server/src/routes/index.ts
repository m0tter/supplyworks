import { Application } from 'express';

import { AgreementAPI } from '../api/agreement.api';

export class Router {
  constructor( private application: Application ) { 
    application.use( '/v1/api/agreements', new AgreementAPI().router )
  }
}

export default function registerRoutes(app: Application){ return new Router(app) }