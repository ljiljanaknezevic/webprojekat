package dao;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Amenities;
import beans.Apartment;
import beans.Comment;
import beans.enums.ApartmentStatus;

public class ApartmentDAO {

	HashMap<UUID, Apartment> apartments = new HashMap<UUID, Apartment>();
	
	public ApartmentDAO() {
	}

	public ApartmentDAO (String ctxPath) {
		loadApartments(ctxPath);
	}

	public HashMap<UUID, Apartment> getApartments() {
		return apartments;
	}

	public void setApartments(HashMap<UUID, Apartment> apartments) {
		this.apartments = apartments;
	}
	public void saveApartments(String contextPath)
	{
		ObjectMapper mapper=new ObjectMapper();
		List<Apartment> apList=new ArrayList<>();
		apList.addAll(apartments.values());
		try {
		File file=new File(contextPath+"/apartments.json");
		mapper.writerWithDefaultPrettyPrinter().writeValue(file, apList);
	
		}catch(IOException e) {
			e.printStackTrace();
		}finally {
			
		}
	}
	private void loadApartments(String contextPath) {
		
		try
		{
			File file = new File(contextPath + "/apartments.json");
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
			
			
			List<Apartment> car = objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, Apartment.class)); 
			for(Apartment u : car)
			{
				apartments.put(u.getId(),u);
			}
		}
		catch (Exception ex) {
			System.out.println(ex);
			ex.printStackTrace();
		} finally {
			
		}
	}

	public void addToMap(Apartment am) {
		if(apartments.values() !=null) {
			if(!apartments.containsKey(am.getId())) {
				apartments.put(am.getId(), am);
			}
		}else
				apartments.put(am.getId(), am);
	}

	public ArrayList<Apartment> getAllApartments(){
		ArrayList<Apartment> apart = new ArrayList<Apartment>();
		for(Apartment a:apartments.values()) {
			if(!a.isDeleted())
				apart.add(a);
		}
		return apart;
	}
	public ArrayList<Apartment> getHostsApartments(String host){
		ArrayList<Apartment> apart = new ArrayList<Apartment>();

		for(Apartment a:apartments.values()) {
			if(a.getHostUsername().equals(host)) {
				if(!a.isDeleted())
					apart.add(a);
			}
		}
		return apart;
	}
	
	public ArrayList<Apartment> getAllActiveApartments(){
		ArrayList<Apartment> apart = new ArrayList<Apartment>();
		for(Apartment a:apartments.values()) {
			if(a.getStatus()==ApartmentStatus.ACTIV) {
				if(!a.isDeleted())
					apart.add(a);
			}
			
		}
		return apart;
	}

	public Apartment findApartment(UUID id) {
		return apartments.get(id);
	}
	
	public Apartment getApartmentById(UUID id) {
		for (Apartment a : apartments.values()) {
			if(a.getId().equals(id)) 
				return a;
		}
		return null;
	}
	public Apartment findApartmentByCommentId(UUID id) {
		for (Apartment a : apartments.values()) {
			if(a.isDeleted() == false) {
			for(Comment c:a.getComments()) {
				if(c.getCommentId().equals(id)) {
					return a;
				}
			}
			}
		}
		return null;
	}
	public ArrayList<Apartment> getAllApartmentsByHostUsername(String username) {
		ArrayList<Apartment> listApartment= new ArrayList<Apartment>();
		for (Apartment a : apartments.values()) {
			if(a.getHostUsername().equals(username)) 
				listApartment.add(a);
		}
		return listApartment;
	}
}
