import React from 'react';

export default class CreateBondForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      membershipFee: null,
      rentAmount: ''
    };
    this.handleRentAmountInput = this.handleRentAmountInput.bind(this);
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
  handleRentAmountInput(e) {
    e.preventDefault();
    this.setState({ ...this.state, rentAmount: e.target.value });
  }
  render() {
    return (
      <form>
        <div className="form-item">
          <label htmlFor="postcode">What's your postcode?</label>
          <input type="text" id="postcode" />
        </div>
        <div className="form-item">
          <label htmlFor="rent-amount">How much do you pay in rent?</label>
          <input
            type="text"
            id="rent-amount"
            onChange={this.handleRentAmountInput}
            value={this.state.rentAmount}
          />
        </div>
        <div className="form-item">
          <label htmlFor="rent-basis">Is that per week or per month?</label>
          <select type="text" id="rent-basis">
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        {this.state.membershipFee && (
          <div>Your membership will cost {this.state.membershipFee}</div>
        )}
        <input type="submit" />
      </form>
    );
  }
}
