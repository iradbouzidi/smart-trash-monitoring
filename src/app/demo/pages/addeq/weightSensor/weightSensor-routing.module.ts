import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WeightSensorComponent} from './weightSensor.component';

const routes: Routes = [
  {
    path: '',
    component: WeightSensorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeightSensorRoutingModule { }
