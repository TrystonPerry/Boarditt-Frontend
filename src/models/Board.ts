import { List } from "./List";

export class Board {
  public id: string;
  public lists: List[];
  public title: string;
  public constructor(id: string, lists: List[], title: string) {
    this.id = id;
    this.lists = lists;
    this.title = title;
  }
}