import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Trash} from '../../../../models/trash.model';
import {TrashService} from '../../../../services/trash.service';
import {SensorsService} from '../../../../services/sensors.service';
import {Flamme} from '../../../../models/flamme.model';
import {Gas} from "../../../../models/gas.model";
import {Weight} from "../../../../models/weight.model";
import {Level} from "../../../../models/level.model";

@Component({
  selector: 'app-list-trash',
  templateUrl: './list-trash.component.html',
  styleUrls: ['./list-trash.component.scss']
})

export class ListTrashComponent implements OnInit {

  trashs: Trash[];
  flammes: Flamme[];
  levels: Level[];
  weights: Weight[];
  gases: Gas[];
  flammeId: string;
  gasId: string;
  levelId: string;
  weightId: string;

  // tslint:disable-next-line:max-line-length
  constructor (private trashService: TrashService,
               private sensorService: SensorsService,
               private route: ActivatedRoute,
               private router: Router)
  { }

  ngOnInit() {
    this.trashService.getTrashs().subscribe((trashs: Trash[]) => {
      this.trashs = trashs;
    });
    this.trashService.getFlammes().subscribe((flammes: Flamme[]) => {
      this.flammes = flammes;
    });
    this.trashService.getLevels().subscribe((levels: Level[]) => {
      this.levels = levels;
    });
    this.trashService.getWeights().subscribe((weights: Weight[]) => {
      this.weights = weights;
    });
    this.trashService.getGas().subscribe((gases: Gas[]) => {
      this.gases = gases;
    });
  }

  AddTrash() {
    this.router.navigateByUrl('addeq/trash');
  }

  DeleteTrash(id: string) {
    this.trashService.deleteTrash(id).subscribe((res: any) => {
      this.ngOnInit();
      console.log(res);
    });
  }

  updateFlammeA(Trashflamme: string) {
    this.trashService.updateFlammeA(this.flammeId, Trashflamme).subscribe(() => {
      this.router.navigate(['/', this.flammeId]);
    });
  }

  updateGasA(TrashGas: string) {
    this.trashService.updateGasA(this.gasId, TrashGas).subscribe(() => {
      this.router.navigate(['/', this.gasId]);
    });
  }

  updateLevelA(Trashlevel: string) {
    this.trashService.updateLevelA(this.levelId, Trashlevel).subscribe(() => {
      this.router.navigate(['/', this.levelId]);
    });
  }

  updateWeightA(Trashweight: string) {
    this.trashService.updateWeightA(this.weightId, Trashweight).subscribe(() => {
      this.router.navigate(['/', this.weightId]);
    });
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
