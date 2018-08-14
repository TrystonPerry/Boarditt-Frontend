import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  token: string = '';
  step: number = 1;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService
  ) { }

  ngOnInit() {
    this.userAuthService.updateToken.subscribe(token => this.setToken(token));
  }

  signup(email: string, password: string, password2: string) {
    if(password === password2){
      this.userService.signup(email, password);
    } else {
      alert('Passwords dont match!');
    }
  }

  setToken(token: string) {
    this.token = token;
    console.log(token);
    this.step = 2;
    let step1 = document.getElementById('step1');
    let x: number = step1.clientLeft;
    let opacity: number = 100;
    setInterval(() => {
      if(opacity === 0) {
        step1.style.display = 'none';
        return;
      }
      x -= 5;
      opacity -= 5;
      step1.style.transform = `translateX(${x}px)`;
      step1.style.opacity = `0.${opacity}`;
    }, 16);
  }
}
