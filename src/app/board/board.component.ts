import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../../models/Board';
import { ListsService } from '../../services/lists.service';
import { List } from '../../models/List';
import { BoardsService } from '../../services/boards.service';
import { BackgroundService } from '../../services/background.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  // board data
  @Input() board: Board;

  isEditMode: boolean = false;
  isCollapsed: boolean = false;
  isHeaderFocus: boolean = false;
  isDeleteAlertVisible: boolean = false;

  constructor(
    private boardsService: BoardsService,
    private listsService: ListsService,
    private backgroundService: BackgroundService
  ) { }

  ngOnInit() {
    this.listsService.removeListFromLists.subscribe(listId => this.onRemoveList(listId));
  }

  updateBoardTitle(e) {
    this.toggleIsEditMode();
    this.board.title = e.target.value;
    this.boardsService.updateBoard(this.board);
  }

  removeBoard() {
    this.boardsService.deleteBoard(this.board.id);
    this.isDeleteAlertVisible = false;
    this.backgroundService.setBackgroundVisible(false);
  }

  newList(e) {
    // Create new todo in database
    this.listsService.addList(this.board.id)
    .subscribe(res => this.board.lists.push(new List(
      res.list._id,
      [],
      res.list.title,
      res.list.color
    )), err => console.log(err));
  }

  onRemoveList(listId: string) {
    this.board.lists.forEach((list, i) => {
      if(list.id === listId){
        this.board.lists.splice(i, 1);
      }
    })
  }

  toggleIsEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  toggleIsCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleIsHeaderFocus() {
    this.isHeaderFocus = !this.isHeaderFocus;
  }

  hideDeleteBoard() {
    this.isDeleteAlertVisible = false;
    this.backgroundService.setBackgroundVisible(false);
  }

  showDeleteBoard() {
    this.isDeleteAlertVisible = true;
    this.backgroundService.setBackgroundVisible(true);
  }

}
