import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {UserModelResponse} from "../../models/user-response.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailControl: FormControl = this.fb.control('', Validators.required);
  get mail (): string {
   return this.emailControl.value
  }
  set mail (email: string) {
    this.emailControl.setValue(email);
  }
  motPassControl: FormControl = this.fb.control('', Validators.required);
  get motPass (): string {
   return this.motPassControl.value
  }
  set motPass (email: string) {
    this.motPassControl.setValue(email);
  }
  addressForm = this.fb.group({
    email: this.emailControl,
    motPass: this.motPassControl,
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: Router,
    ) {}

  login(): void {
    this.http.post<UserModelResponse>('http://localhost:3000/api/user/login',
      {
        email: this.mail,
        password: this.motPass,
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    ).subscribe(user => {
      console.log(user.token)
      localStorage.setItem("token", user.token);
      this.route.navigate(['/home'])
    })
  }

  ngOnInit(): void {
  }

}
