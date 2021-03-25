import React from 'react';
import Modal from 'react-modal';
import Farms from '../components/farm';

export default class Prospects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prospects: null,

      modalIsOpen: false,
      address:'',
      name:'',
      phoneNumber:'',
      email:'',
      interestInSelling:'',
      neighborhoodComplaints:'',
      notes:'',
      prospectStatus:'',
      prospectId:0
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  openModal(prospect){
    this.setState({
      modalIsOpen:true,
      address: prospect.address,
      name: prospect.name,
      phoneNumber: prospect.phoneNumber,
      email: prospect.email,
      interestInSelling: prospect.interestInSelling,
      neighborhoodComplaints: prospect.neighborhoodComplaints,
      notes: prospect.notes,
      prospectStatus: prospect.prospectStatus,
      prospectId: prospect.prospectId
    });
  }

  closeModal(){
    this.setState({
      modalIsOpen:false
    });
  }

  handleChange(event){
    this.setState({
        [event.target.name]: event.target.value
    });
  }

  handleEdit(event){
    event.preventDefault();
    // console.log("handleChange");

    let data = {
      address: this.state.address,
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      interestInSelling: this.state.interestInSelling,
      neighborhoodComplaints: this.state.neighborhoodComplaints,
      notes: this.state.notes,
      prospectStatus: this.state.prospectStatus,
      prospectId: this.state.prospectId
    }
    // console.log(data.prospectId);

    fetch(`/api/prospects/${data.prospectId}`,{
      method:'PUT',
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify(data),
  })
      .then(res => res.json())
      .then(data => {
          console.log(data);
      })
      .catch(err => console.error(err));

      this.closeModal();

  }

  componentDidMount() {
    fetch('/api/prospects',{
      method:'GET',
  })
      .then(res => res.json())
      .then(prospects => {
        this.setState({ prospects: prospects });
        // console.log('Prospects Data:',prospects);
      })
      .catch(err => console.error(err));
}

  //   fetch('/api/prospects')
  //     .then(res => res.json())
  //     .then(prospects => {
  //       this.setState({ prospects: prospects });
  //       // console.log('Prospects Data:',prospects);
  //     });
  // }

  render() {
    const { prospects } = this.state;

    if (!prospects) {
      return <p className='text-center'>LOADING PROSPECTS....</p>;
    }

    // console.log('prospects: ',prospects);

    return (

            <div className='container'>
              <h1 className='text-left' style={{ paddingBottom: '20px' }}>Prospects</h1>

              <div className='container' style={styles.tableContainer}>
                <h3 style={{ paddingBottom: '10px', marginBottom: '10px', paddingTop: '10px' }}><Farms/></h3>
                <table className="table table-sm">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Address</th>
                      <th scope="col">Name</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Email</th>
                      <th scope="col">Interest In Selling</th>
                      <th scope="col">Neighborhood Complaints</th>
                      <th scope="col">Notes</th>
                      <th scope="col">Prospect Status</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                        {this.state.prospects.map(prospect => 
                          <tr key={prospect.prospectId} className="table table-sm" style={styles.prospectRow}>
                            <td>{prospect.address}</td>
                            <td>{prospect.name}</td>
                            <td>{prospect.phoneNumber}</td>
                            <td>{prospect.email}</td>
                            <td>{prospect.interestInSelling}</td>
                            <td>{prospect.neighborhoodComplaints}</td>
                            <td>{prospect.notes}</td>
                            <td>
                              <div className='good-status'><div className={prospect.prospectStatus === 'Needs attention' ? 'needs-attention' : ''}>{prospect.prospectStatus}</div></div>
                            </td>
                            <td><a onClick={()=> this.openModal(prospect)}><span className="icon-td material-icons pipeline-edit-icon">edit</span></a></td>
                            <td><span className="icon-td material-icons pipeline-delete-icon">delete_outlined</span></td>
                          </tr>
                        )}
                        <Modal 
                          isOpen={this.state.modalIsOpen}
                          onRequestClose={this.closeModal}
                          ariaHideApp={false}
                          contentLabel='Selected Option'>

                          <form onSubmit={this.handleEdit} method='PUT' >
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
                            <input type='submit' value='Submit' onSubmit={()=> this.closeModal()} />
                          </form>
                        </Modal>
                  </tbody>
                </table>
                </div>
                {/* <AddProspect /> */}
            </div>

    );
  }

}

const styles = ({
  tableContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: '25px',
    border: '1px solid lightgrey',
    padding: '20px',
    paddingBottom: '100px'
  },
  prospectRow: {
    paddingTop: '5px',
    paddingBottom: '5px'
  }
});
