import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TruckComponent} from '../truck/truck.component';

const routes: Routes = [
  {
    path: '',
    component: TruckComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TruckRoutingModule { }
