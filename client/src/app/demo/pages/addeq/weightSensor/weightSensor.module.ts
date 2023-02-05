import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeightSensorRoutingModule } from './weightSensor-routing.module';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WeightSensorRoutingModule,
    SharedModule,
    NgbDropdownModule,
  ]
})
export class WeightSensorModule { }
