import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Todo } from 'src/app/model/Todo';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  loading = false;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  toggleDone(): void {
    this.todo.done = !this.todo.done;
    this.loading = true;
    this.todoService.updateTodo(this.todo).subscribe((newTodo) => {
      this.todo = newTodo;
      this.loading = false;
    });
  }

  deleteTodo(): void {
    this.todoService.deleteTodo(this.todo);
  }
}
