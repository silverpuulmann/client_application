package silver.srini.clients.mapper;

import org.mapstruct.Mapper;
import silver.srini.clients.dto.ClientDTO;
import silver.srini.clients.entities.Client;

@Mapper(componentModel = "spring")
public interface ClientMapper {

    ClientDTO clientEntityToDto(Client client);
    Client clientDtoToEntity(ClientDTO clientDTO);

}
