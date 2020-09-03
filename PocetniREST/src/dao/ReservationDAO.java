package dao;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Apartment;
import beans.Reservation;


public class ReservationDAO {

	HashMap<UUID, Reservation> reservations = new HashMap<UUID, Reservation>();
	
	public ReservationDAO(String ctxPath) {
		loadReservations(ctxPath);
	}
	
	public HashMap<UUID,Reservation> getReservations(){
		return reservations;
	}
	
	public void setReservations(HashMap<UUID,Reservation> reservations)
	{
		this.reservations=reservations;
	}
	
	public void saveReservations(String contextPath) {
		ObjectMapper mapper=new ObjectMapper();
		List<Reservation> rList=new ArrayList<>();
		rList.addAll(reservations.values());
		try {
		File file=new File(contextPath+"/reservations.json");
		mapper.writerWithDefaultPrettyPrinter().writeValue(file, rList);
	
		}catch(IOException e) {
			e.printStackTrace();
		}finally {
			
		}
	}
	
private void loadReservations(String contextPath) {
		
		try
		{
			File file = new File(contextPath + "/reservations.json");
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
			
			
			List<Reservation> car = objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, Reservation.class)); 
			for(Reservation u : car)
			{
				reservations.put(u.getReservationId(),u);
			}
		}
		catch (Exception ex) {
			System.out.println(ex);
			ex.printStackTrace();
		} finally {
			
		}
	}
public void addToMap(Reservation r) {
	if(reservations.values() !=null) {
		if(!reservations.containsKey(r.getReservationId())) {
			reservations.put(r.getReservationId(), r);
		}
	}else
			reservations.put(r.getReservationId(), r);
}

	public Reservation findReservation(UUID id) {
		return reservations.get(id);
}
	public ArrayList<Reservation> getGuestsReservations(String guest) {
		ArrayList<Reservation> reservation=new ArrayList<Reservation>();
		
		for(Reservation r:reservations.values()){
			if(r.getGuest().equals(guest)) {
				reservation.add(r);
			}
		}
		return reservation;
	}
}
