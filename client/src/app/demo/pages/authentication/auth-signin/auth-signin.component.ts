import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})

export class AuthSigninComponent implements OnInit {

  a = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLoginButtonClicked(email: string, password: string) {
    this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200) {
        // we have logged in successfully
        this.router.navigate(['profilew']);
        this.a = false;
      }
      console.log(this.a);
      return this.a;
    });

    if (this.a) {
      this.authService.loginC(email, password).subscribe((res: HttpResponse<any>) => {
        if (res.status === 200) {
          // we have logged in successfully
          this.router.navigate(['profile']);
          this.a = false;
        }
        console.log(res);
        return this.a;
      });
    }
    if (this.a) {
      this.authService.loginA(email, password).subscribe((res: HttpResponse<any>) => {
        if (res.status === 200) {
          // we have logged in successfully
          this.router.navigate(['dashboard/analytics']);
          this.a = false;
        }
        console.log(this.a);
        return this.a;
      });
    }
  }

}
