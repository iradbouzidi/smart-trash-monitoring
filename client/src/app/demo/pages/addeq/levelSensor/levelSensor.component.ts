import { Component, OnInit } from '@angular/core';
import {Gas} from '../../../../models/gas.model';
import {SensorsService} from '../../../../services/sensors.service';
import {Router} from '@angular/router';
import {Level} from '../../../../models/level.model';

@Component({
  selector: 'app-sensor',
  templateUrl: './levelSensor.component.html',
  styleUrls: ['./levelSensor.component.scss']
})
export class LevelSensorComponent implements OnInit {

  constructor(private sensorService: SensorsService, private router: Router) {
  }

  ngOnInit() {
  }

  AddLevel(depotL: string, rayonL: string) {
    this.sensorService.AddLevel(depotL, rayonL).subscribe((level: Level) => {
      console.log(Gas);
      this.router.navigate(['/listeq/sensor']);

    });
  }
}
