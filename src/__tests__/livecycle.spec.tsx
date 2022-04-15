

import { mount } from 'enzyme';
import {TestUseStoreComponent} from "../__fixtures__/components/TestUseStoreComponent";
import {TestWithStoreComponent} from "../__fixtures__/components/TestWithStoreComponent";

describe("Livecycles must work", () => {
    test('useStore livecycle', async () => {

        const testComponent = mount(<TestUseStoreComponent />);
        expect(testComponent.html()).toEqual(`<div>constructor</div>`);

        testComponent.setProps({});
        expect(testComponent.html()).toEqual(`<div>activate</div>`);

        testComponent.unmount();

    });

    test('withStore livecycle', async () => {

        const testComponent = mount(<TestWithStoreComponent />);
        expect(testComponent.html()).toEqual(`<div>constructor</div>`);

        testComponent.setProps({});
        expect(testComponent.html()).toEqual(`<div>activate</div>`);

        testComponent.unmount();

    });
});

