import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Client} from '../../../../models/client.model';
import {ClientService} from '../../../../services/client.service';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {

  regions: any = [];
  verified = false;
  isDisplayed = true;
  isNotDisplayed = false;
  valide1 = false;
  hideemail = true;
  hidepass = true;
  valide2 = false;
  hidecin = true;
  valide3 = false;
  hidedb = true;
  valide4 = false;
  a = new Date();

  constructor (private authService: AuthService,
               private clientService: ClientService,
               private router: Router,
               private httpClient: HttpClient)
  { }

  ngOnInit() {
    this.httpClient.get('assets/json/tn.json').subscribe(data => {
      console.log(data);
      this.regions = data;
    });
  }

  Verif(email, password) {
    this.VerifMail(email);
    this.VerifPass(password);
    if (this.valide1 && this.valide2) {
      this.verified = true;
      this.show();
    }
  }

  Verif2(firstNameC, lastNameC, cinC, birthDateC, emailC, cityC, addressC, userNameC) {
    this.VerifCin(cinC);
    this.VerifDB(birthDateC);
    if (this.valide3 && this.valide4) {
      this.createClient(firstNameC, lastNameC, cinC, birthDateC, emailC, cityC, addressC, userNameC);
    }
  }

  VerifMail(Email) {
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

  VerifPass(password) {
    this.valide2 = false;
    // tslint:disable-next-line:max-line-length
    if ( password.match(/[0-9]/g)
      && password.match(/[A-Z]/g)
      && password.match(/[a-z]/g)
      && password.length > 7) {
      this.valide2 = true;
      this.hidepass = true;
    }
    if (this.valide2 === false) {
      this.hidepass = false;
      return this.valide2;
    }
  }

  onSignupButtonClicked(email: string, password: string) {
    this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
    });
  }

  show() {
    if (this.isDisplayed) {
      this.isDisplayed = false;
      this.isNotDisplayed = true;
    }
  }

  VerifCin(Cin) {
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

  // tslint:disable-next-line:max-line-length
  createClient (firstNameC: string,
                lastNameC: string,
                cinC: string,
                birthDateC: string,
                emailC: string,
                cityC: string,
                addressC: string,
                userNameC: string) {
    // tslint:disable-next-line:max-line-length
    this.clientService.createClient (
      firstNameC,
      lastNameC,
      cinC,
      birthDateC,
      emailC,
      cityC,
      addressC,
      userNameC).subscribe((client: Client) => {
      console.log(client);
      this.router.navigate(['/profile']);
    });
  }

}
