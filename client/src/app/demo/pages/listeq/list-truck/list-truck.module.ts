import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule} from '../../../../theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {ListTruckRoutingModule} from './list-truck-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListTruckRoutingModule,
    SharedModule,
    NgbDropdownModule,
  ]
})
export class ListTrashModule { }
