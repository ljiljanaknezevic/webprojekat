package services;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import beans.Apartment;
import beans.User;
import beans.enums.Gender;
import beans.enums.Role;
import dao.ApartmentDAO;
import dao.ReservationDAO;
import dao.SearchUsers;
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
		//ctx.getAtributes(admins)-lista administratora
		//if ctx.getAt==null{
		
		//}
	}

	
	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(User user, @Context HttpServletRequest request) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		for(User u:userDao.getUsersLogin()) {
			if(user.getUsername().equals(u.getUsername()) && user.getPassword().equals(u.getPassword()))
			{
				
				if(!u.isBlocked()) {
					request.getSession().setAttribute("user", u);
					return Response.ok(u).build();
				}else {
					return Response.status(Status.BAD_REQUEST).entity("Your account is blocked.").build();

				}
			}
		}
		boolean isExists =false;
		for(User u:userDao.getUsersLogin()) {
			if(u.getUsername().equals(user.getUsername()))
			{
				isExists = true;
				return Response.status(Status.BAD_REQUEST).entity("The password you entered is incorrect. Try again, or choose another login option.").build();
			}
		}
		if(!isExists)
			return Response.status(Status.BAD_REQUEST).entity("There isn’t an account with this username. Please try another username.").build();
		else
			return Response.serverError().build();
		
		
	/*	String message = userDao.findUser(user.getUsername(), user.getPassword());
=======
	
		String message = userDao.findUser(user.getUsername(), user.getPassword());
>>>>>>> c296265519a7800ee0ebfb590499521bd6f9a26d
		if(message.equals("bas taj postoji u bazi")) {
			User userr = userDao.findByUsername(user.getUsername());
			request.getSession().setAttribute("user", userr);
			User u = new User();
			u.setUsername(user.getUsername());
			u.setName(user.getName());
			u.setRole(user.getRole());
			return Response.ok(u).build();
		}
		else if(message.equals("bad password"))
			return Response.status(Status.BAD_REQUEST).entity("The password you entered is incorrect. Try again, or choose another login option.").build();
		else if (message.equals("doesnt exists username"))
			return Response.status(Status.BAD_REQUEST).entity("There isn’t an account with this username. Please try another username.").build();
		else 
			return Response.status(Status.BAD_REQUEST).entity("bad requst").build();
	
		/*User loggedUser = userDao.findUser(user.getUsername(), user.getPassword());
		if (loggedUser == null)
			return null;
		request.getSession().setAttribute("user", loggedUser);
		return loggedUser;*/
	}
	
	@POST
	@Path("/registration")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response registration(User user, @Context HttpServletRequest request) {
		User AloggedUser=(User) request.getSession().getAttribute("user");
		//System.out.println("****************************************************");
		if(AloggedUser!=null) {
			if(AloggedUser.getRole().toString().equals("ADMIN"))
			{
				System.out.println("LOGUJE GA ADMIN");
				user.setRole(Role.HOST);
				
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
			return Response.status(403).build();
		}
		else
		{
			user.setRole(Role.GUEST);
			
			UserDAO dao=(UserDAO) ctx.getAttribute("userDAO");

			boolean loggedUser=dao.find(user.getUsername());

			
			if(loggedUser) {
				
				return Response.status(400).entity("Username alerady exists").build();
			}
			
			String contextPath=ctx.getRealPath("");
			dao.addToMap(user);
			dao.saveUser(contextPath);
			///////////////////////////////////////////
			User userr = dao.findByUsername(user.getUsername());
			request.getSession().setAttribute("user", userr);
			User u = new User();
			u.setUsername(user.getUsername());
			u.setName(user.getName());
			u.setRole(user.getRole());
			/////////////////////////////////////////////
			
			
			return Response.status(200).build();
		}

		
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
	
	
	@GET
	@Path("/allUsers")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllUsers() {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		if(dao.getAll() != null)
			return Response.ok(dao.getAll()).status(200).build();
		else 
			return Response.status(400).build();
	}
	
	
	@POST
	@Path("/userEdit")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response userEdit(User user, @Context HttpServletRequest request) {
		UserDAO dao=(UserDAO) ctx.getAttribute("userDAO");
		for(User u:dao.getUsers().values()) {
			if(u.getUsername().equals(user.getUsername())) {
				String contextPath=ctx.getRealPath("");
				User us =dao.editUser(user, contextPath);
				request.getSession().setAttribute("user",us );
				return Response.status(200).build();
			}
		}
		return Response.status(400).build();
	}
	

	@POST
	@Path("/userEditPassword")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response userEditPassword(User user, @Context HttpServletRequest request) {
		UserDAO dao=(UserDAO) ctx.getAttribute("userDAO");
		System.out.println("*************~~~~~~~~~******");
		System.out.println(user.getPassword());
		System.out.println(user.getUsername());
		for(User u:dao.getUsers().values()) {
			if(u.getUsername().equals(user.getUsername())) {
				String contextPath=ctx.getRealPath("");
				User us =dao.editUserPassword(user, contextPath);
				request.getSession().setAttribute("user",us );
				return Response.status(200).build();
			}
		}
		return Response.status(400).build();

	}

	@POST
	@Path("/blockUser{id}")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Response blockUser(@PathParam("id") String username,@Context HttpServletRequest request) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		User u = dao.findByUsername(username);
			if(u != null) {
				if(u.isBlocked()) {
					u.setBlocked(false);
				
				}else {
					u.setBlocked(true);
				//	request.getSession().setAttribute("user",u );

				}
			String contextPath = ctx.getRealPath("");
			dao.saveUser(contextPath);
			return Response.ok(dao.getAll()).build();
			}
		return Response.status(400).build();
		
	}
}
