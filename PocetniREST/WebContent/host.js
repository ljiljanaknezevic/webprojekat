var checkList = [];
var checkIdList = [];
var username = '';
var id = '';
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

function getBase64Image(imgElem) {
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
}

function drawAmenities(data){
			let temp='';
			for (i in data){
				checkIdList.push(data[i].id);
				temp+=`<tr><td><input  id="`+data[i].id+`" type="checkbox"/></td><td>`+data[i].name+`</td></tr>`;
			}
			$('#amenitiesTable').html(temp);
}


function drawApartments(data){
	let temp='';
	for (i in data){
		temp+=`<tr id="`+data[i].id+`">
			<td>`+data[i].status+`</td>
			<td>`+data[i].type+`</td>
			<td>`+data[i].location+`</td>
			<td>`+data[i].numberOfRooms+`</td>
			<td>`+data[i].numberOfGuest+`</td>
			<td>`+data[i].price+`</td>
			<td><button id="edit-apartment" class="btn btn-primary">Edit</button></td>
			<td><button id="delete-apartment" class="btn btn-primary">Delete </button></td></tr>`;
	}
	$('#apartmentsTable').html(temp);
}
$(document).ready(function(){
	
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
	var modal = document.getElementById('myModal');
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
		modal.style.display = "block";
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
<<<<<<< HEAD
		let images=$('#blah').src;
		var base64 = getBase64Image(document.getElementById("blah"));
		apartment.images=base64;
		console.log(base64);
		//for HOST-a username
=======
>>>>>>> cf01799faffd7b17cca206f152d2159e3b03dbe8
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

	//DELETE AND EDTI APARTMENT
	$('#apartmentsTable').on('click','button',function(event){
		if( $(event.target).attr("id")=="delete-apartment"){
			var trid = $(event.target).closest('tr').attr('id'); // table row ID 
			console.log(trid + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
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
})