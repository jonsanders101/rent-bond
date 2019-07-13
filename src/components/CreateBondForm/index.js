import React from 'react';

export default class CreateBondForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      membershipFee: null,
      rentAmount: '',
      postcode: ''
    };
    this.handleInput = this.handleInput.bind(this);
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
  handleInput(e) {
    e.preventDefault();
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  }
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
        </div>
        <div className="form-item">
          <label htmlFor="rentBasis">Is that per week or per month?</label>
          <select type="text" id="rentBasis">
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
