import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class UserService {
  
  private apiUrl: string = 'https://guarded-reaches-36717.herokuapp.com/user';

  updateToken: EventEmitter<string> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) {}

  login(email: string, password: string) {
    this.http.post(this.apiUrl + '/login', {
      email,
      password
    }, httpOptions).subscribe((data : any) => {
      this.updateToken.emit(data.token);
    })
  }

  signup(email: string, password) {
    this.http.post(this.apiUrl + '/signup', {
      email,
      password
    }, httpOptions).subscribe((data: any) => {
      this.updateToken.emit(data.token);
    })
  }
}