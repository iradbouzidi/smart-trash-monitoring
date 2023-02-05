import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Trash} from '../../../../models/trash.model';
import {TrashService} from '../../../../services/trash.service';
import {Flamme} from '../../../../models/flamme.model';
import {SensorsService} from '../../../../services/sensors.service';
import {Gas} from '../../../../models/gas.model';
import {Weight} from '../../../../models/weight.model';
import {Level} from '../../../../models/level.model';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  flammes: Flamme[];
  gases: Gas[];
  weights: Weight[];
  levels: Level[];
  flammeId: string;
  gasId: string;
  levelId: string;
  weightId: string;
  hide = true;

  constructor (private sensorService: SensorsService,
               private trashService: TrashService,
               private router: Router)
  { }

  ngOnInit() {
    this.sensorService.getFlammeAV().subscribe((flammes: Flamme[]) => {
      this.flammes = flammes;
    });
    this.sensorService.getGasAV().subscribe((gases: Gas[]) => {
      this.gases = gases;
    });
    this.sensorService.getLevelAV().subscribe((levels: Level[]) => {
      this.levels = levels;
    });
    this.sensorService.getWeightAV().subscribe((weights: Weight[]) => {
      this.weights = weights;
    });
  }

  createTrash (cityT: string, municipalityT: string, areaT: string, flammeT: string,
               gasT: string, levelT: string, weightT: string) {
    if (flammeT.length === 0) {
      alert('Flamme sensor is missing');
    }
    else if ( gasT.length === 0) {
      alert('Gas sensor is missing');
    }
    else if ( levelT.length === 0) {
      alert('Level sensor is missing');
    }
    else if ( weightT.length === 0) {
      alert('Weight sensor is missing');
    }
    else {
      this.trashService.createTrash (
        cityT,
        municipalityT,
        areaT,
        flammeT,
        gasT,
        levelT,
        weightT).subscribe((trash: Trash) => {
        console.log(trash);
        // Now we navigate to /lists/task._id
        // this.router.navigate(['/lists', trash._id]);
        this.router.navigateByUrl('listeq/trash');
        this.updateFlamme(flammeT);
        this.updateLevel(levelT);
        this.updateWeight(weightT);
        this.updateGas(gasT);
      });
    }
  }


  updateFlamme(Trashflamme: string) {
    this.trashService.updateFlamme(this.flammeId, Trashflamme).subscribe(() => {
      this.router.navigate(['/', this.flammeId]);
    });
  }

  updateGas(TrashGas: string) {
    this.trashService.updateGas(this.gasId, TrashGas).subscribe(() => {
      this.router.navigate(['/', this.gasId]);
    });
  }

  updateLevel(Trashlevel: string) {
    this.trashService.updateLevel(this.levelId, Trashlevel).subscribe(() => {
      this.router.navigate(['/', this.levelId]);
    });
  }

  updateWeight(Trashweight: string) {
    this.trashService.updateWeight(this.weightId, Trashweight).subscribe(() => {
      this.router.navigate(['/', this.weightId]);
    });
  }

}
