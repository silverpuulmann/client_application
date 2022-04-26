import axios from "axios";

const LOGIN_REST_URL = 'http://localhost:8080/api/login';

class LoginService {

    login(user, pwd){
        return axios.post(LOGIN_REST_URL, 
            null,
            {params: {
                username: user,
                password: pwd
            }
            });
    }
}

export default new LoginService();