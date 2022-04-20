package silver.srini.clients.controller;

import org.springframework.web.bind.annotation.*;
import silver.srini.clients.dto.LoginDto;
import silver.srini.clients.entities.Client;
import silver.srini.clients.services.ClientServices;
import silver.srini.clients.services.LoginService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("api/")
public class ClientAppController {

    private final ClientServices clientServices;
    private final LoginService loginService;

    public ClientAppController(ClientServices clientServices, LoginService loginService) {
        this.clientServices = clientServices;
        this.loginService = loginService;
    }

    @GetMapping("clients")
    public List<Client> getClients(@RequestParam Long userId){
        return clientServices.getClients(userId);
    }

    @GetMapping("client")
    public Client getClient(@RequestParam Long id){
        return clientServices.getClient(id);
    }

    @PostMapping("saveclient")
    public void saveClient(@RequestBody Client client){
        clientServices.saveClient(client);
    }

    @GetMapping("login")
    public boolean login(@RequestBody LoginDto login) {
        return loginService.login(login);
    }
}
