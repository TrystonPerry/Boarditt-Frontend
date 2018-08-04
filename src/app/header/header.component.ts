import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private boardsService: BoardsService) { }

  ngOnInit() {
  }

  newBoard() {
    this.boardsService.addBoard();
  }

}
