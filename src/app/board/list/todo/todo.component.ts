import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../../../models/Todo';
import { TodosService } from '../../../../services/todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() todo: Todo;
  @Input() listId: string;

  isEditMode: boolean = false;
  // TODO make edit icon that moves up and down components as parent in list.component
  isEditIconVisible: boolean = false;

  constructor(private todosService: TodosService) { }

  ngOnInit() {
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    // this.todoInput.nativeElement.focus();
  }

  toggleTodoDone() {
    this.todo.isDone = !this.todo.isDone;
    this.updateTodo();
  }

  updateTodoValue(e) {
    e.preventDefault();
    this.toggleEditMode();
    this.todo.value = e.target.value;
    this.updateTodo();
  }

  updateTodo() {
    this.todosService.updateTodo(this.todo);
  }

  deleteTodo(e) {
    this.todosService.deleteTodo(this.todo.id);
  }


}
