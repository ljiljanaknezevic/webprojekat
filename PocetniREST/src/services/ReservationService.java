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
import dao.UserDAO;

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
		return  Response.ok(dao.getGuestsReservations(u.getUsername())).build();
	}
	
	
	@POST
	@Path("/makeReservation")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response makeReservation(Reservation r,@Context HttpServletRequest request) {
		ReservationDAO dao=(ReservationDAO) ctx.getAttribute("reservationDAO");
		ApartmentDAO daoA=(ApartmentDAO) ctx.getAttribute("apartmentDAO");
		
		Apartment ap=daoA.findApartment(r.getApartmentId());
		User u=(User)request.getSession().getAttribute("user");
		String contextPath=ctx.getRealPath("");
		r.setReservationId(UUID.randomUUID());
		r.setGuest(u.getUsername());
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
	public Response cancelReservation(@PathParam("id") UUID id,@Context HttpServletRequest request) {
		ReservationDAO dao=(ReservationDAO) ctx.getAttribute("reservationDAO");
		User u = (User)request.getSession().getAttribute("user");
		Reservation r=dao.findReservation(id);
		String contextPath=ctx.getRealPath("");
		r.setStatus(ReservationStatus.CANCELED);
		dao.saveReservations(contextPath);
		return Response.ok(dao.getGuestsReservations(u.getUsername())).build();
	}
	
	
	@POST
	@Path("/acceptReservation{id}")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Response acceptReservation(@PathParam("id") UUID id,@Context HttpServletRequest request) {
		ApartmentDAO daoA = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		User u = (User)request.getSession().getAttribute("user");
		ArrayList<Apartment> hostsA=daoA.getHostsApartments(u.getUsername());
		ReservationDAO dao=(ReservationDAO) ctx.getAttribute("reservationDAO");
		Reservation r=dao.findReservation(id);
		String contextPath=ctx.getRealPath("");
		r.setStatus(ReservationStatus.ACCEPTED);
		dao.saveReservations(contextPath);
		return Response.ok(dao.getReservationsForHost(hostsA)).build();
	}
	
	@POST
	@Path("/endReservation{id}")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Response endReservation(@PathParam("id") UUID id,@Context HttpServletRequest request) {
		ApartmentDAO daoA = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		User u = (User)request.getSession().getAttribute("user");
		ArrayList<Apartment> hostsA=daoA.getHostsApartments(u.getUsername());
		ReservationDAO dao=(ReservationDAO) ctx.getAttribute("reservationDAO");
		Reservation r=dao.findReservation(id);
		String contextPath=ctx.getRealPath("");
		r.setStatus(ReservationStatus.COMPLETED);
		dao.saveReservations(contextPath);
		return Response.ok(dao.getReservationsForHost(hostsA)).build();
	}
	
	@POST
	@Path("/rejectReservation{id}")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Response rejectReservation(@PathParam("id") UUID id,@Context HttpServletRequest request) {
		ApartmentDAO daoA = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		User u = (User)request.getSession().getAttribute("user");
		ArrayList<Apartment> hostsA=daoA.getHostsApartments(u.getUsername());
		ReservationDAO dao=(ReservationDAO) ctx.getAttribute("reservationDAO");
		Reservation r=dao.findReservation(id);
		String contextPath=ctx.getRealPath("");
		r.setStatus(ReservationStatus.REJECTED);
		dao.saveReservations(contextPath);
		return Response.ok(dao.getReservationsForHost(hostsA)).build();
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
		ArrayList<Apartment> hostsA=dao.getHostsApartments(u.getUsername());
		return Response.ok(daoR.getReservationsForHost(hostsA)).build();
	
		
	}
	
	@GET
	@Path("/getEndDate{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response getIfDateExpired(@PathParam("id") UUID id) {
		System.out.println("SERVICE RESERVATIONS");
		ReservationDAO dao=(ReservationDAO) ctx.getAttribute("reservationDAO");
		return Response.ok(dao.getIfDateExpired(id)).build();
	}
	
	@GET
	@Path("/allUsersForHost")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllUsersForHost(@Context HttpServletRequest request) {
		ArrayList<String> guestUsernameList = new ArrayList<String>(); 
		User host=(User)request.getSession().getAttribute("user");
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		ApartmentDAO apartDao = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
		ReservationDAO resDao = (ReservationDAO) ctx.getAttribute("reservationDAO");
		//vraca listu aparmtna od hosta
		ArrayList<Apartment> hostsApartmentsList = apartDao.getAllApartmentsByHostUsername(host.getUsername());
		for(Apartment a : hostsApartmentsList) {
			if(!resDao.getGuestById(a.getId()).isEmpty()) {
				ArrayList<String> guestUsername =  resDao.getGuestById(a.getId());

				for(String guest : guestUsername) {
					if(!guestUsernameList.contains(guest))
						guestUsernameList.add(guest);
				}
			}
		}
		
		userDao.getUsersForHost(guestUsernameList);
		for(User u :userDao.getUsersForHost(guestUsernameList)) {
			System.out.println(u.getUsername() + " : konacnla lista za slanje na crtanje");
		}
		return Response.ok(userDao.getUsersForHost(guestUsernameList)).status(200).build();
	}
}
