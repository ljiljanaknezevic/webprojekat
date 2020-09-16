package beans;

import beans.enums.Gender;
import beans.enums.Role;

public class User {
	protected String username;
	protected String password;
	protected String name;
	protected String surname;
	protected Gender gender;
	protected Role role;
	protected boolean isBlocked = false;
	
	public boolean isBlocked() {
		return isBlocked;
	}


	public void setBlocked(boolean isBlocked) {
		this.isBlocked = isBlocked;
	}


	public User() {
		
	}
	
	
	public User(String username, String password, String name, String surname, Gender gender, Role role) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.role = role;
	}
	public User(String username, String password, String name, String surname, Gender gender, Role role, boolean isBlocked) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.role = role;
		this.isBlocked = isBlocked;
	}
	public User(String username, String password, String name, String surname, Gender gender) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		//this.role = role;
	}

/*	public User(String username, String password, String name, String surname, Gender gender) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.role = Role.ADMIN;
	}*/


	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	

	
}
