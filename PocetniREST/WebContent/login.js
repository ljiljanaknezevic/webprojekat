
$(document).ready(function(){

	$('form#login').submit(function(event){
		event.preventDefault();
		var user = new Object();
		user.username=$('#username').val()
		user.password=$('#password').val()
		var temp = JSON.stringify(user);
		$.post({
			url : 'ProjectRents/login',
			data :temp,
			contentType : 'application/json',
			success : function(temp){
				currentUser();
				alert('Succesfully loged in.');
				//TODO :treba provera koja je uloga i naspram toga da ide na odgovarajucu stranicu
				window.location="./home.html";
			},
			error: function(message) {
				$('#error').text(message.responseText);
				$('#error').show();
				$('#error').delay(4000).fadeOut('slow');
			}
		})
	})
	function currentUser(){

		$.get({
			url : "ProjectRents/currentUser",
			success : function(user){
				console.log(user.username);
				console.log(user.role);
				alert('funkcija');
				
					if(user.role == "ADMIN"){
						console.log("ADMIN IS LOGGED.");
						currentUserLogged = user;
					}else if (user.role == "HOST"){
						console.log("HOST IS LOGGED");
						currentUserLogged = user;
					}else if (user.role == "GUEST"){
						console.log("GUEST IS LOGGED");
						currentUserLogged = user;
						
					}
				}
			
		})
	}

})