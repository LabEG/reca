/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable react/jsx-key */

import {useStore} from "../../../src/index.js";
import {ToDoAutoStore} from "../stores/ToDoAutoStore.js";

export const ToDoComponent = (): JSX.Element => {
    const store = useStore(ToDoAutoStore);

    return (
        <div className="todos">
            <div className="todos-list">
                {
                    store.todos.map((todo, index) => (
                        <div
                            className="todo"
                            key={index}
                        >
                            {todo}

                            <button
                                className="todo-delete"
                                onClick={(): void => store.handleDeleteTodo(index)}
                                type="button"
                            >
                                X
                            </button>
                        </div>
                    ))
                }
            </div>

            <div className="todos-input">
                <input
                    onInput={store.handleCurrentEdit}
                    value={store.currentTodo}
                />

                <button
                    onClick={store.handleAddTodo}
                    type="button"
                >
                    add
                </button>
            </div>
        </div>
    );
};
