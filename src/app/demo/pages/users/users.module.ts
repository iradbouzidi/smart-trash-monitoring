import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {ListComponent} from './list/list.component';
import {CardModule} from '../../../theme/shared/components';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {WebReqInterceptor} from '../../../services/web-req.interceptor';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    CardModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }
  ]
})


export class UsersModule { }
