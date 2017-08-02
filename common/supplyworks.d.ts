declare module 'supplyworks' {
  export interface UserBase {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    mobilePhone: string;
    isAdmin: boolean;
    employerId: string;
  }

  export interface IUser extends UserBase {
    _id?: string;
    token?: string;
  }

  export interface Address {
    line1: string;
    line2: string;
    suburb: string;
    state: string;
    country :string;
  }

  export interface IEmployer {
    name: string;
    address: Address[];
    contactId: string;
    casualId: string[];
    employeeId: string[];
    _id: any;
  }

  export interface IAgreement {
    name: string;
    agreementType: number;
    employerId: string;
    memberId: string[];
    _id: any;
    period?: number;
    lessons: number;
    countBreaks: boolean;
    allowOverride: boolean;
  }

  // export class Address {
  //   line1: string;
  //   line2: string;
  //   suburb: string;
  //   state: string;
  //   country: string;
  // }

  // export class Employer {
  //   name: string;
  //   address: Address[];
  //   contactId: string;
  //   casualId: string;
  //   employeeId: string[];
  //   _id: any;
  // }
}
