import axios from "axios";

const CLIENT_REST_URL = 'http://localhost:8080/api/clients';
const ADD_CLIENT_REST_URL = 'http://localhost:8080/api/addclient';
const EDIT_CLIENT_REST_URL = 'http://localhost:8080/api/editclient';

class ClientService {

    getClients(userId){
        return axios.get(CLIENT_REST_URL, 
            {params: {
                userId: userId
            }
        });
    }

    addClient(firstName,lastName,userName,email,address,country,user){
        return axios.post(ADD_CLIENT_REST_URL,
            {
                firstName,
                lastName,
                userName,
                email,
                address,
                country,
                createdById:user
            },
            {
                headers: {
                Authorization: ``,
                'Content-Type': 'application/json'
            }}
            )
    }

    editClient(id, firstName,lastName,userName,email,address,country,user){
        return axios.post(EDIT_CLIENT_REST_URL,
            {
                id,
                firstName,
                lastName,
                userName,
                email,
                address,
                country,
                createdById:user
            },
            {
                headers: {
                Authorization: ``,
                'Content-Type': 'application/json'
            }}
            )
    }
}

export default new ClientService();