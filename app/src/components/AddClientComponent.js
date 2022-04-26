import React from 'react';
import { Link } from 'react-router-dom';
import ClientService from '../services/ClientService';
import CountryService from "../services/CountryService";
import { Row, Container, Col, Alert } from "react-bootstrap";

class AddClientComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        firstName:'',
        lastName:'',
        userName:'',
        email:'',
        address:'',
        country:'',
        user: '',
        countries: '',
        successMsg: false,
        errMsg: false,
        errors: {firstName: '', lastName: '', userName: '', address: '', country: ''}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleValidation(){
  const {firstName, lastName, userName, address, country} = this.state;
  let errors = {firstName: '', lastName: '', userName: '', address: '', country: ''};

  if (firstName === '') {
    errors.firstName = 'First name is required!'
  }

  else if (!isNaN(firstName)) {
    errors.firstName = 'Name should not include numbers!'
  }

  if (lastName === '') {
    errors.lastName = 'Last name is required!'
  }

  else if (!isNaN(lastName)) {
    errors.lastName = 'Name should not include numbers!'
  }

  if (userName === '') {
    errors.userName = 'Username is required!'
  }

  if (address === '') {
    errors.address = 'Address is required!'
  }

  if (country === 'default' || country === '') {
    errors.country = 'Country is required!'
  }

  this.setState({ errors });

  if(errors.firstName !== '' || errors.lastName !== '' ||
      errors.userName !== '' || errors.address !== '' || errors.country !== ''){
    return true;
  }
  else {
    return false;
  }  
}

handleSubmit(event){
  event.preventDefault();
  const hasErrors = this.handleValidation();
  //console.log('Validatsioonierrorid:', hasErrors);
  if (!hasErrors){
    this.setState({successMsg: false, errMsg: false});
    ClientService.addClient(this.state.firstName, this.state.lastName, this.state.userName,
      this.state.email, this.state.address, this.state.country, localStorage.getItem('userId')).then((response) => {
        
        if(response.status === 200){
          this.setState({successMsg: true});
        }
        else {
          this.setState({errMsg: true});
        }
    });;
  }
}

componentDidMount(){
  CountryService.getCountries().then((response) => 
      {this.setState({countries: response.data})
  });
}

render(){
  const { errors } = this.state;
  return (
    <div className="container">
      <div className="p-5 text-center bg-light">
          <h1 className= "mb-3">Client Application</h1>
      </div>
          <Container>
              <Row>
              <Col></Col>
                  <Col className="py-5 text-center">
                      <div >
                          <h2>Add new client</h2>
                      </div>
                  </Col>
                  <Col>  
                  </Col>
              </Row>
          </Container>
          {this.state.errMsg === true ?
          <div className="App">  
            <Container className='p-4'>  
              <Alert variant="danger" onClose={() => this.setState({errMsg: false})} dismissible >  
                <Alert.Heading style={{textAlign: 'center'}}>Adding a new client failed!</Alert.Heading> 
              </Alert>  
            </Container>  
            </div>  
          : null}

          {this.state.successMsg === true ?
          <div className="App">  
            <Container className='p-4'>  
              <Alert variant="success" onClose={() => this.setState({successMsg: false})} dismissible >  
                <Alert.Heading style={{textAlign: 'center'}}>Added a new client!</Alert.Heading> 
              </Alert>  
            </Container>  
            </div>  
          : null}
          <Link to="/" className="btn btn-primary btn-lg btn-block" style={{marginBottom: 20, minWidth:120}}>Back</Link>
      <div className="row">
          <div className="col-md-12 order-md-1">
            <form className="needs-validation" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  {errors.firstName != '' && <div style={{color: "red"}}>{this.state.errors.firstName}</div>}
                  <label name="firstName">First name</label>
                  <input type="text" className="form-control" id="firstName" placeholder=""
                     onChange={e=>this.setState({firstName: e.target.value})}/>
                </div>
                <div className="col-md-6 mb-3">
                  {errors.lastName != '' && <div style={{color: "red"}}>{this.state.errors.lastName}</div>}
                  <label name="lastName">Last name</label>
                  <input type="text" className="form-control" id="lastName" placeholder="" 
                      onChange={e=>this.setState({lastName: e.target.value})}/>
                </div>
              </div>

              {errors.userName != '' && <span style={{color: "red"}}>{this.state.errors.userName}</span>}
              <div className="mb-3">
                <label name="username">Username</label>
                <div className="input-group">
                  <input type="text" className="form-control" id="username" placeholder="Username"
                    onChange={e=>this.setState({userName: e.target.value})}/>
                </div>
              </div>

              <div className="mb-3">
                <label name="email">Email <span className="text-muted">(Optional)</span></label>
                <input type="email" className="form-control" id="email" placeholder="you@example.com"
                  onChange={e=>this.setState({email: e.target.value})}/>

              </div>

              {errors.address != '' && <span style={{color: "red"}}>{this.state.errors.address}</span>}
              <div className="mb-3">
                <label name="address">Address</label>
                <input type="text" className="form-control" id="address" placeholder="1234 Main St"
                  onChange={e=>this.setState({address: e.target.value})}/>
              </div>
              {errors.country != '' && <span style={{color: "red"}}>{this.state.errors.country}</span>}
              {this.state.countries[0] ?
                <div className="mb-3">
                <label name="country">Country</label>
                <select className="custom-select d-block w-100" id="country" defaultValue={"default"}
                  onChange={e=>this.setState({country: e.target.value})}>
                     <option value={"default"} disabled>
                        Select a country...
                    </option>
                  {this.state.countries.map( 
                    country =>
                      <option
                        key={country.id}
                        value={country.name}>
                        {country.name}
                      </option>
                    )}
                  </select>
                </div>
              : null}
              <hr className="mb-4"/>
        
              <button className="btn btn-primary btn-lg btn-block" type="submit">Add Client</button>
            </form>
          </div>
        </div>
      </div>
  )
}
}

export default AddClientComponent;