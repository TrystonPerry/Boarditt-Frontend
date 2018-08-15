import { Injectable, EventEmitter } from "../../node_modules/@angular/core";
import { Todo } from '../models/Todo';
import { HttpClient, HttpHeaders } from "../../node_modules/@angular/common/http";
import { UserAuthService } from "./user-auth.service";

let httpOptions = {
  headers: null
}

@Injectable()
export class TodosService {

  private apiUrl: string = 'https://guarded-reaches-36717.herokuapp.com/api';

  // Event that triggers when deleting todo, list component parent is subscribed
  removeTodoFromTodos: EventEmitter<String> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {
    this.userAuthService.updateToken.subscribe(token => this.onTokenUpdate(token));
    if(this.userAuthService.token !== '') {
      this.onTokenUpdate(this.userAuthService.token);
    }
  }

  // Add todo to database
  addTodo(listId: string, value: string) : any {
    return this.http.post(this.apiUrl + '/todos', {
      listId,
      todo: {
        value,
        isDone: false
      }
    }, httpOptions);
  }

  // Update todo in database
  updateTodo(todo: Todo) {
    this.http.put(this.apiUrl + '/todos/' + todo.id, {
      todo
    }, httpOptions).subscribe(
      res => {},
      err => console.log(err)
    );
  }

  // Delete todo from database
  deleteTodo(todoId: string) {
    this.http.delete(this.apiUrl + '/todos/' + todoId, httpOptions)
    .subscribe(
      res => this.removeTodoFromTodos.emit(todoId),
      err => console.log(err)
    )
  }

  onTokenUpdate(token: string) {
    httpOptions.headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': token
    })
  }

}