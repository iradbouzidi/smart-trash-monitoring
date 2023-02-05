import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  exports: [
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    SharedModule,
    NgbDropdownModule,
  ]
})
export class ListModule { }
