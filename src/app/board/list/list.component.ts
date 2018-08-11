import { Component, OnInit, Input } from '@angular/core';
import { List } from '../../../models/List';
import { Todo } from '../../../models/Todo';
import { TodosService } from '../../../services/todos.service';
import { ListsService } from '../../../services/lists.service';
import { BackgroundService } from '../../../services/background.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  // list data
  @Input() list: List;

  isEditMode: boolean = false;
  isFocus: boolean = false;
  isDeleteAlertVisible: boolean = false;
  isHeaderFocus: boolean = false;
  isPaletteMenuVisible: boolean = false;


  constructor(
    private listsService: ListsService,
    private todosService: TodosService,
    private backgroundService: BackgroundService
  ) { }

  ngOnInit() {
    // Subscribe to remove todo event and remove todo
    this.todosService.removeTodoFromTodos.subscribe(todoId => this.onRemoveTodo(todoId));
  }

  updateListTitle(e) {
    this.toggleIsEditMode();
    this.list.title = e.target.value;
    this.updateList();
  }

  updateList() {
    this.listsService.updateList(this.list);
  }

  removeList() {
    this.listsService.deleteList(this.list.id);
    this.backgroundService.setBackgroundVisible(false);
  }

  // Add new todo to database and corresponding list
  newTodo(e) {
    e.preventDefault();
    if(e.target.value === '') {
      alert('Cant add empty todo!'); // TODO make better alert system
      return;
    }
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
    e.target.style.height = '23px';
  }

  onRemoveTodo(todoId) {
    // Loop through all todos and check for corresponding ID
    this.list.todos.forEach((todo, i) => {
      if(todo.id === todoId)
        // Remove todo from list todos array
        this.list.todos.splice(i, 1);
    });
  }

  toggleIsEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  toggleIsFocus() {
    this.isFocus = !this.isFocus;
    if(this.isPaletteMenuVisible)
      this.togglePaletteMenu();
  }

  toggleIsHeaderFocus() {
    this.isHeaderFocus = !this.isHeaderFocus;
  }

  togglePaletteMenu() {
    this.isPaletteMenuVisible = !this.isPaletteMenuVisible;
  }

  changeColor(color: string) {
    this.list.color = color;
    this.updateList();
    this.togglePaletteMenu();
    this.toggleIsFocus();
  }

  hideDeleteAlert() {
    this.isDeleteAlertVisible = false;
    this.backgroundService.setBackgroundVisible(false);
  }

  showDeleteAlert() {
    this.isDeleteAlertVisible = true;
    this.backgroundService.setBackgroundVisible(true);
  }

}
