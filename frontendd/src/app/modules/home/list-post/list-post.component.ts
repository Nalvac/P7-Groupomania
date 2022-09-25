import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {

  user: any ;
  posts: any;
  constructor(
    private cdr: ChangeDetectorRef,
    private http: HttpClient) {
  }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('profil') || '' ) ;
    this.getPost();
    this.cdr.markForCheck();
  }
  getPost() {
    this.http.get('http://localhost:3000/api/post',
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + localStorage.getItem("token")
        }
      }
    ).toPromise().then(
      (res: any) => {
        console.log(res);
        this.posts = res.data;
      },
      () => {

      }
    )
  }
}
