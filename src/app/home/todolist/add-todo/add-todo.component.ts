import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from 'src/app/model/Todo';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  loading: boolean = false;
  descriptionShown: boolean = false;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  addTodo(f: NgForm) {
    this.loading = true;
    const description = f.value.description ? f.value.description : "Test"
    const newTodo = new Todo(null, f.value.title, description, null, false);
    this.todoService.addTodo(newTodo).subscribe(_ => {
      this.loading = false;
    });
    f.reset();
    this.descriptionShown = false;
  }

  showDescription() {
    this.descriptionShown = true;
  }
}
