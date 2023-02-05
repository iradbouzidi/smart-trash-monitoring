import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule} from '../../../../theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {ListTrashRoutingModule} from './list-trash-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListTrashRoutingModule,
    SharedModule,
    NgbDropdownModule,
  ]
})
export class ListTrashModule { }
