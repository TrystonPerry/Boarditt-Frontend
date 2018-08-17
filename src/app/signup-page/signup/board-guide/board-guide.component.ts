import { Component, OnInit, Input } from '@angular/core';
import { List } from '../../../../models/List';
import { ListsService } from '../../../../services/lists.service';
import { BoardsService } from '../../../../services/boards.service';
import { Board } from '../../../../models/Board';

@Component({
  selector: 'app-board-guide',
  templateUrl: './board-guide.component.html',
  styleUrls: ['./board-guide.component.css']
})
export class BoardGuideComponent implements OnInit {

  // board data
  @Input() board: Board;

  step: number = 1;

  isEditMode: boolean = false;
  isCollapsed: boolean = false;
  isHeaderFocus: boolean = false;
  isDeleteAlertVisible: boolean = false;

  constructor(
    private boardsService: BoardsService,
    private listsService: ListsService
  ) { }

  ngOnInit() {
  }

  updateBoardTitle(e) {
    this.toggleIsEditMode();
    this.board.title = e.target.value;
    this.boardsService.updateBoard(this.board);
    if(this.step === 3) { this.step = 4}
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

  toggleIsEditMode() {
    this.isEditMode = !this.isEditMode;
    if(this.step === 2) { this.step = 3}
  }

  toggleIsHeaderFocus() {
    this.isHeaderFocus = !this.isHeaderFocus;
    if(this.step === 1) { this.step = 2}
  }

}
