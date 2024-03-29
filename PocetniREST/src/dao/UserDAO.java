package dao;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;


import beans.User;
import beans.enums.Gender;
import beans.enums.Role;
/***
 * <p>Klasa namenjena da u�ita korisnike iz fajla i pru�a operacije nad njima (poput pretrage).
 * Korisnici se nalaze u fajlu WebContent/users.txt u obliku: <br>
 * firstName;lastName;email;username;password</p>
 * <p><b>NAPOMENA:</b> Lozinke se u praksi <b>nikada</b> ne snimaju u �istu tekstualnom obliku.</p>
 *
 */

public class UserDAO {
	HashMap<String, User> users = new HashMap<String,User>();
	
	
	public UserDAO() {
	}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */

	public UserDAO(String contextPath) {
	
		loadUsers(contextPath);
		//loadAdmins
		
	}
	public Collection<User> getUsersLogin() {
		return users.values();
	}
	
	public HashMap<String, User> getUsers() {
		return users;
	}
	public void setUsers(HashMap<String, User> users) {
		this.users = users;
	}	

	public User findByUsername(String username) {
		for(User u:users.values()) {
			if(u.getUsername().equals(username)) {
				return u;
			}
		}
		return null;
	}
	
	public void saveUser(String contextPath)
	{
		ObjectMapper mapper=new ObjectMapper();
		List<User> userList=new ArrayList<>();
		System.out.println("----------------------------");
		userList.addAll(users.values());
		try {
			
		File file=new File(contextPath+"/users.json");
		
		mapper.writerWithDefaultPrettyPrinter().writeValue(file, userList);
	
		}catch(IOException e) {
			e.printStackTrace();
		}finally {
			
		}
	}
	private void loadUsers(String contextPath) {
		
		try
		{
			File file = new File(contextPath + "/users.json");
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
			
			
			ArrayList<User> proba=new ArrayList<>();
			
			//OVO JE ZA DEFAULT VREDNOSTI
		//	proba.add(new User("pera", "pera", "Petar", "Petric",Gender.FEMALE,Role.ADMIN));
			//objectMapper.writeValue(new File(contextPath + "/users.json"), proba);
			
			
			if(file.exists()) {
				List<User> car = objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, User.class)); 
				for(User u : car)
				{
					users.put(u.getUsername(),u);
				}
			}
			
		}
		catch (Exception ex) {
			System.out.println(ex);
			ex.printStackTrace();
		} finally {
			
		}
	}

	public void addToMap(User user) {
		if(users.values() !=null) {
			if(!users.containsKey(user.getUsername()))
				 users.put(user.getUsername(), user);
		}else
			 users.put(user.getUsername(), user);
		
	}
	
	public String findUser(String username, String password) {
		String message = "bas taj postoji u bazi";
		if(!users.containsKey(username)) {
			message = "doesnt exists username";
		}	
		else if (!users.get(username).getPassword().equals(password)) {
			return message = "bad password";
		}
		return message ;
		/*if(!users.containsKey(username)) {
			return null;
		}	
		else if (!users.get(username).getPassword().equals(password)) {
			return null;
		}
		return findByUsername(username) ;*/
	}
	
	public boolean find(String username) {
		if (!users.containsKey(username)) {
			return false;
		}
		
		return true;
	}
	
	public ArrayList<User> getAll() {
		ArrayList<User> list = new ArrayList<>();
		list.addAll(users.values());
		return list;

	}
	
	public User editUser(User user, String contextPath) {
		System.out.println(user.getName());
		for (String key : users.keySet()) {
		    if(key.equals(user.getUsername())) {
		    	user.setName(user.getName());
		    	user.setGender(user.getGender());
		    	user.setSurname(user.getSurname());
		    	users.replace(user.getUsername(), user);
		    	saveUser(contextPath);
		    	return user;
		    }
		}
		return null;

	}
	public User editUserPassword(User user, String contextPath) {
		
		String newPassword = user.getPassword();
		User copyUser = findByUsername(user.getUsername());
		for (String key : users.keySet()) {
		    if(key.equals(user.getUsername())) {
		    	System.out.println("edit user password  ~~~~~~~~~~~~~~");
		    	
		    	copyUser.setPassword(user.getPassword());
		    	users.put(copyUser.getUsername(), copyUser);
		    	saveUser(contextPath);
		    	return user;
		    }
		}
		return null;
	}

	public List<User> getHostsUsers(User user) {
		ArrayList<User> list = new ArrayList<>();
		for (Object value : users.values()) {
			//TODO:USLOV JE DA JE GOST REZERVISAO APARTMAN KOD DOMACINA
		   list.add((User) value);
		}
	//	list.addAll(users.values());
		return list;
		
	}
	
	public ArrayList<User> getUsersForHost(ArrayList<String> allUsernames) {
		ArrayList<User> list = new ArrayList<>();
		for(String username : allUsernames ) {
			list.add(users.get(username));
		}
		return list;

	}

}
