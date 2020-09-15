//SEARCH MIC

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
		    	start = new Date(dFrom).toLocaleDateString('en-US');
				end = new Date(dTo).toLocaleDateString('en-US');
				
				
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
			var dates = getDates(new Date(start), new Date(end));                                                                                                           
			dates.forEach(function(date) {
				//dodala .toLocaleDateString() da bi ispisivalo samo datume 
			//  console.log(date.toLocaleDateString());
			});
//////////////////////////////// from
	/*		if($("#filterDateFrom").val() !=""){
				console.log("111111111111111")

			        $("#apartmentsTable  tr").each(function () {
			        	var dFrom = $("#filterDateFrom").val();
			        	var start1 =  new Date(dFrom).toLocaleDateString("en-US", { day: '2-digit' })      
			        		+ "/"+  new Date(dFrom).toLocaleDateString("en-US", { month: '2-digit' })      
			        		+ "/" +  new Date(dFrom).toLocaleDateString("en-US", { year: 'numeric' });
			           	var end1 =  new Date(dFrom).toLocaleDateString("en-US", { day: '2-digit' })      
		        		+ "/"+  new Date(dFrom).toLocaleDateString("en-US", { month: '2-digit' })      
		        		+ "/" +  new Date(dFrom).toLocaleDateString("en-US", { year: 'numeric' });
			           	var dTo = $("#filterDateTo").val();
			           	var name = $('td:eq(11)', this).text();
			        	if (name.indexOf(start1) > -1) {
			        		   $(this).show();
			        	}else {
			                $(this).hide();
			            }
			        });
			    
			
	        }else{*/
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
		    	}else 
		    	{
		    		var roomTo=$("#content-apartmant td.nameRooms").filter(function() {return $(this).text()-rTo<=0}).parent();
		    	}
		    	
		    	naziv.filter(priceTo).filter(priceFrom).filter(roomTo).filter(roomFrom).show();
		    
		    	$("#content-apartmant td.nameGuests").parent().not(naziv.filter(priceTo).filter(priceFrom).filter(roomTo).filter(roomFrom)).hide();
		//	    }
			
			
			
			
	/*		  if ($("#filterDateFrom").val() !="" && $("#filterDateTo").val() !=""){
			    	var dFrom = $("#filterDateFrom").val();
			    	var dTo = $("#filterDateTo").val();
			    	var start1 =  new Date(dFrom).toLocaleDateString("en-US", { day: '2-digit' })      
	        		+ "/"+  new Date(dFrom).toLocaleDateString("en-US", { month: '2-digit' })      
	        		+ "/" +  new Date(dFrom).toLocaleDateString("en-US", { year: 'numeric' });
	    			
		           	var end1 =  new Date(dTo).toLocaleDateString("en-US", { day: '2-digit' })      
	        		+ "/"+  new Date(dTo).toLocaleDateString("en-US", { month: '2-digit' })      
	        		+ "/" +  new Date(dTo).toLocaleDateString("en-US", { year: 'numeric' });

		           	$("#apartmentsTable  tr").each(function () {
			    		   		console.log("--------------------------")
				           		var dates = getDates(new Date(start), new Date(end));   
			    		   	 var list = new Array(); 
				           		dates.forEach(function(date) {
				    				//dodala .toLocaleDateString() da bi ispisivalo samo datume 
				    			 var d= date.toLocaleDateString("en-US", { day: '2-digit' })      
				    		        		+ "/"+  new Date(dFrom).toLocaleDateString("en-US", { month: '2-digit' })      
				    		        		+ "/" +  new Date(dFrom).toLocaleDateString("en-US", { year: 'numeric' })
				    		        		list.push(d)
				    		   	
				    			});
				           		var s = $('td:eq(11)', this).text();
				           		for(i in list){
					        	if (s.indexOf(list[i]) > -1) {
					        		   $(this).show();
					        	}else {
					                $(this).hide();
					            }
				           		}
				           
				        });
		        
		        }else{
		        	if($("#filterDateFrom").val() ==""){
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
			    	}else 
			    	{
			    		var roomTo=$("#content-apartmant td.nameRooms").filter(function() {return $(this).text()-rTo<=0}).parent();
			    	}
			    	
			    	naziv.filter(priceTo).filter(priceFrom).filter(roomTo).filter(roomFrom).show();
			    
			    	$("#content-apartmant td.nameGuests").parent().not(naziv.filter(priceTo).filter(priceFrom).filter(roomTo).filter(roomFrom)).hide();
		        	}
		        	}*/
				});
})
			    
			    
	