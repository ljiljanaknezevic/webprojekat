package dao;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.swing.text.StyledEditorKit.BoldAction;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Amenities;

public class AmenitiesDAO {
	HashMap<UUID, Amenities> amenities = new HashMap<UUID,Amenities>();
	
	public AmenitiesDAO() {
		
	}
	
	public AmenitiesDAO(String contextPath) {
		loadAmenities(contextPath);
	}

	public HashMap<UUID, Amenities> getAmenities() {
		return amenities;
	}

	public void setAmenities(HashMap<UUID, Amenities> amenities) {
		this.amenities = amenities;
	}

	public void saveAmenities(String contextPath)
	{
		ObjectMapper mapper=new ObjectMapper();
		List<Amenities> userList=new ArrayList<>();
		userList.addAll(amenities.values());
		try {
		File file=new File(contextPath+"/amenities.json");
		mapper.writerWithDefaultPrettyPrinter().writeValue(file, userList);
	
		}catch(IOException e) {
			e.printStackTrace();
		}finally {
			
		}
	}
	private void loadAmenities(String contextPath) {
		
		try
		{
			File file = new File(contextPath + "/amenities.json");
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
			
			if(file.exists()) {
				List<Amenities> car = objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, Amenities.class)); 
				for(Amenities u : car)
				{
					amenities.put(u.getId(),u);
				}
			}
		}
		catch (Exception ex) {
			System.out.println(ex);
			ex.printStackTrace();
		} finally {
			
		}
	}
	public boolean find(UUID username) {
		if (!amenities.containsKey(username)) {
			return false;
		}
		
		return true;
	}

	public void addToMap(Amenities am) {
		if(amenities.values() !=null) {
			if(!amenities.containsKey(am.getId())) {
				//if(isUnique(am.getName()))
					amenities.put(am.getId(), am);
			}
			}else
			amenities.put(am.getId(), am);
		
	}

	public boolean isUnique(String name) {
		for(Amenities a : amenities.values()) {
			if(a.getName().equals(name))
				if(a.isDeleted() == false)
					return false;
		}
		return true;
	}
	
	public ArrayList<Amenities> getAllAmenities() {
		ArrayList<Amenities> ameniti = new ArrayList<Amenities>();
		for(Amenities a : amenities.values()) {
			if(a.isDeleted() == false)
				ameniti.add(a);
		}
		return ameniti;
	}
	
	public Amenities findAmenitie(UUID id) {
		for(Amenities a : amenities.values()) {
			if(a.getId().equals(id)) {
				if(a.isDeleted() == false)
					return a;
			}
		}
		return null;
	}
	
	public Amenities editAmenitie(Amenities am, String contextPath) {
		for (UUID key : amenities.keySet()) {
		    if(key.equals(am.getId())) {
		    	am.setName(am.getName());
		    	amenities.replace(am.getId(), am);
		    	saveAmenities(contextPath);
		    	return am;
		    }
		}
		return null;
	}
	public Amenities deleteAmenitie(Amenities am, String contextPath) {
		for (UUID key : amenities.keySet()) {
		    if(key.equals(am.getId())) {
		    	am.setDeleted(true);
		    	amenities.replace(am.getId(), am);
		    	saveAmenities(contextPath);
		    	return am;
		    }
		}
		return null;
	}
}
