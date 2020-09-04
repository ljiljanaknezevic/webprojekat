package services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Apartment;
import beans.Reservation;
import beans.User;
import beans.enums.ReservationStatus;
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
	
	@GET
	@Path("/guestsReservations")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response guestsReservation(@Context HttpServletRequest request)
	{
		System.out.println("USAO JE U SERVICE");
		User u=(User)request.getSession().getAttribute("user");
		ReservationDAO dao=(ReservationDAO) ctx.getAttribute("reservationDAO");
		return  Response.ok(dao.getGuestsReservations(u.getUsername())	).build();
	}
	
	
	@POST
	@Path("/makeReservation")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response makeReservation(Reservation r) {
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
	
	@POST
	@Path("/cancelReservation{id}")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Response cancelReservation(@PathParam("id") UUID id) {
		ReservationDAO dao=(ReservationDAO) ctx.getAttribute("reservationDAO");
		Reservation r=dao.findReservation(id);
		String contextPath=ctx.getRealPath("");
		r.setStatus(ReservationStatus.CANCELED);
		dao.saveReservations(contextPath);
		return Response.ok(dao.getAllReservations()).build();
	}
	
	
	@POST
	@Path("/acceptReservation{id}")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Response acceptReservation(@PathParam("id") UUID id) {
		ReservationDAO dao=(ReservationDAO) ctx.getAttribute("reservationDAO");
		Reservation r=dao.findReservation(id);
		String contextPath=ctx.getRealPath("");
		r.setStatus(ReservationStatus.ACCEPTED);
		dao.saveReservations(contextPath);
		return Response.ok(dao.getAllReservations()).build();
	}
	
	@POST
	@Path("/rejectReservation{id}")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Response rejectReservation(@PathParam("id") UUID id) {
		ReservationDAO dao=(ReservationDAO) ctx.getAttribute("reservationDAO");
		Reservation r=dao.findReservation(id);
		String contextPath=ctx.getRealPath("");
		r.setStatus(ReservationStatus.REJECTED);
		dao.saveReservations(contextPath);
		return Response.ok(dao.getAllReservations()).build();
	}
	
	@GET
	@Path("/allReservations")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllReservations() {
	ReservationDAO dao = (ReservationDAO) ctx.getAttribute("reservationDAO");
	return Response.ok(dao.getAllReservations()).build();
	}
	
	@GET
	@Path("/hostsReservations")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getHostsReservations(@Context HttpServletRequest request) {
		User u = (User)request.getSession().getAttribute("user");
		ReservationDAO daoR = (ReservationDAO) ctx.getAttribute("reservationDAO");
		ApartmentDAO dao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		
		//TODO:Uzimam id od apartmana iz rezervacija,proveravam njegovog hosta,ako je kao ulogovani stavljam ga u listu
		//ovo se radi u service!
		
		return Response.ok(	dao.getHostsApartments(u.getUsername())	).build();
	}
	
}
