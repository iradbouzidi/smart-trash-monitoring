import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListrepRoutingModule } from './listrep-routing.module';
import { CardModule } from '../../../theme/shared/components';

import {FormsModule} from '@angular/forms';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {ListReportComponent} from './list-report/list-report.component';


@NgModule({
  declarations: [ListReportComponent],
  imports: [
    CommonModule,
    ListrepRoutingModule,
    CardModule,
    FormsModule,
    NgbDropdownModule
  ]
})

export class ListrepModule { }
