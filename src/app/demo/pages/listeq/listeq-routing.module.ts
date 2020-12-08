import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../theme/shared/shared.module';
import { ListSensorComponent } from './list-sensor/list-sensor.component';
import { ListTrashComponent } from './list-trash/list-trash.component';
import { ListTruckComponent } from './list-truck/list-truck.component';
import {ListSensoraComponent} from './list-sensorA/list-sensora.component';
import {ListSensoruComponent} from './list-sensorU/list-sensoru.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'sensor', component: ListSensorComponent , pathMatch: 'full' },
      { path: 'sensorA', component: ListSensoraComponent , pathMatch: 'full' },
      { path: 'sensorU', component: ListSensoruComponent, pathMatch: 'full' },
      { path: 'trash', component: ListTrashComponent , pathMatch: 'full' },
      { path: 'truck', component: ListTruckComponent , pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})

export class ListeqRoutingModule { }
