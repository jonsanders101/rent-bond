import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BasePage from '../BasePage';
import Headings from '../Headings';

export default function Confirmation(props) {
  const {
    location: {
      state: {
        referer: { postcode, membershipFee }
      }
    }
  } = props;
  const MainContent = () => (
    <div>
      Your RentBond details...
      <ul>
        <li>Postcode: {postcode}</li>
        <li>Membership Fee: {membershipFee}</li>
      </ul>
      <div className="confirmation__return-home">
        <Link to="/">Return</Link>
      </div>
    </div>
  );

  const ConfirmationHeadings = () => (
    <Headings
      headingText={'Congratulations!'}
      subheadingText={'Your RentBond is confirmed'}
    />
  );

  return <BasePage MainContent={MainContent} Headings={ConfirmationHeadings} />;
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
