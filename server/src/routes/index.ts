import { Application }  from 'express';
import { AgreementAPI } from '../api/agreement.api';
import { AuthAPI }      from '../api/auth.api';
import { EmployerAPI }  from '../api/employer.api';
import { UserAPI }      from '../api/user.api';
import { 
  API_AGREEMENT, 
  API_AUTH,
  API_EMPLOYER,
  API_USER
} from '../config';

export class Router {
  constructor( private application: Application ) { 
    application.use( API_AUTH, new AuthAPI().router ); 
    application.use( API_AGREEMENT, new AgreementAPI().router );
    application.use( API_EMPLOYER, new EmployerAPI().router );
    application.use( API_USER, new UserAPI().router );
  }
}

export default function registerRoutes(app: Application){ return new Router(app) }