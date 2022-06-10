import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Todo } from 'src/app/model/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  loading = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDone(): void {
    this.todo.done = !this.todo.done;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
