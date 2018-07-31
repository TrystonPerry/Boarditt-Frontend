export class Todo {
  public id: string;
  public value: string;
  public isDone: boolean;
  public constructor(id: string, value: string, isDone: boolean) {
    this.id = id;
    this.value = value;
    this.isDone = isDone;
  }
}