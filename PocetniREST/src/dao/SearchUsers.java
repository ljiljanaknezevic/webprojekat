package dao;

public class SearchUsers {
	String username;
	String name;
	String surname;
	public SearchUsers() {
		super();
	}
	public SearchUsers(String username, String name, String surname) {
		super();
		this.username = username;
		this.name = name;
		this.surname = surname;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
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
	
	
}
