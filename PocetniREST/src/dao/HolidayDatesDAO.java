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
import beans.HolidayDates;

public class HolidayDatesDAO {
	HashMap<String, HolidayDates> holidayDates = new HashMap<String,HolidayDates>();
	
	public HolidayDatesDAO() {
		
	}
	
	public HolidayDatesDAO(String contextPath) {
		loadHolidayDates(contextPath);
	}

	public HashMap<String, HolidayDates> getHolidayDates() {
		return holidayDates;
	}

	public void setHolidayDates(HashMap<String, HolidayDates> HolidayDates) {
		this.holidayDates = HolidayDates;
	}

	public void saveHolidayDates(String contextPath)
	{
		ObjectMapper mapper=new ObjectMapper();
		List<HolidayDates> userList=new ArrayList<>();
		userList.addAll(holidayDates.values());
		try {
		File file=new File(contextPath+"/holidayDates.json");
		mapper.writerWithDefaultPrettyPrinter().writeValue(file, userList);
	
		}catch(IOException e) {
			e.printStackTrace();
		}finally {
			
		}
	}
	private void loadHolidayDates(String contextPath) {
		
		try
		{
			File file = new File(contextPath + "/holidayDates.json");
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
			
			if(file.exists()) {
				List<HolidayDates> car = objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, HolidayDates.class)); 
				for(HolidayDates u : car)
				{
					holidayDates.put(u.getDate(),u);
				}
			}
		}
		catch (Exception ex) {
			System.out.println(ex);
			ex.printStackTrace();
		} finally {
			
		}
	}
	
	public void addToMap(HolidayDates h) {
		if(holidayDates.values() !=null) {
			if(!holidayDates.containsKey(h.getDate())) {
				//if(isUnique(am.getName()))
				holidayDates.put(h.getDate(), h);
			}
			}else
				holidayDates.put(h.getDate(), h);
		
	}
}
