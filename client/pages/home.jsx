import React from 'react';
import Farms from '../components/farm';
import { Link } from 'react-router-dom';

export default function Home(props) {
  return (
    <div className='container'>

      <div className='header-container'>
        <h2 className='text-left farms-header'>All Farms</h2>
        <button type='button' className='btn btn-outline-primary btn-sm' style={styles.editButton}>
          <span className="material-icons-outlined" style={styles.editBtnIcon}>edit</span>
          <span style={styles.editBtnText}>Edit</span>
        </button>
      </div>

      <div className='farms-container'>
      <Link to='/prospects'>
        <div className='farm-box'>
          <div className='map-img'></div>
          <div className='farm-name'><Farms/></div>
        </div>
      </Link>
        <div className='farm-box'>
          <div className='map-img'></div>
          <div className='farm-name'><Farms/></div>
        </div>
      </div>
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