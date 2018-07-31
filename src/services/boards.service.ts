import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class BoardsService {

  private apiUrl: string = 'https://guarded-reaches-36717.herokuapp.com';
  boards: any = {};

  constructor(private http: HttpClient) {}

  getBoards() {
    return this.http.get(this.apiUrl + '/boards', httpOptions);
  }

}