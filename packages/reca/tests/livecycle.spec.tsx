/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable react/jsx-no-bind */

import {TestStoreComponent} from "../src/__fixtures__/components/TestStoreComponent.js";
import {render} from "@testing-library/react";
import {TestAutoStoreComponent} from "../src/__fixtures__/components/TestAutoStoreComponent.js";
import {expect} from "chai";

describe("Livecycles must work", () => {
    it("Store livecycle", () => {
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
        expect(comp.container.innerHTML).to.equal("<div>init constructor</div>");
        expect(state).to.equal("init constructor activate");

        // Update component
        comp.rerender(<TestStoreComponent onLivecycleChange={onLivecycleChange} />);
        expect(comp.container.innerHTML).to.equal("<div>init constructor activate update</div>");
        expect(state).to.equal("init constructor activate update afterUpdate");

        // Delete component
        comp.unmount();
        expect(comp.container.innerHTML).to.equal("");
        expect(state).to.equal("init constructor activate update afterUpdate dispose");
    });

    it("AutoStore livecycle", () => {
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
        expect(comp.container.innerHTML).to.equal("<div>init constructor</div>");
        expect(state).to.equal("init constructor activate");

        // Update component
        comp.rerender(<TestAutoStoreComponent onLivecycleChange={onLivecycleChange} />);
        expect(comp.container.innerHTML).to.equal("<div>init constructor activate update</div>");
        expect(state).to.equal("init constructor activate update afterUpdate");

        // Delete component
        comp.unmount();
        expect(comp.container.innerHTML).to.equal("");
        expect(state).to.equal("init constructor activate update afterUpdate dispose");
    });
});

