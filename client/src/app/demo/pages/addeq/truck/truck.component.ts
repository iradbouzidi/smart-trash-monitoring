import { Component, OnInit } from '@angular/core';
import {Trash} from '../../../../models/trash.model';
import {Flamme} from '../../../../models/flamme.model';
import {Gas} from '../../../../models/gas.model';
import {Weight} from '../../../../models/weight.model';
import {Level} from '../../../../models/level.model';
import {Employee} from '../../../../models/employee.model';
import {SensorsService} from '../../../../services/sensors.service';
import {TrashService} from '../../../../services/trash.service';
import {Router} from '@angular/router';
import {TruckService} from '../../../../services/truck.service';
import {Truck} from '../../../../models/truck.model';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.scss']
})

export class TruckComponent implements OnInit {

  drivers: Employee[];
  conveyors: Employee[];
  weights: Weight[];
  levels: Level[];
  level: string;
  weight: string;
  driver: string;
  conveyor: string;
  hide = true;

  constructor (private sensorService: SensorsService,
               private truckService: TruckService,
               private router: Router)
  { }

  ngOnInit() {
    this.sensorService.getLevelAV().subscribe((levels: Level[]) => {
      this.levels = levels;
    });
    this.sensorService.getWeightAV().subscribe((weights: Weight[]) => {
      this.weights = weights;
    });
    this.truckService.getDriverAV().subscribe((drivers: Employee[]) => {
      this.drivers = drivers;
    });
    this.truckService.getConveyorAV().subscribe((conveyors: Employee[]) => {
      this.conveyors = conveyors;
    });
  }

  createTruck (areaT: string, driver: string, conveyor: string, level: string, weight: string) {
    if (driver.length === 0) {
      alert('Driver is missing');
    }
    else if (conveyor.length === 0) {
      alert('conveyor is missing');
    }
    else if (level.length === 0) {
      alert('Level sensor is missing');
    }
    else if (weight.length === 0) {
      alert('Weight sensor is missing');
    }
    else {
      this.truckService.createTruck(areaT, driver, conveyor, level, weight).subscribe((truck: Truck) => {
        console.log(truck);
        // Now we navigate to /lists/task._id
        this.router.navigate(['/listeq/truck']);
        this.updateLevel(level);
        this.updateWeight(weight);
        this.updateConveyor(conveyor);
        this.updateDriver(driver);
      });
    }
  }

  updateLevel(Trucklevel: string) {
    this.truckService.updateLevel(this.level, Trucklevel).subscribe(() => {
      this.router.navigate(['/', this.level]);
    });
  }

  updateWeight(Truckweight: string) {
    this.truckService.updateWeight(this.weight, Truckweight).subscribe(() => {
      this.router.navigate(['/', this.weight]);
    });
  }

  updateConveyor(Truckconveyor: string) {
    this.truckService.updateConveyor(this.conveyor, Truckconveyor).subscribe(() => {
      this.router.navigate(['/', this.conveyor]);
    });
  }

  updateDriver(Truckdriver: string) {
    this.truckService.updateDriver(this.driver, Truckdriver).subscribe(() => {
      this.router.navigate(['/', this.driver]);
    });
  }

}
