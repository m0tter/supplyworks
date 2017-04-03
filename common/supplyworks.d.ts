declare module 'supplyworks' {
  export interface UserBase {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    mobilePhone: string;
    isAdmin: boolean;
    schoolId: string;
  }

  export interface User extends UserBase {
    _id?: string;
  }

  export interface Address {
    line1: string;
    line2: string;
    suburb: string;
    state: string;
    country :string;
  }

    export interface EmployerBase {
    name: string;
    address: Address[];
    contactId: string;
  }

  export interface Employer extends EmployerBase {
    _id?: string;
  }
}