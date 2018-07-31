import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../services/boards.service';
import { Board } from '../models/Board';
import { List } from '../models/List';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  boards: Board[] = [];

  constructor(private boardsService: BoardsService) {}

  ngOnInit() {
    this.getBoards();
  }

  // Get all boards from BoardsService
  getBoards() {
    this.boardsService.getBoards().subscribe(
      (boards: any[]) => {
        boards.forEach(board => {
          // Create new board of type Board
          this.boards.push(new Board(
            board._id,
            // Populate all lists and then add them to board
            (this.getLists(board)),
            board.title
          ))
        });
       },
      err => console.log(err)
    )
  }

  // Get all lists for corresponding board
  getLists(board){
    let lists: List[] = [];
    board.lists.forEach(list => {
      // Create new list of type List
      lists.push(new List(
        list._id,
        // Populate all todos with data and add them to list
        (this.getTodos(list)),
        list.title
      ))
    })
    return lists;
  }

  // Get all todos for corresponding list
  getTodos(list) {
    let todos: Todo[] = [];
    list.todos.forEach(todo => {
      // Create new todo of type Todo
      todos.push(new Todo(
        todo._id,
        todo.value,
        todo.isDone
      ))
    })
    return todos;
  }
  

}