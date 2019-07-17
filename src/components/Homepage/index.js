import React from 'react';
import BasePage from '../BasePage';
import CreateBondForm from '../CreateBondForm';

const Headings = () => (
  <>
    <h1 className="homepage__heading">RentBond</h1>,
    <h2 className="homepage__sub-heading">A Friendlier Way to Rent</h2>
  </>
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

export default () => <BasePage MainContent={MainContent} Headings={Headings} />;
