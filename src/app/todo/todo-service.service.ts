import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Todos } from "./todo.model";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  constructor() {}
  private todos: Todos[] = [];
  todosChange = new Subject<Todos[]>();

  getTodos() {
    return this.todos.slice();
  }

  addTodo(todo: Todos) {
    this.todos.push(todo);
    this.todosChange.next(this.todos.slice());
  }
}
