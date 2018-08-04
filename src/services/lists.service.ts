import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { List } from '../models/List';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class ListsService {

  private apiUrl: string = 'https://guarded-reaches-36717.herokuapp.com';

  removeListFromLists: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) {}

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
    }).subscribe(
      res => {},
      err => console.log(err)
    );
  }

  deleteList(listId: string) {
    this.http.delete(this.apiUrl + '/lists/' + listId).subscribe(
      res => this.removeListFromLists.emit(listId), 
      err => console.log(err)
    );
  }
}