import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BasePage from '../BasePage';
import Headings from '../Headings';
import CurrencyFormat from 'react-currency-format';

export default function Confirmation(props) {
  const {
    location: {
      state: {
        referer: { postcode, membershipFee }
      }
    }
  } = props;
  const MainContent = () => (
    <div className="confirmtion__main">
      <h3>Your RentBond details...</h3>
      <table className="confirmation__details">
        <tbody>
          <tr>
            <td>Postcode</td>
            <td>{postcode}</td>
          </tr>
          <tr>
            <td>Membership Fee</td>
            <td>
              <CurrencyFormat
                displayType="text"
                prefix="£"
                value={membershipFee}
                thousandSeparator={true}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="confirmation__return-home">
        <Link to="/">Return to Homepage</Link>
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
