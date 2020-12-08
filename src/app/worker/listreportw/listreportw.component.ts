import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Emplog} from "../../models/emplog.model";
import {Employee} from "../../models/employee.model";
import {EmployeeService} from "../../services/employee.service";
import {ReportW} from "../../models/reportW";

@Component({
  selector: 'app-listreportw',
  templateUrl: './listreportw.component.html',
  styleUrls: ['./listreportw.component.scss']
})
export class ListreportwComponent implements OnInit {

  emp: Emplog[];
  workers: Employee[];
  reports: ReportW[];

  constructor(private employeeService: EmployeeService, private router: Router) { }

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
  logout() {
    this.router.navigateByUrl('auth/signin');
  }

}
