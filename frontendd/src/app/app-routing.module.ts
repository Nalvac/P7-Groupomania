import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import {InscriptionComponent} from "./components/inscription/inscription.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'inscription',
    component: InscriptionComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
