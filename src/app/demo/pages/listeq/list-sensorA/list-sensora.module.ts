import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListSensoraRoutingModule } from './list-sensora-routing.module';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  exports: [
  ],
  imports: [
    CommonModule,
    ListSensoraRoutingModule,
    SharedModule,
    NgbDropdownModule,
  ]
})
export class ListSensoraModule { }
