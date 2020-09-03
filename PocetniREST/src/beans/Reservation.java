package beans;

import java.util.Date;
import java.util.UUID;

import beans.enums.ReservationStatus;

public class Reservation {
	private UUID reservationId;
	private UUID apartmentId; //apartmant koji je rezervisan
	private String arrivalDate;
	private int numberOfStay;
	private double totalPrice;
	private String message;
	private String guest;    //BILA JE KLASA GUEST ZA GOSTA,MOZDA STAVITI GOSTOV ID
	private ReservationStatus status;
	
	
	
	public Reservation() {
		super();
	}
	public Reservation(UUID reservationId, UUID apartmentId, String arrivalDate, int numberOfStay, double totalPrice,
			String message, String guest, ReservationStatus status) {
		super();
		this.reservationId = reservationId;
		this.apartmentId = apartmentId;
		this.arrivalDate = arrivalDate;
		this.numberOfStay = numberOfStay;
		this.totalPrice = totalPrice;
		this.message = message;
		this.guest = guest;
		this.status = status;
	}
	public UUID getReservationId() {
		return reservationId;
	}
	public void setReservationId(UUID reservationId) {
		this.reservationId = reservationId;
	}
	public UUID getApartmentId() {
		return apartmentId;
	}
	public void setApartmentId(UUID apartmentId) {
		this.apartmentId = apartmentId;
	}
	public String getArrivalDate() {
		return arrivalDate;
	}
	public void setArrivalDate(String arrivalDate) {
		this.arrivalDate = arrivalDate;
	}
	public int getNumberOfStay() {
		return numberOfStay;
	}
	public void setNumberOfStay(int numberOfStay) {
		this.numberOfStay = numberOfStay;
	}
	public double getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getGuest() {
		return guest;
	}
	public void setGuest(String guest) {
		this.guest = guest;
	}
	public ReservationStatus getStatus() {
		return status;
	}
	public void setStatus(ReservationStatus status) {
		this.status = status;
	}
	
	
}
