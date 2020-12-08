import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlammeSensorRoutingModule } from './flammeSensor-routing.module';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlammeSensorRoutingModule,
    SharedModule,
    NgbDropdownModule,
  ]
})
export class FlammeSensorModule { }
