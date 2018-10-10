import { Component, OnInit, Injectable } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { CookieService } from '../../../node_modules/ngx-cookie-service';

@Component({
  selector: 'app-check-login',
  templateUrl: './check-login.component.html',
  styleUrls: ['./check-login.component.css']
})
export class CheckLoginComponent implements OnInit {

  isLoggedIn: boolean = false;
  isCheckedLogin: boolean = false;

  constructor(
    private userAuthService: UserAuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.verifyLogin();
    this.userAuthService.onSetLoggedIn
    .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  verifyLogin() {
    // Check if token is not empty (logged in)
    if(this.cookieService.get('token') !== '') {
      // Verify the token is correct
      if(this.userAuthService.isTokenVerified(this.cookieService.get('token'))) {
        this.isCheckedLogin = true;
        this.userAuthService.onUpdateToken.subscribe(() => {
          this.setLoggedIn();
        })
      } else {
        this.isCheckedLogin = true;
        this.setLoggedIn();
      }
    // No token found in cookies (not logged in)
    } else {
      this.isCheckedLogin = true;
      this.isLoggedIn = false;
    }
  }

  setLoggedIn() {
    this.isLoggedIn = true;
    setTimeout(() => {
      this.userAuthService.setIsLoggedIn(true);
    }, 1)
  }

}

