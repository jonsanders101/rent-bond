import React from 'react';
import postcode from 'postcode-validator';

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
      rentAmount: '',
      postcode: '',
      invalidInputs: [],
      rentBasis: 'monthly',
      isFormComplete: false,
      isFormSubmitted: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleCalculateBond = this.handleCalculateBond.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    fetch(MEMBERSHIP_FEE_URL).then(res => {
      if (res.ok) {
        return res.json().then(res => {
          this.setState({
            ...this.state,
            isFixedMembershipFee: res.fixed_membership_fee,
            fixedMembershipFeeAmount: res.fixed_membership_fee_amount
          });
        });
      } else {
        console.log('NETWORK ERROR WHILE FETCHING');
      }
    });
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

  getInvalidInputs(e) {
    switch (e.target.id) {
      case 'rentAmount':
        const parsedRentAmount = parseInt(e.target.value);
        if (
          isNaN(parsedRentAmount) ||
          parsedRentAmount < this.getRentMinimum() ||
          parsedRentAmount > this.getRentMaximum()
        ) {
          if (this.state.invalidInputs.includes('rentAmount')) {
            return this.state.invalidInputs;
          } else {
            return [...this.state.invalidInputs, 'rentAmount'];
          }
        } else {
          return this.state.invalidInputs.filter(
            input => input !== 'rentAmount'
          );
        }
      case 'postcode':
        if (!postcode.validate(e.target.value, 'UK')) {
          if (this.state.invalidInputs.includes('postcode')) {
            return this.state.invalidInputs;
          } else {
            return [...this.state.invalidInputs, 'postcode'];
          }
        } else {
          return this.state.invalidInputs.filter(input => input !== 'postcode');
        }
      default:
        return this.state.invalidInputs;
    }
  }

  isFormComplete(invalidInputs, state) {
    return !!(invalidInputs.length === 0 && state.postcode && state.rentAmount);
  }

  handleInput(e) {
    e.preventDefault();
    const invalidInputs = this.getInvalidInputs(e);
    const newState = {
      ...this.state,
      [e.target.id]: e.target.value,
      invalidInputs
    };
    this.setState({
      ...newState,
      isFormComplete: this.isFormComplete(invalidInputs, newState)
    });
  }

  handleCalculateBond(e) {
    e.preventDefault();
    if (this.state.invalidInputs.length === 0) {
      // assuming that data has returned from fetch
      if (this.state.isFixedMembershipFee) {
        this.setState({
          ...this.state,
          membershipFee: this.state.fixedMembershipFeeAmount
        });
      } else {
        const weeklyRent =
          this.state.rentBasis === 'weekly'
            ? parseInt(this.state.rentAmount)
            : parseInt(this.state.rentAmount) / 4;
        const feeAmount = weeklyRent < FEE_MINIMUM ? FEE_MINIMUM : weeklyRent;
        const feeAmountPlusVat = `${(feeAmount * 1.2).toFixed()}`;
        this.setState({
          ...this.state,
          membershipFee: feeAmountPlusVat
        });
      }
    }
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
  render() {
    if (this.state.isFormSubmitted) {
      return (
        <Redirect
          to={{
            pathname: '/confirmation',
            state: {
              referer: {
                postcode: this.state.postcode,
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
              value={this.state.postcode}
              onChange={this.handleInput}
            />
            {this.state.invalidInputs.includes('postcode') && (
              <span>Please enter a valid UK postcode.</span>
            )}
          </li>
          <li className="form-item">
            <label htmlFor="rentBasis">
              Do you pay you rent weekly, or monthly?
            </label>
            <select
              className="form-item__input"
              type="text"
              id="rentBasis"
              onChange={this.handleInput}
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
            <input
              className="bond-form__rent form-item__input"
              type="text"
              id="rentAmount"
              onChange={this.handleInput}
              value={this.state.rentAmount}
            />
            {this.state.invalidInputs.includes('rentAmount') && (
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
          <div>
            Your membership will cost {this.state.membershipFee}{' '}
            <input type="submit" disabled={!this.state.membershipFee} />
          </div>
        )}
      </form>
    );
  }
}
