import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Emplog} from '../../models/emplog.model';
import {Employee} from '../../models/employee.model';
import {EmployeeService} from '../../services/employee.service';

@Component({
  selector: 'app-profilew',
  templateUrl: './profilew.component.html',
  styleUrls: ['./profilew.component.scss']
})

export class ProfilewComponent implements OnInit {

  emp: Emplog[];
  workers: Employee[];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.employeeService.getCurrentW().subscribe((emp: Emplog[]) => {
      this.emp = emp;
    });
    this.employeeService.getCurrentE().subscribe((workers: Employee[]) => {
      this.workers = workers;
    });
  }

  editprofilew() {
    this.router.navigateByUrl('/editprofilew');
  }

  addreportw() {
    this.router.navigateByUrl('/addreportw');
  }

  listreportsw() {
    this.router.navigateByUrl('/listreportw');
  }

  inchargew() {
    this.router.navigateByUrl('/inchargew');
  }

  logout() {
    this.router.navigateByUrl('auth/signin');
  }
}
