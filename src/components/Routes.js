import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import Confirmation from './Confirmation';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/confirmation" component={Confirmation} />
      </Switch>
    );
  }
}

export default Routes;
