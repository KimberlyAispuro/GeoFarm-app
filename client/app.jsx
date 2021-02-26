import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './pages/home';
import Prospects from './pages/prospects';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div className='text-center my-3'>
          <Link className='px-4' to='/'>Home</Link>
          <Link className='px-4' to='/prospects'>Prospects</Link>
        </div>

        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/prospects'>
          <Prospects />
        </Route>
      </div>
    );
  }
}
