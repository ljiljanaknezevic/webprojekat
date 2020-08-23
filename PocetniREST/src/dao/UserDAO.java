package dao;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.User;
import beans.enums.Gender;
import beans.enums.Role;
/***
 * <p>Klasa namenjena da uèita korisnike iz fajla i pruža operacije nad njima (poput pretrage).
 * Korisnici se nalaze u fajlu WebContent/users.txt u obliku: <br>
 * firstName;lastName;email;username;password</p>
 * <p><b>NAPOMENA:</b> Lozinke se u praksi <b>nikada</b> ne snimaju u èistu tekstualnom obliku.</p>
 *
 */

public class UserDAO {
	HashMap<String, User> users = new HashMap<String,User>();
	
	
	public UserDAO() {
	}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Može se pristupiti samo iz servleta.
	 */

	public UserDAO(String contextPath) {
	
		loadUsers(contextPath);
		
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
			
			
			//String json = "{  \"username\" : \"jov\", \"password\" : \"jov\", \"ime\" : \"Petar\", \"prezime\" : \"Petrovic\", \"pol\" : MALE}";
		//	objectMapper.writeValue(file,"{ \"username\" : \"pera\", \"password\" : \"pera\", \"ime\" : \"Petar\", \"prezime\" : \"Petrovic\", \"pol\" : \"FEMALE\"}");
			//User[] car = objectMapper.readValue(file, User[].class);
			List<User> car = objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, User.class)); 
			System.out.println("load User: "+car);
			
			//objectMapper.writeValue(new File(contextPath + "/proba.json"), new User("asfas","joasfasv","jov","jov",0,"jov","jov", "jov"));
			
			for(User u : car)
			{
				users.put(u.getUsername(),u);
			}
			
			System.out.println(users);
			
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
	}
	
	public boolean find(String username) {
		if (!users.containsKey(username)) {
			return false;
		}
		
		return true;
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
}
