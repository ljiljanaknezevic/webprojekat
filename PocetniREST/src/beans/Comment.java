package beans;
import java.util.UUID;

import beans.enums.Grade;

public class Comment {
	private String guest; //guests username
	private UUID apartment; //apartment id
	private String text;
	private Grade grade;
	
	public String getGuest() {
		return guest;
	}
	public void setGuest(String guest) {
		this.guest = guest;
	}
	public UUID getApartment() {
		return apartment;
	}
	public void setApartment(UUID apartment) {
		this.apartment = apartment;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public Grade getGrade() {
		return grade;
	}
	public void setGrade(Grade grade) {
		this.grade = grade;
	}

	
}
