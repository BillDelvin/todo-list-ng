import { Injectable } from "@angular/core";
import { Todos } from "./todo.model";

@Injectable({
  providedIn: "root",
})
export class TodoServiceService {
  constructor() {}
  Todos: Todos[] = [];

  addTodo() {}
}
