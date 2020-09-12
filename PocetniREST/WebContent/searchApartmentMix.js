//SEARCH MICI
$(document).ready(function() {
//		 $("#searchByGuests").keyup(function () { //by username
//		        $("#apartmentsTable  tr").each(function () {
//		            var name = $('td:eq(6)', this).text();
//		            if (name.indexOf($("#searchByGuests").val()) > -1) {
//		                $(this).show();
//		            } else {
//		                $(this).hide();
//		            }
//		        });
//		    });
//		 
		 $("#content-apartmant").on('change paste keyup','[name=filterSearch]',function(event){
		    	var n=$("#searchByGuests").val();
		    	
		    	var cod=$("#filterPriceFrom").val();
		    	var cdo=$("#filterPriceTo").val();
		    	
		    	var rFrom=$("#filterRoomFrom").val();
		    	var rTo=$("#filterRoomTo").val();
		    	
		    	var dFrom = $("#filterDateFrom").val();
		    	var dTo = $("#filterDateTo").val();
		    	start = new Date(dFrom).toLocaleDateString();
				end = new Date(dTo).toLocaleDateString();
				
				
				if(end < start)
					console.log("eririiriri")

					var getDates = function(startDate, endDate) {
				  var dates = [],
				      currentDate = startDate,
				      addDays = function(days) {
				        var date = new Date(this.valueOf());
				        date.setDate(date.getDate() + days);
				        return date;
				      };
				  while (currentDate <= endDate) {
				    dates.push(currentDate);
				    currentDate = addDays.call(currentDate, 1);
				  }
				  return dates;
				};

			// ovde dobijam sve dane
				console.log("```````````````")
			var dates = getDates(new Date(start), new Date(end));                                                                                                           
			dates.forEach(function(date) {
				//dodala .toLocaleDateString() da bi ispisivalo samo datume 
			  console.log(date.toLocaleDateString());
			});
			var m = document.getElementById("apartmentsTable").rows[0].cells.namedItem("nameDate").innerHTML;
			console.log(m + "mmmmmmmmmm");
		    	//guests first
		    	if(n==""){
		    		var naziv=$("#content-apartmant td.nameGuests").parent();
		    	}else{
		    		var naziv=$("#content-apartmant td.nameGuests:contains('" + n + "')").parent();
		    	}
		    	
		    	//price from to
		    	
		    	if(cod==""){
		      		var priceFrom=$("#content-apartmant td.nameGuests").parent();
		    	}else {
		    		var priceFrom=$("#content-apartmant td.namePrice").filter(function() { return $(this).text()-cod>=0}).parent();
		    	}
		    	
		    	if(cdo==""){
		    		var priceTo=$("#content-apartmant td.nameGuests").parent();
		    	}else {
		    		var priceTo=$("#content-apartmant td.namePrice").filter(function() {return $(this).text()-cdo<=0}).parent();
		    	}
		    	
		    	
		    	//rooms from to
		    	if(rFrom==""){
		      		var roomFrom=$("#content-apartmant td.nameGuests").parent();
		    	}else {
		    		var roomFrom=$("#content-apartmant td.nameRooms").filter(function() { return $(this).text()-rFrom>=0}).parent();
		    	}
		    	
		    	if(rTo==""){
		    		var roomTo=$("#content-apartmant td.nameGuests").parent();
		    	}else {
		    		var roomTo=$("#content-apartmant td.nameRooms").filter(function() {return $(this).text()-rTo<=0}).parent();
		    	}
		    	
		    	naziv.filter(priceTo).filter(priceFrom).filter(roomTo).filter(roomFrom).show();
		    	$("#content-apartmant td.nameGuests").parent().not(naziv.filter(priceTo).filter(priceFrom).filter(roomTo).filter(roomFrom)).hide();
		    })
		
});