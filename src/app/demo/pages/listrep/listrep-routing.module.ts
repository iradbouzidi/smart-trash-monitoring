import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../theme/shared/shared.module';
import {ListReportComponent} from './list-report/list-report.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'report', component: ListReportComponent , pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class ListrepRoutingModule { }
