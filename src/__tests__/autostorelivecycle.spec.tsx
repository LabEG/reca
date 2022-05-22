import {TestAutoUseStoreComponent} from "../__fixtures__/components/TestAutoUseStoreComponent.js";
import {TestWithStoreComponent} from "../__fixtures__/components/TestWithStoreComponent.js";
import {render} from "@testing-library/react";

describe("Autostore Livecycles must work", () => {
    test("useStore livecycle", () => {
        const comp = render(<TestAutoUseStoreComponent />);
        expect(comp.container.innerHTML).toEqual("<div>constructor</div>");

        comp.rerender(<TestAutoUseStoreComponent />);
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

