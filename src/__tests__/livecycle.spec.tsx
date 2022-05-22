import {TestUseStoreComponent} from "../__fixtures__/components/TestUseStoreComponent.js";
import {TestWithStoreComponent} from "../__fixtures__/components/TestWithStoreComponent.js";
import {render} from "@testing-library/react";

describe("Livecycles must work", () => {
    test("useStore livecycle", () => {
        const comp = render(<TestUseStoreComponent />);
        expect(comp.container.innerHTML).toEqual("<div>constructor</div>");

        comp.rerender(<TestUseStoreComponent />);
        expect(comp.container.innerHTML).toEqual("<div>update</div>");

        comp.unmount();
    });

    test("withStore livecycle", () => {
        const comp = render(<TestWithStoreComponent />);
        expect(comp.container.innerHTML).toEqual("<div>constructor</div>");

        comp.rerender(<TestWithStoreComponent />);
        expect(comp.container.innerHTML).toEqual("<div>update</div>");

        comp.unmount();
    });
});

