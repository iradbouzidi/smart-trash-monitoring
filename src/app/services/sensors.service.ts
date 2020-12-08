import { Injectable } from '@angular/core';
import {WebRequestService} from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  constructor(private webReqService: WebRequestService) { }

  deleteFlamme(id: any) {
    return this.webReqService.delete(`flammes/${id}`);
  }

  getFlamme() {
    return this.webReqService.get('flammes');
  }

  getFlammeAV() {
    return this.webReqService.get('flammesAv');
  }

  getFlammeU() {
    return this.webReqService.get('flammesU');
  }

  AddFlamme(depotF: string, rayonF: string ) {
    // We want to send a web request to create a list
    return this.webReqService.post('flammes', {
      depotF,
      rayonF
    });
  }

  deleteWeight(id: string) {
    return this.webReqService.delete(`weights/${id}`);
  }

  getWeight() {
    return this.webReqService.get('weights');
  }

  getWeightAV() {
    return this.webReqService.get('weightsAv');
  }

  getWeightU() {
    return this.webReqService.get('weightsU');
  }

  AddWeight(depotW: string, rayonW: string ) {
    // We want to send a web request to create a list
    return this.webReqService.post('weights', {
      depotW,
      rayonW
    });
  }

  deleteGas(id: string) {
    return this.webReqService.delete(`gases/${id}`);
  }

  getGas() {
    return this.webReqService.get('gases');
  }

  getGasAV() {
    return this.webReqService.get('gasesAv');
  }

  getGasU() {
    return this.webReqService.get('gasesU');
  }

  AddGas(depotG: string, rayonG: string ) {
    // We want to send a web request to create a list
    return this.webReqService.post('gases', {
      depotG,
      rayonG
    });
  }

  deleteLevel(id: string) {
    return this.webReqService.delete(`levels/${id}`);
  }

  getLevel() {
    return this.webReqService.get('levels');
  }

  getLevelAV() {
    return this.webReqService.get('levelsAv');
  }

  getLevelU() {
    return this.webReqService.get('levelsU');
  }

  AddLevel(depotL: string, rayonL: string ) {
    // We want to send a web request to create a list
    return this.webReqService.post('levels', {
      depotL,
      rayonL
    });
  }

}

