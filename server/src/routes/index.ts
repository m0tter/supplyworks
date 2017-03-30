import { Application } from 'express';
import { API_AGREEMENTS, API_AUTH } from '../config';
import { AgreementAPI } from '../api/agreement.api';
import { AuthAPI } from '../api/auth.api';

export class Router {
  constructor( private application: Application ) { 
    application.use( API_AUTH, new AuthAPI().router ); 
    application.use( API_AGREEMENTS, new AgreementAPI().router );
  }
}

export default function registerRoutes(app: Application){ return new Router(app) }