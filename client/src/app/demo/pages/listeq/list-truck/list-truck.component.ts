import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Trash} from '../../../../models/trash.model';
import {Truck} from '../../../../models/truck.model';
import {TrashService} from '../../../../services/trash.service';
import {SensorsService} from '../../../../services/sensors.service';
import {TruckService} from '../../../../services/truck.service';
import {Employee} from "../../../../models/employee.model";
import {EmployeeService} from "../../../../services/employee.service";
import {Weight} from "../../../../models/weight.model";
import {Level} from "../../../../models/level.model";

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.scss']
})

export class ListTruckComponent implements OnInit {

  trucks: Truck[];
  trucks1: Truck[];
  trucks2: Truck[];
  trucks3: Truck[];
  trucks4: Truck[];
  employees: Employee[];
  weights: Weight[];
  levels: Level[];
  conveyor: string;
  driver: string;
  levelId: string;
  weightId: string;

  // tslint:disable-next-line:max-line-length
  constructor (private truckService: TruckService,
              private sensorService: SensorsService,
              private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router)
  { }

  ngOnInit() {
    this.truckService.getTrucks().subscribe((trucks: Truck[]) => {
      this.trucks = trucks;
    });
    this.truckService.getTrucks1().subscribe((trucks1: Truck[]) => {
      this.trucks1 = trucks1;
    });
    this.truckService.getTrucks2().subscribe((trucks2: Truck[]) => {
      this.trucks2 = trucks2;
    });
    this.truckService.getTrucks3().subscribe((trucks3: Truck[]) => {
      this.trucks3 = trucks3;
    });
    this.truckService.getTrucks4().subscribe((trucks4: Truck[]) => {
      this.trucks4 = trucks4;
    });
    this.employeeService.getEmployee().subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
    this.sensorService.getLevel().subscribe((levels: Level[]) => {
      this.levels = levels;
    });
    this.sensorService.getWeight().subscribe((weights: Weight[]) => {
      this.weights = weights;
    });
  }

  AddTruck() {
    this.router.navigateByUrl('addeq/truck');
  }

  updateLevelA(Trucklevel: string) {
    this.truckService.updateLevelA(this.levelId, Trucklevel).subscribe(() => {
      this.router.navigate(['/', this.levelId]);
    });
  }

  updateWeightA(Truckweight: string) {
    this.truckService.updateWeightA(this.weightId, Truckweight).subscribe(() => {
      this.router.navigate(['/', this.weightId]);
    });
  }

  updateDriverA(TruckDriver: string) {
    this.truckService.updateDriverA(this.driver, TruckDriver).subscribe(() => {
      this.router.navigate(['/', this.driver]);
    });
  }

  updateConveyorA(TruckConveyor: string) {
    this.truckService.updateConveyorA(this.conveyor, TruckConveyor).subscribe(() => {
      this.router.navigate(['/', this.conveyor]);
    });
  }

  DeleteTruck(id: string) {
    this.truckService.deleteTruck(id).subscribe((res: any) => {
      this.ngOnInit();
      console.log(res);
    });
  }

}
