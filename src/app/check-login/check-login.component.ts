import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { CookieService } from '../../../node_modules/ngx-cookie-service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-check-login',
  templateUrl: './check-login.component.html',
  styleUrls: ['./check-login.component.css']
})
export class CheckLoginComponent implements OnInit {

  isLoggedIn: boolean = false;
  isCheckedLogin: boolean = false;

  getBoards: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private userAuthService: UserAuthService,
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
    this.verifyLogin();
  }

  verifyLogin() {
    // Check if token is not empty (logged in)
    if(this.cookieService.get('token') !== '') {
      // Verify the token is correct
      this.userAuthService.isTokenVerified(this.cookieService.get('token')).subscribe((data : any) => {
        if(data.err){
          this.isCheckedLogin = true;
          this.userAuthService.updateToken.subscribe((token) => {
            this.isLoggedIn = true;
            // Emit event to get boards
            this.getBoards.emit(true);
          })
        } else {
          this.isLoggedIn = true;
          this.isCheckedLogin = true;
          this.getBoards.emit(true);
        }
      })
    // Token found in cookies (not logged in)
    } else {
      console.log('Test');
      this.isCheckedLogin = true;
      this.isLoggedIn = false;
      this.userAuthService.updateToken.subscribe((token) => {
        this.isLoggedIn = true;
        this.getBoards.emit(true);
      })
    }
  }

}
