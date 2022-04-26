import React from 'react';
import { Link } from 'react-router-dom';
import ClientService from '../services/ClientService';
import CountryService from "../services/CountryService";
import { Row, Container, Col, Alert } from "react-bootstrap";

class EditClientComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        id: '',
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        address: '',
        country: '',
        countries: '',
        successMsg: false,
        errMsg: false,
        errors: {firstName: '', lastName: '', userName: '', address: '', country: ''}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
}

getClientData(){
  this.setState({id: this.props.state.id, firstName: this.props.state.firstName, lastName: this.props.state.lastName, userName: this.props.state.userName,
    email: this.props.state.email, address: this.props.state.address, country: this.props.state.countryId})
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
  if (!hasErrors){
    this.setState({successMsg: false, errMsg: false});
    const response = ClientService.editClient(this.state.id, this.state.firstName, this.state.lastName, this.state.userName,
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

getCountryById(id){
  //on first load country id is numeric, otherwise it is the name of the country
  if (!isNaN(Number(id))){
    const findCountry = this.state.countries.find(
      (country) => country.id === this.state.country
    ).name;
    this.setState({country: findCountry})
    return findCountry;
  }
  else {
    return id;
  }
}

componentDidMount(){
  if(this.props.state.id !== null) {
    this.getClientData();
  }
  if (this.props.userId !== undefined) {
      localStorage.setItem('userId', this.props.userId);
      this.setState({user: this.props.userId});
  }
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
                          <h2>Edit client data</h2>
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
                <Alert.Heading style={{textAlign: 'center'}}>Failed to save client data!</Alert.Heading> 
              </Alert>  
            </Container>  
            </div>  
          : null}

          {this.state.successMsg === true ?
          <div className="App">  
            <Container className='p-4'>  
              <Alert variant="success" onClose={() => this.setState({successMsg: false})} dismissible >  
                <Alert.Heading style={{textAlign: 'center'}}>Client data saved!</Alert.Heading> 
              </Alert>  
            </Container>  
            </div>  
          : null}
      <Link to="/" className="btn btn-primary btn-lg btn-block" style={{marginBottom: 20, minWidth:120}}>Back</Link>
          <div className="col-md-12 order-md-1">
            <form className="needs-validation" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  {errors.firstName != '' && <div style={{color: "red"}}>{this.state.errors.firstName}</div>}
                  <label>First name</label>
                  <input type="text" className="form-control" id="firstName" value={this.state.firstName}
                     onChange={e=>this.setState({firstName: e.target.value})}/>
                </div>
               
                <div className="col-md-6 mb-3">
                  {errors.lastName != '' && <div style={{color: "red"}}>{this.state.errors.lastName}</div>}
                  <label>Last name</label>
                  <input type="text" className="form-control" id="lastName" value={this.state.lastName} 
                      onChange={e=>this.setState({lastName: e.target.value})}/>
                </div>
              </div>

              {errors.userName != '' && <span style={{color: "red"}}>{this.state.errors.userName}</span>}
              <div className="mb-3">
                <label>Username</label>
                <div className="input-group">
                  <input type="text" className="form-control" id="username" value={this.state.userName}
                    onChange={e=>this.setState({userName: e.target.value})}/>
                </div>
              </div>

              <div className="mb-3">
                <label>Email <span className="text-muted">(Optional)</span></label>
                <input type="email" className="form-control" id="email" value={this.state.email}
                  onChange={e=>this.setState({email: e.target.value})}/>

              </div>

              {errors.address != '' && <span style={{color: "red"}}>{this.state.errors.address}</span>}
              <div className="mb-3">
                <label>Address</label>
                <input type="text" className="form-control" id="address" value={this.state.address}
                  onChange={e=>this.setState({address: e.target.value})}/>
              </div>
              {errors.country != '' && <span style={{color: "red"}}>{this.state.errors.country}</span>}
              {this.state.countries[0] ?
                <div className="mb-3">
                <label>Country</label>
                <select className="custom-select d-block w-100" id="country" defaultValue={this.state.country ?
                                                                                this.getCountryById(this.state.country)
                                                                                : "default"}
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
              <button className="btn btn-primary btn-lg btn-block" type="submit" style={{minWidth:120}}>Save</button>
            </form>
          </div>
    </div>
  )
}
}

export default EditClientComponent;