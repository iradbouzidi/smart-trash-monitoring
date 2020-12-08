import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GasSensorComponent} from './gasSensor.component';

const routes: Routes = [
  {
    path: '',
    component: GasSensorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GasSensorRoutingModule { }
