import React from "react";
import ClientService from "../services/ClientService";
import { Link } from "react-router-dom";
import { Row, Container, Col } from "react-bootstrap";
import * as ReactDOM from 'react-dom';

class ClientComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            clients:[],
            user: '',
            show: false
        };
    }

    componentDidMount(){
        if (this.props.userId !== undefined) {
            localStorage.setItem('userId', this.props.userId);
        }
        ClientService.getClients(localStorage.getItem('userId')).then((response) => {
            this.setState({clients: response.data})
        });
    }

    logOut(){
        sessionStorage.removeItem('token');
        ReactDOM.render();
      }

    render (){
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
                                    <h2>Clients</h2>
                                </div>
                            </Col>
                            <Col className="align-items-center" style={{display: 'flex', justifyContent: 'right'}}>
                                <Link to="/" className="btn btn-primary btn-lg btn-block" style={{backgroundColor: 'red', borderColor: 'red'}}
                                            onClick={this.logOut}>
                                    Log out
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                            <Link to="/addclient" className="btn btn-primary btn-lg btn-block" style={{textAlign: 'left', marginBottom: 20}}>Add client</Link>
                        <div className="row">
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First name</th>
                                        <th scope="col">Last name</th>
                                        <th scope="col">Username</th>
                                        <th></th>
                                        </tr>
                                    </thead>
                                    {this.state.clients[0] ?
                                        <tbody style={{verticalAlign: 'middle', marginBottom: 20}}>
                                            {this.state.clients.map(
                                                client =>
                                                <tr key = {client.id}>
                                                    <td>{client.id}</td>
                                                    <td>{client.firstName}</td>
                                                    <td>{client.lastName}</td>
                                                    <td>{client.userName}</td>
                                                    <td style={{textAlign: 'right'}}>
                                                            <Link to="/editclient" state={client} className="btn btn-primary btn-lg btn-block">Edit client</Link>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    :   <tbody>
                                            <tr>
                                                <td>
                                                    <div>No clients found!</div>
                                                </td>
                                            </tr>
                                        </tbody>}
                                </table>
                        </div>      
                </div>
        )
    }
}

export default ClientComponent;