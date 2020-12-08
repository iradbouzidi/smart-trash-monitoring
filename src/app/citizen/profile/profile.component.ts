import { Component, Input, OnInit,  ElementRef,  ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/client.model';
import {User} from '../../models/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  clients: Client[];
  users: User[];
  // @ts-ignore
  @ViewChild('fileInput') fileInput: ElementRef;
  loading = false;
  valid = false;
  message = '';
  imageC: File;

  constructor (private router: Router,
               private clientService: ClientService)
  { }

  ngOnInit() {
    this.clientService.getCurrentU().subscribe((users: User[]) => {
      this.users = users;
    });
    this.clientService.getCurrentC().subscribe((clients: Client[]) => {
      this.clients = clients;
    });
  }

  editprofile() {
    this.router.navigateByUrl('/editprofile');
  }

  addreport() {
    this.router.navigateByUrl('/addreport');
  }

  listreports() {
    this.router.navigateByUrl('/listreport');
  }

  pplnear() {
    this.router.navigateByUrl('/pplnear');
  }

  logout() {
    this.router.navigateByUrl('auth/signin');
  }

}
