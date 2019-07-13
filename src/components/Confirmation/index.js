import React from 'react';
import { connect } from 'react-redux';

function Confirmation(props) {
  return (
    <div>
      <h1>Congratulations on Confirming Your Rent Bond</h1>
      Postcode: {props.postcode}
      Membership Fee: {props.membershipFee}
    </div>
  );
}

export default connect(state => ({
  postcode: state.postcode,
  membershipFee: state.membershipFee
}))(Confirmation);
