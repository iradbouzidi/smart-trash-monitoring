import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import {WebReqInterceptor} from '../../../services/web-req.interceptor';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }
  ],
  declarations: []
})
export class AuthenticationModule { }
