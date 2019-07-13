import React from 'react';

export default class CreateBondForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      membershipFee: null,
      rentAmount: '',
      postcode: '',
      invalidInputs: []
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleCalculateBond = this.handleCalculateBond.bind(this);
  }
  componentDidMount() {
    fetch(
      'https://cxynbjn3wf.execute-api.eu-west-2.amazonaws.com/production/config'
    ).then(res => {
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
    return 11000;
  }
  getRentMaximum() {
    return 866000;
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
        return;
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
  handleCalculateBond() {}
  render() {
    return (
      <form>
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
