import {AutoStore} from "../../index.js";
import type {FormEvent} from "react";

export class ToDoStore extends AutoStore {

    public currentTodo: string = "";

    public todos: string[] = [];

    public handleAddTodo (): void {
        this.todos.push(this.currentTodo);
    }

    public handleDeleteTodo (index: number): void {
        this.todos.splice(index, 1);
    }

    public handleCurrentEdit (event: FormEvent<HTMLInputElement>): void {
        this.currentTodo = event.currentTarget.value;
    }

}
