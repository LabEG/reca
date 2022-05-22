import {TesDIComponent} from "../__fixtures__/components/TestDIComponent.js";
import {TestDIWithPropsComponent} from "../__fixtures__/components/TestDIWithPropsComponent.js";
import {render} from "@testing-library/react";

describe("Dependency injection must work", () => {
    test("di must resolve dependencies", () => {
        const comp1 = render(<TesDIComponent />);
        const comp2 = render(<TesDIComponent />);
        expect(comp1.container.innerHTML).toEqual(comp2.container.innerHTML);

        comp1.rerender(<TesDIComponent />);
        expect(comp1.container.innerHTML).toEqual(comp2.container.innerHTML);

        comp1.unmount();
        comp2.unmount();
    });

    test("di must resolve props", () => {
        const comp1 = render(<TestDIWithPropsComponent test={5} />);
        const comp2 = render(<TestDIWithPropsComponent test={5} />);
        expect(comp1.container.innerHTML).toEqual(comp2.container.innerHTML);

        comp1.rerender(<TestDIWithPropsComponent test={5} />);
        expect(comp1.container.innerHTML).toEqual(comp2.container.innerHTML);

        comp1.unmount();
        comp2.unmount();
    });
});
