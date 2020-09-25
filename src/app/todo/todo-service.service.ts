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
    const getTodo = this.todos.find((todo) => todo.id === id);
    return getTodo;
  }

  addTodo(todo: Todos) {
    this.todos.push(todo);
    this.todosChange.next(this.todos.slice());
  }

  deleteTodo(id: number) {
    this.todos.splice(id, 1);
    this.todosChange.next(this.todos.slice());
  }

  SelectUpdateTodo(id: number) {
    this.router.navigate(["/todo/edit", id]);
  }

  updateTodo(id: number, todo: Todos) {
    let findTodo = this.todos.find((todo) => todo.id === id);
    findTodo = todo;
    this.todosChange.next(this.todos.slice());
  }
}
