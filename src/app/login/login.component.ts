import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.onLogIn.subscribe(() => {
      this.router.navigate(['/']);
    })
  }

  login(email: string, password: string, stayLoggedIn: boolean) {
    this.userService.login(email, password, stayLoggedIn);
  }

}
