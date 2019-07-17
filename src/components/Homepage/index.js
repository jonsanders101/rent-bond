import React from 'react';
import CreateBondForm from '../CreateBondForm';

export default () => (
  <div className="homepage">
    <div className="homepage__headings-container">
      <h1 className="homepage__heading">RentBond</h1>
      <h2 className="homepage__sub-heading">A Friendlier Way to Rent</h2>
    </div>
    <section className="form__container">
      <h3>
        We need a few details from you to calculate the cost of your RentBond
        membership...
      </h3>
      <CreateBondForm />
    </section>
  </div>
);
