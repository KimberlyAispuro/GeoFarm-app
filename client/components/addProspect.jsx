import React from 'react';

export default class AddProspect extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            address:'',
            name:'',
            phoneNumber:'',
            email:'',
            interestInSelling:'',
            neighborhoodComplaints:'',
            notes:'',
            prospectStatus:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        console.log("handleSubmit");

        const newProspect = {
            address: this.state.address,
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            interestInSelling: this.state.interestInSelling,
            neighborhoodComplaints: this.state.neighborhoodComplaints,
            notes: this.state.notes,
            prospectStatus: this.state.prospectStatus
        }

        const dummyProspect = {
            address:"test8",
            name: "dfdf",
            phoneNumber:"9499992882",
            email:"cad@google.com",
            interestInSelling:false,
            neighborhoodComplaints:"none",
            notes:"bla ble",
            prospectStatus:"Needs attention"
            // farmId:1
            // viewPipelineId:1
        }

        console.log(dummyProspect);

        // const prospectList = this.state.prospects;
        fetch('api/prospects',{
            method:'POST',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(dummyProspect),
        })
            .then(res => res.json())
            .then(newProspect => {
                console.log(newProspect);
                // prospectList.push(newProspect);
                // this.setState({prospects:prospectList});
            })
            .catch(err => console.error(err));
    }
    render(){
        return( 
        <div>
            {
                Object.keys(this.state).map(item => {
                    return(
                        <div>
                            <label>{item}</label>
                            <input name={item} onChange={this.handleChange}></input>
                        </div>
                    )
                })
            }
            <button onClick={this.handleSubmit}>Submit</button>
        </div>);
       
    }
}