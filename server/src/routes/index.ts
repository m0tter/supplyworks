import { Application }  from 'express';
import { AgreementAPI } from '../api/agreement.api';
import { AuthAPI }      from '../api/auth.api';
import { EmployerAPI }  from '../api/employer.api';
import { 
  API_AGREEMENTS, 
  API_AUTH,
  API_EMPLOYER
} from '../config';

export class Router {
  constructor( private application: Application ) { 
    application.use( API_AUTH, new AuthAPI().router ); 
    application.use( API_AGREEMENTS, new AgreementAPI().router );
    application.use( API_EMPLOYER, new EmployerAPI().router );
  }
}

export default function registerRoutes(app: Application){ return new Router(app) }