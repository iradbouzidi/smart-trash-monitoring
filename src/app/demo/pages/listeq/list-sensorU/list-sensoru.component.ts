import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SensorsService} from '../../../../services/sensors.service';
import {Flamme} from '../../../../models/flamme.model';
import {Gas} from '../../../../models/gas.model';
import {Weight} from '../../../../models/weight.model';
import {Level} from '../../../../models/level.model';

@Component({
  selector: 'app-list-sensor',
  templateUrl: './list-sensoru.component.html',
  styleUrls: ['./list-sensoru.component.scss']
})

export class ListSensoruComponent implements OnInit {

  flammes: Flamme[];
  gases: Gas[];
  weights: Weight[];
  levels: Level[];

  constructor (private sensorService: SensorsService,
               private route: ActivatedRoute,
               private router: Router)
  { }

  ngOnInit() {
    this.sensorService.getFlammeU().subscribe((flammes: Flamme[]) => {
      this.flammes = flammes;
    });
    this.sensorService.getGasU().subscribe((gases: Gas[]) => {
      this.gases = gases;
    });
    this.sensorService.getLevelU().subscribe((levels: Level[]) => {
      this.levels = levels;
    });
    this.sensorService.getWeightU().subscribe((weights: Weight[]) => {
      this.weights = weights;
    });
  }

  AddSensor() {
    this.router.navigateByUrl('addeq/sensor');
  }

  toAddFlamme() {
    this.router.navigateByUrl('addeq/addFlamme');
  }

  toAddLevel() {
    this.router.navigateByUrl('addeq/addLevel');
  }

  toAddGas() {
    this.router.navigateByUrl('addeq/addGas');
  }

  toAddWeight() {
    this.router.navigateByUrl('addeq/addWeight');
  }

  DeleteFlamme(id: string) {
    this.sensorService.deleteFlamme(id).subscribe((res: any) => {
      this.ngOnInit();
      console.log(res);
    });
  }

  DeleteWeight(id: string) {
    this.sensorService.deleteWeight(id).subscribe((res: any) => {
      this.ngOnInit();
      console.log(res);
    });
  }

  DeleteGas(id: string) {
    this.sensorService.deleteGas(id).subscribe((res: any) => {
      this.ngOnInit();
      console.log(res);
    });
  }

  DeleteLevel(id: string) {
    this.sensorService.deleteLevel(id).subscribe((res: any) => {
      this.ngOnInit();
      console.log(res);
    });
  }
}
