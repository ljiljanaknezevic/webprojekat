package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
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

@Path("")
public class UserService {

	@Context
	ServletContext ctx;
	
	public UserService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("users") == null) {
			ArrayList<User> users = new ArrayList<User>();
			
			users.add(new User("admin", "admin","Angela", "Angelic",Gender.FEMALE ));
			ctx.setAttribute("users", users);
		}
	}
	// @GET /users --> vrati sve usere
		// @POST /users --> kreira novog
		// users/{bos} @GET --> vraca 1
		
	
	@POST
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
	}
	
}
