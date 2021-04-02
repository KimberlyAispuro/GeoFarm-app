import React from 'react';

export default class AddProspect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      name: '',
      phoneNumber: '',
      email: '',
      interestInSelling: '',
      neighborhoodComplaints: '',
      notes: '',
      prospectStatus: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
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
            </form>
            <button onClick={this.handleSubmit}>Submit</button>
        </div>
    );

  }
}
