import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Emplog} from '../../models/emplog.model';
import {Employee} from '../../models/employee.model';
import {Report} from '../../models/report.model';
import {EmployeeService} from '../../services/employee.service';
import {ReportW} from '../../models/reportW';
import {Trash} from "../../models/trash.model";
import {Flamme} from "../../models/flamme.model";
import {Level} from "../../models/level.model";
import {Weight} from "../../models/weight.model";
import {Gas} from "../../models/gas.model";
import {TrashService} from "../../services/trash.service";
import {SensorsService} from "../../services/sensors.service";

@Component({
  selector: 'app-incharge',
  templateUrl: './incharge.component.html',
  styleUrls: ['./incharge.component.scss']
})
export class InchargeComponent implements OnInit {

  emp: Emplog[];
  workers: Employee[];
  reports: ReportW[];
  trashs: Trash[];
  flammes: Flamme[];
  levels: Level[];
  weights: Weight[];
  gases: Gas[];
  constructor(private employeeService: EmployeeService,
              private trashService: TrashService,
              private sensorService: SensorsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.employeeService.getCurrentW().subscribe((emp: Emplog[]) => {
      this.emp = emp;
    });
    this.employeeService.getCurrentE().subscribe((workers: Employee[]) => {
      this.workers = workers;
    });
    this.employeeService.getReportW().subscribe((reports: ReportW[]) => {
      this.reports = reports;
    });
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

  profile() {
    this.router.navigateByUrl('/profilew');
  }

  editprofile() {
    this.router.navigateByUrl('/editprofilew');
  }

  addreport() {
    this.router.navigateByUrl('/addreportw');
  }
  listreportsw() {
    this.router.navigateByUrl('/listreportw');
  }
  logout() {
    this.router.navigateByUrl('auth/signin');
  }
}
