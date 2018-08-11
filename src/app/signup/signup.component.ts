import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  signup(email: string, password: string, password2: string) {
    if(password === password2){
      this.userService.signup(email, password);
    } else {
      alert('Passwords dont match!');
    }
  }
}
