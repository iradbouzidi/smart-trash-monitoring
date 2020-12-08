import { Injectable } from '@angular/core';
import {WebRequestService} from './web-request.service';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  constructor(private webReqService: WebRequestService) { }

  getClient() {
    return this.webReqService.get('clients');
  }

  getReportC() {
    return this.webReqService.get('rep');
  }

  // tslint:disable-next-line:variable-name max-line-length
  createClient (
    firstNameC: string,
    lastNameC: string,
    cinC: string,
    birthDateC: string,
    emailC: string,
    cityC: string,
    addressC: string,
    userNameC: string) {
    // We want to send a web request to create a list
    return this.webReqService.post('clients', { firstNameC,
      lastNameC,
      cinC,
      birthDateC,
      emailC,
      cityC,
      addressC,
      userNameC});
  }

  // tslint:disable-next-line:max-line-length
  updateClient (id: string,
                userNameC: string,
                firstNameC: string,
                lastNameC: string,
                emailC: string,
                cinC: string,
                cityC: string,
                addressC: string ) {
    return this.webReqService.patch(`clients/${id}`, {
      userNameC,
      firstNameC,
      lastNameC,
      emailC,
      cinC,
      cityC,
      addressC
    });
  }

  SendMail(emailC: string) {
    return this.webReqService.post('mail', {
      emailC
    });
  }

  deleteClient(id: string) {
    return this.webReqService.delete(`clients/${id}`);
  }

  createReport(emailR: string, subR: string, repR: string) {
    return this.webReqService.post('reports', { emailR,
      subR,
      repR
    });
  }

  getCurrentC() {
    return this.webReqService.get('currentC');
  }

  getCurrentU() {
    return this.webReqService.get('currentU');
  }

  updateRep(Id: string, repId: string) {
    return this.webReqService.patch(`reports/${repId}`, {Id});
  }

  deleteRep(id: string) {
    return this.webReqService.delete(`reports/${id}`);
  }

  sendImage(imageC: FormData, id: string) {
    return this.webReqService.post(`upload/${id}`, imageC);
  }
}
