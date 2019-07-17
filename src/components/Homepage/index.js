import React from 'react';
import BasePage from '../BasePage';
import CreateBondForm from '../CreateBondForm';
import Headings from '../Headings';

const HomepageHeadings = () => (
  <Headings
    headingText={'RentBond'}
    subheadingText={'A Friendlier Way to Rent'}
  />
);

const MainContent = () => (
  <>
    <h3>
      We need a few details from you to calculate the cost of your RentBond
      membership...
    </h3>
    <CreateBondForm />
  </>
);

export default () => (
  <BasePage MainContent={MainContent} Headings={HomepageHeadings} />
);
