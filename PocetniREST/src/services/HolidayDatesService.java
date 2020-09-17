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

import beans.Amenities;
import beans.HolidayDates;
import dao.AmenitiesDAO;
import dao.HolidayDatesDAO;
@Path("")
public class HolidayDatesService {
	@Context
	ServletContext ctx;
	
	public HolidayDatesService() {
		
	}
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("holidayDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("holidayDAO", new HolidayDatesDAO(contextPath));
		}
	}
	
	@POST
	@Path("/addHolidayDate")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addingAmenities(HolidayDates h) {
		HolidayDatesDAO dao = (HolidayDatesDAO) ctx.getAttribute("holidayDAO");
		if(h.getDate().equals(""))
			return Response.status(400).entity("You didn't choose date.").build();
		String contextPath = ctx.getRealPath("");
		dao.addToMap(h);
		dao.saveHolidayDates(contextPath);
		return Response.ok().build();
	}
}
