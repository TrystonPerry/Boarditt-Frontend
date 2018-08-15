import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { UserAuthService } from '../../services/user-auth.service';
import { BackgroundService } from '../../services/background.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isMenuVisible: boolean = false;

  constructor(
    private boardsService: BoardsService,
    private userAuthService: UserAuthService,
    private backgroundService: BackgroundService
  ) { }

  ngOnInit() {
    this.backgroundService.onChangeHeaderBackgroundVisibile
    .subscribe(isVisible => this.isMenuVisible = isVisible);
  }

  newBoard() {
    this.boardsService.addBoard();
  }

  newBoardMenu() {
    this.toggleIsMenuVisible();
    this.boardsService.addBoard();
  }

  logout() {
    this.userAuthService.deleteToken();
  }

  logoutMenu() {
    this.userAuthService.deleteToken();
    this.toggleIsMenuVisible();
  }

  toggleIsMenuVisible() {
    this.isMenuVisible = !this.isMenuVisible;
    if(!this.backgroundService.isHeaderBackgroundVisible){
      this.backgroundService.setHeaderBackgroundVisibile(true);
    } else {
      this.backgroundService.setHeaderBackgroundVisibile(false);
      // this.isMenuVisible = false;
    }
  }

}
