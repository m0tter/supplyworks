import { IEmployer, IUser, IAgreement } from 'supplyworks';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk';

export class Employer implements IEmployer {
  name = '';
  address = [{line1: '', line2: '', suburb: '', state: '', country: ''}];
  contactId = '';
  casualId = [];
  employeeId = [];
  _id: ''
}

export class UserDataSource extends DataSource<any> {
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  get data(): User[] { return this.dataChange.value; }
  set data(value:User[]) { this.dataChange.next(value); }

  connect(): Observable<User[]> {
    return this.dataChange;
  }

  disconnect() { }
}

export class TableDataSource<T> extends DataSource<any> {
  dataChange:BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  get data():T[] { return this.dataChange.value; }
  set data(value:T[]) { this.dataChange.next(value); }

  constructor(data?:any) { 
    super(); 
    this.dataChange.next(data); 
  }

  connect(): Observable<T[]> { return this.dataChange };
  disconnect() { }
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
  selected? = false;

  name(): string { return this.firstName + ' ' + this.lastName; }
}

export enum AgreementTypes {
  NotSet,
  FixedPeriod,
  FixedDates
}

export class Agreement implements IAgreement {
  name:string = null;
  agreementType:AgreementTypes = AgreementTypes.NotSet;
  memberId:string[] = new Array();
  employerId:string = null;
  _id:string = null;
  period?: number = 0;
}
