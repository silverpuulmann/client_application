package silver.srini.clients.repositories;

import org.springframework.data.repository.CrudRepository;
import silver.srini.clients.entities.Country;

public interface CountryRepository extends CrudRepository<Country, Long> {
}
