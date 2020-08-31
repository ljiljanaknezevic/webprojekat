package services;

import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Apartment;
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
			ctx.setAttribute("apartmentDAO", new ApartmentDAO());
		}
	}
	
	@POST
	@Path("/addApartment")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addApartment(Apartment ap) {
		ApartmentDAO dao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		
		String contextPath = ctx.getRealPath("");
		ap.setId(UUID.randomUUID());
		System.out.println(ap.getHostUsername() + " "+ap.getNumberOfGuest() + " "
				+ap.getNumberOfRooms() + " "+ ap.getPrice() + " "+ap.getAmenities()+" " +ap.getDates()+" "+ap.getType() + " "
				+ap.getId());
		dao.addToMap(ap);
		dao.saveApartments(contextPath);
		return Response.ok().build();
	}
}
