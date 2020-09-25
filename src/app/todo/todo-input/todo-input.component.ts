import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
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
  idLength: number = 1;
  paramsSubs: Subscription;
  paramId: number;
  id: number = 0;
  editMode = false;
  todo: Todos;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initialForm();
  }

  ngOnInit() {
    this.paramId = +this.route.snapshot.params["id"];

    if (this.paramId) {
      this.paramsSubs = this.route.params.subscribe((params: Params) => {
        if (params) {
          this.id = +params["id"];
          this.editMode = params["id"] != null;
          this.initialForm();
        }
      });
    }
  }

  onSubmit() {
    if (this.editMode !== false) {
      console.log("masuk ke edit mode");
      this.todoService.updateTodo(this.id, this.todoForm.value);
      this.editMode = false;
    } else {
      const todo: Todos = {
        id: this.idLength++,
        day: this.todoForm.value.day,
        activities: this.todoForm.value.activities,
      };
      this.todoService.addTodo(todo);
    }
    this.initialForm();
  }

  private initialForm() {
    let day = "";
    let activities = "";

    if (this.editMode) {
      this.todo = this.todoService.getTodo(this.id);
      if (!this.todo) {
        this.router.navigate(["/"]);
      } else {
        day = this.todo.day;
        activities = this.todo.activities;
        this.todoForm = new FormGroup({
          day: new FormControl(day, Validators.required),
          activities: new FormControl(activities, Validators.required),
        });
      }
    }

    this.todoForm = new FormGroup({
      day: new FormControl(day, Validators.required),
      activities: new FormControl(activities, Validators.required),
    });
  }

  ngOnDestroy() {
    if (this.paramsSubs) {
      this.paramsSubs.unsubscribe();
    }
  }
}
