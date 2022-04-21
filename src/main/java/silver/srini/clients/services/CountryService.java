package silver.srini.clients.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import silver.srini.clients.entities.Country;
import silver.srini.clients.repositories.CountryRepository;

import java.util.List;

@Service
public class CountryService {

    @Autowired
    CountryRepository countryRepository;

    public List<Country> getCountries(){
        return countryRepository.findAll();
    }
}
