import { Component, OnInit, Input } from '@angular/core';
import { List } from '../../../models/List';
import { Todo } from '../../../models/Todo';
import { TodosService } from '../../../services/todos.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  // list data
  @Input() list: List;

  constructor(
    private todosService: TodosService
  ) { }

  ngOnInit() {
    // Subscribe to remove todo event and remove todo
    this.todosService.removeTodoFromTodos.subscribe(todoId => this.onRemoveTodo(todoId));
  }

  // Add new todo to database and corresponding list
  newTodo(e) {
    // Post new todo to database
    this.todosService.addTodo(this.list.id, e.target.value)
    // Fetch todo and add to list array
    .subscribe(res => this.list.todos.push(new Todo(
      res.todo._id,
      res.todo.value,
      res.todo.isDone
    )))
    // Set text input to empty
    e.target.value = '';
  }

  onRemoveTodo(todoId) {
    // Loop through all todos and check for corresponding ID
    this.list.todos.forEach((todo, i) => {
      if(todo.id === todoId)
        // Remove todo from list todos array
        this.list.todos.splice(i, 1);
    });
  }

  textAreaAdjust(o) {
    o = o.target;
    o.style.height = "1px";
    o.style.height = (o.scrollHeight-3)+"px"
  }

}
