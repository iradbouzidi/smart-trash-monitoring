import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddeqRoutingModule } from './addeq-routing.module';
import { TrashComponent } from './trash/trash.component';
import { TruckComponent } from './truck/truck.component';
import { CardModule } from '../../../theme/shared/components';
import { EmployeeComponent } from './employee/employee.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {WebReqInterceptor} from '../../../services/web-req.interceptor';
import {ClientComponent} from '../../../client/client.component';
import {FlammeSensorComponent} from './FlammeSensor/flammeSensor.component';
import {GasSensorComponent} from './gasSensor/gasSensor.component';
import {WeightSensorComponent} from './weightSensor/weightSensor.component';
import {LevelSensorComponent} from './levelSensor/levelSensor.component';


@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [
    TrashComponent,
    TruckComponent,
    EmployeeComponent,
    LevelSensorComponent,
    GasSensorComponent,
    WeightSensorComponent,
    FlammeSensorComponent
  ],
  imports: [
    CommonModule,
    AddeqRoutingModule,
    CardModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }
  ]
})
export class AddeqModule { }
