import React from 'react';
import Farms from '../components/farm';

// move prospectITemn into new file
// rename to row
// remove commented code
// change to class
// remove warppers and experiment till it wroks

function ProspectRow({ prospect }) {
  const { address, name, phoneNumber, email, interestInSelling, neighborhoodComplaints, notes, prospectStatus } = prospect;

  return (

          <tr className="table table-sm" style={styles.prospectRow}>
            <td>{address}</td>
            <td>{name}</td>
            <td>{phoneNumber}</td>
            <td>{email}</td>
            <td>{interestInSelling}</td>
            <td>{neighborhoodComplaints}</td>
            <td>{notes}</td>
            <td>
              <div className='good-status'><div className={prospectStatus === 'Needs attention' ? 'needs-attention' : ''}>{prospectStatus}</div></div>
            </td>
            <td><span className="icon-td material-icons pipeline-edit-icon">edit</span></td>
            <td><span className="icon-td material-icons pipeline-delete-icon">delete_outlined</span></td>
          </tr>
  );
}
// const styles = ({
//   prospectRow: {
//     paddingTop:'5px',
//     paddingBottom:'5px',
//     color:'red'
//   }
// });

export default class Prospects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prospects: null
    };
  }

  componentDidMount() {
    fetch('/api/prospects')
      .then(res => res.json())
      .then(prospects => {
        this.setState({ prospects: prospects });
        // console.log('Prospects Data:',prospects);
      });
  }

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
                        {
                          prospects.length
                            ? prospects.map(prospect => <ProspectRow key={prospect.prospectId} prospect={prospect}/>)
                            : <li className='list-group-item'>No current prospects to display</li>
                        }
                  </tbody>
                </table>
                </div>
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
