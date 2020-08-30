package services;


import java.util.ArrayList;
import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Amenities;
import dao.AmenitiesDAO;

@Path("")
public class AmenitiesService {

	@Context
	ServletContext ctx;
	
	public AmenitiesService() {
		
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("amenitiesDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("amenitiesDAO", new AmenitiesDAO(contextPath));
		}
	}
	
	@GET
	@Path("/getAllAmenities")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllAmenities() {
		AmenitiesDAO dao = (AmenitiesDAO) ctx.getAttribute("amenitiesDAO");
		return Response.ok(dao.getAllAmenities()).build();
	}
	
	
	@POST
	@Path("/addAmenities")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addingAmenities(Amenities am) {
		AmenitiesDAO dao = (AmenitiesDAO) ctx.getAttribute("amenitiesDAO");
		System.out.println(am.getName());
		boolean isUnique = dao.isUnique(am.getName());
		if(!isUnique) {
			return Response.status(400).entity("Amenitie name already exists.").build();
		}
		String contextPath = ctx.getRealPath("");
		am.setId(UUID.randomUUID());
		am.setDeleted(false);
		dao.addToMap(am);
		dao.saveAmenities(contextPath);
		return Response.ok(dao.getAllAmenities()).build();
	}
	
	@POST
	@Path("/editAmenities")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response editingAmenities(Amenities am) {
		AmenitiesDAO dao = (AmenitiesDAO) ctx.getAttribute("amenitiesDAO");
		am.setDeleted(false);
		boolean isUnique = dao.isUnique(am.getName());
		if(!isUnique)
			return Response.status(400).entity("Amenitie name already exists.").build();
		
		Amenities ameniti = dao.findAmenitie(am.getId());
		ameniti.setName(am.getName());
		String contextPath=ctx.getRealPath("");
		dao.editAmenitie(ameniti, contextPath);
		return Response.ok(dao.getAllAmenities()).build();
	}
	@POST
	@Path("/deleteAmenities{id}")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Response deletingAmenities(@PathParam("id") UUID id) {
		AmenitiesDAO dao = (AmenitiesDAO) ctx.getAttribute("amenitiesDAO");
		
		Amenities ameniti = dao.findAmenitie(id);
		
		String contextPath=ctx.getRealPath("");
	//	dao.deleteAmenitie(ameniti, contextPath);
		ameniti.setDeleted(true);
		dao.saveAmenities(contextPath);
		return Response.ok(dao.getAllAmenities()).build();
	}
}
