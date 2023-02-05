import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LevelSensorRoutingModule } from './levelSensor-routing.module';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LevelSensorRoutingModule,
    SharedModule,
    NgbDropdownModule,
  ]
})
export class LevelSensorModule { }
