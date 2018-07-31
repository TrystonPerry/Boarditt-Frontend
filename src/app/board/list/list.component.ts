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
  }

  // Add new todo to database and corresponding list
  newTodo(e) {
    // Post new todo to database
    this.todosService.addTodo(this.list.id, e.target.value);
    // TODO Fetch todo and add to list array
  }

}
