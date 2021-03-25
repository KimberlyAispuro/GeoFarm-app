import React from 'react';

function Farm({ farm }) {
  const { farmName } = farm;
  return (
          <div>{farmName}</div>

  );
}

export default class Farms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      farms: null
    };
  }

  componentDidMount() {
    fetch('/api/farms')
      .then(res => res.json())
      .then(farms => {
        this.setState({ farms: farms });
        // console.log('Farms Data:',farms);
      });
  }

  render() {
    const { farms } = this.state;

    if (!farms) {
      return <p className='text-center'>LOADING FARMS....</p>;
    }

    // console.log('farms: ',farms);

    return (

            <div className='container'>

                <div>
                    {
                        farms.length
                          ? farms.map(farm => <Farm key={farm.farmId} farm={farm}/>)
                          : <li className='list-group-item'>No current farms to display</li>
                    }
                </div>

            </div>

    );
  }

}
