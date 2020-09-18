var userLogged = 'none';


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
						console.log('error')
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
		if(password.length<8)
		{
			$('#error').text('Password has to have 8 characters minimum!').show();
       		$('#error').delay(4000).fadeOut('slow');
		}
		else if(password != passwordControl){
       		$('#error').text('Passwords don\'t match. Try again.').show();
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
	
	
})