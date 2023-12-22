/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */

import {render, fireEvent, waitFor, screen} from "@testing-library/react";
import {SpaceXComponent} from "../src/__fixtures__/components/SpaceXComponent";
import {ToDoComponent} from "../src/__fixtures__/components/ToDoComponent";
import {expect} from "chai";

describe("Readme samples must work", () => {
    it("todo sample must add end delete todo items", () => {
        const comp = render(<ToDoComponent />);

        // Todos list empty
        expect(comp.container.querySelector(".todos-list")?.outerHTML).to.equal("<div class=\"todos-list\"></div>");

        // Inputs created
        expect(comp.container.querySelector(".todos-input")?.innerHTML).to.equal("<input value=\"\"><button type=\"button\">add</button>");

        // Input todo
        fireEvent.input(
            comp.container.querySelector(".todos-input > input") as HTMLInputElement,
            {target: {value: "First ToDo"}}
        );

        fireEvent.click(comp.container.querySelector(".todos-input > button") as HTMLButtonElement);

        // Check first todo
        expect(comp.container.querySelector(".todo")?.textContent).to.equal("First ToDoX");

        // Remove todo
        fireEvent.click(comp.container.querySelector(".todo-delete") as HTMLButtonElement);

        // Check list empty
        expect(comp.container.querySelector(".todos-list")?.outerHTML).to.equal("<div class=\"todos-list\"></div>");
    });

    it("todo sample must resolve di and show info from service", async () => {
        const comp = render(<SpaceXComponent />);

        await waitFor(() => screen.findByText("Company: SpaceX"), {timeout: 5000});

        expect(comp.container.innerHTML).to.equal("<div><p>Company: SpaceX</p><p>Founder: Elon Musk</p></div>");
    });
});
