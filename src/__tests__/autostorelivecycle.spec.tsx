

import {mount} from "enzyme";
import {TestAutoUseStoreComponent} from "../__fixtures__/components/TestAutoUseStoreComponent.js";
import {TestWithStoreComponent} from "../__fixtures__/components/TestWithStoreComponent.js";

describe.only("Autostore Livecycles must work", () => {
    test("useStore livecycle", () => {
        const testComponent = mount(<TestAutoUseStoreComponent />);
        expect(testComponent.html()).toEqual("<div>constructor</div>");

        testComponent.setProps({});
        expect(testComponent.html()).toEqual("<div>update</div>");

        testComponent.unmount();
    });

    test("withStore livecycle", () => {
        const testComponent = mount(<TestWithStoreComponent />);
        expect(testComponent.html()).toEqual("<div>constructor</div>");

        testComponent.setProps({});
        expect(testComponent.html()).toEqual("<div>update</div>");

        testComponent.unmount();
    });
});

