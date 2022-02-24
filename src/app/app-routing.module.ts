import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotebookComponent} from "./components/notebook.component";

const routes: Routes = [{
  path: '',
  redirectTo: '/app',
  pathMatch: 'full'
},{
  path: 'app',
  component: NotebookComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
