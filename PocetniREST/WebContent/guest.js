function drawMyReservations(data){
	let temp='';
	for (i in data){
		if(data[i].status=='CREATED' || data[i].status=='ACCEPTED'){
			temp+=`<tr id="`+data[i].reservationId+`">
			<td>`+data[i].apartmentId+`</td>
			<td>`+data[i].arrivalDate+`</td>
			<td>`+data[i].numberOfStay+`</td>
			<td>`+data[i].totalPrice+`</td>
			<td>`+data[i].message+`</td>
			<td>`+data[i].status+`</td>
			<td><button  id="cancel-reservation" class="btn btn-primary">Cancel reservation</button></td>
			<td><button disabled  id="comment" class="btn btn-primary">Leave a comment</button></td>
			</tr>`;
		}
			if(data[i].status=='REJECTED' || data[i].status=='COMPLETED'){
			temp+=`<tr id="`+data[i].reservationId+`">
			<td>`+data[i].apartmentId+`</td>
			<td>`+data[i].arrivalDate+`</td>
			<td>`+data[i].numberOfStay+`</td>
			<td>`+data[i].totalPrice+`</td>
			<td>`+data[i].message+`</td>
			<td>`+data[i].status+`</td>
			<td><button disabled  id="cancel-reservation" class="btn btn-primary">Cancel reservation</button></td>
			<td><button  id="comment" class="btn btn-primary">Leave a comment</button></td>
			</tr>`;
		}
	if(data[i].status=='CANCELED')
	{
		temp+=`<tr id="`+data[i].reservationId+`">
			<td>`+data[i].apartmentId+`</td>
			<td>`+data[i].arrivalDate+`</td>
			<td>`+data[i].numberOfStay+`</td>
			<td>`+data[i].totalPrice+`</td>
			<td>`+data[i].message+`</td>
			<td>`+data[i].status+`</td>
			<td><button disabled  id="cancel-reservation" class="btn btn-primary">Cancel reservation</button></td>
			<td><button disabled  id="comment" class="btn btn-primary">Leave a comment</button></td>
			</tr>`;
	}
				
	}
	
	$('#tbodyMyReservations').html(temp);
}

function drawApartments(data){
	let temp='';
	for (i in data){
		temp+=`<tr id="`+data[i].id+`">
			<td>`+data[i].status+`</td>
			<td class= "tdCol">`+data[i].type+`</td>
			<td>`+data[i].location.address.street+" "+data[i].location.address.number+" "+data[i].location.address.city+" "+data[i].location.address.zipCode+`</td>
			<td>`+data[i].numberOfRooms+`</td>
			<td>`+data[i].numberOfGuest+`</td>
			<td>`+data[i].price+`</td>
			<td><button id="make-reservation" class="btn btn-primary">Make reservation</button></td>
			<td><button id="comments-apartment" class="btn btn-primary">View comments </button></td>
			</tr>`;
	}
	$('#apartmentsTable').html(temp);
}

function drawComments(data){
	console.log("usao je u crtanje");
	console.log(data);
	let temp='';
	for (i in data.comments){
		if(data.comments[i].hostApproved == true){
			temp+=`<tr>
			<td>`+data.comments[i].guest+`</td>
			<td>`+data.comments[i].text+`</td>
			<td>`+data.comments[i].grade+`</td>
			</tr>`;
		}
		}
		$('#tbodyComments').html(temp);
}




var id='';
var username = '';
var usernameGuest = '';
var name = 'none';
var surname = 'none';
var gender = 'none';
var password ='none';
var role = 'none';
var trid = '';
var trid2 = '';
var availabledates='';
var arrivale='';
$(document).ready(function(){
		//MODAL
	var modal = document.getElementById('myModal');
	var modal2=document.getElementById('modal2');
	var modal3=document.getElementById('modal3');
	
	var span = document.getElementsByClassName("close")[0];
	var span2=document.getElementsByClassName("close")[1];
	var span3=document.getElementsByClassName("close")[2];
	span.onclick = function() {
		modal.style.display = "none";
	}
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}

	span2.onclick=function(){
		modal.style.display="none";
		modal2.style.display="none";
	}
	
	window.onclick = function(event) {
		if (event.target == modal2) {
			modal2.style.display = "none";
		}
	}
	span3.onclick=function(){
		modal3.style.display="none";
	}
	
	window.onclick = function(event) {
	    if (event.target == modal2) {
	        modal3.style.display = "none";
	    }
	}
	
	$('#content').attr('hidden',false);
	$('#myReservations').attr('hidden',true);
	$('.profileLook').attr('hidden', true);
	
	
	
	//comments 
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
	$('#myreservations').click(function(e){
		$('#myReservations').attr('hidden',false);
		$('#content').attr('hidden',true);
		$('.profileLook').attr('hidden', true);

		//$('#tbodyMyReservations tbody').html('');
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
	
	$('a[href="#apartments"]').click(function(){
		$('#content').attr('hidden',false);
		$('#myReservations').attr('hidden',true);
		$('.profileLook').attr('hidden', true);
	})
	
	$('#tbodyMyReservations').on('click','button',function(event){
		
		//CANCEL RESERVATION
		if($(event.target).attr('id')=="cancel-reservation"){
			var trid = $(event.target).closest('tr').attr('id');
				$.ajax({
				url:"ProjectRents/cancelReservation"+trid,
				type : "POST",
				contentType:'multipart/form-data',
				success:function(data){
					drawMyReservations(data);
					alert("Successfully canceled. ");
				}
			})
		}
			else if($(event.target).attr('id')=="comment"){
				modal2.style.display="block";
				$('#comment-left').val("");
				 trid2 = $(event.target).parent().parent().children().first().text();
		}
	})
	
//SENDING COMMENT	
	$('#send-comment').click(function(){
				event.preventDefault();
				var comment=new Object();
				comment.text=$('#comment-left').val();
				comment.grade=$('#rate').val();	
				comment.guest='';
				 console.log(trid2)

				comment.apartment=trid2;
				$.ajax({
					url:"ProjectRents/leaveComment",
					type : "POST",
					data:JSON.stringify(comment),
					contentType:'application/json',
					success: function(data){
						modal2.style.display="none";
						alert('Successfully sent comment!')
					},
					error:function(){
						modal2.style.display="block";
						alert("Error with sending comment");
					}
				})
				
				
			})
	
	$.ajax({
		url:'ProjectRents/allActiveApartments',
		type : "GET",
		contentType : 'application/json',
		success : function(data){
			drawApartments(data)
		}
		
	})

	//RESERVATION
	$('#apartmentsTable').on('click','button',function(event){
			//AVAILABLE DATES FO RESERVATION	
		if($(event.target).attr("id")=="make-reservation"){
			var trid3 = $(event.target).closest('tr').attr('id');
			
				$.ajax({
				url:"ProjectRents/getApartmentById" + trid3,
				type : "GET",
				contentType:'application/json',
				success:function(apartment){
					 availabledates = apartment.dates;
					
					arrivale=availabledates[0];
					
			  for(var i = 0; i < availabledates.length; i++) {
   			$('#dropdown select').append('<option value='+i+'>'+availabledates[i]+'</option>');
			}
				}
			});
			
			modal.style.display="block";
 			

		/*	function availableS(date) {
 			 dmy =date.getDate() + "/"+(date.getMonth() + 1)+"/" + date.getFullYear();

  				if ($.inArray(dmy, availabledates) != -1) {
    				return true;
 				 } else {
    				return false;
 				 }
				}
				
				$("#start-date").datepicker({
 				 beforeShowDay: function(dt){
					return [availableS(dt),""];
			}	});*/
			
			$('#dropdown select').empty();
			$('#nights-of-stay').val("");
			$('#message-for-host').val(""); 
			 trid=$(event.target).closest('tr').attr('id');
		}
	})
	
	
	
		
	$('#start-date').on('change',function(){
		arrivale=$('#start-date option:selected').text();
		console.log(arrivale);
	});
	
	$('#make-reservation2').click(function(){
				var valid=false;
				var reservation=new Object();
				//reservation.arrivalDate=$('#start-date').val();
				reservation.arrivalDate=arrivale;
				reservation.numberOfStay=$('#nights-of-stay').val();
				reservation.message=$('#message-for-host').val();
				reservation.apartmentId=trid;
				//reservation.guest=username;
				reservation.status=0;
				reservation.totalPrice=0;
				reservation.reservationId=id;
				
				//console.log(reservation.arrivalDate);
				var arr = reservation.arrivalDate.split('/');
		
				var pom=new Date(arr[2],arr[1]-1,arr[0]);
				//console.log(pom);
				
				//PROVERA DA LI SU DATUMI DOSTUPNI
				var i;
				var j;
				var av=[];
				
				
				for (j = 0; j < availabledates.length; ++j) {
    				var arrA=availabledates[j].split('/');
					console.log(availabledates[j]);
					var pomA=new Date(arrA[2],arrA[1]-1,arrA[0]);
					av.push(pomA.getTime());
					}

				
				for(i=0;i<reservation.numberOfStay;++i){
					console.log("**************");
					pom.setDate(pom.getDate()+1);
					console.log(pom.getTime());
					
					console.log($.inArray(pom.getTime(), av));
					if($.inArray(pom.getTime(), av) == -1){
						console.log(' NIJE U DOSTUPNIM DATUMIMA ')
						valid=false;
						break;
					}
					else{
						valid=true;
						console.log('U DOSTPUNIM DATUMIMA');
					}
					
					console.log(valid);
				}
				
				
				console.log(av);
				
			 if(reservation.numberOfStay<1){
			$('#error-apartment').text('Nights of stay has to be at least 1').show();
       		$('#error-apartment').delay(4000).fadeOut('slow');
		}
		else if(!valid){
			$('#error-apartment').text('Nights you have choosen are not available').show();
       		$('#error-apartment').delay(4000).fadeOut('slow');
		}
		else{
				$.ajax({
					url:'ProjectRents/makeReservation',
					type : "POST",
					data:JSON.stringify(reservation),
					contentType:'application/json',
					success: function(data){
						alert('Successfully made reservation!')
						modal.style.display="none";
						
					},
					error:function(){
						modal.style.display="block";
						console.log("Error with making reservation");
					}
				})
		}
				
			
				
				
			})
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
    
    $('a[href="#profile"]').click(function(){
    	$('#content').attr('hidden',true);
    	$('.profileLook').attr('hidden', false);
		$('#myReservations').attr('hidden',true);

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
		    		}
		    	})	    		
	    	}
    	}
    })

   
})