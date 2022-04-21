package silver.srini.clients.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import silver.srini.clients.entities.Client;
import silver.srini.clients.repositories.ClientRepository;

import java.util.HashMap;
import java.util.Map;

@Service
public class LoginService {

    @Autowired
    ClientRepository clientRepository;

    public Map<String, String> login(String username, String password) {

        Client client = this.clientRepository.findByUserName(username);

        if (client != null && password != null && password.equals(client.getPassword())) {
            Map<String, String> tokenMap = new HashMap<>();
            tokenMap.put("token", "Token123");
            tokenMap.put("userId", client.getId().toString());
            return tokenMap;
        }
        else {
            return null;
        }
    }
}
