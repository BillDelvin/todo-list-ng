import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TodoInputComponent } from "./todo/todo-input/todo-input.component";
import { TodoItemComponent } from "./todo/todo-item/todo-item.component";

const routes: Routes = [
  { path: "", redirectTo: "todo", pathMatch: "full" },
  { path: "todo", component: TodoInputComponent },
  { path: "list-todo", component: TodoItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
