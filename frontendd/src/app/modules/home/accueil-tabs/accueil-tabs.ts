import {Component} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'actuality-app',
  templateUrl: 'accueil-tabs.html',
  styleUrls: ['accueil-tabs.scss'],
})
export class AccueilTabs {
  background: ThemePalette = undefined;

  constructor(private formBuild: FormBuilder) {
  }
  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  postDescriptionControl: FormControl =  this.formBuild.control('',  [Validators.required]);

  set postDescription (postDesc: string) {
    this.postDescriptionControl.reset(postDesc);
  }
  get postDescription () {
    return this.postDescriptionControl.value;
  }
  postFileControl: FormControl = this.formBuild.control('', [Validators.required]);
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
}
