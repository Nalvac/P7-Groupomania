import {NgModule} from "@angular/core";
import {ProfilComponent} from "./profil/profil.component";
import {AccueilTabs} from "./accueil-tabs/accueil-tabs";
import {ListPostComponent} from "./list-post/list-post.component";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeHeaderComponent} from "./home-header/home-header.component";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {AddPostComponent} from "./add-post/add-post.component";
import {CommonModule} from "@angular/common";
import {MatMenuModule} from "@angular/material/menu";
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  imports: [
    HomeRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    MatIconModule,
    CommonModule,
    MatMenuModule,
    MatExpansionModule,
  ],
  declarations: [
    HomeHeaderComponent,
    ProfilComponent,
    AccueilTabs,
    ListPostComponent,
    AddPostComponent,
  ],
  providers: [],
  exports: [
    AccueilTabs,
    ProfilComponent,
    HomeHeaderComponent,
    ListPostComponent
  ]
})
export class HomeModule {
}
