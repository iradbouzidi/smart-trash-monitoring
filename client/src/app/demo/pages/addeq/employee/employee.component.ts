import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Employee} from 'src/app/models/employee.model';
import {EmployeeService} from '../../../../services/employee.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {

  constructor (private employeeService: EmployeeService,
               private router: Router,
               private httpClient: HttpClient)
  { }

  valide1 = false;
  hideemail = true;
  hidepass = true;
  valide2 = false;
  hidecin = true;
  valide3 = false;
  hidedb = true;
  valide4 = false;
  regions: any = [];
  a = new Date('2000-01-01');

  ngOnInit() {
    this.httpClient.get('assets/json/tn.json').subscribe(data => {
      console.log(data);
      this.regions = data;
    });
  }

  Verif (firstNameE, lastNameE, userNameE, passwordE, cinE, birthDateE,
         emailE, cityE, addressE, postE,municipalityE, workingAreaE) {
    this.VerifMail(emailE);
    this.VerifPass(passwordE);
    this.VerifCin(cinE);
    this.VerifDB(birthDateE);
    if (this.valide1 && this.valide2 && this.valide3 && this.valide4) {
      this.createEmployee(firstNameE, lastNameE, userNameE, passwordE, cinE, birthDateE, emailE, cityE, addressE, postE, municipalityE, workingAreaE);
      this.createEmployeeLogin(emailE, passwordE);
    }
  }

  VerifMail (Email) {
    this.valide1 = false;
    for (let j = 1; j < (Email.length); j++) {
      if (Email.charAt(j) === '@') {
        if (j < (Email.length - 4)) {
          for (let k = j; k < (Email.length - 2); k++) {
            if (Email.charAt(k) === '.') {
              this.valide1 = true;
              this.hideemail = true;
            }
          }
        }
      }
    }
    if (this.valide1 === false) {
      this.hideemail = false;
      return this.valide1;
    }
  }

  VerifPass (password) {
    this.valide2 = false;
    // tslint:disable-next-line:max-line-length
    if (password.match(/[0-9]/g) && password.match(/[A-Z]/g) && password.match(/[a-z]/g) && password.length > 7) {
      this.valide2 = true;
      this.hidepass = true;
    }
    if (this.valide2 === false) {
      this.hidepass = false;
      return this.valide2;
    }
  }

  VerifCin (Cin) {
    this.valide3 = false;
    // tslint:disable-next-line:max-line-length
    if (Cin.length === 8) {
      this.valide3 = true;
      this.hidecin = true;
    }
    if (this.valide3 === false) {
      this.hidecin = false;
      return this.valide3;
    }
  }

  VerifDB (DB) {
    this.valide4 = false;
    // tslint:disable-next-line:max-line-length
    if (new Date(DB) < this.a) {
      this.valide4 = true;
      this.hidedb = true;
    }
    if (this.valide4 === false) {
      this.hidedb = false;
      return this.valide4;
    }
  }

  // tslint:disable-next-line:max-line-length variable-name
  createEmployee (firstNameE: string, lastNameE: string, userNameE: string,
                  passwordE: string, cinE: string, birthDateE: string, emailE: string,
                  cityE: string, addressE: string, postE: string, municipalityE:string ,workingAreaE: string) {
    // tslint:disable-next-line:max-line-length
    this.employeeService.createEmployee(
      firstNameE,
      lastNameE,
      userNameE,
      passwordE,
      cinE,
      birthDateE,
      emailE,
      cityE,
      addressE,
      postE,
      municipalityE,
      workingAreaE).subscribe((employee: Employee) => {
      console.log(employee);
      this.router.navigateByUrl('/users/list');
    });
  }

  createEmployeeLogin(emailE: string, passwordE: string) {
    this.employeeService.createEmployeeLogin(emailE, passwordE).subscribe((employee: Employee) => {
      console.log(employee);
    });
  }

}
