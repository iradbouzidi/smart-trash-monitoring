import { Injectable } from '@angular/core';
import {WebRequestService} from './web-request.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private webReqService: WebRequestService) { }

  // region LIST CRUD
  getEmployee() {
    return this.webReqService.get('employees');
  }

  // tslint:disable-next-line:variable-name max-line-length
  createEmployee(firstNameE: string, lastNameE: string, userNameE: string, passwordE: string, cinE: string, birthDateE: string, emailE: string, cityE: string, addressE: string, postE: string, municipalityE:string, workingAreaE: string) {
    // We want to send a web request to create a list
    return this.webReqService.post('employees', { firstNameE,
      lastNameE,
      userNameE,
      passwordE,
      cinE,
      birthDateE,
      emailE,
      cityE,
      addressE,
      postE,
      municipalityE,
      workingAreaE });
  }

  createEmployeeLogin(emailE: string, passwordE: string ) {
    // We want to send a web request to create a list
    return this.webReqService.post('employeesLogin', {
      emailE,
      passwordE
    });
  }

  deleteEmployee(id: any) {
    return this.webReqService.delete(`employees/${id}`);
  }

  getCurrentE() {
    return this.webReqService.get('currentE');
  }

  getCurrentW() {
    return this.webReqService.get('currentW');
  }

  getReportW() {
    return this.webReqService.get('repW');
  }

  createReportW(emailRW: string, subRW: string, repRW: string) {
    return this.webReqService.post('reportsW', { emailRW,
      subRW,
      repRW
    });
  }

  sendImage(imageE: FormData, id: string) {
    return this.webReqService.post(`uploadE/${id}`, imageE);
  }

  // tslint:disable-next-line:max-line-length
  updateEmp(id: string, userNameE: string, firstNameE: string, lastNameE: string, emailE: string, cinE: string, cityE: string, addressE: string ) {
    return this.webReqService.patch(`emp/${id}`, {
      userNameE,
      firstNameE,
      lastNameE,
      emailE,
      cinE,
      cityE,
      addressE
    });
  }

  updateRepW(Id: string, repId: string) {
    return this.webReqService.patch(`reportsW/${repId}`, {Id});
  }

  deleteRepW(id: string) {
    return this.webReqService.delete(`reportsW/${id}`);
  }
}

