import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
      </Switch>
    );
  }
}

export default Routes;
