import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Employer } from 'supplyworks';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm = this.fb.group({
    schoolName: ["", Validators.required],
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required],
    phone: ["", Validators.required],
    addrLine1: [""],
    addrLine2: [""],
    suburb: [""]
  });

  constructor( private fb: FormBuilder ) { }

  doRegister():void {
    console.log("do register");
  }

  ngOnInit() {
  }

}
