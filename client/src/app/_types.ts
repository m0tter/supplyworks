import { IEmployer, IUser } from 'supplyworks';

export class Employer implements IEmployer {
  name = '';
  address = [{line1: '', line2: '', suburb: '', state: '', country: ''}];
  contactId = '';
  casualId = [];
  employeeId = [];
  _id: ''
}

export class User implements IUser {
  firstName = '';
  lastName = '';
  password = '';
  email = '';
  mobilePhone = '';
  isAdmin = false;
  employerId = '';
  _id = null;
  token = null;

  get name(): string { return this.firstName + ' ' + this.lastName; }
}
