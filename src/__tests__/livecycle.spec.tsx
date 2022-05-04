

import { mount } from 'enzyme';
import {TestUseStoreComponent} from "../__fixtures__/components/TestUseStoreComponent.js";
import {TestWithStoreComponent} from "../__fixtures__/components/TestWithStoreComponent.js";

describe("Livecycles must work", () => {
    test('useStore livecycle', async () => {

        const testComponent = mount(<TestUseStoreComponent />);
        expect(testComponent.html()).toEqual(`<div>constructor</div>`);

        testComponent.setProps({});
        expect(testComponent.html()).toEqual(`<div>update</div>`);

        testComponent.unmount();

    });

    test('withStore livecycle', async () => {

        const testComponent = mount(<TestWithStoreComponent />);
        expect(testComponent.html()).toEqual(`<div>constructor</div>`);

        testComponent.setProps({});
        expect(testComponent.html()).toEqual(`<div>update</div>`);

        testComponent.unmount();

    });
});

