package services;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

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
	}

	
	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(User user, @Context HttpServletRequest request) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		String message = userDao.findUser(user.getUsername(), user.getPassword());
		if(message.equals("bas taj postoji u bazi")) {
			User userr = userDao.findByUsername(user.getUsername());
			request.getSession().setAttribute("user", userr);
			User u = new User();
			u.setUsername(user.getUsername());
			u.setName(user.getName());
			u.setRole(user.getRole());
			return Response.status(200).build();
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
			}
		}
		else
		{
			user.setRole(Role.GUEST);
			
		}

		UserDAO dao=(UserDAO) ctx.getAttribute("userDAO");

		boolean loggedUser=dao.find(user.getUsername());

		
		if(loggedUser==true) {
			
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
//	@Consumes(MediaType.APPLICATION_JSON)
	public List<User> getAllUsers(@Context HttpServletRequest request){
		//System.out.println("USAO JE U METODU");
		User user = (User) request.getSession().getAttribute("user");
		//System.out.println(user.getRole());
		UserDAO kdao = (UserDAO) ctx.getAttribute("userDAO");
		//System.out.println("******************************");
		if(user.getRole().toString().equals("GUEST")) {
			System.out.println("ADMIN JE");
			return kdao.getAll();
		}
		else if(user.getRole()==Role.HOST)
		  {
			System.out.println("HOST JE");
		  	return kdao.getHostsUsers(user);
		  }
		else {
			 System.out.println("GOST JE");
			return null;
		}

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
		System.out.println("*****************************");
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
	@Path("/searchUsername")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response searchByUsername(SearchUsers parm,@Context HttpServletRequest request) {
	UserDAO dao=(UserDAO) ctx.getAttribute("userDAO");
	List<User> retval=new ArrayList<User>();
	if(parm!=null && dao!=null)
	{
		for(User u:dao.getAll())
		{
			if(!u.getUsername().toLowerCase().trim().contains(parm.getUsername().trim()) && !parm.getUsername().trim().isEmpty()) {
				continue;
			}
		/*	if(!u.getName().toLowerCase().trim().contains(parm.getName().trim()) && !parm.getName().trim().isEmpty()) {
				continue;
			}
			if(!u.getSurname().toLowerCase().trim().contains(parm.getSurname().trim()) && !parm.getSurname().trim().isEmpty()) {
				continue;
			}*/
			
			retval.add(u);
		}
		return Response.ok(retval).status(200).build();
	}else {
		return Response.status(400).build();
	}
	
	
}
}
	
