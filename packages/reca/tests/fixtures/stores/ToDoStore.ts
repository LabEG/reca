import {Store} from "../../index.js";
import type {FormEvent} from "react";

export class ToDoStore extends Store {

    public currentTodo: string = "";

    public todos: string[] = [];

    public handleAddTodo (): void {
        this.todos.push(this.currentTodo);
        this.redraw();
    }

    public handleDeleteTodo (index: number): void {
        this.todos.splice(index, 1);
        this.redraw();
    }

    public handleCurrentEdit (event: FormEvent<HTMLInputElement>): void {
        this.currentTodo = event.currentTarget.value;
        this.redraw();
    }

}
