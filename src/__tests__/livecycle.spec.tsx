/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable react/jsx-no-bind */

import {TestStoreComponent} from "../__fixtures__/components/TestStoreComponent.js";
import {render} from "@testing-library/react";
import {TestAutoStoreComponent} from "../__fixtures__/components/TestAutoStoreComponent.js";

describe("Livecycles must work", () => {
    test("Store livecycle", () => {
        let state = "";
        const onLivecycleChange = (newState: string): void => {
            state = newState;
        };

        /**
         * Activate and afterUpdate don't call redraw,
         * so state have more livecycle methods than show in view
         */

        // Create component
        const comp = render(<TestStoreComponent onLivecycleChange={onLivecycleChange} />);
        expect(comp.container.innerHTML).toEqual("<div>init constructor</div>");
        expect(state).toEqual("init constructor activate");

        // Update component
        comp.rerender(<TestStoreComponent onLivecycleChange={onLivecycleChange} />);
        expect(comp.container.innerHTML).toEqual("<div>init constructor activate update</div>");
        expect(state).toEqual("init constructor activate update afterUpdate");

        // Delete component
        comp.unmount();
        expect(comp.container.innerHTML).toEqual("");
        expect(state).toEqual("init constructor activate update afterUpdate dispose");
    });

    test("AutoStore livecycle", () => {
        let state = "";
        const onLivecycleChange = (newState: string): void => {
            state = newState;
        };

        /**
         * Activate and afterUpdate don't call redraw,
         * so state have more livecycle methods than show in view
         */

        // Create component
        const comp = render(<TestAutoStoreComponent onLivecycleChange={onLivecycleChange} />);
        expect(comp.container.innerHTML).toEqual("<div>init constructor</div>");
        expect(state).toEqual("init constructor activate");

        // Update component
        comp.rerender(<TestAutoStoreComponent onLivecycleChange={onLivecycleChange} />);
        expect(comp.container.innerHTML).toEqual("<div>init constructor activate update</div>");
        expect(state).toEqual("init constructor activate update afterUpdate");

        // Delete component
        comp.unmount();
        expect(comp.container.innerHTML).toEqual("");
        expect(state).toEqual("init constructor activate update afterUpdate dispose");
    });
});

