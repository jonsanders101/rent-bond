import React from 'react';

export default ({ headingText, subheadingText }) => (
  <>
    <h1 className="basepage__heading">{headingText}</h1>
    <h2 className="basepage__sub-heading">{subheadingText}</h2>
  </>
);
