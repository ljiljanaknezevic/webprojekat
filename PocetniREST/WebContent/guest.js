function drawMyReservations(data){
	let temp='';
	for (i in data){
		temp+=`<tr id="`+data[i].reservationId+`">
			<td>`+data[i].apartmentId+`</td>
			<td>`+data[i].arrivalDate+`</td>
			<td>`+data[i].numberOfStay+`</td>
			<td>`+data[i].totalPrice+`</td>
			<td>`+data[i].message+`</td>
			<td>`+data[i].status+`</td>
			//<td><button id="cancel-reservation" class="btn btn-primary">Cancel reservation</button></td>
			</tr>`;
	}
	$('#tbodyReservations').html(temp);
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
			<td><button id="make-reservation" class="btn btn-primary">Make reservation</button></td></tr>`;
	}
	$('#apartmentsTable').html(temp);
}


var id='';
var username = '';
var name = 'none';
var surname = 'none';
var gender = 'none';
var password ='none';
var role = 'none';
$(document).ready(function(){
	
	$('#content').attr('hidden',false);
	
	$('#myreservations').click(function(e){
		$('#myReservations').attr('hidden',false);
		$('#content').attr('hidden',true);
		$('#myreservationsTable tbody').html('');
		$.ajax({
			url:"ProjectRents/guestsReservations",
			type : "GET",
			success:function(myreservations){
				
				drawMyReservations(myreservations);
			},
			error:function(message){
			console.log('Error with my reservations')
			}
		})
	})
	
	
	
	$.get({
		url:'ProjectRents/allActiveApartments',
		contentType : 'application/json',
		success : function(data){
			drawApartments(data)
		}
		
	})
	//MODAL
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
	$('#apartmentsTable').on('click','button',function(event){
		if($(event.target).attr("id")=="make-reservation"){
			modal.style.display="block";
			$('#nights-of-stay').val("");
			$('#message-for-host').val(""); 
			$('#start-date').val("");
			var trid=$(event.target).closest('tr').attr('id');
			
			$('#make-reservation2').click(function(){
				
				var reservation=new Object();
				
				reservation.arrivalDate=$('#start-date').val();
				reservation.numberOfStay=$('#nights-of-stay').val();
				reservation.message=$('#message-for-host').val();
				reservation.apartmentId=trid;
				reservation.guest=username;
				reservation.status=0;
				reservation.totalPrice=0;
				reservation.reservationId=id;
				
				
				console.log(trid);
				
				$.post({
					url:'ProjectRents/makeReservation',
					data:JSON.stringify(reservation),
					contentType:'application/json',
					success: function(data){
						modal.style.display="none";
						alert('Successfully made reservation!')
					},
					error:function(){
						modal.style.display="block";
						console.log("Error with making reservation");
					}
				})
				
				
			})
		}
	})

	
	$.get({
		url: 'ProjectRents/currentUser',
		success: function(user) {
			console.log(user);
			 username = user.username;
			 name = user.name;
			 surname = user.surname;
			 password = user.password;
			 role = user.role;
			 if(user.gender == 'MALE')
				 gender = 'male';
			 else gender = 'female';
			
		},
		error:function(message){
			console.log('Error')
			}
	});
	
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
    
    $('a[href="#profile"]').click(function(){
    	$('.welcome').attr('hidden', true);
    	$('.profileLook').attr('hidden', false);
    	$('#username').val(username);
    	$('#name').val(name);
    	$('#surname').val(surname);
    	$('#gender').val(gender);
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
     $('form#form-change-password').submit(function(){
    	event.preventDefault();
    	let oldpassword=$('#old-password').val()
    	let newpassword=$('#new-password').val()
		let confirmpassword=$('#confirm-new-password').val()
	
    	var checkOldPass = true;
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
		    			console.log(' *********** EDITED *************')
		    			alert('successfully edited profile.')
		    		}
		    	})	    		
	    	}
    	}
    	
    })
})