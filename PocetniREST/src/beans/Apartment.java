package beans;

import java.util.ArrayList;
import java.util.UUID;

import javax.ws.rs.core.Response.Status;


import beans.enums.ApartmentStatus;
import beans.enums.ApartmentType;

public class Apartment {

	private UUID id;
	private ApartmentType type;
	private int numberOfRooms;
	private int numberOfGuest;
	private Location location;
	private ArrayList<String> dates;
	private ArrayList<String> availables; //dostupni datumi za izdavanje ...
	//private Host host;  //da li umesto citave klase host da cuvamo samo username hosta
	private String hostUsername;
	private ArrayList<Comment> comments = new ArrayList<Comment>();
	private String images ;
	private double price;
	private String checkIn = "14:00";
	private String checkOut = "10:00";
	private ApartmentStatus status  = ApartmentStatus.PASSIVE ;
	//last veriosn was <AMenities>. Milica idea is to saving list of ID od amenities that want to include
	private ArrayList<Amenities> amenities;
	private ArrayList<Reservation> reservations;
	private boolean isDeleted = false;
	/*public Apartment(UUID id, ApartmentType type, int numberOfRooms, int numberOfGuest, Location location,
			ArrayList<String> Strings, ArrayList<String> availables, Host host, ArrayList<Comment> comments,
			ArrayList<String> images, double price, String checkIn, String checkOut, ApartmentStatus status,
			ArrayList<Amenities> amenities, ArrayList<Reservation> reservations) {
		super();
		this.id = id;
		this.type = type;
		this.numberOfRooms = numberOfRooms;
		this.numberOfGuest = numberOfGuest;
		this.location = location;
		this.Strings = Strings;
		this.availables = availables;
		this.host = host;
		this.comments = comments;
		this.images = images;
		this.price = price;
		this.checkIn = checkIn;
		this.checkOut = checkOut;
		this.status = status;
		this.amenities = amenities;
		this.reservations = reservations;
	}*/
	public Apartment(UUID id, ApartmentType type, int numberOfRooms, int numberOfGuest, Location location,
			ArrayList<String> dates, String hostUsername,
			String images, double price, String checkIn, String checkOut, ApartmentStatus status,
			ArrayList<Amenities> amenities, boolean isDeleted) {
		super();
		this.id = id;
		this.type = type;
		this.numberOfRooms = numberOfRooms;
		this.numberOfGuest = numberOfGuest;
		this.isDeleted = isDeleted;
		////////////////////
		this.location = location;
		this.dates = dates;
		this.hostUsername = hostUsername;
		///////////////////////////
		this.images = images;
		this.price = price;
		this.checkIn = checkIn;
		this.checkOut = checkOut;
		this.status = status;
		this.amenities = amenities;
		this.isDeleted = false;
		this.availables = new ArrayList<String>();
		this.comments = new ArrayList<Comment>();
		this.reservations = new ArrayList<Reservation>();
	}
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public ApartmentType getType() {
		return type;
	}
	public void setType(ApartmentType type) {
		this.type = type;
	}
	public int getNumberOfRooms() {
		return numberOfRooms;
	}
	public void setNumberOfRooms(int numberOfRooms) {
		this.numberOfRooms = numberOfRooms;
	}
	public int getNumberOfGuest() {
		return numberOfGuest;
	}
	public void setNumberOfGuest(int numberOfGuest) {
		this.numberOfGuest = numberOfGuest;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public ArrayList<String> getDates() {
		return dates;
	}
	public void setDates(ArrayList<String> dates) {
		this.dates = dates;
	}
	public ArrayList<String> getavailables() {
		return availables;
	}
	public void setavailables(ArrayList<String> availables) {
		this.availables = availables;
	}
/*	public Host getHost() {
		return host;
	}
	public void setHost(Host host) {
		this.host = host;
	}*/
	public ArrayList<Comment> getComments() {
		return comments;
	}
	public void setComments(ArrayList<Comment> comments) {
		this.comments = comments;
	}
	public String getImages() {
		return images;
	}
	public void setImages(String images) {
		this.images = images;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getCheckIn() {
		return checkIn;
	}
	public void setCheckIn(String checkIn) {
		this.checkIn = checkIn;
	}
	public String getCheckOut() {
		return checkOut;
	}
	public void setCheckOut(String checkOut) {
		this.checkOut = checkOut;
	}
	public ApartmentStatus getStatus() {
		return status;
	}
	public void setStatus(ApartmentStatus status) {
		this.status = status;
	}
	public ArrayList<Amenities> getAmenities() {
		return amenities;
	}
	public void setAmenities(ArrayList<Amenities> amenities) {
		this.amenities = amenities;
	}
	public ArrayList<Reservation> getReservations() {
		return reservations;
	}
	public void setReservations(ArrayList<Reservation> reservations) {
		this.reservations = reservations;
	}
	public String getHostUsername() {
		return hostUsername;
	}
	public void setHostUsername(String hostUsername) {
		this.hostUsername = hostUsername;
	}
	public Apartment() {
		
	}
	public boolean isDeleted() {
		return isDeleted;
	}
	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	public void addComment(Comment c) {
		comments.add(c);
	}
	
}
