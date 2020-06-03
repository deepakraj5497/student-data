import React from 'react';
import { connect } from 'react-redux';
import { 
    BrowserRouter as Router, Switch, Route, Redirect, Link
  } from 'react-router-dom';
  import {
    Navbar,
    Nav,
    NavItem
  } from 'reactstrap';
import './App.css';
import Home from './components/home';
import StudentTable from './components/studenttable';
import FormInput from './components/form';
import Login from './components/login';
import Logout from './components/logout';

class App extends React.Component{
  logout = () => {
    const { 
            login
            } = this.props;
    login(false);
  }

  render(){
    let button;
    if(this.props.post.login){
      button = <Link onClick={this.logout} className="nav-link text-dark" to="/student-data/login">Logout</Link>
    }else {
      button = <Link className="nav-link text-dark" to="/student-data/login">Login</Link>
    }
    return (
	    <Router>
		    <div className="text-center">
          <Navbar className="justify-content-center" style={{backgroundColor:"Gainsboro"}} expand="md">
			      <Nav className="font-weight-bold" navbar>
              <NavItem className="mx-4">
					      <Link className="nav-link text-dark" to="/student-data/">Home</Link>
              </NavItem>
              <NavItem className="mx-4">
                <Link className="nav-link text-dark" to="/student-data/form">Form</Link>
				      </NavItem>
				      <NavItem className="mx-4">
                <Link className="nav-link text-dark" to="/student-data/studentlist">Student List</Link>
				      </NavItem>
              <NavItem className="mx-4">
                {button}
              </NavItem>
			      </Nav>
          </Navbar>
			<Switch>
        <Route 
            path="/student-data/form" 
            render={() => {
              if(this.props.post.login){
                if (this.props.post.edit === false) {
                  return <Redirect to="/student-data/studentlist" />;
                }
                if (this.props.post.addRedirect === true) {
                  return <Redirect to="/student-data/studentlist"  />;
                }
                return <FormInput />;
              }
              return <Logout />
          }}
        />
        <Route 
          path="/student-data/studentlist"
          render={() => {
            if(this.props.post.login){
              if (this.props.post.edit === true) {
                return <Redirect to="/student-data/form" />;
              }
              return (<StudentTable />);
            }
            return <Logout />
          }}
        />
        <Route exact path="/student-data/">
					<Home />
        </Route>
        <Route 
          path="/student-data/login"
          render = {() => {
            if(this.props.post.login){
              return <Redirect to="/student-data/studentlist"  />;
            }
            return ( <Login /> );
          }}
        />
			</Switch>
		</div>
	</Router>
  );
}
}

const mapStatetoProps = (state) => ({
    post: state
});

const mapDispatchtoProps = (dispatch) => ({
  login: (data) => { dispatch({ type: 'LOGIN', data}); }
});

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
