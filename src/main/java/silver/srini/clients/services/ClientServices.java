package silver.srini.clients.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import silver.srini.clients.dto.AddClientDto;
import silver.srini.clients.dto.EditClientDto;
import silver.srini.clients.entities.Client;
import silver.srini.clients.entities.Country;
import silver.srini.clients.repositories.ClientRepository;
import silver.srini.clients.repositories.CountryRepository;

import java.util.List;

@Service
public class ClientServices {

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    CountryRepository countryRepository;

    public List<Client> getClients(Long userId){
        return this.clientRepository.findByCreatedById(userId);
    }

    public Client getClient(Long id){
        return this.clientRepository.getOne(id);
    }

    public void addClient(AddClientDto client) {
        Client newClient = new Client();

        if (client.getCountry() != null && !client.getCountry().equals("default")) {
            Country country = countryRepository.getByName(client.getCountry());
            newClient.setCountryId(country.getId());
        }

        newClient.setFirstName(client.getFirstName());
        newClient.setLastName(client.getLastName());
        newClient.setUserName(client.getUserName());
        newClient.setEmail(client.getEmail());
        newClient.setAddress(client.getAddress());
        newClient.setCreatedById(client.getCreatedById());
        this.clientRepository.save(newClient);
    }

    public void editClient(EditClientDto client) {
        Client oldClient = clientRepository.getById(client.getId());

        if (client.getCountry() != null) {
            Country country = countryRepository.getByName(client.getCountry());
            oldClient.setCountryId(country.getId());
        }

        oldClient.setFirstName(client.getFirstName());
        oldClient.setLastName(client.getLastName());
        oldClient.setUserName(client.getUserName());
        oldClient.setEmail(client.getEmail());
        oldClient.setAddress(client.getAddress());

        this.clientRepository.save(oldClient);
    }
}
