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
	
	$.get({
		url:"ProjectRents/allUsers",
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
	});
});
$('#search').submit((event)=>{
	event.preventDefault();
	
	let username;
	let name;
	let surname;
	
	username=$('#searchUsername').val();
	name=$('#searchName').val();
	surname=$('#searchSurname').val();
	
	$.post({
		url:'ProjectRents/searchUsername',
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


	//AMENITIES TAB

	// amenities 
	var modal = document.getElementById('myModal');
	var modal1 = document.getElementById('modal-amenities');
	var modal2 = document.getElementById('modal-delete');
	
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
		$.get({
			url:'ProjectRents/getAllAmenities',
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
						$.post({
							url:'ProjectRents/editAmenities',
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
				$.post({
					url:"ProjectRents/deleteAmenities"+id,
					contentType:'multipart/form-data',
					//data :JSON.stringify(id),
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
					$.post({
						url:"ProjectRents/addAmenities",
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
});



