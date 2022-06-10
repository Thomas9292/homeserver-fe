import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from '../model/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUpdated = new Subject<Todo[]>();

  todos: Todo[] = [
    new Todo("ID1", "This is a todo", "This is the description", new Date(), true),
    new Todo("ID2", "This is a todo too", "This is the description", new Date(), false),
    new Todo("ID3", "Yet another todo", "This is the description", new Date(), true)
  ];

  constructor() { }

  getTodos() {
    return this.todos.slice();
  }
}
