import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from '../../services/client.service';
import {Report} from '../../models/report.model';
import {Client} from '../../models/client.model';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-addreport',
  templateUrl: './addreport.component.html',
  styleUrls: ['./addreport.component.scss']
})

export class AddreportComponent implements OnInit {

  users: User[];
  clients: Client[];

  constructor (private clientService: ClientService,
               private router: Router)
  { }

  ngOnInit() {
    this.clientService.getCurrentU().subscribe((users: User[]) => {
      this.users = users;
    });
    this.clientService.getCurrentC().subscribe((clients: Client[]) => {
      this.clients = clients;
    });
  }

  sendreport(emailR: string, subR: string, repR: string) {
    this.clientService.createReport( emailR, subR, repR).subscribe((report: Report) => {
      console.log(Report);
      this.router.navigateByUrl('/listreport');
    });
  }

  profile() {
    this.router.navigateByUrl('/profile');
  }

  listreports() {
    this.router.navigateByUrl('/listreport');
  }

  editprofile() {
    this.router.navigateByUrl('/editprofile');
  }

  logout() {
    this.router.navigateByUrl('auth/signin');
  }

}
