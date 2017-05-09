// file:    models/employer.model.ts
// author:  sjosephs
// date:    30/3/17

import * as m from 'mongoose';
import { Address, Employer } from 'supplyworks';

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
  contactId: m.Schema.Types.ObjectId,
  casualId: [m.Schema.Types.ObjectId],
  employeeId: [m.Schema.Types.ObjectId]
});

export interface AddressDocument extends Address, m.Document { }
export interface EmployerDocument extends Employer, m.Document { }

export const EmployerModel = m.model<EmployerDocument>('Employers', EmployerSchema);