import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Todos } from "./todo.model";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  constructor(private router: Router) {}
  private todos: Todos[] = [];
  todosChange = new Subject<Todos[]>();

  getTodos() {
    return this.todos.slice();
  }

  getTodo(id: number) {
    return this.todos.find((todo) => todo.id === id);
  }

  addTodo(todo: Todos) {
    this.todos.push(todo);
    this.todosChange.next(this.todos.slice());
  }

  deleteTodo(id: number) {
    this.todos.splice(id, 1);
    this.todosChange.next(this.todos.slice());
  }

  updateTodo(id: number) {
    this.router.navigate(["/todo/edit", id]);
  }
}
