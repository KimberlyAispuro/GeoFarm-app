import React from 'react';
import Home from "../pages/home";
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email:'jsmith@example.com',
            password:'hello111',
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
        
        const data = {
            email: this.state.email,
            password: this.state.password,
        }

        console.log(data);

        // const prospectList = this.state.prospects;
        fetch('api/login',{
            method:'POST',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(data),
        })
            // .then(res => res.json())
            .then(res => {
                if(!res.ok){
                    alert('Username and/or password not found!')
                    throw new Error(res.statusText)
                } else {
                    return res.json()
                }
            })
            .then(data => {
                console.log(data);
                this.setState({users: data});
                this.props.history.push(`/`);
            })
            .catch(err => console.error(err));
    }
    render(){
        return( 
        <div>
            <div className="form-signin" style={styles.signInContainer}>
                <form style={styles.signInForm} onSubmit={this.handleSubmit} method='POST'>
                    <img className="mb-4 login-img" alt="" width="150" height="150"/>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="w-50 form-floating mb-2">
                        <input type="email" onChange={this.handleChange} className="form-control"  name='email' placeholder="name@example.com" value={this.state.email}/>
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="w-50 form-floating mb-1">
                        <input type="password" onChange={this.handleChange} className="form-control"  name='password' placeholder="Password" value={this.state.password}/>
                        <label for="floatingPassword">Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button className="w-50 btn btn-lg btn-primary" type="submit" onClick={this.handleSubmit}>Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
                </form>
            </div>

             {/* <form onSubmit={this.handleSubmit} method='POST' >
                <label>Email</label>
                <input type="text" onChange={this.handleChange} className="form-control" name='email' value={this.state.email}/>
                <label>Password</label>
                <input type="text" onChange={this.handleChange} className="form-control" name='password' value={this.state.password}/>
            </form>
            <button onClick={this.handleSubmit}>Submit</button> */}
        </div>);
       
    }
}

const styles = ({
    signInContainer: {
       width:'100%',
       height:'100%'
    },
    signInForm: {
        width:'70%',
        height:'100%',
        margin:'0 auto',
        paddingLeft:'20%',
        
    }
  });

export default withRouter(Login);