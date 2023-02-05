import { Component, OnInit } from '@angular/core';
import {Flamme} from '../../../../models/flamme.model';
import {Gas} from '../../../../models/gas.model';
import {SensorsService} from '../../../../services/sensors.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sensor',
  templateUrl: './gasSensor.component.html',
  styleUrls: ['./gasSensor.component.scss']
})
export class GasSensorComponent implements OnInit {

  constructor(private sensorService: SensorsService, private router: Router) {

  }

  ngOnInit() {
  }

  AddGas(depotG: string, rayonG: string) {
    this.sensorService.AddGas(depotG, rayonG).subscribe((gas: Gas) => {
      console.log(Gas);
      this.router.navigate(['/listeq/sensor']);

    });
  }
}
