import { Injectable } from '@angular/core';
import {WebRequestService} from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TruckService {

  constructor(private webReqService: WebRequestService) { }

  createTruck(workingAreaT: string, driverT: string, conveyorT: string, levelIdT: string, weightIdT: string) {
    // We want to send a web request to create a list
    return this.webReqService.post('trucks', {
      workingAreaT,
      driverT,
      conveyorT,
      levelIdT,
      weightIdT
    });
  }

  getTrucks() {
    return this.webReqService.get('trucks');
  }

  getTrucks1() {
    return this.webReqService.get('trucks1');
  }

  getTrucks2() {
    return this.webReqService.get('trucks2');
  }

  getTrucks3() {
    return this.webReqService.get('trucks3');
  }

  getTrucks4() {
    return this.webReqService.get('trucks4');
  }

  getDriverAV() {
    return this.webReqService.get('driversAv');
  }

  getConveyorAV() {
    return this.webReqService.get('conveyorsAv');
  }


  updateWeight(TruckId: string, TruckWeight: string) {
    return this.webReqService.patch(`weights/${TruckWeight}`, {TruckId});
  }

  updateLevel(TruckId: string, TruckLevel: string) {
    return this.webReqService.patch(`levels/${TruckLevel}`, {TruckId});
  }

  updateConveyor(TruckId: string, TruckConveyor: string) {
    return this.webReqService.patch(`employees/${TruckConveyor}`, {TruckId});
  }

  updateDriver(TruckId: string, TruckDriver: string) {
    return this.webReqService.patch(`employees/${TruckDriver}`, {TruckId});
  }

  updateWeightA(TrashId: string, TrashWeight: string) {
    return this.webReqService.patch(`weightsA/${TrashWeight}`, {TrashId});
  }

  updateLevelA(TrashId: string, TrashLevel: string) {
    return this.webReqService.patch(`levelsA/${TrashLevel}`, {TrashId});
  }

  updateConveyorA(TruckId: string, TruckConveyor: string) {
    return this.webReqService.patch(`employeesA/${TruckConveyor}`, {TruckId});
  }

  updateDriverA(TruckId: string, TruckDriver: string) {
    return this.webReqService.patch(`employeesA/${TruckDriver}`, {TruckId});
  }

  deleteTruck(id: string) {
    return this.webReqService.delete(`trucks/${id}`);
  }

}
