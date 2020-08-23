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
			ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}
	}

	
	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(User user, @Context HttpServletRequest request) {
		HttpSession session = request.getSession();
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		String message = userDao.findUser(user.getUsername(), user.getPassword());
		if(message.equals("bas taj postoji u bazi")) {
			User userr = userDao.findByUsername(user.getUsername());
			request.getSession().setAttribute("user", userr);
			return Response.status(200).build();
		}
		else if(message.equals("bad password"))
			return Response.status(Status.BAD_REQUEST).entity("The password you entered is incorrect. Try again, or choose another login option.").build();
		else if (message.equals("doesnt exists username"))
			return Response.status(Status.BAD_REQUEST).entity("There isn�t an account with this username. Please try another username.").build();
		else 
			return Response.status(Status.BAD_REQUEST).entity("bad requst").build();
	}
	
	@POST
	@Path("/registration")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response registration(User user, @Context HttpServletRequest reques) {
//PRI USPESNOJ REGISTRACIJI SE PREBACUJE NA SLEDECU STRANICU I TREBA ZAPOCETI SESIJU NOVU?
		user.setRole(Role.GUEST);
		
		UserDAO dao=(UserDAO) ctx.getAttribute("userDAO");

		boolean loggedUser=dao.find(user.getUsername());

		
		if(loggedUser==true) {
			
			return Response.status(400).entity("Username alerady exists").build();
		}
		
		String contextPath=ctx.getRealPath("");
		dao.addToMap(user);
		dao.saveUser(contextPath);
		return Response.status(200).build();
	}
	
	@GET
	@Path("/currentUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User login(@Context HttpServletRequest request) {
		return (User) request.getSession().getAttribute("user");
	}
	
	@GET
	@Path("/logout")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response logout(@Context HttpServletRequest request) {
		request.getSession().invalidate();
		return Response.status(200).build();
	}
	
	
	@POST
	@Path("/userEdit")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response userEdit(User user, @Context HttpServletRequest request) {
		UserDAO dao=(UserDAO) ctx.getAttribute("userDAO");
		String contextPath=ctx.getRealPath("");
		User u =dao.editUser(user, contextPath);
		request.getSession().setAttribute("user",u );
	
		return Response.status(200).build();
	}
}
