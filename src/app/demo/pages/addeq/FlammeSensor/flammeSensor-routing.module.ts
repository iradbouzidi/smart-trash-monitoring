import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FlammeSensorComponent} from './flammeSensor.component';

const routes: Routes = [
  {
    path: '',
    component: FlammeSensorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlammeSensorRoutingModule { }
