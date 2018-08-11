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
import { LoginComponent } from './login/login.component';
import { UserService } from '../services/user.service';
import { UserAuthService } from '../services/user-auth.service';
import { CookieService } from 'ngx-cookie-service';
import { SignupComponent } from './signup/signup.component';
import { BackgroundService } from '../services/background.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardComponent,
    ListComponent,
    TodoComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TextareaAutosizeModule
  ],
  providers: [
    CookieService,
    UserService,
    UserAuthService,
    BoardsService,
    ListsService,
    TodosService,
    BackgroundService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
