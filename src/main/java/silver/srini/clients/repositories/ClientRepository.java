package silver.srini.clients.repositories;

import org.springframework.data.repository.CrudRepository;
import silver.srini.clients.entities.Client;

public interface ClientRepository extends CrudRepository<Client, Long> {
}
