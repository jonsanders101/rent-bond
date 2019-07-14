import React from 'react';
import { shallow } from 'enzyme';
import CreateBondForm from '../../../src/components/CreateBondForm';
import { Redirect } from 'react-router';

const mockFetch = () => {
  global.fetch = jasmine.createSpy('fetch').and.returnValue(
    new Promise(resolve => {
      resolve({
        ok: true,
        json: () =>
          new Promise(resolve => {
            resolve({
              fixed_membership_fee: true,
              fixed_membership_fee_amount: 123
            });
          })
      });
    })
  );
};

const enterValidPostcode = wrapper => {
  wrapper.find('.bond-form__postcode').simulate('change', {
    preventDefault: () => {},
    target: { id: 'postcode', value: 'E8 2RG' }
  });
};
const enterValidRent = wrapper => {
  wrapper.find('.bond-form__rent').simulate('change', {
    preventDefault: () => {},
    target: { id: 'rentAmount', value: '45674' }
  });
};

describe('<CreateBondForm />', () => {
  beforeEach(() => {
    mockFetch();
  });
  it('SHOULD render form', () => {
    const wrapper = shallow(<CreateBondForm />);
    expect(wrapper.find('.bond-form').exists()).toBe(true);
  });
  describe('GIVEN the user has entered one valid input', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<CreateBondForm />);
      enterValidPostcode(wrapper);
    });
    it('SHOULD set correct state', () => {
      expect(wrapper.state('postcode')).toEqual('E8 2RG');
      expect(wrapper.state('invalidInputs')).toEqual([]);
      expect(wrapper.state('isFormComplete')).toBe(false);
    });
  });
  describe('GIVEN the user has entered all valid inputs', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<CreateBondForm />);
      enterValidPostcode(wrapper);
      enterValidRent(wrapper);
    });
    it('SHOULD set correct state', () => {
      expect(wrapper.state('postcode')).toEqual('E8 2RG');
      expect(wrapper.state('rentAmount')).toEqual('45674');
      expect(wrapper.state('invalidInputs')).toEqual([]);
      expect(wrapper.state('isFormComplete')).toBe(true);
    });
  });
  describe('GIVEN the form has been been submitted', () => {
    it('SHOULD redirect to Confirmation', () => {
      const wrapper = shallow(<CreateBondForm />);
      wrapper.setState({ isFormSubmitted: true });
      expect(wrapper.find('.bond-form').exists()).toBe(false);
      expect(wrapper.find(Redirect).exists()).toBe(true);
    });
  });
});
