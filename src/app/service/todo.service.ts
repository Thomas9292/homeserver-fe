import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../model/Todo';



@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[];
  todosUpdated = new Subject<Todo[]>();
  getTodosSubscription: Subscription;
  addTodoSubscription: Subscription;

  todoEndpointRoot: string = environment.server_domain + '/api/v1/todo';

  constructor(private http: HttpClient) { }

  refreshTodos(): void {
    this.getTodosSubscription = this.http.get<Todo[]>(this.todoEndpointRoot).subscribe((todos) => {
      this.todos = todos;
      this.todosUpdated.next(todos);
    });
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.todoEndpointRoot + "/" + todo.id, todo);
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter(t => todo.id != t.id);
    this.todosUpdated.next(this.todos);
    this.http.delete(this.todoEndpointRoot + "/" + todo.id, { observe: "response"}).subscribe(resp => {
      this.refreshTodos();
    });
  }

  addTodo(todo: Todo): Observable<Todo> {
    const eventRequest = this.http.post<Todo>(this.todoEndpointRoot, todo).pipe(share());
    this.getTodosSubscription = eventRequest.subscribe(todo => {
      this.todos.push(todo);
      this.todosUpdated.next(this.todos);
    });
    return eventRequest;
  }
}
