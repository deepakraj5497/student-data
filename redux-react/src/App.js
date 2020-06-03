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

function App(props) {
  return (
	<Router>
		<div className="text-center">
      <Navbar color="text-light" className="justify-content-center" light expand="md">
			  <Nav className="font-weight-bold" navbar>
          <NavItem>
					  <Link className="nav-link" to="/">Home</Link>
          </NavItem>
          <NavItem>
					  <Link className="nav-link" to="/student-data/login">Login</Link>
          </NavItem>
			  </Nav>
      </Navbar>
			<Switch>
        <Route 
            path="/react/form" 
            render={() => {
              if (props.post.edit === false) {
                return <Redirect to="/react/studentlist" />;
              }
              if (props.post.addRedirect === true) {
                return <Redirect to="/react/studentlist" />;
              }
            return <FormInput />;
          }}
        />
        <Route 
          path="/react/studentlist"
          render={() => {
            if (props.post.edit === true) {
              return <Redirect to="/react/form" />;
            }
            return (<StudentTable />);
          }}
        />
        <Route path="/">
					<Home />
        </Route>
        <Route path="/student-data/login">
					<Login />
        </Route>
			</Switch>
		</div>
	</Router>
  );
}


const mapStatetoProps = (state) => ({
    post: state
});

export default connect(mapStatetoProps)(App);
