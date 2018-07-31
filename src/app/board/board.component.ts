import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../../models/Board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  // board data
  @Input() board: Board;

  constructor() { }

  ngOnInit() {
  }

}
