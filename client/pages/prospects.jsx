import React from 'react';

function ProspectItem({ prospect }) {
  const { address, name, phoneNumber, email, interestInSelling, neighborhoodComplaints, notes, prospectStatus } = prospect;

  return (
        <li className='list-group-item'>
        <div className="row">
            <div className="col-3">{address}</div>
            <div className="col-6">{name}</div>
            <div className="col-3">{phoneNumber}</div>
            <div className="col-6">{email}</div>
            <div className="col-3">{interestInSelling}</div>
            <div className="col-6">{neighborhoodComplaints}</div>
            <div className="col-3">{notes}</div>
            <div className="col-6">{prospectStatus}</div>
        </div>
        </li>

  // <div className='container'>
  // <div className="row">
  //     <table className='table table-striped'>
  //         <thead className='thead-dark'>
  //             <tr>
  //                 <th scope='col'>address</th>
  //                 <th scope='col'>name</th>
  //                 <th scope='col'>phoneNumber</th>
  //                 <th scope='col'>email</th>
  //                 <th scope='col'>interestInSelling</th>
  //                 <th scope='col'>neighborhoodComplaints</th>
  //                 <th scope='col'>notes</th>
  //                 <th scope='col'>prospectStatus</th>
  //             </tr>
  //         </thead>
  //     </table>
  // </div>
  // </div>
  );
}

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
        // console.log('Prospects Data:',data);
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
                <h1 className='text-center'>Prospects</h1>

                <ul className='list-group list-group-flush'>
                    {
                        prospects.length
                          ? prospects.map(prospect => <ProspectItem key={prospect.prospectId} prospect={prospect}/>)
                          : <li className='list-group-item'>No current prospects to display</li>
                    }
                </ul>
            </div>
    );
  }
}
