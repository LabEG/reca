
import {render} from "@testing-library/react";
import {PerformanceComponent} from "../__fixtures__/components/PerformanceComponent";
import {expect} from "chai";

describe("Store component must work fast", () => {
    it("count store performance", () => {
        const comp = render(<PerformanceComponent />);

        // Think about relative performance timer

        expect(Number(comp.container.querySelector(".store > .result-time")?.textContent)).to.be.lessThan(80); // 8

        expect(Number(comp.container.querySelector(".auto-store > .result-time")?.textContent)).to.be.lessThan(160); // 16
    });
});
