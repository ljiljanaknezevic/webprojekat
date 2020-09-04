var userLogged = 'none';
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
			<td><button id="view-comment" class="btn btn-primary">View comments</button></td></tr>`;
	}
	$('#apartmentsTable').html(temp);
}

$(document).ready(function() {
		function currentUser(){
		
		$.get({
			url : "ProjectRents/currentUser",
			success : function(user){
				if(user == null){
					userLogged = 'none';
					console.log("NO ONE IS LOGGED");
					currentUserLogged = null;
				}else{
					/*if(user.role == "ADMIN"){
						userLogged = 'ADMIN';
					}else if (user.role == "HOST"){
						userLogged = 'HOST';
					}else if (user.role == "GUEST"){
						userLogged = 'GUEST';
					}*/
					userLogged = user.role;
					currentUserLogged = user;
				}
				 if(userLogged == 'ADMIN'){
						window.location="./admin.html";
					}else if(userLogged== 'HOST'){
						window.location="./host.html";
					}else if(userLogged== 'GUEST'){
						window.location="./guest.html";
					}else
						console.log('neceeee')
			}	
		})
	}

		$('#content-registration').attr("hidden", false);
		$('#content').attr("hidden", true);
	$('form#registration').submit(function(event){
		event.preventDefault()
		console.log('saljemo rest')
		let username=$('#username').val()
		let name=$('#name').val()
		let surname=$('#surname').val()
		let gen=$('#gender').val()
		let gender
		if(gen=='male')
			gender=0;
		else
			gender=1;		
		
		let password=$('#password').val()
		let passwordControl=$('#passControl').val()	
		
		var user = new Object();
		user.username=username
		user.password=password
		var temp = JSON.stringify(user);
		
		 if(password != passwordControl){
       		$('#error').text('Password doesnt match. Try again.').show();
       		$('#error').delay(4000).fadeOut('slow');
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
					console.log('proslo ');
					//alert('uspesno registrovani');
					currentUser();
				},
				error:function(message){
				//	if(message.responseText=='the passwords didn\'t match!'){
					$('#error').text(message.responseText);
					$('#error').show();
					$('#error').delay(4000).fadeOut('slow');
			//	}
					
				}
			})
        }
	})
	
		$('a[href="#apartments"]').click(function(){
			$('#content-registration').attr("hidden", true);
			$('#content').attr("hidden", false);
			
			$.ajax({
				url:'ProjectRents/allActiveApartments',
				type : "GET",
				contentType : 'application/json',
				success : function(data){
					drawApartments(data)
				}
				
			})
		})
	
})