import { Component, OnInit } from '@angular/core';

import {Employee} from '../../../../models/employee.model';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../../../../services/employee.service';
import {ClientService} from '../../../../services/client.service';
import {Client} from '../../../../models/client.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  clients: Client[];
  employees: Employee[];

  // tslint:disable-next-line:max-line-length
  constructor (private employeeService: EmployeeService,
               private route: ActivatedRoute,
               private router: Router,
               private clientService: ClientService)
  { }

  ngOnInit() {
    this.clientService.getClient().subscribe((clients: Client[]) => {
      this.clients = clients;
    });
    this.employeeService.getEmployee().subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
  }

  DeleteClient(id: string) {
    this.clientService.deleteClient(id).subscribe((res: any) => {
      this.ngOnInit();
      console.log(res);
    });
  }

  DeleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe((res: any) => {
      this.ngOnInit();
      console.log(res);
    });
  }
}
