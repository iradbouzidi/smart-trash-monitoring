import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListSensorRoutingModule } from './list-sensor-routing.module';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  exports: [
  ],
  imports: [
    CommonModule,
    ListSensorRoutingModule,
    SharedModule,
    NgbDropdownModule,
  ]
})
export class ListSensorModule { }
