import {Store} from "../../stores/Store";

export class DIStore extends Store {

    public todos: string[] = [];

    public addTodo (todo: string): void {
        this.todos.push(todo);
    }

}
