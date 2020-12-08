import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SensorRoutingModule } from './sensor-routing.module';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SensorRoutingModule,
    SharedModule,
    NgbDropdownModule,
  ]
})
export class SensorModule { }
