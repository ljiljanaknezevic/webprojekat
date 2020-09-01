package services;

<<<<<<< HEAD
import java.io.InputStream;
=======
import java.util.ArrayList;
>>>>>>> cf01799faffd7b17cca206f152d2159e3b03dbe8
import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
<<<<<<< HEAD
import javax.ws.rs.FormParam;
=======
import javax.ws.rs.GET;
>>>>>>> cf01799faffd7b17cca206f152d2159e3b03dbe8
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.sun.xml.internal.bind.v2.runtime.unmarshaller.XsiNilLoader.Array;

import beans.Apartment;
import beans.User;
import dao.ApartmentDAO;

@Path("")
public class ApartmentService {

	@Context
	ServletContext ctx;
	
	public ApartmentService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("apartmentDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("apartmentDAO", new ApartmentDAO(contextPath));
		}
	}
	
	
	//KORISTI ZA ADMINA, JER ON VIDI SVE APARTMANE ja mislim .milicad
	@GET
	@Path("/getAllApartments")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllApart() {
		ApartmentDAO dao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		return Response.ok(dao.getAllApartments()).build();
	}
	
	// host view apartments
	@GET
	@Path("/getHostsApartments")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getHostsApartments(@Context HttpServletRequest request) {
		User u = (User)request.getSession().getAttribute("user");
		ApartmentDAO dao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		return Response.ok(	dao.getHostsApartments(u.getUsername())	).build();
	}
	
	@POST
	@Path("/addApartment")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addApartment(Apartment ap) {
		System.out.println("USAO JE ");
		ApartmentDAO dao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		
		String contextPath = ctx.getRealPath("");
		ap.setId(UUID.randomUUID());
<<<<<<< HEAD
		System.out.println(ap.getHostUsername() + " "+ap.getNumberOfGuest() + " "
				+ap.getNumberOfRooms() + " "+ ap.getPrice() + " "+ap.getAmenities()+" " +ap.getDates()+" "+ap.getType() + " "
				+ap.getId()+ap.getImages());
=======
>>>>>>> cf01799faffd7b17cca206f152d2159e3b03dbe8
		dao.addToMap(ap);
		dao.saveApartments(contextPath);
		return Response.ok(dao.getHostsApartments(ap.getHostUsername())).build();
	}
	
	@POST
	@Path("/deleteApartment{id}")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteApartment(@PathParam("id") UUID id) {
		ApartmentDAO dao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		Apartment a = dao.findApartment(id);
		String contextPath = ctx.getRealPath("");
		a.setDeleted(true);
		dao.saveApartments(contextPath);
		return Response.ok(dao.getHostsApartments(a.getHostUsername())).build();
	}
	
}
