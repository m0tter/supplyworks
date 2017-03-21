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
}