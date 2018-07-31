import { Todo } from "./Todo";

export class List {
  public id: string;
  public todos: Todo[];
  public title: string;
  public constructor(id: string, todos: Todo[], title: string) {
    this.id = id;
    this.todos = todos;
    this.title = title;
  }
}