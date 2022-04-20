package silver.srini.clients.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import silver.srini.clients.dto.LoginDto;
import silver.srini.clients.entities.Client;
import silver.srini.clients.repositories.ClientRepository;

@Service
public class LoginService {

    @Autowired
    ClientRepository clientRepository;

    public boolean login(LoginDto login) {

        Client client = this.clientRepository.findByUserName(login.getUsername());
        String password = client.getPassword();

        if (password != null && password.equals(login.getPassword())) {
            return true;
        }
        else {
            return false;
        }
    }
}
