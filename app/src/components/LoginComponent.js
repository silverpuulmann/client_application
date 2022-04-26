import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginService from '../services/LoginService';
import {Container, Alert} from 'react-bootstrap';  

export default function LoginComponent({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await LoginService.login(username, password);
    //console.log(response.data.token);
    if(response.data.token === undefined) {
      setShowErrorMsg(true);
      return;
    }
    if(response.data.token !== null) {
        setToken(response.data);
    }
  }

  return(
    <div className='bg-light'>
      <div className="container">
        <div className="py-5 text-center">
          <h1>Client application</h1>
        </div>
        {showErrorMsg === true ? 

          <div className="App">  
            <Container className='p-4'>  
              <Alert variant="danger" onClose={() => setShowErrorMsg(false)} dismissible >  
                <Alert.Heading style={{textAlign: 'center'}}>Wrong username or password!</Alert.Heading> 
              </Alert>  
            </Container>  
            </div>  
        : null}

        <div className="login-wrapper" style={{textAlign: 'center'}}>
          <h2 style={{marginBottom: 30}}>Please Log In</h2>
          <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label style={{ marginBottom: 10}}>Username</label>
                  <div className="row d-flex justify-content-center">
                    <input type="text" 
                          className="form-control" 
                          id="username" 
                          placeholder="Username"
                          onChange={e => setUserName(e.target.value)}
                          required
                          style={{ maxWidth: 250, marginBottom: 10}}/>
                    </div>
                </div>
                <div className="mb-3">
                  <label style={{ marginBottom: 10}}>Password</label>
                  <div className="row d-flex justify-content-center">
                    <input type="password" 
                          className="form-control" 
                          id="password" 
                          placeholder="Password"
                          onChange={e => setPassword(e.target.value)}
                          required
                          style={{ maxWidth: 250 }}/>
                  </div>
                </div>
            <div>
              <button type="submit" className="btn btn-primary btn-lg btn-block" style={{textAlign: 'left', marginTop: 20}}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

LoginComponent.propTypes = {
  setToken: PropTypes.func.isRequired
};