import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TrashComponent} from '../trash/trash.component';

const routes: Routes = [
  {
    path: '',
    component: TrashComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrashRoutingModule { }
