import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
  }
  firstNameControl: FormControl = this.fb.control('', Validators.required)
  get firstName() {
    return this.firstNameControl.value
  }
  set firstName(firstName: string) {
    this.firstNameControl.setValue(firstName);
  }
  lastNameControl: FormControl = this.fb.control('', Validators.required)
  get lastName() {
    return this.lastNameControl.value
  }
  set lastName(lastName: string) {
    this.lastNameControl.setValue(lastName);
  }
  mailControl: FormControl = this.fb.control('', Validators.required)
  get mail() {
    return this.mailControl.value
  }
  set mail(mail: string) {
    this.mailControl.setValue(mail);
  }
  pseudoControl: FormControl = this.fb.control('', Validators.required)
  get pseudo() {
    return this.pseudoControl.value
  }
  set pseudo(pseudo: string) {
    this.pseudoControl.setValue(pseudo);
  }
  posteControl: FormControl = this.fb.control('', Validators.required)
  get poste() {
    return this.posteControl.value
  }
  set poste(firstName: string) {
    this.posteControl.setValue(firstName);
  }
  motDePasseControl: FormControl = this.fb.control('', Validators.required)
  get motDePasse() {
    return this.motDePasseControl.value
  }
  set motDePasse(firstName: string) {
    this.motDePasseControl.setValue(firstName);
  }

  inscriptionForm: FormGroup = this.fb.group({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    pseudo: this.pseudoControl,
    motDePasse: this.motDePasseControl,
    mail: this.mailControl,
    poste: this.posteControl
  })

  singUp(): void {
    this.http.post('http://localhost:3000/api/user/signup',
      {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.mail,
        pseudo: this.pseudo,
        password: this.motDePasse,
        poste: this.poste,
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    ).toPromise().then(
      user => {
        console.log(user);
        this.route.navigate(['/home']);
      }
    )
  }
}
