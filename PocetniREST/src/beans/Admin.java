package beans;
import beans.enums.Gender;
import beans.enums.Role;

public class Admin extends User{

	public Admin() {
		super();
	}

	public Admin(String username, String password, String name, String surname, Gender gender, Role role) {
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.role = role.ADMIN;
	}
	
}
