import React from 'react';
import Farms from '../components/farm';
import Login from '../components/Login';
import { Link } from 'react-router-dom';

export default function LoginPage(props) {
  return (
    <div className='container'>

      <Login />

      {/* <div className='farms-container'>
      <Link to='/prospects'>
        <div className='farm-box'>
          <div className='map-img'></div>
          <div className='farm-name'><Farms/></div>
        </div>
      </Link>
      </div> */}
    </div>
  );
}
const styles = ({
  editButton: {
    borderWidth:'3px',
    borderRadius:'8px',
    backgroundColor:'#FFFFFF'
  },
  editBtnText: {
    display:'inline-block',
    paddingRight:'5px', 
    verticalAlign:'top',
    paddingTop:'2px',
    marginTop:'2px',
    fontSize:'17px'
  },
  editBtnIcon: {
    marginTop:'2px',
    paddingRight:'6px',
  }
});