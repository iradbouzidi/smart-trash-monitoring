import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Emplog} from '../../models/emplog.model';
import {Employee} from '../../models/employee.model';
import {EmployeeService} from '../../services/employee.service';
import {ReportW} from '../../models/reportW';

@Component({
  selector: 'app-addreportw',
  templateUrl: './addreportw.component.html',
  styleUrls: ['./addreportw.component.scss']
})

export class AddreportwComponent implements OnInit {

  emp: Emplog[];
  workers: Employee[];

  constructor (private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.employeeService.getCurrentW().subscribe((emp: Emplog[]) => {
      this.emp = emp;
    });
    this.employeeService.getCurrentE().subscribe((workers: Employee[]) => {
      this.workers = workers;
    });
  }

  sendreport(emailRW: string, subRW: string, repRW: string) {
    this.employeeService.createReportW( emailRW, subRW, repRW).subscribe((reportW: ReportW) => {
      console.log(ReportW);
      this.router.navigateByUrl('/listreportw');
    });
  }

  listreportsw() {
    this.router.navigateByUrl('/listreportw');
  }

  editprofilew() {
    this.router.navigateByUrl('/editprofilew');
  }

  profilew() {
    this.router.navigateByUrl('/profilew');
  }
  logout() {
    this.router.navigateByUrl('auth/signin');
  }
}
