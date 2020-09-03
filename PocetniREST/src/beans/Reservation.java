package beans;

import java.util.Date;
import java.util.UUID;

import beans.enums.ReservationStatus;

public class Reservation {
	private UUID reservationId;
	private UUID apartmentId; //apartmant koji je rezervisan
	private Date arrivalDate;
	private int numberOfStay;
	private double totalPrice;
	private String message;
	private Guest guest;
	private ReservationStatus status;
	
	
	
	public Reservation() {
		super();
	}
	public Reservation(UUID reservationId, UUID apartmentId, Date arrivalDate, int numberOfStay, double totalPrice,
			String message, Guest guest, ReservationStatus status) {
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
	public Date getArrivalDate() {
		return arrivalDate;
	}
	public void setArrivalDate(Date arrivalDate) {
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
	public Guest getGuest() {
		return guest;
	}
	public void setGuest(Guest guest) {
		this.guest = guest;
	}
	public ReservationStatus getStatus() {
		return status;
	}
	public void setStatus(ReservationStatus status) {
		this.status = status;
	}
	
	
}
