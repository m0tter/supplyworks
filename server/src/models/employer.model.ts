// file:    models/employer.model.ts
// author:  sjosephs
// date:    30/3/17

import * as m from 'mongoose';
import { EmployerBase, Address } from 'supplyworks';
import { UserSchema } from './user.model';

let AddressSchema = new m.Schema({
  line1: String,
  line2: String,
  suburb: String,
  state: String,
  country: String
});

let EmployerSchema = new m.Schema({
  name: String,
  address: [AddressSchema],
  contact: [m.Schema.Types.ObjectId]
});

export interface AddressDocument extends Address, m.Document { }
export interface EmployerDocument extends EmployerBase, m.Document { }

export const EmployerModel = m.model<EmployerDocument>('Employers', EmployerSchema);