

import {mount} from "enzyme";
import {TesDIComponent} from "../__fixtures__/components/TestDIComponent.js";

describe("Dependency injection must work", () => {
    test("di must resolve dependencies", () => {
        const testComponent1 = mount(<TesDIComponent />);
        const testComponent2 = mount(<TesDIComponent />);
        expect(testComponent1.html()).toEqual(testComponent2.html());

        testComponent1.setProps({});
        expect(testComponent1.html()).toEqual(testComponent2.html());

        testComponent1.unmount();
        testComponent2.unmount();
    });
});

