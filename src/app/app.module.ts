import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BoardsService } from '../services/boards.service';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './board/board.component';
import { ListComponent } from './board/list/list.component';
import { TodoComponent } from './board/list/todo/todo.component';
import { TodosService } from '../services/todos.service';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { ListsService } from '../services/lists.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardComponent,
    ListComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TextareaAutosizeModule
  ],
  providers: [
    BoardsService,
    ListsService,
    TodosService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
