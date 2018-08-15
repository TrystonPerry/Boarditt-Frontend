import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Board } from '../models/Board';
import { UserAuthService } from './user-auth.service';

let httpOptions = {
  headers: null
}

@Injectable()
export class BoardsService {

  private apiUrl: string = 'https://guarded-reaches-36717.herokuapp.com/api';
  boards: Board[] = [];

  addBoardToBoards: EventEmitter<Board> = new EventEmitter();
  removeBoardFromBoards: EventEmitter<string> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {
    this.userAuthService.onUpdateToken.subscribe(token => this.onTokenUpdate(token));
    if(this.userAuthService.getToken() !== ''){
      this.onTokenUpdate(this.userAuthService.getToken());
    }
  }

  getBoards() {
    return this.http.get(this.apiUrl + '/boards', httpOptions);
  }

  addBoard() : any {
    this.http.post(this.apiUrl + '/boards', {
      board: {
        title: 'Untitled Board'
      }
    }, httpOptions).subscribe(
      (res: any) => this.addBoardToBoards.emit(res.board),
      err => console.log(err)
    )
  }

  updateBoard(board: Board) {
    this.http.put(this.apiUrl + '/boards/' + board.id, {
      board: {
        title: board.title
      }
    }, httpOptions).subscribe(
      res => {},
      err => console.log(err)
    )
  }

  deleteBoard(boardId: string) {
    this.http.delete(this.apiUrl + '/boards/' + boardId, httpOptions)
    .subscribe(
      res => this.removeBoardFromBoards.emit(boardId),
      err => console.log(err)
    )
    this.boards.forEach((board, i) => {
      if(board.id === boardId){
        this.boards.splice(i, 1);
      }
    });
  }

  onTokenUpdate(token: string) {
    httpOptions.headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': token
    })
  }

}