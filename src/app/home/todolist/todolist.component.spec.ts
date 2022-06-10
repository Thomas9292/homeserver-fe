import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { Todo } from 'src/app/model/Todo';
import { TodoService } from 'src/app/service/todo.service';

import { TodolistComponent } from './todolist.component';

describe('TodolistComponent', () => {
  let component: TodolistComponent;
  let fixture: ComponentFixture<TodolistComponent>;
  const todosUpdatedSubject = new Subject<Todo[]>();

  const todoServiceSpy = jasmine.createSpyObj('TodoService', ['refreshTodos'], { 'todosUpdated': todosUpdatedSubject });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistComponent ],
      providers: [
        { provide: TodoService, useValue: todoServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
