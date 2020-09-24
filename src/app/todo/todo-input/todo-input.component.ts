import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TodoService } from "../todo-service.service";

@Component({
  selector: "app-todo-input",
  templateUrl: "./todo-input.component.html",
  styleUrls: ["./todo-input.component.css"],
})
export class TodoInputComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  todoForm: FormGroup;

  ngOnInit(): void {
    this.initialForm();
  }

  onSubmit() {
    this.todoService.addTodo(this.todoForm.value);
  }

  private initialForm() {
    this.todoForm = new FormGroup({
      day: new FormControl("", Validators.required),
      activities: new FormControl("", Validators.required),
    });
  }
}
