declare module 'supplyworks' {
  export interface UserBase {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    mobilePhone: string;
    isAdmin: boolean;
  }
  export interface User extends UserBase {
    _id?: string;
  }
}