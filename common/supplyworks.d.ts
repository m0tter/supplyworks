declare module 'supplyworks' {
  export interface UserBase {
    firstName: string;
    lastName: string;
  }
  export interface User extends UserBase {
    _id?: string;
  }
}