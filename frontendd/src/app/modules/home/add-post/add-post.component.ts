import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent  {
  fileName: string = '';

  user: any ;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('profil') || '' ) ;
    this.cdr.markForCheck();
  }
  constructor(
    private formBuild: FormBuilder,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private route: Router) {
  }
  postDescriptionControl: FormControl =  this.formBuild.control('',  [Validators.required]);

  set postDescription (postDesc: string) {
    this.postDescriptionControl.reset(postDesc);
  }
  get postDescription () {
    return this.postDescriptionControl.value;
  }
  postFileControl: FormControl = this.formBuild.control('', );
  set postFile (postFileName: string) {
    this.postFileControl.reset(postFileName);
  }
  get postFile () {
    return this.postFileControl.value;
  }

  postFormGroup: FormGroup = this.formBuild.group({
    postDesc: this.postDescriptionControl,
    postFileName: this.postFileControl,
  })

  set post (post: any) {
    this.postFormGroup.reset(post);
  }
  get post (): any {
    return {
      postDesc: this.postDescription,
      postFileName: this.postFile,
    }
  }
  getUploadFile(file: any) {
    debugger;
    this.postFile = file.target.files[0].name;
  }

  clearFile() {
    this.postFile = '';
  }

  addPost() {
    this.http.post('http://localhost:3000/api/post',
      {
        author:  this.user.pseudo,
        post:  this.postDescription,
        posterId:  this.user.id,
        imgUrl: this.postFile,
        postProfil:  this.user.imgProfil,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + localStorage.getItem("token")
        }
      }
    ).toPromise().then(
      (res) => {
        console.log(res);
        this.route.navigate(['/home/post'])
      },
      () => {

      }
  )
  }
}
