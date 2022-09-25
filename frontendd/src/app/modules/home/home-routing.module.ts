import {RouterModule, Routes} from "@angular/router";
import {AccueilTabs} from "./accueil-tabs/accueil-tabs";
import {AddPostComponent} from "./add-post/add-post.component";
import {ListPostComponent} from "./list-post/list-post.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";

const routes : Routes = [
  {
    path: '',
    component: HomeComponent,
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
