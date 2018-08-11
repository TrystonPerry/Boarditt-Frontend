import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { List } from '../models/List';
import { UserAuthService } from './user-auth.service';

let httpOptions = {
  headers: null
}

@Injectable()
export class ListsService {

  private apiUrl: string = 'https://guarded-reaches-36717.herokuapp.com/api';

  removeListFromLists: EventEmitter<string> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {
    this.userAuthService.updateToken.subscribe(token => this.onTokenUpdate(token));
  }

  addList(boardId: string) : any {
    return this.http.post(this.apiUrl + '/lists', {
      boardId,
      list: {
        title: 'Untitled'
      }
    }, httpOptions);
  }

  // Update list in database
  updateList(list: List) {
    this.http.put(this.apiUrl + '/lists/' + list.id, {
      list: {
        color: list.color,
        title: list.title
      }
    }, httpOptions).subscribe(
      res => {},
      err => console.log(err)
    );
  }

  deleteList(listId: string) {
    this.http.delete(this.apiUrl + '/lists/' + listId, httpOptions).subscribe(
      res => this.removeListFromLists.emit(listId), 
      err => console.log(err)
    );
  }

  onTokenUpdate(token: string) {
    httpOptions.headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': token
    })
  }
}