package silver.srini.clients.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import silver.srini.clients.entities.Country;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
    Country getByName(String country);
}
