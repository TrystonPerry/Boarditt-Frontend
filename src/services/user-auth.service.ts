import { EventEmitter, Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class UserAuthService {

  token: string = '';

  private apiUrl: string = 'https://guarded-reaches-36717.herokuapp.com/user'

  public updateToken: EventEmitter<string> = new EventEmitter();
  public onDeleteToken: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.userService.updateToken.subscribe(token => this.setToken(token));
  }

  setToken(token: string) {
    this.token = token;
    this.updateToken.emit(token);
  }

  getToken() {
    return this.token;
  }

  isTokenVerified(token: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    }
    return this.http.post(this.apiUrl + '/verify-token', {}, httpOptions);
  }

  deleteToken() {
    this.onDeleteToken.emit();
  }
}