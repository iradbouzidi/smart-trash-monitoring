import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TrashComponent} from './trash/trash.component';
import {TruckComponent} from './truck/truck.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {EmployeeComponent} from './employee/employee.component';
import {ClientComponent} from '../../../client/client.component';
import {FlammeSensorComponent} from './FlammeSensor/flammeSensor.component';
import {GasSensorComponent} from './gasSensor/gasSensor.component';
import {WeightSensorComponent} from './weightSensor/weightSensor.component';
import {LevelSensorComponent} from './levelSensor/levelSensor.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'trash', component: TrashComponent , pathMatch: 'full' },
      { path: 'addFlamme', component: FlammeSensorComponent, pathMatch: 'full' },
      { path: 'addGas', component: GasSensorComponent, pathMatch: 'full' },
      { path: 'addLevel', component: LevelSensorComponent, pathMatch: 'full' },
      { path: 'addWeight', component: WeightSensorComponent, pathMatch: 'full' },
      { path: 'truck', component: TruckComponent, pathMatch: 'full' },
      { path: 'emp', component: EmployeeComponent, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class AddeqRoutingModule { }
