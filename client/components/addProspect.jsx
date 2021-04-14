import React from 'react';
import Modal from 'react-modal';

export default class AddProspect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      

      modalIsOpen: false,
      address: '',
      name: '',
      phoneNumber: '',
      email: '',
      interestInSelling: '',
      neighborhoodComplaints: '',
      notes: '',
      prospectStatus: ''
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  openModal() {
    this.setState({
      modalIsOpen: true,
      address: '',
      name: '',
      phoneNumber: '',
      email: '',
      interestInSelling: '',
      neighborhoodComplaints: '',
      notes: '',
      prospectStatus: ''
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
    window.location.reload();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      modalIsOpen: false
    });
    // console.log("handleSubmit");

    const newProspect = {
      address: this.state.address,
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      interestInSelling: this.state.interestInSelling,
      neighborhoodComplaints: this.state.neighborhoodComplaints,
      notes: this.state.notes,
      prospectStatus: this.state.prospectStatus
    };

    // const dummyProspect = {
    //     address:"test8",
    //     name: "dfdf",
    //     phoneNumber:"9499992882",
    //     email:"cad@google.com",
    //     interestInSelling:false,
    //     neighborhoodComplaints:"none",
    //     notes:"bla ble",
    //     prospectStatus:"Needs attention"
    // }

    // console.log(newProspect);

    // const prospectList = this.state.prospects;
    fetch('api/prospects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProspect)
    })
      .then(res => res.json())
      .then(newProspect => {
        // console.log(newProspect);
        // prospectList.push(newProspect);
        // this.setState({prospects:prospectList});
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
        <div>
          <div>
            <button type='button' className='btn btn-outline-primary btn-sm' onClick={() => this.openModal()} style={styles.addButton}>
              <span className="material-icons-outlined" style={styles.addBtnIcon}>add</span>
              <span style={styles.addBtnText}>Add Prospect</span>
            </button>
          </div>
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                ariaHideApp={false}
                contentLabel='Selected Option'>

                          
            <form onSubmit={this.handleSubmit} method='POST' >
                <label>Address</label>
                <input type="text" onChange={this.handleChange} className="form-control" name='address' value={this.state.address}/>
                <label>Name</label>
                <input type="text" onChange={this.handleChange} className="form-control" name='name' value={this.state.name}/>
                <label>Phone Number</label>
                <input type="text" onChange={this.handleChange} className="form-control" name='phoneNumber' value={this.state.phoneNumber}/>
                <label>Email</label>
                <input type="text" onChange={this.handleChange} className="form-control" name='email' value={this.state.email}/>
                <label>Interest In Selling</label>
                <input type="text" onChange={this.handleChange} className="form-control" name='interestInSelling' value={this.state.interestInSelling}/>
                <label>Neighborhood Complaints</label>
                <input type="text" onChange={this.handleChange} className="form-control" name='neighborhoodComplaints' value={this.state.neighborhoodComplaints}/>
                <label>Notes</label>
                <input type="text" onChange={this.handleChange} className="form-control" name='notes' value={this.state.notes}/>
                <label>Prospect Status</label>
                <input type="text" onChange={this.handleChange} className="form-control" name='prospectStatus' value={this.state.prospectStatus}/>
                {/* <button onClick={this.handleSubmit}>Submit</button> */}
                <input type='submit' value='Submit' onSubmit={() => this.closeModal()} />
            </form>
            </Modal>
        </div>
    );

  }
}
const styles = ({
  addButton: {
    position:'absolute',
    borderWidth:'3px',
    borderRadius:'8px',
    marginTop:'10px',
    fontWeight:'500'
    
  },
  addBtnText: {
    
    verticalAlign:'middle',
    paddingRight:'35px',
    fontSize:'17px',
    marginTop:'50px',
    
    // position:'relative',
    // verticalAlign:'middle',
    // // paddingTop:'2px',
    // // marginTop:'2px',
    // // fontSize:'17px',
    // marginLeft:'5%'
    // // marginBottom:'20px',
    // // paddingBottom:'20px'
  },
  addBtnIcon: {
    marginRight:'10px',
    marginLeft:'15px',
    verticalAlign:'middle',
    fontWeight:'bold',
  }
});