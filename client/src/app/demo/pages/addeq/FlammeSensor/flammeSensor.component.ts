import { Component, OnInit } from '@angular/core';
import {Flamme} from '../../../../models/flamme.model';
import {ClientService} from '../../../../services/client.service';
import {Router} from '@angular/router';
import {SensorsService} from '../../../../services/sensors.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './flammeSensor.component.html',
  styleUrls: ['./flammeSensor.component.scss']
})

export class FlammeSensorComponent implements OnInit {

  constructor (private sensorService: SensorsService,
               private router: Router) {}

  ngOnInit() {
  }

  AddFlamme(depotF: string, rayonF: string) {
    this.sensorService.AddFlamme(depotF, rayonF).subscribe((flamme: Flamme) => {
      console.log(flamme);
      this.router.navigate(['/listeq/sensor']);
    },
      err => {
        console.log(err);
        alert('okokok!!!');
      });
  }
}
