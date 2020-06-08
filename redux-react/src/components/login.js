import React from 'react';
import { connect } from 'react-redux';
import {
	 Form, FormGroup, Label, Input, Button 
        } from 'reactstrap';
import axios from 'axios';

class Login extends React.Component {
  /* componentDidMount(){
    const { 
        login, cookies
        } = this.props;
       if(cookies.get("login")){
           console.log(cookies.get("login"));
           login(true);
       }
   } */

    signUp = (e) => {
        const { name } = e.target;
		let { value } = e.target;
        const { inputChange } = this.props;
        inputChange(name, value);
    }

    signUpsubmit = () => {
        const { 
			post: { 
                    email, password, mobileNumber
				}, signup
            } = this.props;
        let mailformat = /^\w+[\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i ;
        if(email === '' || password === '' || mobileNumber === ''){
            window.alert("email, password, mobile number cannot be empty");
            return
        }
        if(!email.match(mailformat)){
            window.alert("Please enter valid email address");
            return
        }
        if(password.length < 6){   
            window.alert("password must be greater than 6 letters");
            return
        }
        let phoneno = /^\d{10}$/;
        if(!mobileNumber.match(phoneno)){
            window.alert("Mobile number sholud be 10 digit");
            return false;
        }
        axios.post("http://localhost:3500/sign_up", { email, password, mobileNumber })
        .then((response) => {
            console.log(response);
            window.alert("Account created successfully");
            signup();
        },(error) => {
            console.log(error);
        });
    }

    loginSubmit = () => {
        const { 
			post: { 
                    userEmail, userPassword
				}, login, cookies
            } = this.props;
            let mailformat = /^\w+[\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i ;
            if(userEmail === '' || userPassword === ''){
                window.alert("email, password cannot be empty");
                return
            }
            if(!userEmail.match(mailformat)){
                window.alert("Please enter valid email address");
                return
            }
            if(userPassword.length < 6){   
                window.alert("password must be greater than 6 letters");
                return
            }
            axios.get('http://localhost:3500/signup_data')
		    .then((res) => {
            res.data.map((data, i) =>{
                if(data.email === userEmail){
                    console.log(data.email);
                    if(data.password === userPassword){
                        console.log(data.password);
                        cookies.set('login', data.email, { path: '/' , maxAge: 1000 * 60 * 60 * 24 })
                        login(true);
                    }
                }
            }); 
		});
    }

    render(){
        const { 
			post: { 
					email, password, mobileNumber, userEmail, userPassword
				  }
			} = this.props;
        return (
        <div className="row">
            <div className="col-md-6">
                <div className="row">
                    <div className="col-md-6 offset-md-3 pt-5">
                        <h3 className="text-left">Log in</h3>
                        <Form>
                            <FormGroup className="text-left mt-4">
                                <Label for="email">Enter your <strong>email address</strong></Label>
                                <Input type="email" name="userEmail" value={userEmail} onChange={this.signUp} />
                            </FormGroup>
                            <FormGroup className="text-left">
                                <Label for="password">Enter your <strong>password</strong></Label>
                                <Input type="password" name="userPassword" value={userPassword} onChange={this.signUp} />
                            </FormGroup>
                            <div className="text-right mb-3">
                                <Button className="border-0 w-25" onClick={this.loginSubmit} style={{backgroundColor:"#f6871e"}}>Log in</Button>
                            </div>
                        {/*    <div className="login-border mb-3">
                                <span className="bg-white text-secondary">
                                    Log in with:
                                </span>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Button className="bg-white text-dark px-5">Google</Button>
                                </div>
                                <div className="col-md-6">
                                    <Button className="bg-white text-dark px-5">Facebook</Button>
                                </div>
                            </div> */}
                        </Form>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="row">
                    <div className="col-md-6 offset-md-3 pt-5">
                        <h3 className="text-left">Create new account</h3>
                        <Form>
                            <FormGroup className="text-left mt-4">
                                <Label for="email">Enter your <strong>email address</strong></Label>
                                <Input type="email" name="email" value={email} onChange={this.signUp} />
                            </FormGroup>
                            <FormGroup className="text-left">
                                <Label for="password">Create your <strong>password</strong></Label>
                                <Input type="password" name="password" value={password} onChange={this.signUp} />
                            </FormGroup>
                            <FormGroup className="text-left">
                                <Label for="number">Enter your <strong>mobile number</strong></Label>
                                <Input type="number" name="mobileNumber" value={mobileNumber} onChange={this.signUp} />
                            </FormGroup>
                            <div className="text-center mb-3">
                                <Button onClick={this.signUpsubmit} className="border-0 w-50 bg-info">Register</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>)
    }
}

const mapStatetoProps = (state, ownProps) => ({
    post: state,
    cookies: ownProps.cookies
});

const mapDispatchtoProps = (dispatch) => ({
    inputChange: (name, value) => { dispatch({ type: 'INPUT_CHANGE', name, value }); },
    login: (data) => { dispatch({ type: 'LOGIN', data}); },
    signup: (data) => { dispatch({ type: 'SIGNUP'}); }
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Login);
