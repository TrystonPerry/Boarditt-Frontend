import { Injectable, EventEmitter } from "../../node_modules/@angular/core";
import { Todo } from '../models/Todo';
import { HttpClient, HttpHeaders } from "../../node_modules/@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class TodosService {

  private apiUrl: string = 'https://guarded-reaches-36717.herokuapp.com';

  // Event that triggers when deleting todo, list component parent is subscribed
  removeTodoFromTodos: EventEmitter<String> = new EventEmitter();

  constructor(private http: HttpClient) {}

  // Add todo to database
  addTodo(listId: string, value: string) : any {
    return this.http.post(this.apiUrl + '/todos', {
      listId,
      todo: {
        value,
        isDone: false
      }
    }, httpOptions)
  }

  // Update todo in database
  updateTodo(listId: string, todo: Todo) {
    this.http.put(this.apiUrl + '/todos/' + todo.id, {
      todo
    }).subscribe(
      res => {},
      err => console.log(err)
    );
  }

  // Delete todo from database
  deleteTodo(todoId: string) {
    this.http.delete(this.apiUrl + '/todos/' + todoId)
    .subscribe(
      res => this.removeTodoFromTodos.emit(todoId),
      err => console.log(err)
    )
  }



}