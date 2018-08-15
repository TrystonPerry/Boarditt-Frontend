import { EventEmitter, Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "../../node_modules/ngx-cookie-service";
import { BoardsService } from "./boards.service";
import { HomeComponent } from "../app/home/home.component";

@Injectable()
export class UserAuthService {

  private token: string = '';
  private isLoggedIn: boolean = false;

  private apiUrl: string = 'https://guarded-reaches-36717.herokuapp.com/user'
  
  public onUpdateToken: EventEmitter<string> = new EventEmitter();
  public onDeleteToken: EventEmitter<any> = new EventEmitter();

  public onVerifiedLogin: EventEmitter<boolean> = new EventEmitter();
  public onSetLoggedIn: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private cookiesService: CookieService
  ) {
    this.userService.onSignUp.subscribe(token => this.setToken(token));
    this.userService.onLogIn.subscribe(token => this.setToken(token));
    this.setToken(this.cookiesService.get('token'));
  }

  setToken(token: string) {
    this.token = token;
    this.onUpdateToken.emit(token);
    this.cookiesService.set('token', token);
    this.isLoggedIn = true;
  }

  getToken() {
    return this.token;
  }

  isTokenVerified(token: string) : boolean {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    }
    let answer: boolean = false;
    this.http.post(this.apiUrl + '/verify-token', {}, httpOptions)
    .subscribe((data : any) => {
      if(!data.err) {
        answer = true;
        this.token = token;
      } else {
        this.deleteToken();
      }
    });
    return answer;
  }

  deleteToken() {
    this.onDeleteToken.emit();
    this.cookiesService.delete('token');
    this.isLoggedIn = false;
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn = true;
    this.onVerifiedLogin.emit(isLoggedIn);
    this.onSetLoggedIn.emit(isLoggedIn);
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }
}