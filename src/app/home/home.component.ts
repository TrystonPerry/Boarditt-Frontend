import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { Board } from '../../models/Board';
import { List } from '../../models/List';
import { Todo } from '../../models/Todo';
import { UserAuthService } from '../../services/user-auth.service';
import { ListsService } from '../../services/lists.service';
import { TodosService } from '../../services/todos.service';
import { CookieService } from 'ngx-cookie-service';
import { BackgroundService } from '../../services/background.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  boards: Board[] = [];
  isLoaded: boolean = false;
  isBackgroundVisible: boolean = false;
  isHeaderBackgroundVisible: boolean = false;

  constructor(
    private boardsService: BoardsService,
    private listsService: ListsService,
    private todosService: TodosService,
    private userAuthService: UserAuthService,
    private cookieService: CookieService,
    private backgroundService: BackgroundService
  ) {}

  ngOnInit() {
    this.backgroundService.onChangeBackgroundVisibility
    .subscribe(isBackgroundVisible => this.isBackgroundVisible = isBackgroundVisible);
    this.backgroundService.onChangeHeaderBackgroundVisibile
    .subscribe(isHeaderBackgroundVisible => this.isHeaderBackgroundVisible = isHeaderBackgroundVisible);
    // this.userAuthService.onDeleteToken.subscribe(() => {
    //   this.cookieService.delete('token');
    //   location.reload();
    //   this.boards = [];
    //   this.isLoaded = false;
    //   this.isLoggedIn = false;
    //   this.isCheckedLogin = true;
    //   this.userAuthService.updateToken.subscribe((token) => {
    //     this.isLoggedIn = true;
    //     this.cookieService.set('token', token);
    //     this.getBoards();
    //     this.boardsService.addBoardToBoards.subscribe(boardTitle => this.onAddBoard(boardTitle));
    //     this.boardsService.removeBoardFromBoards.subscribe(boardId => this.onRemoveBoard(boardId));;
    //   })
    // })
    this.getBoards();
    this.boardsService.addBoardToBoards.subscribe(boardTitle => this.onAddBoard(boardTitle));
    this.boardsService.removeBoardFromBoards.subscribe(boardId => this.onRemoveBoard(boardId));;
  }

  // Get all boards from BoardsService
  getBoards() {
    this.boardsService.getBoards().subscribe(
      (data: any) => {
        if(data.boards){
          data.boards.forEach(board => {
            // Create new board of type Board
            this.boards.push(new Board(
              board._id,
              // Populate all lists and then add them to board
              (this.getLists(board)),
              board.title
            ))
          });
        }
       },
      err => console.log(err)
    )
    this.isLoaded = true;
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
        list.title,
        list.color
      ))
    })
    return lists;
  }

  onAddBoard(board: any) {
    this.boards.push(new Board(
      board._id,
      [],
      board.title
    ))
  }

  onRemoveBoard(boardId: string) {
    this.boards.forEach((board, i) => {
      if(board.id === boardId){
        this.boards.splice(i, 1);
      }
    })
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