package dao;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
	
	public void saveUser(User u,String contextPath)
	{
		try {
			
		File file=new File(contextPath+"/users.json");
		
		ObjectMapper mapper=new ObjectMapper();
		mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
		mapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
		ArrayList<User> userList=new ArrayList<>();
		
		//userList.add(new User("pera", "pera", "ime", "prezime",Gender.FEMALE,Role.ADMIN));
		//userList.add(new User("jov","jov","jovana","jov",0,"0605020313","asfa@gmail.com", "06-06-1985"));
		//mapper.writeValue(new File(contextPath + "/users.json"), userList);
		
		
		
		User[] pom=mapper.readValue(file, User[].class);
		
		for(User g:pom) {
			userList.add(g);	
		}
		
		
		userList.add(u);
		mapper.writeValue(new File(contextPath+"/users.json"), userList);
		User r=users.put(u.getUsername(), u);
	
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
			//proba.add(new User("pera", "pera", "Petar", "Petric",Gender.FEMALE,Role.ADMIN));
			//objectMapper.writeValue(new File(contextPath + "/users.json"), proba);
			
			
			//String json = "{  \"username\" : \"jov\", \"password\" : \"jov\", \"ime\" : \"Petar\", \"prezime\" : \"Petrovic\", \"pol\" : MALE}";
		//	objectMapper.writeValue(file,"{ \"username\" : \"pera\", \"password\" : \"pera\", \"ime\" : \"Petar\", \"prezime\" : \"Petrovic\", \"pol\" : \"FEMALE\"}");
			User[] car = objectMapper.readValue(file, User[].class);
			//List<User> car = objectMapper.readValue(json, objectMapper.getTypeFactory().constructCollectionType(List.class, User.class)); 
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
//LUKINO
/*
 * private void loadUsers(String contextPath) {
 
		
		try
		{
			File file = new File(contextPath + "/users.json");
			System.out.println(contextPath);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
			
			
			ArrayList<User> proba=new ArrayList<>();
			
			/*OVO JE ZA DEFAULT VREDNOSTI
			proba.add(new User("pera","pera","Petar","Petrovic",0,"06055555","fasf@casc.com", "08-09-1995"));
			proba.add(new User("jov","jov","jovana","jov",1,"0605020313","asfa@gmail.com", "06-06-1985"));
			objectMapper.writeValue(new File(contextPath + "/users.json"), proba);
			*/
			
		//	String json = "{  \"username\" : \"jov\", \"password\" : \"jov\", \"ime\" : \"Petar\", \"prezime\" : \"Petrovic\", \"uloga\" : 0, \"telefon\" : \"06055555\", \"email\" : \"afasf@casc.com\", \"datum\" : \"08-09-1995\"}";
			//objectMapper.writeValue(file,"{ \"username\" : \"pera\", \"password\" : \"pera\", \"ime\" : \"Petar\", \"prezime\" : \"Petrovic\", \"uloga\" : 0, \"telefon\" : \"06055555\", \"email\" : \"afasf@casc.com\", \"datum\" : \"08-09-1995\"}");
	/*		User[] car = objectMapper.readValue(file, User[].class);
			//List<User> car = objectMapper.readValue(json, objectMapper.getTypeFactory().constructCollectionType(List.class, User.class)); 
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
}*/
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
}
