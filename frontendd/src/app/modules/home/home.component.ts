import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  background: ThemePalette = undefined;
  fileName: string = '';
  links = [
    {
      path: 'post',
      name: 'Post'
    },
    {
      path: 'addPost',
      name: 'Ajouter un post'
    },
    {
      path: 'mesPosts',
      name: 'Mes postes'
    }
  ];
  activeLink = this.links[0];
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.user();
  }

  user() {
    this.http.get(`http://localhost:3000/api/user/1`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + localStorage.getItem("token"),
        }
      }
      ).toPromise().then(
        (user: any) => {

          localStorage.setItem('profil', JSON.stringify(user.data));
        }
     ).catch(error => {
       console.log(error)
    })
  }

}
