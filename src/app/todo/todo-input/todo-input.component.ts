import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TodoService } from "../todo-service.service";
import { Todos } from "../todo.model";

@Component({
  selector: "app-todo-input",
  templateUrl: "./todo-input.component.html",
  styleUrls: ["./todo-input.component.css"],
})
export class TodoInputComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  todoForm: FormGroup;
  id: number = 0;

  ngOnInit(): void {
    this.initialForm();
  }

  onSubmit() {
    const todo: Todos = {
      id: this.id++,
      day: this.todoForm.value.day,
      activities: this.todoForm.value.activities,
    };
    this.todoService.addTodo(todo);
    this.initialForm();
  }

  private initialForm() {
    this.todoForm = new FormGroup({
      day: new FormControl("", Validators.required),
      activities: new FormControl("", Validators.required),
    });
  }
}
