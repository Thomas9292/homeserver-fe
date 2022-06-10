import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/model/Todo';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodolistComponent implements OnInit, OnDestroy {
  todoSubscription: Subscription;
  _todos: Todo[] = [];

  get todos() {
    this._todos.sort((a, b) => (a.dateCreated! < b.dateCreated! ? -1 : 1));
    return this._todos;
  } 

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoSubscription = this.todoService.todosUpdated.subscribe((todos) => {
      this._todos = todos;
    })
    this.todoService.refreshTodos();
  }

  ngOnDestroy(): void {
    this.todoSubscription.unsubscribe();
  }
}
