package beans;
import java.util.Random;
import java.util.UUID;

import beans.enums.Grade;

public class Comment {
	private String guest; //guests username
	private UUID apartment; //apartment id
	private String text;
	private Grade grade;
	private boolean isHostApproved = false;
	private UUID commentId = UUID.randomUUID();
	public Comment () {
		
	}
	public Comment(String guest, UUID apartment, String text, Grade grade) {
		super();
		this.commentId = commentId;
		this.guest = guest;
		this.apartment = apartment;
		this.text = text;
		this.grade = grade;
		this.isHostApproved = isHostApproved;
	}
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
	public boolean isHostApproved() {
		return isHostApproved;
	}
	public void setHostApproved(boolean isHostApproved) {
		this.isHostApproved = isHostApproved;
	}
	public UUID getCommentId() {
		return commentId;
	}
	public void setCommentId(UUID commentId) {
		this.commentId = commentId;
	}

	
}
