

import {mount} from "enzyme";
import {TesDIComponent} from "../__fixtures__/components/TestDIComponent.js";
import {TestDIWithPropsComponent} from "../__fixtures__/components/TestDIWithPropsComponent.js";

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

    test("di must resolve props", () => {
        const testComponent1 = mount(<TestDIWithPropsComponent test={5} />);
        const testComponent2 = mount(<TestDIWithPropsComponent test={5} />);
        expect(testComponent1.html()).toEqual(testComponent2.html());

        testComponent1.setProps({});
        expect(testComponent1.html()).toEqual(testComponent2.html());

        testComponent1.unmount();
        testComponent2.unmount();
    });
});
