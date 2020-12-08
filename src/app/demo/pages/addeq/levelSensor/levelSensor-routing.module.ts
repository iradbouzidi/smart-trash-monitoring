import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LevelSensorComponent} from './levelSensor.component';

const routes: Routes = [
  {
    path: '',
    component: LevelSensorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LevelSensorRoutingModule { }
