import { EventEmitter } from "@angular/core";

export class BackgroundService {
  
  isBackgroundVisible: boolean = false;
  isHeaderBackgroundVisible: boolean = false;

  onChangeBackgroundVisibility: EventEmitter<boolean> = new EventEmitter();
  onChangeHeaderBackgroundVisibile: EventEmitter<boolean> = new EventEmitter();

  setBackgroundVisible(isVisible: boolean) {
    this.isBackgroundVisible = isVisible;
    this.onChangeBackgroundVisibility.emit(isVisible);
  }

  setHeaderBackgroundVisibile(isVisible: boolean) {
    this.isHeaderBackgroundVisible = isVisible;
    this.onChangeHeaderBackgroundVisibile.emit(isVisible);
  }

}