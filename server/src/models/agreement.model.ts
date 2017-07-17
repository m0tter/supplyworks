// file:    models/agreement.model.ts
// author:  sjosephs
// date:    12/7/17

import * as m from 'mongoose';
import { IAgreement } from 'supplyworks';

let AgreementSchema = new m.Schema({
  name: String,
  agreementType: String,
  period: Number,
  employerId: m.Schema.Types.ObjectId,
  memberId: [m.Schema.Types.ObjectId]
});

export interface IAgreementDocument extends IAgreement, m.Document { }

export const AgreementModel = m.model<IAgreementDocument>('Agreements', AgreementSchema);
