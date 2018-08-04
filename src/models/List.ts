import { Todo } from "./Todo";

export class List {
  public id: string;
  public todos: Todo[];
  public title: string;
  public color: string = 'white';
  public constructor(id: string, todos: Todo[], title: string, color: string) {
    this.id = id;
    this.todos = todos;
    this.title = title;
    this.color = color;
  }
}