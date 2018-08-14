import { Component, OnInit } from '@angular/core';
import { BackgroundService } from '../../services/background.service';

@Component({
  selector: 'app-header-no-account',
  templateUrl: './header-no-account.component.html',
  styleUrls: ['./header-no-account.component.css']
})
export class HeaderNoAccountComponent implements OnInit {

  isMenuVisible: boolean = false;

  constructor(private backgroundService: BackgroundService) { }

  ngOnInit() {
  }

  toggleIsMenuVisible() {
    this.isMenuVisible = !this.isMenuVisible;
    if(!this.backgroundService.isHeaderBackgroundVisible){
      this.backgroundService.setHeaderBackgroundVisibile(true);
    } else {
      this.backgroundService.setHeaderBackgroundVisibile(false);
    }
  }

}
