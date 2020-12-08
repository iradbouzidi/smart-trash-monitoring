import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Client} from 'src/app/models/client.model';
import {ClientService} from '../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(private clientService: ClientService, private router: Router) {
  }

  ngOnInit() {
  }

  // tslint:disable-next-line:max-line-length variable-name


  /*  createEmployeeLogin(emailE: string, passwordE: string) {
      this.employeeService.createEmployeeLogin(emailE, passwordE).subscribe((employee: Employee) => {
        console.log(Employee);
      });
    }*/

  // tslint:disable-next-line:max-line-length
  createClient(firstNameC: string, lastNameC: string, cinC: string, birthDateC: string, emailC: string, cityC: string, addressC: string, userNameC: string ) {
    // tslint:disable-next-line:max-line-length
    this.clientService.createClient(firstNameC, lastNameC, cinC, birthDateC, emailC, cityC, addressC, userNameC).subscribe((client: Client) => {
      console.log(Client);
      this.router.navigate(['/dashboard/analytics']);

    });
  }
}
