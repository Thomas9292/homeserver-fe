
export class Todo {
  constructor(public id: string | null,
              public title: string,
              public description: string,
              public dateCreated: Date | null,
              public done: boolean) {}
}