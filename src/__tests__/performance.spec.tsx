
import {render} from "@testing-library/react";
import {PerformanceComponent} from "../__fixtures__/components/PerformanceComponent";

describe("Store component must work fast", () => {
    test("count store performance", () => {
        const comp = render(<PerformanceComponent />);

        expect(Number(comp.container.querySelector(".store > .result-time")?.textContent)).toBeLessThan(7);

        expect(Number(comp.container.querySelector(".auto-store > .result-time")?.textContent)).toBeLessThan(14);
    });
});
