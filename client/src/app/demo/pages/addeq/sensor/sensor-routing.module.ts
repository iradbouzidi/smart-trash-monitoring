import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SensorComponent} from './sensor.component';

const routes: Routes = [
  {
    path: '',
    component: SensorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensorRoutingModule { }
