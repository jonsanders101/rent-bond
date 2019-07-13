import React from 'react';

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
