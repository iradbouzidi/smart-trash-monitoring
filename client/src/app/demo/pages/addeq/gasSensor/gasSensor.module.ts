import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GasSensorRoutingModule } from './gasSensor-routing.module';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GasSensorRoutingModule,
    SharedModule,
    NgbDropdownModule,
  ]
})
export class GasSensorModule { }
