package beans;

import java.util.Date;

import beans.enums.ReservationStatus;

public class Reservation {
	private String apartmentId; //apartmant koji je rezervisan
	private Date arrivalDate;
	private int numberOfStay;
	private double totalPrice;
	private String message;
	private Guest guest;
	private ReservationStatus status;
	
	public String getApartmentId() {
		return apartmentId;
	}
	public void setApartmentId(String apartmentId) {
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
