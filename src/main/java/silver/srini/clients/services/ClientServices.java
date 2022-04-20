package silver.srini.clients.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import silver.srini.clients.entities.Client;
import silver.srini.clients.repositories.ClientRepository;

import java.util.List;

@Service
public class ClientServices {

    @Autowired
    ClientRepository clientRepository;

    public List<Client> getClients(Long userId){
        return this.clientRepository.findByCreatedById(userId);
    }

    public Client getClient(Long id){
        return this.clientRepository.getOne(id);
    }

    public void saveClient(Client client) {
        this.clientRepository.save(client);
    }
}
