import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './pages/home';
import Prospects from './pages/prospects';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div className='my-3'>
          <div style={{textAlign:'right',fontSize:'20px'}}><Link style={{color:'#606161',textDecoration:'none'}}className='px-4' to='/'><span style={{fontSize:'38px',verticalAlign:'middle'}} className="material-icons-outlined">exit_to_app</span></Link></div>
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
