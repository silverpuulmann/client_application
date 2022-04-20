package silver.srini.clients.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Client {

    @Id
    Long Id;

    String firstName;

    String lastName;

    String userName;

    String email;

    String address;

    @OneToOne(fetch = FetchType.LAZY)
    Country country;

    String password;
}
