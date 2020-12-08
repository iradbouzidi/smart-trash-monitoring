import { Component, OnInit } from '@angular/core';
import {Gas} from '../../../../models/gas.model';
import {Weight} from '../../../../models/weight.model';
import {SensorsService} from '../../../../services/sensors.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sensor',
  templateUrl: './weightSensor.component.html',
  styleUrls: ['./weightSensor.component.scss']
})

export class WeightSensorComponent implements OnInit {

  constructor (private sensorService: SensorsService,
               private router: Router)
  { }

  ngOnInit() {
  }

  AddWeight(depotW: string, rayonW: string) {
    this.sensorService.AddWeight(depotW, rayonW).subscribe((weight: Weight) => {
      console.log(weight);
      this.router.navigate(['/listeq/sensor']);
    });
  }

}
