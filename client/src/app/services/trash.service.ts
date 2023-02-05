import { Injectable } from '@angular/core';
import {WebRequestService} from 'src/app/services/web-request.service';
import {Flamme} from '../models/flamme.model';

@Injectable({
  providedIn: 'root'
})
export class TrashService {

  constructor(private webReqService: WebRequestService) { }

  getTrashs() {
    return this.webReqService.get('trashs');
  }

  getFlammes() {
    return this.webReqService.get(`flammes`);
  }

  getWeights() {
    return this.webReqService.get(`weights`);
  }

  getLevels() {
    return this.webReqService.get(`levels`);
  }

  getGas() {
    return this.webReqService.get(`gases`);
  }

  createTrash (cityT: string,
               municipalityT: string,
               areaT: string,
               flammeId: string,
               gasId: string,
               levelId: string,
               weightId: string) {
    // We want to send a web request to create a list
    return this.webReqService.post('trashs', {
      cityT,
      municipalityT,
      areaT,
      flammeId,
      gasId,
      levelId,
      weightId
    });
  }

  updateFlamme(TrashId: string, TrashFlamme: string) {
    return this.webReqService.patch(`flammes/${TrashFlamme}`, {TrashId});
  }

  updateGas(TrashId: string, TrashGas: string) {
    return this.webReqService.patch(`gases/${TrashGas}`, {TrashId});
  }

  updateWeight(TrashId: string, TrashWeight: string) {
    return this.webReqService.patch(`weights/${TrashWeight}`, {TrashId});
  }

  updateLevel(TrashId: string, TrashLevel: string) {
    return this.webReqService.patch(`levels/${TrashLevel}`, {TrashId});
  }

  deleteTrash(id: string) {
    return this.webReqService.delete(`trashs/${id}`);
  }

  updateFlammeA(TrashId: string, TrashFlamme: string) {
    return this.webReqService.patch(`flammesA/${TrashFlamme}`, {TrashId});
  }

  updateGasA(TrashId: string, TrashGas: string) {
    return this.webReqService.patch(`gasesA/${TrashGas}`, {TrashId});
  }

  updateWeightA(TrashId: string, TrashWeight: string) {
    return this.webReqService.patch(`weightsA/${TrashWeight}`, {TrashId});
  }

  updateLevelA(TrashId: string, TrashLevel: string) {
    return this.webReqService.patch(`levelsA/${TrashLevel}`, {TrashId});
  }

}
