var checkList = [];
var checkIdListEdit = [];
var checkIdList = [];
var username = '';
var id = '';
var trid = '';

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
function addSearchTable(user)
{
	let tr = $('<tr></tr>');
	let tdUsername = $('<td>' + user.username + '</td>');
	let tdName = $('<td>' + user.name+ '</td>');
	
	let tdSurname = $('<td>' + user.surname + '</td>');
	
	let tdGender = $('<td>' + user.gender + '</td>');
	let tdRole = $('<td>' + user.role+ '</td>');
	tr.append(tdUsername).append(tdName).append(tdSurname).append(tdGender).append(tdRole);
	
	
	$('#tbSearch').append(tr);
}


function drawApartments(data){
	let temp='';
	for (i in data){
		temp+=`<tr id="`+data[i].id+`">
			<td>`+data[i].hostUsername+`</td>
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
function drawAmenitiesInApartment(data){
	let temp='';
	checkIdList= [];
	for (i in data){
		checkIdList.push(data[i].id);
		temp+=`<tr><td><input  id="`+data[i].id+`" type="checkbox"/></td><td>`+data[i].name+`</td></tr>`;
	}
	$('#amenitiesTableApartment').html(temp);
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

$(document).ready(function(){

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
    
    // users tab
$('#users').click(function(e)
{
	$('#content-users').attr('hidden', false);
	$('#dugmad').attr('hidden', true);
	$('#content-apartmant').attr('hidden', true);
	
	/*$.ajax({
		url:"ProjectRents/allUsers",
		type:"GET",
		success:function(users){
			$('#search').attr('hidden', false);
			$('#allUsers').attr('hidden', false);
			$('#allUsers tbody').html('');
			if(users!=null){
				for(let user of users){
					addUsersTr(user);
				}
			}
		},
		error:function(message){
			console.log('Error')
		}
	});*/
	
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
	$("#content").on('change paste keyup','[name=filterRest]',function (event) {
        var n=$("#filterUsername").val();
        var g=$("#filterGender").val();
        var r=$("#filterRole").val();
        if ($("#filterUsername").val()==""){
        	var username=$("#content td.nameUser").parent();
        }else{
        	var username=$("#content td.nameUser:contains('" + n + "')").parent()
        }
        if ($("#filterGender").val()==""){
        	var gender=$("#content td.nameUser").parent();
        }else{
        	var gender=$("#content td.nameGender:contains('" + g + "')").parent()
        }
        if ($("#filterRole").val()=="Search by role"){
        	var role=$("#content td.nameUser").parent();
        }else{
        	var role=$("#content td.nameRole:contains('" + r + "')").parent()
        }
        username.filter(gender).filter(role).show();
        $("#content td.nameUser").parent().not(username.filter(gender).filter(role)).hide();
    });

//LJILJA PRETRAGA
$('#search').submit((event)=>{
	event.preventDefault();
	
	let username;
	let name;
	let surname;
	
	username=$('#searchUsername').val();
	name=$('#searchName').val();
	surname=$('#searchSurname').val();
	
	$.ajax({
		url:'ProjectRents/searchUsername',
		type : "POST",
		data:JSON.stringify({
			username:username,
			name:name,
			surname:surname
		}),
		contentType:'application/json',
		success:function(users){
			$('#searchResults').attr('hidden',false);
			$('#searchTable tbody').html('');
			$('#allUsers').attr('hidden', true);
			for (let user of users)
			{
				addSearchTable(user);
			}
		}
		});
});
});


	//AMENITIES TAB

	// amenities 
	var modal = document.getElementById('myModal');
	var modal1 = document.getElementById('modal-amenities');
	var modal2 = document.getElementById('modal-apartment');
	
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	var span1 = document.getElementsByClassName("close")[1];
	var span2 = document.getElementsByClassName("close")[2];

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
	function drawAmenities(data){
		let temp='';
		for (i in data){
			console.log(data[i].name)
			temp+=`<tr id="`+data[i].id+`"><td>`+data[i].id
			+`</td><td>`+data[i].name+`</td>
			<td><button id="edit-amenities" class="btn btn-primary">Edit</button></td>
			<td><button id="delete-amenitie" class="btn btn-primary">Delete </button></td></tr>`;
		}
		$('#amenitiesTable').html(temp);
	}

	
	$('a[href="#amenities"]').click(function(){
		$('#dugmad').attr('hidden', false);
		$('#content-apartmant').attr('hidden', true);
		var ameniti = new Object();
		$.ajax({
			url:'ProjectRents/getAllAmenities',
			type :"GET",
			contentType:'application/json',
			success:function(data){
				drawAmenities(data);
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
				$.ajax({
					url:"ProjectRents/deleteAmenities"+id,
					type :"POST",
					contentType:'multipart/form-data',
					success:function(data){
						drawAmenities(data);
						modal2.style.display="none";
						alert("Successfully deleted ");
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
				if($('#amenities-name').val() == "")
				{
					$('#error-amenities').text('You didnt entered nothing. Try again.');
					$('#error-amenities').show();
					$('#error-amenities').delay(4000).fadeOut('slow');
					return;
				}
				else
				{
					$.ajax({
						url:"ProjectRents/addAmenities",
						type: "POST",
						contentType: 'application/json',
						data:JSON.stringify(amenitie),
						success:function(data){
							drawAmenities(data);
							modal.style.display="none";
						},
						error : function(){
							$('#error-amenities').text('Amenitie name already exists. Try again.');
							$('#error-amenities').show();
							$('#error-amenities').delay(4000).fadeOut('slow');
						}
					})
				
				}
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
	$('a[href="#apartments"]').click(function(){
		
		$('#content-apartmant').attr('hidden', false);
		$('#dugmad').attr('hidden', true);
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
			apartment.checkIn = $('#check-in').val();
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
				modal2.style.display = "none"
				alert('Successfully edited apartment.')
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
						 $('#'+amenities[i]).prop('checked', true);
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
			if($(event.target).parent().parent().children().first().next().text() == "APARTMENT")
				$('#type').val("apartment");
			else 
				$('#type').val("room");
			$('#location').val($(event.target).parent().parent().children().first().next().next().text()); //nema nista pa nema sta da ispise
			$('#number-od-rooms').val($(event.target).parent().parent().children().first().next().next().next().next().text());
			$('#number-od-guests').val($(event.target).parent().parent().children().first().next().next().next().next().next().text());
			$('#price-per-night').val($(event.target).parent().parent().children().first().next().next().next().next().next().text());
			
			$('#add-apartment').text("EDIT APARTMENT");
		}
	})

});



