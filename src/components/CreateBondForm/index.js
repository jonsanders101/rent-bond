import React from 'react';
import {
  MEMBERSHIP_FEE_URL,
  MONTHLY_RENT_MINIMUM,
  MONTHLY_RENT_MAXIMUM,
  WEEKLY_RENT_MINIMUM,
  WEEKLY_RENT_MAXIMUM,
  FEE_MINIMUM
} from '../../constants';

export default class CreateBondForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      membershipFee: null,
      rentAmount: '',
      postcode: '',
      invalidInputs: [],
      rentBasis: 'monthly'
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleCalculateBond = this.handleCalculateBond.bind(this);
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
          this.setState({
            ...this.state,
            invalidInputs: [...this.state.invalidInputs, 'rentAmount']
          });
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
      default:
        return this.state.invalidInputs;
    }
  }
  handleInput(e) {
    e.preventDefault();
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
      invalidInputs: this.getInvalidInputs(e)
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
        const feeAmountPlusVat = feeAmount * 1.2;
        this.setState({
          ...this.state,
          membershipFee: feeAmountPlusVat
        });
      }
    }
  }
  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <div className="form-item">
          <label htmlFor="postcode">What's your postcode?</label>
          <input
            type="text"
            id="postcode"
            value={this.state.postcode}
            onChange={this.handleInput}
          />
        </div>
        <div className="form-item">
          <label htmlFor="rentAmount">How much do you pay in rent?</label>
          <input
            type="text"
            id="rentAmount"
            onChange={this.handleInput}
            value={this.state.rentAmount}
          />
          {this.state.invalidInputs.includes('rentAmount') && (
            <span>Please enter a valid rent amount.</span>
          )}
        </div>
        <div className="form-item">
          <label htmlFor="rentBasis">Is that per week or per month?</label>
          <select
            type="text"
            id="rentBasis"
            onChange={this.handleInput}
            value={this.state.rentBasis}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <button onClick={this.handleCalculateBond}>Calculate Bond</button>
        {this.state.membershipFee && (
          <div>Your membership will cost {this.state.membershipFee}</div>
        )}
        <input type="submit" />
      </form>
    );
  }
}
