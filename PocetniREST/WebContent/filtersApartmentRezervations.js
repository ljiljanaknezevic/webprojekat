$(document).ready(function(){

	
	$("#content-apartmant").on('change paste keyup','[name=filterRestApartment]',function (event) {
        var n=$("#filterType").val();
        var a = $("#filterAmeniti").val();
        
        
        if ($("#filterType").val()=="Filter by type"){
        	var type=$("#content-apartmant td.tdCol").parent();
        }else{
        	
        	var type=$("#content-apartmant td.tdCol:contains('" + n + "')").parent()
        }
        if ($("#filterAmeniti").val()=="Filter by amenitie"){
        	var amenitie=$("#content-apartmant td.tdCol").parent();
        }else{
        	var amenitie=$("#content-apartmant td.nameAmenitie:contains('" + a + "')").parent()
        }
        type.filter(amenitie).show();
        $("#content-apartmant td.nameStatus").parent().not(type.filter(amenitie)).hide();
    });
})