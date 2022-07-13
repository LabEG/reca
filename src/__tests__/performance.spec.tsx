
import {render} from "@testing-library/react";
import {PerformanceComponent} from "../__fixtures__/components/PerformanceComponent";

describe("Store component must work fast", () => {
    test("count store performance", () => {
        const comp = render(<PerformanceComponent />);

        // Think about relative performance timer

        expect(Number(comp.container.querySelector(".store > .result-time")?.textContent)).toBeLessThan(80); // 8

        expect(Number(comp.container.querySelector(".auto-store > .result-time")?.textContent)).toBeLessThan(160); // 16
    });
});
