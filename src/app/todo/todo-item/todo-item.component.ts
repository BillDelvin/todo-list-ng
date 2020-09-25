import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { TodoService } from "../todo-service.service";
import { Todos } from "../todo.model";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"],
})
export class TodoItemComponent implements OnInit, OnDestroy {
  constructor(private todoService: TodoService) {}

  todos: Todos[];
  todosSubs: Subscription;

  ngOnInit(): void {
    this.todosSubs = this.todoService.todosChange.subscribe(
      (todos: Todos[]) => {
        this.todos = todos;
      }
    );
    this.todos = this.todoService.getTodos();
  }

  onDelete(id: number) {
    this.todoService.deleteTodo(id);
  }

  onSelectUpdate(id: number) {
    this.todoService.SelectUpdateTodo(id);
  }

  ngOnDestroy() {
    this.todosSubs.unsubscribe();
  }
}
