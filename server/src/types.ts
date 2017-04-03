import { Request } from 'express';

export interface Token { 
  isSuper: boolean;
  isAdmin: boolean;
  email: string;
  schoolId: string;
}
export interface AuthRequest extends Request { token: Token; }