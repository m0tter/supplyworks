import { Request } from 'express';
import { Error } from 'mongoose';

export interface MongoError extends Error { code: number; }

export interface Token { 
  isSuper: boolean;
  isAdmin: boolean;
  email: string;
  employerId: string;
}
export interface AuthRequest extends Request { token: Token; }