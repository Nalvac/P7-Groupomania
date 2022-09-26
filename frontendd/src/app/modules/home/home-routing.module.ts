import {RouterModule, Routes} from "@angular/router";
import {AccueilTabs} from "./accueil-tabs/accueil-tabs";
import {AddPostComponent} from "./add-post/add-post.component";
import {ListPostComponent} from "./list-post/list-post.component";
import {NgModule} from "@angular/core";

const routes : Routes = [
  {
    path: '',
    component: ListPostComponent,
  },
  {
    path: '',
    component: AccueilTabs,
    children: [
      {
        path:'post',
        component: ListPostComponent
      },
      {
        path: 'addPost',
        component: AddPostComponent
      }
    ]
  }


]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {

}
