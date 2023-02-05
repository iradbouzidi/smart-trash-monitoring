import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component';
import {SharedModule} from '../../../theme/shared/shared.module';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: ListComponent , pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
