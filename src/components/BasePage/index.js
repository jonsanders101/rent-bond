import React from 'react';

export default ({ Headings, MainContent }) => (
  <div className="basepage">
    <div className="basepage__headings">
      <Headings />
    </div>
    <section className="basepage__main">
      <MainContent />
    </section>
  </div>
);
