import React from 'react';
import PropTypes from 'prop-types';

export default function Confirmation(props) {
  const {
    location: {
      state: {
        referer: { postcode, membershipFee }
      }
    }
  } = props;
  return (
    <div>
      <h1>Congratulations on Confirming Your Rent Bond</h1>
      Postcode: {postcode}
      Membership Fee: {membershipFee}
    </div>
  );
}

Confirmation.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      referer: PropTypes.shape({
        postcode: PropTypes.string.isRequired,
        membershipFee: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  })
};
