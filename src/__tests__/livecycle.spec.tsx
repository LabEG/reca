

import { mount } from 'enzyme';
import {TestComponent} from "../__fixtures__/components/TestComponent";

describe("Livecycles must work", () => {
    test('store livecycle', () => {
        const testComponent = mount(<TestComponent />);

        expect(testComponent.html()).toEqual(`<div>constructor</div>`);

        testComponent.setProps({});
        expect(testComponent.html()).toEqual(`<div>constructor</div>`);

        testComponent.unmount();
        expect(testComponent.html()).toEqual(`<div>constructor</div>`);
    });
});

