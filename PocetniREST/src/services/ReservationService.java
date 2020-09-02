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
import beans.Reservation;
import dao.ApartmentDAO;
import dao.ReservationDAO;

@Path("")
public class ReservationService {

	@Context
	ServletContext ctx;
	
	public ReservationService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("reservationDAO")==null) {
			String contextPath=ctx.getRealPath("");
			ctx.setAttribute("reservationDAO", new ReservationDAO(contextPath));
		}
	}
	
	@POST
	@Path("/makeReservation")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response makeReservation(Reservation r) {
		System.out.println("USAO JE U SERVICE RESERVATION");
		ReservationDAO dao=(ReservationDAO) ctx.getAttribute("reservationDAO");
		ApartmentDAO daoA=(ApartmentDAO) ctx.getAttribute("apartmentDAO");
		
		Apartment ap=daoA.findApartment(r.getApartmentId());
		
		String contextPath=ctx.getRealPath("");
		r.setReservationId(UUID.randomUUID());
		
		double price;
		int numNights=r.getNumberOfStay();
		double nightPrice=ap.getPrice();
		price=numNights*nightPrice;
		r.setTotalPrice(price);
		r.setReservationId(UUID.randomUUID());
		
		//TODO:PROVERA DA LI JE TRAZENI DATUM DOSTUPAN
		
		dao.addToMap(r);
		dao.saveReservations(contextPath);
		return Response.ok().build();
	}

}
