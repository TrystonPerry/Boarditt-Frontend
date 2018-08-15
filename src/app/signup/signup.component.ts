import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserAuthService } from '../../services/user-auth.service';
import { BoardsService } from '../../services/boards.service';
import { Board } from '../../models/Board';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  token: string = '';
  step: number = 1;
  maxSteps: number = 5;

  board: Board;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private boardsService: BoardsService
  ) { }

  ngOnInit() {
    this.userAuthService.updateToken.subscribe(token => this.setToken(token));
    this.boardsService.addBoardToBoards.subscribe(board => this.setBoard(board));
  }

  signup(email: string, password: string, password2: string) {
    if(password === password2){
      this.userService.login(email, password); // TODO change back to signup method
    } else {
      alert('Passwords dont match!');
    }
  }

  setToken(token: string) {
    this.token = token;
    this.moveElementOut();
  }

  createBoard() {
    this.boardsService.addBoard();  
  }

  setBoard(board: any) {
    this.board = new Board(
      board._id,
      [],
      board.title
    )
    console.log(board);
  }

  moveElementOut() {
    let stepObj = document.getElementById(`step${this.step}`);
    let x: number = stepObj.clientLeft;
    let opacity: number = 1.0;
    let timer = setInterval(() => {
      if(x === stepObj.clientLeft - 100) {
        this.step++;
        if(this.step < this.maxSteps) {
          this.moveElementIn();
        }
        return clearInterval(timer);
      }
      x -= 5;
      opacity -= .05;
      stepObj.style.transform = `translateX(${x}px)`;
      stepObj.style.opacity = `${opacity}`;
    }, 16);
  } 

  moveElementIn() {
    let stepObj = document.getElementById(`step${this.step}`);
    let x: number = stepObj.clientLeft + 100;
    let opacity: number = 0.0;
    let timer = setInterval(() => {
      if(x === stepObj.clientLeft){
        return clearInterval(timer);
      }
      x -= 5;
      opacity += .05;
      stepObj.style.transform = `translate(${x}px)`;
      stepObj.style.opacity = `${opacity}`;
    }, 16);
  }
}
