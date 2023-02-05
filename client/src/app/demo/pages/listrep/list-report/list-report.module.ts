import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListReportRoutingModule } from './list-report-routing.module';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  exports: [
  ],
  imports: [
    CommonModule,
    ListReportRoutingModule,
    SharedModule,
    NgbDropdownModule,
  ]
})
export class ListReportModule { }
