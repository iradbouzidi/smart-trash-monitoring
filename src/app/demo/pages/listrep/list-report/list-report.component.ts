import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Report} from '../../../../models/report.model';
import {User} from '../../../../models/user.model';
import {Client} from '../../../../models/client.model';
import {ClientService} from '../../../../services/client.service';
import {EmployeeService} from '../../../../services/employee.service';
import {ReportW} from '../../../../models/reportW';
import {Employee} from '../../../../models/employee.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-sensor',
  templateUrl: './list-report.component.html',
  styleUrls: ['./list-report.component.scss']
})

export class ListReportComponent implements OnInit {

  reports: Report[];
  reportsW: ReportW[];
  workers: Employee[];
  users: User[];
  clients: Client[];
  repId: string;
  fileName = '';
  msg: string;

  constructor (private router: Router,
               private clientService: ClientService,
               private employeeService: EmployeeService)
  { }

  ngOnInit() {
    this.employeeService.getReportW().subscribe((reportsW: ReportW[]) => {
      this.reportsW = reportsW;
    });
    this.clientService.getReportC().subscribe((reports: Report[]) => {
      this.reports = reports;
    });
    this.clientService.getCurrentU().subscribe((users: User[]) => {
      this.users = users;
    });
    this.clientService.getCurrentC().subscribe((clients: Client[]) => {
      this.clients = clients;
    });
    this.employeeService.getCurrentE().subscribe((workers: Employee[]) => {
      this.workers = workers;
    });
  }

  ViewRep(emailR: string, repR: string, subR: string) {
    this.clientService.SendMail(emailR).subscribe((res: any) => {
      console.log(res);
      this.ngOnInit();
    });
    this.msg = 'subject: \n' + subR + '\nContent :\n' + repR ;
    alert(this.msg);
    this.ngOnInit();
  }

  updateRep(id: string) {
    this.clientService.updateRep(this.repId, id).subscribe(() => {
      this.router.navigate(['/', this.repId]);
    });
  }

  deleteRep(id: string) {
    this.clientService.deleteRep(id).subscribe((res: any) => {
      this.ngOnInit();
      console.log(res);
    });
  }

  updateRepW(id: string) {
    this.employeeService.updateRepW(this.repId, id).subscribe(() => {
      this.router.navigate(['/', this.repId]);
    });
  }

  deleteRepW(id: string) {
    this.employeeService.deleteRepW(id).subscribe((res: any) => {
      this.ngOnInit();
      console.log(res);
    });
  }

  ViewRepW(emailRW: string, repRW: string, subRW: string) {
    this.clientService.SendMail(emailRW).subscribe((res: any) => {
      console.log(res);
      setTimeout(() => {
        this.ngOnInit();
      }, 3000);
    });
    this.msg = 'subject: \n' + subRW + '\nContent :\n' + repRW ;
    alert(this.msg);
    this.ngOnInit();
  }

  RepCexportexcel(): void {
    /* table id is passed over here */
    const element = document.getElementById('client-report');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    this.fileName = new Date().toLocaleString();

    /* save to file */
    XLSX.writeFile(wb, 'List-Report_Client_of_' + this.fileName + '.xlsx');
  }

  RepEexportexcel(): void {

    /* table id is passed over here */
    const element = document.getElementById('emp-report');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    this.fileName = new Date().toLocaleString();

    /* save to file */
    XLSX.writeFile(wb, 'List-Report_Employee_of_' + this.fileName + '.xlsx');
  }
}
