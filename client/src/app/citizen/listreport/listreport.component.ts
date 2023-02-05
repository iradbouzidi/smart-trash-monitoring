import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Flamme} from '../../models/flamme.model';
import {ClientService} from '../../services/client.service';
import {Report} from '../../models/report.model';
import {User} from "../../models/user.model";
import {Client} from "../../models/client.model";

@Component({
  selector: 'app-listreport',
  templateUrl: './listreport.component.html',
  styleUrls: ['./listreport.component.scss']
})

export class ListreportComponent implements OnInit {
  reports: Report[];
  users: User[];
  clients: Client[];

  constructor (private router: Router,
               private clientService: ClientService)
  { }

  ngOnInit() {
    this.clientService.getReportC().subscribe((reports: Report[]) => {
      this.reports = reports;
    });
    this.clientService.getCurrentU().subscribe((users: User[]) => {
      this.users = users;
    });
    this.clientService.getCurrentC().subscribe((clients: Client[]) => {
      this.clients = clients;
    });
  }

  profile() {
    this.router.navigateByUrl('/profile');
  }

  editprofile() {
    this.router.navigateByUrl('/editprofile');
  }

  addreport() {
    this.router.navigateByUrl('/addreport');
  }
  logout() {
    this.router.navigateByUrl('auth/signin');
  }
}
