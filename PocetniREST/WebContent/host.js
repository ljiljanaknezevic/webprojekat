var checkList = [];
var checkIdListEdit = [];
var checkIdList = [];
var username = '';
var id = '';
var trid = '';
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
/**
function encodeImgtoBase64(element) {
 
      var img = element.files[0];
 
      var reader = new FileReader();
 
      reader.onloadend = function() {
 
        $("#convertImg").attr("href",reader.result);
 
        $("#convertImg").text(reader.result);
      }
      reader.readAsDataURL(img);
    }
 */

function drawComments(data){
	let temp='';
	for (i in data.comments){
			temp+=`<tr id="`+data.comments[i].commentId+`">
			<td>`+data.comments[i].guest+`</td>
			<td>`+data.comments[i].text+`</td>
			<td>`+data.comments[i].grade+`</td>`
			if(data.comments[i].hostApproved == false)
			temp +=	`<td><button id = "comment-show" type="button" class="btn btn-danger btn-sm">
	           Guests can't see comment</button></td>`;
			else
			temp +=	`<td><button id = "comment-show" type="button" class="btn btn-success btn-sm">
			           Guests see comment</button></td>`;	
			
			temp += `<td hidden = "true">`+data.comments[i].apartment+`</td></tr>`;
		}
		$('#tbodyComments').html(temp);
}

function drawAmenities(data){
			let temp='';
			checkIdList= [];
			for (i in data){
				checkIdList.push(data[i]);
				temp+=`<tr><td><input  id="`+data[i].id+`" type="checkbox"/></td><td>`+data[i].name+`</td></tr>`;
			}
			$('#amenitiesTable').html(temp);
}

function drawReservations(data){
	
	let temp='';
	$('#tbodyReservations').html('');
	for (i in data){
		
		var currentDate=new Date();
	
		
		var arr = data[i].arrivalDate.split('/');
		//Mon Sep 14 2020 19:09:29 GMT+0200 (Central European Summer Time)
		//format.setTimeZone(TimeZone.getTimeZone("GMT"));
		//date = format.parse(strDate);
		
		var pom=new Date(arr[0],arr[1]-1,arr[2]);
		//pom=pom.toLocaleDate();
		var j;
		
	//	for(j=0;j<data[i].numberOfStay;++j){
		pom.setDate(pom.getDate()+data[i].numberOfStay);
		console.log(pom);
		console.log(currentDate)
		//}
		
		if(pom<currentDate){
			console.log("DATUM JE ISTEKAO");
		
		if(data[i].status=='CREATED'){
			temp+=`<tr id="`+data[i].reservationId+`">
			<td>`+data[i].apartmentId+`</td>
			<td>`+data[i].arrivalDate+`</td>
			<td>`+data[i].numberOfStay+`</td>
			<td>`+data[i].totalPrice+`</td>
			<td>`+data[i].message+`</td>
			<td>`+data[i].status+`</td>
			<td><button  id="accept-reservation" class="btn btn-primary">Accept reservation</button></td>
			<td><button  id="reject-reservation" class="btn btn-primary">Reject reservation</button></td>
			<td><button   id="end-reservation" class="btn btn-primary">End reservation</button></td>
			</tr>`;
		}
		 else if(data[i].status=='ACCEPTED'){
				temp+=`<tr id="`+data[i].reservationId+`">
			<td>`+data[i].apartmentId+`</td>
			<td>`+data[i].arrivalDate+`</td>
			<td>`+data[i].numberOfStay+`</td>
			<td>`+data[i].totalPrice+`</td>
			<td>`+data[i].message+`</td>
			<td>`+data[i].status+`</td>
			<td><button disabled  id="accept-reservation" class="btn btn-primary">Accept reservation</button></td>
			<td><button  id="reject-reservation" class="btn btn-primary">Reject reservation</button></td>
			<td><button   id="end-reservation" class="btn btn-primary">End reservation</button></td>
			</tr>`;
		}
		
		 else{
			
			temp+=`<tr id="`+data[i].reservationId+`">
			<td>`+data[i].apartmentId+`</td>
			<td>`+data[i].arrivalDate+`</td>
			<td>`+data[i].numberOfStay+`</td>
			<td>`+data[i].totalPrice+`</td>
			<td>`+data[i].message+`</td>
			<td>`+data[i].status+`</td>
			<td><button disabled  id="accept-reservation" class="btn btn-primary">Accept reservation</button></td>
			<td><button disabled  id="reject-reservation" class="btn btn-primary">Reject reservation</button></td>
			<td><button  id="end-reservation" class="btn btn-primary">End reservation</button></td>
			</tr>`;
		
		}
		}
		else{
			console.log("DATUM NIJE ISTEKAO");
			
			if(data[i].status=='CREATED'){
			temp+=`<tr id="`+data[i].reservationId+`">
			<td>`+data[i].apartmentId+`</td>
			<td>`+data[i].arrivalDate+`</td>
			<td>`+data[i].numberOfStay+`</td>
			<td>`+data[i].totalPrice+`</td>
			<td>`+data[i].message+`</td>
			<td>`+data[i].status+`</td>
			<td><button  id="accept-reservation" class="btn btn-primary">Accept reservation</button></td>
			<td><button  id="reject-reservation" class="btn btn-primary">Reject reservation</button></td>
			<td><button disabled  id="end-reservation" class="btn btn-primary">End reservation</button></td>
			</tr>`;
		}
		else  if(data[i].status=='ACCEPTED'){
				temp+=`<tr id="`+data[i].reservationId+`">
			<td>`+data[i].apartmentId+`</td>
			<td>`+data[i].arrivalDate+`</td>
			<td>`+data[i].numberOfStay+`</td>
			<td>`+data[i].totalPrice+`</td>
			<td>`+data[i].message+`</td>
			<td>`+data[i].status+`</td>
			<td><button disabled  id="accept-reservation" class="btn btn-primary">Accept reservation</button></td>
			<td><button  id="reject-reservation" class="btn btn-primary">Reject reservation</button></td>
			<td><button disabled  id="end-reservation" class="btn btn-primary">End reservation</button></td>
			</tr>`;
		}
		
		 else{
			//console.log("Istekla je rezervacija");
			temp+=`<tr id="`+data[i].reservationId+`">
			<td>`+data[i].apartmentId+`</td>
			<td>`+data[i].arrivalDate+`</td>
			<td>`+data[i].numberOfStay+`</td>
			<td>`+data[i].totalPrice+`</td>
			<td>`+data[i].message+`</td>
			<td>`+data[i].status+`</td>
			<td><button disabled  id="accept-reservation" class="btn btn-primary">Accept reservation</button></td>
			<td><button disabled  id="reject-reservation" class="btn btn-primary">Reject reservation</button></td>
			<td><button  disabled id="end-reservation" class="btn btn-primary">End reservation</button></td>
			</tr>`;
		
		}

		}			
	}
	
	
	$('#tbodyReservations').html(temp);
}

function drawApartments(data){
//"data:image/webp;base64,"	
	
	let temp='';
	let tempPassive='';
	for (i in data){
		if(data[i].status == "ACTIV")
		temp+=`<tr id="`+data[i].id+`">
			<td class = "tdCol">`+data[i].status+`</td>
			<td class="tdCol">`+data[i].type+`</td>
			<td>`+data[i].location.address.street+" "+data[i].location.address.number+" "+data[i].location.address.city+" "+data[i].location.address.zipCode+`</td>
			<td>`+data[i].numberOfRooms+`</td>
			<td>`+data[i].numberOfGuest+`</td>
			<td>`+data[i].price+`</td>
			<td><img id="blah" height="150px alt="your image" src="data:image/webp;base64,"`+data[i].images`</td>
			<td><button id="comments-apartment" class="btn btn-primary">View comments </button></td>
			<td><button id="edit-apartment" class="btn btn-primary">Edit</button></td>
			<td><button id="delete-apartment" class="btn btn-primary">Delete </button></td></tr>`;
		else{
			tempPassive+=`<tr id="`+data[i].id+`">
			<td>`+data[i].status+`</td>
			<td class = "tdCol">`+data[i].type+`</td>
			<td>`+data[i].location.address.street+" "+data[i].location.address.number+" "+data[i].location.address.city+" "+data[i].location.address.zipCode+`</td>
			<td>`+data[i].numberOfRooms+`</td>
			<td>`+data[i].numberOfGuest+`</td>
			<td>`+data[i].price+`</td>
			<td><img id="blah" height="150px alt="your image" src="data:image/webp;base64,"`+data[i].images+`</td>
			<td><button id="comments-apartment" class="btn btn-primary">View comments </button></td>
			<td><button id="edit-apartment" class="btn btn-primary">Edit</button></td>
			<td><button id="delete-apartment" class="btn btn-primary">Delete </button></td></tr>`;
		}
	}
	$('#apartmentsTable').html(temp);
	$('#apartmentsTable-passive').html(tempPassive);
}

function drawUsers(data){
	let temp='';
	
	for (i in data){
		temp+=`<tr><td class = "nameUser">` + data[i].username + `</td>
		<td >`+data[i].name+`</td>
		<td>`+data[i].surname+`</td>
		<td class = "nameGender">`+data[i].gender+`</td>
		<td class = "nameRole">`+data[i].role+`</td>
		</tr>`;
	}
	$('#usersTable').html(temp);
}
var modal='';
function someFunc(event){
	if( $(event.target).attr("id")=="delete-apartment"){
		 trid = $(event.target).closest('tr').attr('id'); // table row ID 
		$.ajax({
			url:"ProjectRents/deleteApartment"+trid,
			type : "POST",
			contentType:'multipart/form-data',
			success:function(data){
				var hostsLists = [];
				for( i in data){
					if(data[i].hostUsername == username){
						hostsLists.push(data[i]);
					}
				}
				drawApartments(hostsLists)
				alert("Successfully deleted. ");
			}, 
			error:function(){
				alert('Deleting failed. Try again.')
			}
		})
	}
	
	if( $(event.target).attr("id")=="edit-apartment"){
	checkIdListEdit=[];
	$('#tr-status').attr('hidden', false);	
	 trid = $(event.target).closest('tr').attr('id'); // table row ID
	var dates, checkIn, checkOut, amenities;
	//AMENITIIIIES
	$.ajax({
		url:'ProjectRents/getAllAmenities',
		type : "GET",
		contentType:'application/json',
		success:function(data){
			drawAmenities(data);
		}
	})
	$.ajax({
		url:"ProjectRents/getApartmentById" + trid,
		type : "GET",
		contentType:'application/json',
		success:function(apartment){
			 checkIn = apartment.checkIn;
				console.log(checkIn)

			 checkOut = apartment.checkOut;
			var hostUsername = apartment.hostUsername;
			 dates = apartment.dates;
			var images = apartment.images;
			 amenities = apartment.amenities;
			 for (i = 0; i < amenities.length; i++) {
				 $('#'+amenities[i].id).prop('checked', true);
			}
			$('#datepicker').datepicker('setDate', dates);
			 $('#Dates').val(dates);
			$('#check-in').val(checkIn);
			$('#check-out').val(checkOut);
		}
	});
	modal.style.display = "block";
	
	
	$('#status').val($(event.target).parent().parent().children().first().text());
	if($(event.target).parent().parent().children().first().next().text() == "APARTMENT")
		$('#type').val("apartment");
	else 
		$('#type').val("room");
	$('#location').val($(event.target).parent().parent().children().first().next().next().text()); //nema nista pa nema sta da ispise
	$('#number-od-rooms').val($(event.target).parent().parent().children().first().next().next().next().text());
	$('#number-od-guests').val($(event.target).parent().parent().children().first().next().next().next().next().text());
	$('#price-per-night').val($(event.target).parent().parent().children().first().next().next().next().next().next().text());
	
	$('#add-apartment').text("EDIT APARTMENT");
}

}

var id='';
var username = '';
var name = 'none';
var surname = 'none';
var gender = 'none';
var password ='none';
var role = 'none';
$(document).ready(function(){
	
	$('#content').attr('hidden', false);
	$('.profileLook').attr('hidden', true);
	$('#content-users').attr('hidden',true);
	$('#myReservationsTable').attr('hidden',true);
	$.ajax({
		url:"ProjectRents/currentUser",
		type : "GET",
		contentType : "application/json",
		success :function(data){
			username = data.username;
		}
	})
	
	$.ajax({
		url:'ProjectRents/getHostsApartments',
		type : 'GET',
		contentType : 'application/json',
		success : function(data){
			drawApartments(data)
		}
	})

	    //USERS THAT HAVE RESEVATIONS AT OUR HOST
	      $('a[href="#users"]').click(function(){
			$('#content').attr('hidden', true);
			$('.profileLook').attr('hidden', true);
			$('#myReservationsTable').attr('hidden',true);
			$('#content-users').attr('hidden',false);
			
			$.ajax({
				url:"ProjectRents/allUsersForHost",
				type : "GET",
				success : function(data){
					drawUsers(data);
				}
			})
	      });
	    
	//RESERVATION TAB
	$('a[href="#reservationsClick"]').click(function(e){
		$('#content').attr('hidden',true);
		$('#content-users').attr('hidden',true);
		$('#myReservationsTable').attr('hidden',false);
		$('.profileLook').attr('hidden', true);

		$.ajax({
			url:"ProjectRents/hostsReservations",
			type : "GET",
			success:function(reservations){
				console.log('Crta');
				drawReservations(reservations);
			},
			error:function(message){
			console.log('Error with reservations')
			}
		})
	})
	
	//CLICKS IN RESERVATION TABLE
	
		$('#tbodyReservations').on('click','button',function(event){
		if($(event.target).attr('id')=="accept-reservation"){
			var trid = $(event.target).closest('tr').attr('id');
				$.ajax({
				url:"ProjectRents/acceptReservation"+trid,
				type : "POST",
				contentType:'multipart/form-data',
				success:function(data){
					drawReservations(data);
					alert("Successfully accepted. ");
				}
			})
		}
	})
	
			$('#tbodyReservations').on('click','button',function(event){
		if($(event.target).attr('id')=="end-reservation"){
			var trid = $(event.target).closest('tr').attr('id');
				$.ajax({
				url:"ProjectRents/endReservation"+trid,
				type : "POST",
				contentType:'multipart/form-data',
				success:function(data){
					drawReservations(data);
					alert("Successfully ended.");
				}
			})
		}
	})
	
	$('#tbodyReservations').on('click','button',function(event){
		if($(event.target).attr('id')=="reject-reservation"){
			var trid = $(event.target).closest('tr').attr('id');
				$.ajax({
				url:"ProjectRents/rejectReservation"+trid,
				type : "POST",
				contentType:'multipart/form-data',
				success:function(data){
				//	console.log(data);
					//$('#tbodyReservations').html('');
					drawReservations(data);
					alert("Successfully rejected. ");
				}
			})
		}
	})
	
	
	 $('ul.dropdown-menu li').click(function(e) 
    { 
    	if($(this).attr('id') == 'logout'){
    		$.get({
    			url: "ProjectRents/logout",
    			success: function() {
    				alert("Successfully logged out .");
    				window.location="./login.html";
    			}
    		})
    	}
    });
	
	
	//apartments modal
	modal = document.getElementById('myModal');
	modal1 = document.getElementById('modal3');
	 var span = document.getElementsByClassName("close")[0];
	 span.onclick = function() {
		 modal.style.display = "none";
	 }
	 window.onclick = function(event) {
		 if (event.target == modal) {
			 modal.style.display = "none";
		 }
	 }
	var span1 = document.getElementsByClassName("close")[1];
	span1.onclick = function() {
		modal1.style.display = "none";
	}
	window.onclick = function(event) {
		if (event.target == modal) {
			modal1.style.display = "none";
		}
	}
	
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
	$('#apartmentsTable-passive').on('click','button',function(event){
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
	//commnets on this click change showing on guests show
	//menjamo status kod komenata isHostApproved
	$('#tbodyComments').on('click','button',function(event){
		commentId=$(event.target).closest('tr').attr('id');
		appartmentId = $(event.target).parent().parent().children().first().next().next().next().next().text();
		$.ajax({
			url:"ProjectRents/hostChangeViewOfComment"+ commentId,
			type : "POST",
			contentType:'multipart/form-data',
			success :function(data){
				drawComments(data);
				alert('izenjeno')
			}, 
			error: function(){
				console.log('smt went wrong')
			}
			
		})
	})
	$('#addApartment').click(function(){
		checkList=[];
		$('#datepicker').datepicker('setDate', null);
		$('#add-apartment').text("ADD APARTMENT");
		modal.style.display = "block";
		$('#tr-status').attr('hidden', true);	
		$('#number-od-rooms').val("");
		$('#location').val(""); 
		$('#number-od-guests').val("");
		$('#Dates').val("");
		$('#price-per-night').val("");
		$('#street-name').val("");
		$('#street-number').val("");
		$('#city').val("");
		$('#zip-code').val("");
		$('#location-longitude').val("");
		$('#location-latitude').val("");
		
		
 
		$('#check-in').val("14:00");
		$('#check-out').val("10:00");
		//AMENITIIIIES
		$.ajax({
			url:'ProjectRents/getAllAmenities',
			type : "GET",
			contentType:'application/json',
			success:function(data){
				drawAmenities(data);
			}
		})
	})
	
	//button for saving dates about apartment
	$('#add-apartment').click(function(){
		if ($(this).text()=="ADD APARTMENT") {
		var apartment = new Object();
		var location=new Object();
		var address=new Object();
		let gen=$('#type').val()
		let type
		if(gen=='apartment')
			type=0;
		else
			type=1;
		apartment.type = type;
		let numRooms = $('#number-od-rooms').val();apartment.numberOfRooms = numRooms;
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
		var images=[];
		var image=$('#blah').attr('src');
		//images.push(image);
		apartment.images=image;
		
		
		apartment.availables=apartment.dates;
		console.log(apartment.availables);
		apartment.hostUsername = username;
		if($('#check-in').val() != "")
			apartment.checkIn = $('#check-in').val();
		if($('#check-out').val() != "")
			apartment.checkOut = $('#check-out').val();
		
		for (i = 0; i < checkIdList.length; i++) {
			 if ($('#'+checkIdList[i].id).is(':checked')) {
					checkList.push(checkIdList[i]);
			}
		}
		
		apartment.id = id;
		apartment.amenities = checkList;
		
		
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
		else if(locationLength=="")
		{
		$('#error-apartment').text('Enter  longitude!').show();
       		$('#error-apartment').delay(4000).fadeOut('slow');	
		}
		else if(locationWidth=="")
		{
		$('#error-apartment').text('Enter lantitude!').show();
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
		else{
			$.ajax({
			url:"ProjectRents/addApartment",
			type :"POST",
			data: JSON.stringify(apartment),
			contentType:"application/json",
			success :function(data){
				modal.style.display = "none"
				alert('Successfully added apartment.')
				drawApartments(data)
			},
				error:function(message){
					console.log(location);
				//	if(message.responseText=='the passwords didn\'t match!'){
					$('#error-apartment').text(message.responseText);
					$('#error-apartment').show();
					$('#error-apartment').delay(4000).fadeOut('slow');
			//	}
					
				}
		})
			
		}

		}
		else{
			//EDIT APARTMENT CLICK

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
			//TODO :images
			//let images=$('#blah').src;
			//var base64 = getBase64Image(document.getElementById("blah"));
			//apartment.images=base64;
			//console.log(base64);
			apartment.availables=apartment.dates;
			console.log(apartment.availables);

			apartment.hostUsername = username;
			if($('#check-in').val() != "")
				apartment.checkIn = $('#check-in').val();
			if($('#check-out').val() != "")
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
		else if(locationLength=="")
		{
		$('#error-apartment').text('Enter  longitude!').show();
       		$('#error-apartment').delay(4000).fadeOut('slow');	
		}
		else if(locationWidth=="")
		{
		$('#error-apartment').text('Enter lantitude!').show();
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
		
		else{
					
			$.ajax({
				url:"ProjectRents/editApartment",
				type :"POST",
				data: JSON.stringify(apartment),
				contentType:"application/json",
				success :function(data){
					modal.style.display = "none"
					alert('Successfully edited apartment.')
					var hostsLists = [];
					for( i in data){
						if(data[i].hostUsername == username){
							hostsLists.push(data[i]);
						}
					}
					drawApartments(hostsLists)
				}
			})
		}
	
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

	$("#file").change(function() {
 	 readURL(this);	
	});	

	  $('a[href="#apartments"]').click(function(){
		  $('#content-users').attr('hidden', true);
			$('#content').attr('hidden', false);
			$('.profileLook').attr('hidden', true);
			$('#myReservationsTable').attr('hidden',true);
	  })
	//////////////////// profile


	  $('a[href="#profile"]').click(function(){
			$('#content').attr('hidden', true);
			$('.profileLook').attr('hidden', false);
			$('#myReservationsTable').attr('hidden',true);
			$('#content-users').attr('hidden',true);
	    	$.ajax({
	    		url: 'ProjectRents/currentUser',
	    		type : "GET",
	    		success: function(user) {
	    			 name = user.name;
	    			 surname = user.surname;
	    			 password = user.password;
	    			 role = user.role;
	    			 if(user.gender == 'MALE')
	    				 gender = 'male';
	    			 else gender = 'female';
	    			 $('#userr').text(user.username);
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

	    
	    //PROOOOFIIIL
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
	    
	    //change password
	    $('#change-password').click(function(event){
	    	console.log('promena taba')
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
			    		}
			    	})	    		
		    	}
	    	}
	    	
	    })

})