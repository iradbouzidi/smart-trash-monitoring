import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListSensoruRoutingModule } from './list-sensoru-routing.module';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  exports: [
  ],
  imports: [
    CommonModule,
    ListSensoruRoutingModule,
    SharedModule,
    NgbDropdownModule,
  ]
})
export class ListSensoruModule { }
