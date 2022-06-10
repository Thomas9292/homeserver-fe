import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share, Subject, Subscription } from 'rxjs';
import { SubscriptionLog } from 'rxjs/internal/testing/SubscriptionLog';
import { Todo } from '../model/Todo';

const TODO_ENDPOINT = 'http://localhost:8080/api/v1/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[];
  todosUpdated = new Subject<Todo[]>();
  getTodosSubscription: Subscription;
  addTodoSubscription: Subscription;

  constructor(private http: HttpClient) { }

  refreshTodos(): void {
    this.getTodosSubscription = this.http.get<Todo[]>(TODO_ENDPOINT).subscribe((todos) => {
      this.todos = todos;
      this.todosUpdated.next(todos);
    });
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(TODO_ENDPOINT + "/" + todo.id, todo);
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter(t => todo.id != t.id);
    this.todosUpdated.next(this.todos);
    this.http.delete(TODO_ENDPOINT + "/" + todo.id, { observe: "response"}).subscribe(resp => {
      this.refreshTodos();
    });
  }

  addTodo(todo: Todo): Observable<Todo> {
    const eventRequest = this.http.post<Todo>(TODO_ENDPOINT, todo).pipe(share());
    this.getTodosSubscription = eventRequest.subscribe(todo => {
      this.todos.push(todo);
      this.todosUpdated.next(this.todos);
    });
    return eventRequest;
  }
}
