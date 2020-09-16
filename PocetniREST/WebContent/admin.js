//$.get({
//	url : "ProjectRents/currentUser",
//	 contentType: 'application/json',
//	success : function(data){
//		 if(data){
//             if(data.role == "GUEST"){
//                 window.location.href="./guest.html";
//             }else if(data.role == "HOST"){
//                 window.location.href="./host.html";
//             }
//         }else{
//              window.location.href="./login.html";
//         }
//	}	
//})



var checkList = [];
var checkIdListEdit = [];
var checkIdList = [];
var username = '';
var id = '';
var trid = '';


var listOfAmenities = [];
function addUsersTr(user){
	let tr = $('<tr></tr>');
	let tdUsername = $('<td>' + user.username + '</td>');
	let tdName = $('<td>' + user.name+ '</td>');
	
	let tdSurname = $('<td>' + user.surname + '</td>');
	
	let tdGender = $('<td>' + user.gender + '</td>');
	let tdRole = $('<td>' + user.role+ '</td>');
	tr.append(tdUsername).append(tdName).append(tdSurname).append(tdGender).append(tdRole);
	
	
	$('#tbodyAll').append(tr);
}
function drawAllReservations(data){
	let temp='';
	for (i in data){

			temp+=`<tr id="`+data[i].reservationId+`">
			<td>`+data[i].guest+`</td>
			<td>`+data[i].arrivalDate+`</td>
			<td>`+data[i].numberOfStay+`</td>
			<td>`+data[i].totalPrice+`</td>
			<td>`+data[i].message+`</td>
			<td>`+data[i].status+`</td>
			</tr>`;
		}
		$('#tbodyAllReservations').html(temp);
}
//data-apartment
function drawComments(data){
	let temp='';
	for (i in data.comments){
			temp+=`<tr>
			<td>`+data.comments[i].guest+`</td>
			<td>`+data.comments[i].text+`</td>
			<td>`+data.comments[i].grade+`</td>
			</tr>`;
	}
		$('#tbodyComments').html(temp);
}
var t;
function drawFilterAmenities(data){
	console.log("draw for filter amenities")
	 t = '';	
	for(am in data){
		listOfAmenities.push(data[am].name);
		//t += (`<input type = "checkbox" id = "${data[am].id}" name ="amenities-box" value = "${data[am].name}">${data[am].name}</input><br>`);
	}
	//$('#amenitiesCheckBox').html(t);
}
function drawApartments(data){
	let temp='';
	for (i in data){
		var list = [];
		for(x in data[i].amenities){
			if(!data[i].amenities[x].deleted)
				list.push(data[i].amenities[x].name)
		}
		var partsOfStr = list.join(',').replace(/,/g ,'<br>').split();
		 dates = data[i].dates.join(',').replace(/,/g ,'<br>').split();
		//list.replace( ", ",/<br>\u21b5/g)
		temp+=`<tr id="`+data[i].id+`">
			<td>`+data[i].hostUsername+`</td>
			<td  class = "nameStatus">`+data[i].status+`</td>
			<td  class = "nameType">`+data[i].type+`</td>
			<td class = "nameLocation">`+data[i].location.address.street+","+data[i].location.address.number+","+data[i].location.address.city.toUpperCase()+","+data[i].location.address.zipCode+`</td>
			<td class = "nameAmenitie">`+partsOfStr+`</td>
			<td class = "nameRooms">`+data[i].numberOfRooms+`</td>
			<td class = "nameGuests">`+data[i].numberOfGuest+`</td>
			<td class = "namePrice">`+data[i].price+`</td>
			<td><img id="blah" height="150px alt="your image" src="`+data[i].images+`"</td>
			<td><button id="comments-apartment" class="btn btn-primary">View comments </button></td>
			<td><button id="edit-apartment" class="btn btn-primary">Edit</button></td>
			<td><button id="delete-apartment" class="btn btn-primary">Delete </button></td>
			<td class = "nameDate" name = "nameDate">`+data[i].dates+`</td>
			</tr>`;
	}
	$('#apartmentsTable').html(temp);
}
function drawAmenitiesInApartment(data){
	let temp='';
	checkIdList= [];
	for (i in data){
		checkIdList.push(data[i]);
		temp+=`<tr><td><input  id="`+data[i].id+`" type="checkbox"/></td><td>`+data[i].name+`</td></tr>`;
	}
	$('#amenitiesTableApartment').html(temp);
}

function drawUsers(data){
	let temp='';
	
	for (i in data){
		temp+=`<tr id="`+data[i].username+`"><td class = "nameUser">` + data[i].username + `</td>
		<td >`+data[i].name+`</td>
		<td>`+data[i].surname+`</td>
		<td class = "nameGender">`+data[i].gender+`</td>
		<td class = "nameRole">`+data[i].role+`</td>`
		if(data[i].role != "ADMIN"){
			if(data[i].blocked == false)
			temp +=	`<td><button id = "block-button" type="button" class="btn btn-danger btn-sm">
	           Block account</button></td>`;
			else
			temp +=	`<td><button id = "block-button" type="button" class="btn btn-success btn-sm">
			           Unblock account</button></td>`;
		}else{
			temp += `<td></td>`
		}
		`</tr>`;
	}
	$('#usersTable').html(temp);
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    var file=input.files[0];
    reader.onload = function(e) {
      $('#blah').attr('src', e.target.result);
    }
    
    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}
var id2='';
var username2 = '';
var name = 'none';
var surname = 'none';
var gender = 'none';
var password ='none';
var role = 'none';

$.ajax({
	url : "ProjectRents/currentUser",
	type : "GET",
	 contentType: 'application/json',
	success : function(data){
		 if(data){
             if(data.role == "GUEST"){
            	 if(data.blocked == true){
            		 window.location.href="./login.html";
            		 return;
            	 }else{
	                 window.location.href="./guest.html";
	                 return;
            	 }
             }else if(data.role == "HOST"){
            	 if(data.blocked == true){
	                 window.location.href="./login.html";
	                 return;
            	 }else
            	{
            		  window.location.href="./host.html";
                      return;
            	}
             }
            
         }else{
              window.location.href="./login.html";
         }
	}	
})

$(document).ready(function(){
		// amenities 
	var modal = document.getElementById('myModal');
	var modal1 = document.getElementById('modal-amenities');
	var modal2 = document.getElementById('modal-apartment');
	var modal3=document.getElementById('modal3');
	
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	var span1 = document.getElementsByClassName("close")[1];
	var span2 = document.getElementsByClassName("close")[2];
	var span3 = document.getElementsByClassName("close")[3];
	//var span3=document.getElementByClassName("close")[3];

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}
	span1.onclick = function() {
	    modal.style.display = "none";
	    modal1.style.display= "none";

	}
	
	span2.onclick = function() {
		modal2.style.display = "none";
	}
	
	span3.onclick = function() {
		modal3.style.display = "none";
	}
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
	window.onclick = function(event) {
	    if (event.target == modal1) {
	        modal1.style.display = "none";
	    }
	}
	window.onclick = function(event) {
	    if (event.target == modal2) {
	        modal2.style.display = "none";
	    }
	}
	window.onclick = function(event) {
	    if (event.target == modal3) {
	        modal3.style.display = "none";
	    }
	}
	
	
	
	
	
	
	$('#content-users').attr('hidden', true);
	$('#dugmad').attr('hidden', true);
	$('#content-apartmant').attr('hidden', false);
	$('.profileLook').attr('hidden', true);
	$('#allReservations').attr('hidden',true);
	$('#content-hregistration').attr('hidden',true);
    $('ul.dropdown-menu li').click(function(e) 
    { 
    	if($(this).attr('id') == 'logout'){
    		$.ajax({
    			url: "ProjectRents/logout",
    			type :"GET",
    			success: function() {
    				alert("Successfully logged out .");
    				window.location="./login.html";
    			}
    		})
    	}
    });

	//BLOCK USER
	$('#usersTable').on('click','button',function(event){
		trid=$(event.target).closest('tr').attr('id');
		console.log(trid)
		if( $(event.target).attr("id")=="block-button"){
			$.ajax({
				url:"ProjectRents/blockUser" + trid,
				type : "POST",
				contentType:'multipart/form-data',
				success:function(data){
					drawUsers(data);
				}, 
				error:function(){
					alert('Something went wrong with blocking account.Try later.')
				}
			})
		}
	})

//	RESERVATION TAB
    	$('a[href="#reservationsClick"]').click(function(e){
    		$('#content-users').attr('hidden', true);
    		$('#dugmad').attr('hidden', true);
    		$('#content-apartmant').attr('hidden', true);
    		$('.profileLook').attr('hidden', true);
    		$('#allReservations').attr('hidden',false);
			$('#content-hregistration').attr('hidden',true);
		$.ajax({
			url:"ProjectRents/allReservations",
			type : "GET",
			success:function(reservations){
				drawAllReservations(reservations);
			},
			error:function(message){
			console.log('Error with reservations')
			}
		})
	})
	
	
	
	
	    // users tab
	$('#users').click(function(e)
	{
		$('#content-users').attr('hidden', false);
		$('#dugmad').attr('hidden', true);
		$('#content-apartmant').attr('hidden', true);
		$('.profileLook').attr('hidden', true);
		$('#allReservations').attr('hidden',true);
		$('#content-hregistration').attr('hidden',true);

		$.ajax({
			url:"ProjectRents/allUsers",
			type:"GET",
			success:function(users){
				if(users!=null)
					drawUsers(users);
			},
			error:function(message){
				console.log('Error loading users.')
			}
		});
	
		// mica pretraga
		
		$("#content-users").on('change paste keyup','[name=filterRest]',function (event) {
	//		var n=$("#filterUsername").val();
	//		var g=$("#filterGender").val();
	//		var r=$("#filterRole").val();
	//		if ($("#filterUsername").val()==""){
	//			
	//			var username=$("#content-users td.nameUser").parent();
	//		}else{
	//			var username=$("#content-users td.nameUser:contains('" + n + "')").parent()
	//		}
	//		if ($("#filterGender").val()=="Filter by gender"){
	//			var gender=$("#content-users td.nameUser").parent();
	//		}else{      
	//			var gender=$("#content-users td.nameGender:contains('" + g + "')").parent()
	//		}
	//		if ($("#filterRole").val()=="Filter by role"){
	//			var role=$("#content-users td.nameUser").parent();
	//		}else{
	//			
	//			var role=$("#content-users td.nameRole:contains('" + r + "')").parent()
	//		}
	//		username.filter(gender).filter(role).show();
	//		$("#content-users td.nameUser").parent().not(username.filter(gender).filter(role)).hide();
	        var g=$("#filterGender").val();
	        var r=$("#filterRole").val();
	        	
	       
	        if ($("#filterGender").val()=="Search by gender"){
	        	var gender=$("#content-users td.nameGender").parent();
	        }else{      
	        	var gender=$("#content-users td.nameGender:contains('" + g + "')").parent()
	        }
	        if ($("#filterRole").val()=="Search by role"){
	        	var role=$("#content-users td.nameGender").parent();
	        }else{
	        	
	        	var role=$("#content-users td.nameRole:contains('" + r + "')").parent()
	        }
	        
	       gender.filter(role).show();
	        $("#content-users td.nameUser").parent().not(gender.filter(role)).hide();
	        
	    });
	
		
	});

    	//////////////////////////////////////
    	//micas filters apartmants
    	//FILTER FOR AMENITIES
    	
    	//2.nacin sa opcijom za selektovanje
    	window.onload = function () {
        		var select = document.getElementById("filterAmeniti");
        		console.log(listOfAmenities)
        		for(i = 1; i<listOfAmenities.length; i++) {
        		    select.options[select.options.length] = new Option(listOfAmenities[i], listOfAmenities[i]);
        		}
    	};
    
    	//1.nacin sa checkBox-om
    	$("#filterByAmenities").click(function(){
    		var areChecked = false;
    		$('input[name = "amenities-box"]:checked').each(function(){
    			$("#apartmentsTable td.nameAmenitie:not(:contains('" + $(this).val()+"'))").parent().hide();
    			$("#apartmentsTable td.nameAmenitie:contains('"+ $(this).val()+"')").parent().show();
    			areChecked = true;
    		})
    		if(!areChecked)
    			$("#apartmentsTable td.nameAmenitie:contains('"+ $(this).val()+"')").parent().show();
    			
    	})
    	
    	$("#content-apartmant").on('change paste keyup','[name=filterRestApartment]',function (event) {
            var n=$("#filterType").val();
            var g=$("#filterStatus").val();
            var a = $("#filterAmeniti").val();
            
            if ($("#filterStatus").val()=="Filter by status"){
            	var status=$("#content-apartmant td.nameStatus").parent();
            }else{      
            	var status=$("#content-apartmant td.nameStatus:contains('" + g + "')").parent()
            }
            
            if ($("#filterType").val()=="Filter by type"){
            	var type=$("#content-apartmant td.nameStatus").parent();
            }else{
            	
            	var type=$("#content-apartmant td.nameType:contains('" + n + "')").parent()
            }
            if ($("#filterAmeniti").val()=="Filter by amenitie"){
            	var amenitie=$("#content-apartmant td.nameStatus").parent();
            }else{
            	var amenitie=$("#content-apartmant td.nameAmenitie:contains('" + a + "')").parent()
            }
            status.filter(type).filter(amenitie).show();
            $("#content-apartmant td.nameStatus").parent().not(status.filter(type).filter(amenitie)).hide();
        });
	//AMENITIES TAB


	function drawAmenities(data){
		let temp='';
		for (i in data){
			temp+=`<tr id="`+data[i].id+`" >
			<td hidden = "true">`+data[i].id
			+`</td>
			<td>`+data[i].name+`</td>
			<td><button id="edit-amenities" class="btn btn-primary">Edit</button></td>
			<td><button id="delete-amenitie" class="btn btn-primary">Delete </button></td></tr>`;
		}
		$('#amenitiesTable').html(temp);
	}

	
	$('a[href="#amenities"]').click(function(){
		$('#dugmad').attr('hidden', false);
		$('#content-apartmant').attr('hidden', true);
		$('.profileLook').attr('hidden', true);
		$('#content-users').attr('hidden', true);
		$('#allReservations').attr('hidden',true);
		$('#content-hregistration').attr('hidden',true);
		var ameniti = new Object();
		$.ajax({
			url:'ProjectRents/getAllAmenities',
			type :"GET",
			contentType:'application/json',
			success:function(data){
				drawAmenities(data);
				drawFilterAmenities(data);
			}
		})
		$('#amenitiesTable').on('click','button',function(event){
			if($(event.target).attr("id")=="edit-amenities"){
				modal1.style.display="block";
			
				$('#amenities-name-edit').val($(event.target).parent().parent().children().first().next().text());
				$('#amenities-id-edit').val($(event.target).parent().parent().children().first().text());
				
				$('#edit-amenities2').click(function(){
					//TODO: provere da li su uneta sva polja
					
					var amenitie = new Object();
					amenitie.name =$('#amenities-name-edit').val();
					amenitie.id = $('#amenities-id-edit').val();
					if(ameniti.name != ""){
						$.ajax({
							url:'ProjectRents/editAmenities',
							type: "POST",
							contentType:'application/json',
							data: JSON.stringify(amenitie),
							success: function(data){
								modal1.style.display="none";
								drawAmenities(data);
							},
							error:function(){
								modal1.style.display="block";
								$('#error-amenities-edit').text('Amenitie name already exists. Try again.');
								$('#error-amenities-edit').show();
								$('#error-amenities-edit').delay(4000).fadeOut('slow');
							}
						})
					}else{
						modal1.style.display="block";
						$('#error-amenities-edit').text('You didnt entered any name. Try again.');
						$('#error-amenities-edit').show();
						$('#error-amenities-edit').delay(4000).fadeOut('slow');
					}
				})
			}else if( $(event.target).attr("id")=="delete-amenitie"){
				var id =$(event.target).parent().parent().children().first().text();
				console.log(id)
				$.ajax({
					url:"ProjectRents/deleteAmenities"+id,
					type :"POST",
					contentType:'multipart/form-data',
					success:function(data){
						drawAmenities(data);
						alert("Successfully deleted ");
						modal2.style.display="none";
					}
				})
			}
		})
		
		
		$('#addA').click(function(){
			modal.style.display="block";
			$('#amenities-name').val('');
		})
		$('#addAmenities').click(function() {
				var amenitie = new Object();
				amenitie.name = $('#amenities-name').val();
			/*	if($('#amenities-name').val() == "")
				{
					$('#error-amenities').text('You didnt entered anything. Try again.');
					$('#error-amenities').show();
					$('#error-amenities').delay(4000).fadeOut('slow');
					return;
				}
				else
				{*/
					$.ajax({
						url:"ProjectRents/addAmenities",
						type: "POST",
						contentType: 'application/json',
						data:JSON.stringify(amenitie),
						success:function(data){
							drawAmenities(data);
							modal.style.display="none";
						},
						error : function(message){
								$('#error-amenities').text(message.responseText);
								$('#error-amenities').show();
								$('#error-amenities').delay(4000).fadeOut('slow');
						}
					})
				
				//}
			})
	})
	
	//APARTMENT view
	$.ajax({
			url:'ProjectRents/getAllApartments',
			type : 'GET',
			contentType : 'application/json',
			success : function(data){
				drawApartments(data)
			}
	})
		$.ajax({
			url:'ProjectRents/getAllAmenities',
			type :"GET",
			contentType:'application/json',
			success:function(data){
				drawFilterAmenities(data);
			}
		})
	$('a[href="#apartments"]').click(function(){
		
		$('#content-apartmant').attr('hidden', false);
		$('#dugmad').attr('hidden', true);
		$('.profileLook').attr('hidden', true);
		$('#content-users').attr('hidden', true);
		$('#allReservations').attr('hidden',true);
		$('#content-hregistration').attr('hidden',true);

	})
	
	//VIEW COMMENTS
		$('#apartmentsTable').on('click','button',function(event){
		trid=$(event.target).closest('tr').attr('id');
		if( $(event.target).attr("id")=="comments-apartment"){
			
				$.ajax({
				url:"ProjectRents/getApartmentById" + trid,
				type : "GET",
				contentType:'multipart/form-data',
				success:function(data){
					drawComments(data);
					modal3.style.display="block";
				}
			})
			
		}
	})
	
		//DELETE AND EDTI APARTMENT
	$('#apartmentsTable').on('click','button',function(event){
		if( $(event.target).attr("id")=="delete-apartment"){
			var trid = $(event.target).closest('tr').attr('id'); // table row ID 
			$.ajax({
				url:"ProjectRents/deleteApartment"+trid,
				type : "POST",
				contentType:'multipart/form-data',
				success:function(data){
					drawApartments(data);
					alert("Successfully deleted. ");
				}
			})
		
		}
	})
	//EDITING APARTMENT
	$('#add-apartment').click(function(){
		let apartment = new Object();
		var location=new Object();
		var address=new Object();
		let gen=$('#type').val()
		let type
		if(gen=='apartment')
			type=0;
		else
			type=1;
		console.log(type)
		apartment.type = type;
		console.log(apartment.type)
		let numRooms = $('#number-od-rooms').val();	apartment.numberOfRooms = numRooms;
		let numGuest = $('#number-od-guests').val();apartment.numberOfGuest = numGuest;
		let street=$('#street-name').val();address.street=street;
		let streetNum=$('#street-number').val();address.number=streetNum;
		let city=$('#city').val();address.city=city;
		let zipCode=$('#zip-code').val();address.zipCode=zipCode;
		let locationLength=$('#location-longitude').val();location.locationLength=locationLength;
		let locationWidth=$('#location-latitude').val();location.locationWidth=locationWidth;

		location.address=address;
		apartment.location=location;

		let dani = $('#Dates').val();
		apartment.dates= dani.split(',');
		let price = $('#price-per-night').val();apartment.price = price;
		
		var image=$('#blah').attr('src');
			
			
		apartment.images=image;
		
		apartment.availables=apartment.dates;
		console.log(apartment.availables);
		apartment.hostUsername = username;
			apartment.checkIn = $('#check-in').val();
			apartment.checkOut = $('#check-out').val();
		
		for (i = 0; i < checkIdList.length; i++) {
			 if ($('#'+checkIdList[i].id).is(':checked')) {
				 checkIdListEdit.push(checkIdList[i]);
			}
		}
		apartment.id = trid;
		apartment.amenities = checkIdListEdit;
		apartment.status = $('#status').val();
		
			 if(numRooms<1){
			$('#error-apartment').text('Number of rooms has to be higher then 0').show();
       		$('#error-apartment').delay(4000).fadeOut('slow');
		}
		else if(numGuest<1){
			$('#error-apartment').text('Number of guests has to be higher then 0').show();
       		$('#error-apartment').delay(4000).fadeOut('slow');
		}
		else if(street=="")
		{
		$('#error-apartment').text('Enter street name!').show();
       		$('#error-apartment').delay(4000).fadeOut('slow');	
		}
		else if(streetNum=="")
		{
		$('#error-apartment').text('Enter street number!').show();
       		$('#error-apartment').delay(4000).fadeOut('slow');	
		}
		else if(city=="")
		{
		$('#error-apartment').text('Enter city!').show();
       		$('#error-apartment').delay(4000).fadeOut('slow');	
		}
		else if(zipCode=="")
		{
		$('#error-apartment').text('Enter zip code!').show();
       		$('#error-apartment').delay(4000).fadeOut('slow');	
		}
		else if(jQuery.isEmptyObject(dani)){
			$('#error-apartment').text('You have to choose at least one date for rent').show();
       		$('#error-apartment').delay(4000).fadeOut('slow');
		}
		else if(price<1){
			$('#error-apartment').text('Price has to be higher then 0').show();
       		$('#error-apartment').delay(4000).fadeOut('slow');
		}
		else if(image==null){
			$('#error-apartment').text('You have to put image!').show();
       		$('#error-apartment').delay(4000).fadeOut('slow');
		}
		
		else{
					$.ajax({
			url:"ProjectRents/editApartment",
			type :"POST",
			data: JSON.stringify(apartment),
			contentType:"application/json",
			success :function(data){
				modal2.style.display = "none"
				alert('Successfully edited apartment.')
				drawApartments(data)
			}
		})
		}
		

	})
	
	$('#datepicker').datepicker({
        startDate: new Date(),
        multidate: true,
        format: "dd/mm/yyyy",
        daysOfWeekHighlighted: "5,6",
        datesDisabled: ['31/08/2017'],
        language: 'en'
    }).on('changeDate', function(e) {
        // `e` here contains the extra attributes
        $(this).find('.input-group-addon .count').text(' ' + e.dates.length);
    });
	$('#datepicker2').datepicker({
        startDate: new Date(),
        multidate: false,
        format: "mm/dd/yyyy",
        daysOfWeekHighlighted: "5,6",
        datesDisabled: ['31/08/2017'],
        language: 'en'
    }).on('changeDate', function(e) {
        // `e` here contains the extra attributes
        $(this).find('.input-group-addon .count').text(' ' + e.dates.length);
    });
	$('#datepicker3').datepicker({
        startDate: new Date(),
        multidate: false,
        format:"mm/dd/yyyy",
        daysOfWeekHighlighted: "5,6",
        datesDisabled: ['31/08/2017'],
        language: 'en'
    }).on('changeDate', function(e) {
        // `e` here contains the extra attributes
        $(this).find('.input-group-addon .count').text(' ' + e.dates.length);
    });
	$('#apartmentsTable').on('click','button',function(event){
		if( $(event.target).attr("id")=="edit-apartment"){
			
			checkIdListEdit=[];
			trid = $(event.target).closest('tr').attr('id'); // table row ID
			var dates, checkIn, checkOut, amenities;
			//AMENITIIIIES
			$.ajax({
				url:'ProjectRents/getAllAmenities',
				type : "GET",
				contentType:'application/json',
				success:function(data){
					drawAmenitiesInApartment(data);
				}
			})
			
			$.ajax({
				url:"ProjectRents/getApartmentById" + trid,
				type : "GET",
				contentType:'application/json',
				success:function(apartment){
					 checkIn = apartment.checkIn;
					 checkOut = apartment.checkOut;
					 var hostUsername = apartment.hostUsername;
					 dates = apartment.dates;
					var images = apartment.images;
					 amenities = apartment.amenities;
					 for (i = 0; i < amenities.length; i++) {
						 $('#'+amenities[i].id).prop('checked', true);
					}
					 $('#host').val(hostUsername);
					$('#datepicker').datepicker('setDate', dates);
					 $('#Dates').val(dates);
					$('#check-in').val(checkIn);
					$('#check-out').val(checkOut);
				}
			});
			modal2.style.display = "block";
			
			
			$('#status').val($(event.target).parent().parent().children().first().next().text());
			if($(event.target).parent().parent().children().first().next().next().text() == "APARTMENT")
				$('#type').val("apartment");
			else 
				$('#type').val("room");
				
			var lokacija=$(event.target).parent().parent().children().first().next().next().next().text();
			var deloviLok=lokacija.split(',');
			$('#street-name').val(deloviLok[0])
			$('#street-number').val(deloviLok[1])
			$('#city').val(deloviLok[2])
			$('#zip-code').val(deloviLok[3])
			
			console.log()
			
			$('#number-od-rooms').val($(event.target).parent().parent().children().first().next().next().next().next().next().text());
			$('#number-od-guests').val($(event.target).parent().parent().children().first().next().next().next().next().next().next().text());
			$('#price-per-night').val($(event.target).parent().parent().children().first().next().next().next().next().next().next().next().text());
			
			
			$('#location-longitude').attr('hidden',true);
			$('#location-latitude').attr('hidden',true);
			
			$('#add-apartment').text("EDIT APARTMENT");
		}
		
		
	})
	//REGISTER NEW HOST
	
	$('a[href="#registerNewHost"]').click(function(){
		$('#content-apartmant').attr('hidden', true);
		$('#dugmad').attr('hidden', true);
		$('.profileLook').attr('hidden', true);
		$('#content-users').attr('hidden', true);
		$('#allReservations').attr('hidden',true);
		$('#content-hregistration').attr('hidden',false);
		
		$('form#registrationHost').submit(function(event){
		event.preventDefault()
		console.log('saljemo rest')
		let username=$('#husername').val()
		let name=$('#hname').val()
		let surname=$('#hsurname').val()
		let gen=$('#hgender').val()
		let gender
		if(gen=='male')
			gender=0;
		else
			gender=1;		
		
		let password=$('#hpassword').val()
		let passwordControl=$('#hpassControl').val()	
		
		var user = new Object();
		user.username=username
		user.password=password
		var temp = JSON.stringify(user);
		
		 if(password.length<8)
		{
			$('#herror').text('Password has to have 8 characters minimum!').show();
       		$('#herror').delay(4000).fadeOut('slow');
		}
		 else if(password != passwordControl){
       		$('#herror').text('Passwords don\'t match. Try again.').show();
       		$('#herror').delay(4000).fadeOut('slow');
        }else{
			$.ajax({
				type:"POST",
				url:"ProjectRents/registration",
				data:JSON.stringify({
					username:username,
					password:password,
					name:name,
					surname:surname,
					gender:gender
				}),
				contentType:"application/json",
				success:function(data){	
					alert('New host successfully registerd.');
					window.location="./admin.html";
					//currentUser();
				},
				error:function(message){
				//	if(message.responseText=='the passwords didn\'t match!'){
					$('#herror').text(message.responseText);
					$('#herror').show();
					$('#herror').delay(4000).fadeOut('slow');
			//	}
					
				}
			})
        }
	})
	})
	
	//EDIT PROFILE
	$('a[href="#profile"]').click(function(){
		$('#content-apartmant').attr('hidden', true);
		$('#dugmad').attr('hidden', true);
		$('.profileLook').attr('hidden', false);
		$('#content-users').attr('hidden', true);
		$('#allReservations').attr('hidden',true);
		$('#content-hregistration').attr('hidden',true);

    	$.ajax({
    		url: 'ProjectRents/currentUser',
    		type : "GET",
    		success: function(user) {
    			username = user.username;
    			 name = user.name;
    			 surname = user.surname;
    			 password = user.password;
    			 role = user.role;
    			 if(user.gender == 'MALE')
    				 gender = 'male';
    			 else gender = 'female';
    			 $('#username').val(user.username);
    		    	$('#name').val(user.name);
    		    	$('#surname').val(user.surname);
    		    	$('#gender').val(gender);
    			
    		},
    		error:function(message){
    			console.log('Error')
    		}
    	});
	})
	  $('#submit-edit').click(function(){
    	event.preventDefault();
    	let username=$('#username').val()
		let name=$('#name').val()
		let surname=$('#surname').val()
		let gen=$('#gender').val()
		
		let gender
		if(gen=='male')
			gender=0;
		else
			gender=1;	
			
		if(name=="" || surname==""){
			$('#error').text('Surname and Name fields can not be empty!').show();
       		$('#error').delay(4000).fadeOut('slow');
		}
		else{
			 	$.ajax({
    		type :"POST",
    		url :"ProjectRents/userEdit",
    		data :JSON.stringify({
    			username:username,
				password:password,
				name:name,
				surname:surname,
				gender:gender, 
				role :role
    			}),
    		contentType : "application/json",
    		success : function(data){
    			console.log(' *********** EDITED *************')
    			alert('successfully edited profile.')
    		}
    	})
		}	
   
    })
    
    
     $('form#form-change-password').submit(function(){
    	event.preventDefault();
    	let oldpassword=$('#old-password').val()
    	let newpassword=$('#new-password').val()
		let confirmpassword=$('#confirm-new-password').val()
	
    	var checkOldPass = true;
    	console.log(password)
    	if(oldpassword != password){
    		$('#error-old').text('password isnt correct for your username.try again.');
			$('#error-old').show();
			$('#error-old').delay(2000).fadeOut('slow');
			checkOldPass = false
			//console.log('password isnt correct for your username.try again.oldpassword != password')
    	}
    	
    	if(checkOldPass){
    		if(newpassword != confirmpassword){
    		$('#error-confirm').text('confirm password doesnt match new password.try again');
			$('#error-confirm').show();
			$('#error-confirm').delay(4000).fadeOut('slow');
    		console.log('confirm password doesnt match new password.try again.newpassword != confirmpassword')
    		}
	    	else {
	    		password = newpassword;
	    		$.ajax({
		    		type :"POST",
		    		url :"ProjectRents/userEditPassword",
		    		data :JSON.stringify({
		    			username:username,
		    			password: password
		    			}),
		    		contentType : "application/json",
		    		success : function(data){
		    			alert('successfully edited profile password.')
		    			$('#old-password').val("")
			    			$('#new-password').val("")
			    			$('#confirm-new-password').val("")
		    		}
		    	})	    		
	    	}
    	}
    	
    })
});



