package silver.srini.clients.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddClientDto {
    String firstName;

    String lastName;

    String userName;

    String email;

    String address;

    String country;

    Long createdById;
}
