package services;

import java.io.InputStream;

import java.util.ArrayList;

import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;

import javax.ws.rs.FormParam;

import javax.ws.rs.GET;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.sun.xml.internal.bind.v2.runtime.unmarshaller.XsiNilLoader.Array;

import beans.Apartment;
import beans.Comment;
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
	
	@GET
	@Path("/allActiveApartments")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllActiveApartments(@Context HttpServletRequest request) {
		ApartmentDAO dao=(ApartmentDAO) ctx.getAttribute("apartmentDAO");
		return Response.ok(dao.getAllActiveApartments()).build();
	}
	@GET
	@Path("/getApartmentById{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getApartmentById(@PathParam("id") UUID id) {
		ApartmentDAO dao=(ApartmentDAO) ctx.getAttribute("apartmentDAO");
		return Response.ok(dao.findApartment(id)).build();
	}

	
	
	
	@POST
	@Path("/addApartment")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addApartment(Apartment ap) {
		//System.out.println("USAO JE ");
		
		ApartmentDAO dao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		
		String contextPath = ctx.getRealPath("");
		ap.setId(UUID.randomUUID());
		dao.addToMap(ap);
		dao.saveApartments(contextPath);
		return Response.ok(dao.getHostsApartments(ap.getHostUsername())).build();
	}
	@POST
	@Path("/hostChangeViewOfComment{id}")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Response hostChangeViewOfComment(@PathParam("id") UUID id,@Context HttpServletRequest request) {
		ApartmentDAO dao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		User u=(User)request.getSession().getAttribute("user");

		Apartment a = dao.findApartmentByCommentId(id);
		for(Comment c:a.getComments()) {
			if(c.getCommentId().equals(id)) {
				if(c.isHostApproved())
					c.setHostApproved(false);
				else
					c.setHostApproved(true);
			}
		}
		String contextPath = ctx.getRealPath("");
		dao.saveApartments(contextPath);
		return Response.ok(dao.findApartment(a.getId())).build();
	}
	@POST
	@Path("/editApartment")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response editApartment(Apartment ap) {
		ApartmentDAO dao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		String contextPath = ctx.getRealPath("");
		System.out.println(ap.getStatus());
		Apartment a =dao.findApartment(ap.getId());
		a.setAmenities(ap.getAmenities());
		a.setCheckIn(ap.getCheckIn());
		a.setCheckOut(ap.getCheckOut());
		a.setStatus(ap.getStatus());
		a.setDates(ap.getDates());
		a.setImages(ap.getImages());
		a.setLocation(ap.getLocation());
		a.setNumberOfGuest(ap.getNumberOfGuest());
		a.setNumberOfRooms(ap.getNumberOfRooms());
		a.setPrice(ap.getPrice());
		a.setType(ap.getType());
		dao.saveApartments(contextPath);
		return Response.ok(dao.getAllApartments()).build();
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
		return Response.ok(dao.getAllApartments()).build();
	}
	
	@POST
	@Path("/leaveComment")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response leaveComment(Comment c,@Context HttpServletRequest request) {
		ArrayList<Comment> newComment=new ArrayList<Comment>();
		newComment.add(c);
		ApartmentDAO dao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		User u=(User)request.getSession().getAttribute("user");
		c.setGuest(u.getUsername());
		
		//PRONADJEM APARTMAN SA DATIM ID,I SMESTIM MU KOMENTAR U NJEGOV NIZ KOMENTARA
		Apartment a = dao.findApartment(c.getApartment());
		System.out.println(c.getText());
		System.out.println(c.getApartment() + "~~~~~~~~~");
		System.out.println(c.getGrade());
		System.out.println(c.getGuest());
		
		if(a.getComments()==null) {
			System.out.println("NUll je i dodajemo komentar");
			a.setComments(newComment);
		}
		else {
			System.out.println("Ima komentara i dodajemo novi kom");
			a.addComment(c);
		}
		
		
		String contextPath = ctx.getRealPath("");
		dao.saveApartments(contextPath);
		return Response.ok(dao.getAllActiveApartments()).build();
	}
	
}
