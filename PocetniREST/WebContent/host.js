var checkList = [];
var checkIdListEdit = [];
var checkIdList = [];
var username = '';
var id = '';
var trid = '';
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      $('#blah').attr('src', e.target.result);
    }
    
    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}
/*function convertToDataURLviaCanvas(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null; 
    };
    img.src = url;
}*/

/*function getBase64Image(imgElem) {
// imgElem must be on the same server otherwise a cross-origin error will be thrown "SECURITY_ERR: DOM Exception 18"
    var canvas = document.createElement("canvas");
    //canvas.width = imgElem.clientWidth;
    //canvas.height = imgElem.clientHeight;
	canvas.width=$(window).width();
	canvas.height=$(window).height();
    var ctx = canvas.getContext("2d");
	ctx.drawImage(imgElem, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}*/

function drawAmenities(data){
			let temp='';
			checkIdList= [];
			for (i in data){
				checkIdList.push(data[i].id);
				temp+=`<tr><td><input  id="`+data[i].id+`" type="checkbox"/></td><td>`+data[i].name+`</td></tr>`;
			}
			$('#amenitiesTable').html(temp);
}


function drawApartments(data){
	let temp='';
	let tempPassive='';
	for (i in data){
		if(data[i].status == "ACTIV")
		temp+=`<tr id="`+data[i].id+`">
			<td>`+data[i].status+`</td>
			<td>`+data[i].type+`</td>
			<td>`+data[i].location+`</td>
			<td>`+data[i].numberOfRooms+`</td>
			<td>`+data[i].numberOfGuest+`</td>
			<td>`+data[i].price+`</td>
			<td><button id="edit-apartment" class="btn btn-primary">Edit</button></td>
			<td><button id="delete-apartment" class="btn btn-primary">Delete </button></td></tr>`;
		else{
			tempPassive+=`<tr id="`+data[i].id+`">
			<td>`+data[i].status+`</td>
			<td>`+data[i].type+`</td>
			<td>`+data[i].location+`</td>
			<td>`+data[i].numberOfRooms+`</td>
			<td>`+data[i].numberOfGuest+`</td>
			<td>`+data[i].price+`</td>
			<td><button id="edit-apartment" class="btn btn-primary">Edit</button></td>
			<td><button id="delete-apartment" class="btn btn-primary">Delete </button></td></tr>`;
		}
	}
	$('#apartmentsTable').html(temp);
	$('#apartmentsTable-passive').html(tempPassive);
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
				 $('#'+amenities[i]).prop('checked', true);
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
	$('#content-profile').attr('hidden', true);
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
	var span = document.getElementsByClassName("close")[0];
	span.onclick = function() {
		modal.style.display = "none";
	}
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
	
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
		$('#check-in').val("");
		$('#check-out').val("");
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
		let gen=$('#type').val()
		let type
		if(gen=='apartment')
			type=0;
		else
			type=1;
		apartment.type = type;
		let numRooms = $('#number-od-rooms').val();apartment.numberOfRooms = numRooms;
		let numGuest = $('#number-od-guests').val();apartment.numberOfGuest = numGuest;
		//TODO :location
		//let adress=$('#location-entered').val();
		//getLocation(adress);

		let dani = $('#Dates').val();
		apartment.dates= dani.split(',');
		let price = $('#price-per-night').val();apartment.price = price;
		//TODO :images
		//let images=$('#blah').src;
		//var base64 = getBase64Image(document.getElementById("blah"));
		//apartment.images=base64;
		//console.log(base64);

		apartment.hostUsername = username;
		if($('#check-in').val() != "")
			apartment.checkIn = $('#check-in').val();
		if($('#check-out').val() != "")
			apartment.checkOut = $('#check-out').val();
		
		for (i = 0; i < checkIdList.length; i++) {
			 if ($('#'+checkIdList[i]).is(':checked')) {
					checkList.push(checkIdList[i]);
			}
		}
		
		apartment.id = id;
		apartment.amenities = checkList;
		$.ajax({
			url:"ProjectRents/addApartment",
			type :"POST",
			data: JSON.stringify(apartment),
			contentType:"application/json",
			success :function(data){
				modal.style.display = "none"
				alert('Successfully added apartment.')
				drawApartments(data)
			}
		})
		}
		else{
			//EDIT APARTMENT CLICK

			let apartment = new Object();
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
			//TODO :location
			//let adress=$('#location-entered').val();
			//getLocation(adress);

			let dani = $('#Dates').val();
			apartment.dates= dani.split(',');
			let price = $('#price-per-night').val();apartment.price = price;
			//TODO :images
			//let images=$('#blah').src;
			//var base64 = getBase64Image(document.getElementById("blah"));
			//apartment.images=base64;
			//console.log(base64);

			apartment.hostUsername = username;
			if($('#check-in').val() != "")
				apartment.checkIn = $('#check-in').val();
			if($('#check-out').val() != "")
				apartment.checkOut = $('#check-out').val();
			
			for (i = 0; i < checkIdList.length; i++) {
				 if ($('#'+checkIdList[i]).is(':checked')) {
					 checkIdListEdit.push(checkIdList[i]);
				}
			}
			apartment.id = trid;
			apartment.amenities = checkIdListEdit;
			apartment.status = $('#status').val();
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
			$('#content').attr('hidden', false);
			$('.profileLook').attr('hidden', true);
	  })
	//////////////////// profile


	  $('a[href="#profile"]').click(function(){
			$('#content').attr('hidden', true);
			$('.profileLook').attr('hidden', false);
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