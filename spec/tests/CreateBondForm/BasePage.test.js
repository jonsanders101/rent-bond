import BasePage from '../../../src/components/BasePage';
import React from 'react';
import { shallow } from 'enzyme';

test('SHOULD correctly render <BasePage> component', () => {
  const component = shallow(
    <BasePage Headings="headings" MainContent="main" />
  );
  expect(component).toMatchSnapshot();
});
