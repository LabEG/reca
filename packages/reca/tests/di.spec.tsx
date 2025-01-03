import {TesDIComponent} from "./fixtures/components/TestDIComponent.js";
import {TestDIWithPropsComponent} from "./fixtures/components/TestDIWithPropsComponent.js";
import {render} from "@testing-library/react";
import {expect} from "chai";
import {describe, it} from "node:test";

describe("Dependency injection must work", () => {
    it("di must resolve dependencies", () => {
        const comp1 = render(<TesDIComponent />);
        const comp2 = render(<TesDIComponent />);
        expect(comp1.container.innerHTML).to.equal(comp2.container.innerHTML);

        comp1.rerender(<TesDIComponent />);
        expect(comp1.container.innerHTML).to.equal(comp2.container.innerHTML);

        comp1.unmount();
        comp2.unmount();
    });

    it("di must resolve props", () => {
        const comp1 = render(<TestDIWithPropsComponent test={5} />);
        const comp2 = render(<TestDIWithPropsComponent test={5} />);
        expect(comp1.container.innerHTML).to.equal(comp2.container.innerHTML);

        comp1.rerender(<TestDIWithPropsComponent test={5} />);
        expect(comp1.container.innerHTML).to.equal(comp2.container.innerHTML);

        comp1.unmount();
        comp2.unmount();
    });
});
