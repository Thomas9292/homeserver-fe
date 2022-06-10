import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put', 'delete']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});