package beans;

import java.util.ArrayList;
import java.util.Date;

import javax.ws.rs.core.Response.Status;

import org.apache.tomcat.jni.Time;
import beans.enums.ApartmentType;

public class Apartment {

	private ApartmentType type;
	private int numberOfRooms;
	private int numberOfGuest;
	private Location location;
	private ArrayList<Date> dates;
	private ArrayList<Date> availablles; //dostupni datumi za izdavanje ...
	private Host host;
	private ArrayList<Comment> comments;
	private ArrayList<String> images;
	private double price;
	private Time checkIn;
	private Time checkOut;
	private Status status;
	private ArrayList<Amenities> amenities;
	private ArrayList<Reservation> reservations;
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
	public ArrayList<Date> getDates() {
		return dates;
	}
	public void setDates(ArrayList<Date> dates) {
		this.dates = dates;
	}
	public ArrayList<Date> getAvailablles() {
		return availablles;
	}
	public void setAvailablles(ArrayList<Date> availablles) {
		this.availablles = availablles;
	}
	public Host getHost() {
		return host;
	}
	public void setHost(Host host) {
		this.host = host;
	}
	public ArrayList<Comment> getComments() {
		return comments;
	}
	public void setComments(ArrayList<Comment> comments) {
		this.comments = comments;
	}
	public ArrayList<String> getImages() {
		return images;
	}
	public void setImages(ArrayList<String> images) {
		this.images = images;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public Time getCheckIn() {
		return checkIn;
	}
	public void setCheckIn(Time checkIn) {
		this.checkIn = checkIn;
	}
	public Time getCheckOut() {
		return checkOut;
	}
	public void setCheckOut(Time checkOut) {
		this.checkOut = checkOut;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
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
	
	
}
