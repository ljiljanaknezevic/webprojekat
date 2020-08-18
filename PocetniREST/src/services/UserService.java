package services;

import java.io.File;
import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import beans.User;
import beans.enums.Gender;
import beans.enums.Role;
import dao.UserDAO;

@Path("")
public class UserService {

	@Context
	ServletContext ctx;
	
	public UserService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("userDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
	    	ArrayList<User> users = new ArrayList<User>();
	    	User u1 = new User("123XD", "Marko", "markovic","pre",Gender.FEMALE);
		    users.add(u1);
	    	users.add(u1);
	    
			ctx.setAttribute("users", users);
		}
	}
	// @GET /users --> vrati sve usere
		// @POST /users --> kreira novog
		// users/{bos} @GET --> vraca 1
		
	
	/*@POST
	@Path("/users")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createNew(User user) {	
		ArrayList<User> users = (ArrayList<User>) ctx.getAttribute("users");
		for(User u: users) {
			if(u.getUsername().equals(user.getUsername())) {
				return Response.status(Status.BAD_REQUEST).entity("user with given insurance number exists").build();
			}
		}
		users.add(user);
		ctx.setAttribute("users", users);
		return Response.status(200).build();
	}*/
	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(User user, @Context HttpServletRequest request) {
		HttpSession session = request.getSession();
		//UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		ArrayList<User> users = (ArrayList<User>) ctx.getAttribute("users");
		
		for(User u:users) {
			if(u.getUsername().equals(user.getUsername())) {
				return Response.status(Status.BAD_REQUEST).entity("user with given insurance number exists").build();
				
			}
		}
		/*if(session.getAttribute("user") != null) {
			return Response.status(400).entity("Already logged in.").build();
		}
		if(user.getUsername().trim().isEmpty() || user.getPassword().trim().isEmpty()) {
			return Response.status(400).entity("Enter password and username.").build();
		}
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		User newUser = dao.getByUsername(user.getUsername());
		if(newUser != null && newUser.getPassword().equals(user.getSurname())) {
			session.setAttribute("user",newUser);
			User copyUser = new User();
			copyUser.setUsername(newUser.getUsername());
			copyUser.setName(newUser.getName());
			copyUser.setRole(newUser.getRole());
			return Response.ok(copyUser).status(200).build();
			
		}else
			return Response.status(400).entity("Username doesnt exists.").build();
		*/
		return Response.status(200).build();
}
	/*
	@GET
	@Path("/currentUser")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User login(@Context HttpServletRequest request) {
		return (User) request.getSession().getAttribute("user");
	}
	*/
	
}
