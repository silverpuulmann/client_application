package silver.srini.clients.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import silver.srini.clients.dto.AddClientDto;
import silver.srini.clients.entities.Client;
import silver.srini.clients.entities.Country;
import silver.srini.clients.services.ClientServices;
import silver.srini.clients.services.CountryService;
import silver.srini.clients.services.LoginService;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 7200)
@RestController
@RequestMapping("api/")
public class ClientAppController {

    private final ClientServices clientServices;
    private final LoginService loginService;
    private final CountryService countryService;

    public ClientAppController(ClientServices clientServices, LoginService loginService, CountryService countryService) {
        this.clientServices = clientServices;
        this.loginService = loginService;
        this.countryService = countryService;
    }

    @PostMapping("clients")
    public List<Client> getClients(@RequestParam Long userId){
        return clientServices.getClients(userId);
    }

    @GetMapping("client")
    public Client getClient(@RequestParam Long id){
        return clientServices.getClient(id);
    }

    @PostMapping("saveclient")
    public void saveClient(@RequestBody AddClientDto client){
        clientServices.saveClient(client);
    }

    @PostMapping(value = "login", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> login(@RequestParam String username, @RequestParam String password) {
        return loginService.login(username, password);
    }

    @GetMapping("countries")
    public List<Country> getCountries(){
        return countryService.getCountries();
    }
}
