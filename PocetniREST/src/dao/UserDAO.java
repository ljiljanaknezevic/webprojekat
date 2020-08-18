package dao;

import java.util.HashMap;

import beans.User;
/***
 * <p>Klasa namenjena da uèita korisnike iz fajla i pruža operacije nad njima (poput pretrage).
 * Korisnici se nalaze u fajlu WebContent/users.txt u obliku: <br>
 * firstName;lastName;email;username;password</p>
 * <p><b>NAPOMENA:</b> Lozinke se u praksi <b>nikada</b> ne snimaju u èistu tekstualnom obliku.</p>
 * @author Lazar
 *
 */

public class UserDAO {
	HashMap<String, User> users = new HashMap<String,User>();
	
	public UserDAO() {
	}
	
	
	public HashMap<String, User> getUsers() {
		return users;
	}
	public void setUsers(HashMap<String, User> users) {
		this.users = users;
	}	

	public User getByUsername(String username) {
		for(User u:users.values()) {
			if(u.getUsername().equals(username)) {
				return u;
			}
		}
		return null;
	}
}
