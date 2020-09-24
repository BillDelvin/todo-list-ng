import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { TodoService } from "../todo-service.service";
import { Todos } from "../todo.model";

@Component({
  selector: "app-todo-input",
  templateUrl: "./todo-input.component.html",
  styleUrls: ["./todo-input.component.css"],
})
export class TodoInputComponent implements OnInit, OnDestroy {
  todoForm: FormGroup;
  idLength: number = 0;
  paramsSubs: Subscription;
  id: number = 0;
  editMode: boolean = false;
  todo: Todos;
  todos: Todos[];

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.initialForm();
  }

  ngOnInit() {
    this.todos = this.todoService.getTodos();

    if (this.id != 0) {
      this.editMode = true;
      this.todo = this.todoService.getTodo(this.id);
      if (!this.todo) {
        this.router.navigate(["/"]);
      } else {
        this.todoForm = new FormGroup({
          day: new FormControl(this.todo.day, Validators.required),
          activities: new FormControl(
            this.todo.activities,
            Validators.required
          ),
        });
      }
    }
  }

  onSubmit() {
    if (this.editMode) {
    } else {
      const todo: Todos = {
        id: this.todos.length + 1,
        day: this.todoForm.value.day,
        activities: this.todoForm.value.activities,
      };
      this.todoService.addTodo(todo);
    }
    this.initialForm();
  }

  private initialForm() {
    this.todoForm = new FormGroup({
      day: new FormControl("", Validators.required),
      activities: new FormControl("", Validators.required),
    });
  }

  ngOnDestroy() {
    // this.paramsSubs.unsubscribe();
  }
}
