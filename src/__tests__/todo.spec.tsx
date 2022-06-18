/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */

import {render, fireEvent} from "@testing-library/react";
import {ToDoComponent} from "../__fixtures__/components/ToDoComponent";

describe("ToDo smaple must work", () => {
    test("sample must add end delete todo items", () => {
        const comp = render(<ToDoComponent />);

        // Todos list empty
        expect(comp.container.querySelector(".todos-list")?.outerHTML).toEqual("<div class=\"todos-list\"></div>");

        // Inputs created
        expect(comp.container.querySelector(".todos-input")?.innerHTML).toEqual("<input value=\"\"><button type=\"button\">add</button>");

        // Input todo
        fireEvent.input(
            comp.container.querySelector(".todos-input > input") as HTMLInputElement,
            {target: {value: "First ToDo"}}
        );

        fireEvent.click(comp.container.querySelector(".todos-input > button") as HTMLButtonElement);

        // Check first todo
        expect(comp.container.querySelector(".todo")?.textContent).toEqual("First ToDoX");

        // Remove todo
        fireEvent.click(comp.container.querySelector(".todo-delete") as HTMLButtonElement);

        // Check list empty
        expect(comp.container.querySelector(".todos-list")?.outerHTML).toEqual("<div class=\"todos-list\"></div>");
    });
});
