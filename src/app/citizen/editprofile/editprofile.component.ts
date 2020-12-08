import { Component, Input, OnInit,  ElementRef,  ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import {Client} from '../../models/client.model';
import {ClientService} from '../../services/client.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})

export class EditprofileComponent implements OnInit {

  constructor ( private router: Router,
               private clientService: ClientService,
               private httpClient: HttpClient)
  { }

  clients: Client[];
  users: User[];
  Cltid: string;
  // @ts-ignore
  @ViewChild('fileInput') fileInput: ElementRef;
  loading = false;
  valid = false;
  imageC: File;
  regions: any = [];

  ngOnInit() {
    this.httpClient.get('assets/json/tn.json').subscribe(data => {
      console.log(data);
      this.regions = data;
    });
    this.clientService.getCurrentU().subscribe((users: User[]) => {
      this.users = users;
    });
    this.clientService.getCurrentC().subscribe((clients: Client[]) => {
      this.clients = clients;
    });
  }

  //#region Profile Pic Upload
  onFileChange(event) {
    this.imageC = event.target.files[0];
    this.valid = true;
  }

  changeImg(event, id: string) {
    const imageC = new FormData();
    imageC.append('imageC', this.imageC);
    this.clientService.sendImage(imageC, id).subscribe((res: any) => {
      console.log(res);
    });
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
/*    this.router.navigateByUrl('/profile');*/
  }

  clearFile() { // Method to clear the selected file
    this.valid = false;
    this.fileInput.nativeElement.value = '';
  }
  //#endregion

  // tslint:disable-next-line:max-line-length
  saveeditprofile(id: string, userNameC: string, firstNameC: string, lastNameC: string, emailC: string, cinC: string, cityC: string, addressC: string) {
    this.clientService.updateClient(id, userNameC, firstNameC, lastNameC, emailC, cinC, cityC, addressC).subscribe(() => {
      this.router.navigate(['/', this.Cltid]);
    });
    this.router.navigateByUrl('/profile');
  }

  profile() {
    this.router.navigateByUrl('/profile');
  }

  addreport() {
    this.router.navigateByUrl('/addreport');
  }

  listreports() {
    this.router.navigateByUrl('/listreport');
  }

  logout() {
    this.router.navigateByUrl('auth/signin');
  }

}
