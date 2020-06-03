import React from 'react';
import { connect } from 'react-redux';
import {
	 Form, FormGroup, Label, Input, Button 
		} from 'reactstrap';

class Login extends React.Component {
    signUp = (e) => {
        const { name } = e.target;
		let { value } = e.target;
        const { inputChange } = this.props;
        inputChange(name, value);
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
                                <Button className="border-0 w-25" style={{backgroundColor:"#f6871e"}}>Log in</Button>
                            </div>
                            <div className="login-border mb-3">
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
                            </div>
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
                                <Button className="bg-info border-0 w-50">Register</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            
        </div>)
    }
}

const mapStatetoProps = (state) => ({
    post: state
});

const mapDispatchtoProps = (dispatch) => ({
    inputChange: (name, value) => { dispatch({ type: 'INPUT_CHANGE', name, value }); }
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Login);
