import { Injectable } from "../../node_modules/@angular/core";
import { Todo } from '../models/Todo';
import { HttpClient, HttpHeaders } from "../../node_modules/@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class TodosService {

  private apiUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addTodo(listId: string, value: string) {
    this.http.post(this.apiUrl + '/todos', {
      listId,
      todo: {
        value,
        isDone: false
      }
    }, httpOptions).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  updateTodo(listId: string, todo: Todo) {
    console.log('Yes');
    this.http.put(this.apiUrl + '/todos/' + todo.id, {
      todo
    }).subscribe(
      res => console.log(res),
      err => console.log(err) 
    )
  }

  deleteTodo(todoId: string) {
    this.http.delete(this.apiUrl + '/todos/' + todoId)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }



}