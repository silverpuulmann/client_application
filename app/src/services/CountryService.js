import axios from "axios";

const COUNTRY_REST_URL = 'http://localhost:8080/api/countries';

class CountryService {

    getCountries(){
        return axios.get(COUNTRY_REST_URL);
    }
}

export default new CountryService();