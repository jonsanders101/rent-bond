import React from 'react';
import postcode from 'postcode-validator';
import CurrencyInput from 'react-currency-input';
import CurrenctFormat from 'react-currency-format';

import {
  MEMBERSHIP_FEE_URL,
  POST_BOND_URL,
  MONTHLY_RENT_MINIMUM,
  MONTHLY_RENT_MAXIMUM,
  WEEKLY_RENT_MINIMUM,
  WEEKLY_RENT_MAXIMUM,
  FEE_MINIMUM
} from '../../constants';
import { Redirect } from 'react-router';

export default class CreateBondForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      membershipFee: null,
      rentAmount: { maskedValue: '0.00', floatValue: 0.0, isValid: undefined },
      postcode: { postcodeValue: '', isValid: undefined },
      rentBasis: 'monthly',
      isFormComplete: false,
      isFormSubmitted: false
    };
    this.handleGenericInput = this.handleGenericInput.bind(this);
    this.handleCalculateBond = this.handleCalculateBond.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRentAmountInput = this.handleRentAmountInput.bind(this);
    this.handlePostcodeInput = this.handlePostcodeInput.bind(this);
    this.getIsFormComplete = this.getIsFormComplete.bind(this);
  }

  componentDidMount() {
    fetch(MEMBERSHIP_FEE_URL).then(res => {
      if (res.ok) {
        return res.json().then(res => {
          this.setState({
            ...this.state,
            //            isFixedMembershipFee: res.fixed_membership_fee,
            isFixedMembershipFee: false,
            fixedMembershipFeeAmount: res.fixed_membership_fee_amount / 100
          });
        });
      } else {
        console.log('NETWORK ERROR WHILE FETCHING');
      }
    });
  }

  componentDidUpdate() {
    const isFormComplete = this.getIsFormComplete();
    if (this.state.isFormComplete !== isFormComplete) {
      this.setState({ isFormComplete });
    }
  }

  getRentMinimum() {
    return this.state.rentBasis === 'monthly'
      ? MONTHLY_RENT_MINIMUM
      : WEEKLY_RENT_MINIMUM;
  }

  getRentMaximum() {
    return this.state.rentBasis === 'monthly'
      ? MONTHLY_RENT_MAXIMUM
      : WEEKLY_RENT_MAXIMUM;
  }

  getIsAllInputValid() {
    return this.state.postcode.isValid && this.state.rentAmount.isValid;
  }

  getIsFormComplete() {
    return !!(
      this.getIsAllInputValid() &&
      this.state.postcode.postcodeValue &&
      this.state.rentAmount.floatValue
    );
  }

  getIsRentAmountValid(rentAmount) {
    return (
      rentAmount > this.getRentMinimum() && rentAmount < this.getRentMaximum()
    );
  }
  handleGenericInput(e) {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleCalculateBond(e) {
    const calculateBond = ({
      isFixedMembershipFee,
      fixedMembershipFeeAmount,
      rentBasis,
      rentAmount
    }) => {
      if (isFixedMembershipFee) {
        return fixedMembershipFeeAmount.toFixed(2);
      } else {
        const weeklyRent =
          rentBasis === 'weekly'
            ? rentAmount.floatValue
            : rentAmount.floatValue / 4;
        const feeAmount = weeklyRent < FEE_MINIMUM ? FEE_MINIMUM : weeklyRent;
        return (feeAmount * 1.2).toFixed(2);
      }
    };
    e.preventDefault();
    // assuming that data has returned from fetch
    this.setState({ membershipFee: calculateBond(this.state) });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    fetch(POST_BOND_URL, {
      method: 'POST',
      body: {
        postcode: this.state.postcode,
        membershipFee: this.state.membershipFee
      }
    }).then(res => {
      if (res.ok) {
        res.json().then(res => {
          if (res.status === 'created') {
            this.setState({ ...this.state, isFormSubmitted: true });
          } else {
            console.log('ERROR CREATING BOND');
          }
        });
      } else {
        console.log('NETWORK ERROR WHILE FETCHING');
      }
    });
  }
  handleRentAmountInput(e, maskedValue, floatValue) {
    e.preventDefault();
    this.setState({
      rentAmount: {
        floatValue,
        maskedValue,
        isValid: this.getIsRentAmountValid(floatValue)
      }
    });
  }
  handlePostcodeInput(e) {
    e.preventDefault();
    this.setState({
      postcode: {
        postcodeValue: e.target.value,
        isValid: postcode.validate(e.target.value, 'UK')
      }
    });
  }
  render() {
    if (this.state.isFormSubmitted) {
      return (
        <Redirect
          to={{
            pathname: '/confirmation',
            state: {
              referer: {
                postcode: this.state.postcode.postcodeValue,
                membershipFee: this.state.membershipFee
              }
            }
          }}
        />
      );
    }
    return (
      <form className="bond-form" onSubmit={this.handleFormSubmit}>
        <ol className="bond-form__inputs">
          {' '}
          <li className="form-item">
            <label htmlFor="postcode">What's your postcode?</label>
            <input
              className="bond-form__postcode form-item__input"
              type="text"
              id="postcode"
              value={this.state.postcode.postcodeValue}
              onChange={this.handlePostcodeInput}
            />
            {this.state.postcode.isValid === false && (
              <span>Please enter a valid UK postcode.</span>
            )}
          </li>
          <li className="form-item">
            <label htmlFor="rentBasis">
              Do you pay you rent weekly or monthly?
            </label>
            <select
              className="form-item__input"
              type="text"
              id="rentBasis"
              onChange={this.handleGenericInput}
              value={this.state.rentBasis}
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
          </li>
          <li className="form-item">
            <label htmlFor="rentAmount">
              How much do you pay in rent per{' '}
              {this.state.rentBasis.split('ly')[0]}?
            </label>
            <CurrencyInput
              id="rentAmount"
              className="bond-form__rent form-item__input"
              prefix="£"
              onChangeEvent={this.handleRentAmountInput}
              value={this.state.rentAmount.maskedValue}
            />
            {this.state.rentAmount.isValid === false && (
              <span>Please enter a valid rent amount.</span>
            )}
          </li>
        </ol>

        <button
          className="bond-form__calculate"
          onClick={this.handleCalculateBond}
          disabled={!this.state.isFormComplete}
        >
          Calculate Bond
        </button>
        {this.state.membershipFee && (
          <div className="bond-cost">
            <span className="bond-cost__message">
              {'Your RentBond membership will cost '}
              <span className="bond-cost__price">
                <CurrenctFormat
                  displayType={'text'}
                  value={this.state.membershipFee}
                  thousandSeparator={true}
                  prefix={'£'}
                />
              </span>
            </span>

            <input
              className="bond-cost__create"
              type="submit"
              value="Create my RentBond"
              disabled={!this.state.membershipFee}
            />
          </div>
        )}
      </form>
    );
  }
}
