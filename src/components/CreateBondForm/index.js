import React from 'react';

export default class CreateBondForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      membershipFee: null
    };
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
          <input type="text" id="rent-amount" />
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
