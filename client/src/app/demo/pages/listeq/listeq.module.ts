import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListeqRoutingModule } from './listeq-routing.module';
import { ListSensorComponent } from './list-sensor/list-sensor.component';
import { CardModule } from '../../../theme/shared/components';
import {ListTrashComponent} from './list-trash/list-trash.component';
import {ListTruckComponent} from './list-truck/list-truck.component';
import {FormsModule} from '@angular/forms';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {WebReqInterceptor} from '../../../services/web-req.interceptor';
import {ListSensoraComponent} from './list-sensorA/list-sensora.component';
import {ListSensoruComponent} from './list-sensorU/list-sensoru.component';


@NgModule({
  declarations: [ListSensorComponent, ListTrashComponent, ListTruckComponent, ListSensoraComponent, ListSensoruComponent],
  imports: [
    CommonModule,
    ListeqRoutingModule,
    CardModule,
    FormsModule,
    NgbDropdownModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }
  ]
})
export class ListeqModule { }
