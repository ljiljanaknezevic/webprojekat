var userLogged = 'none';




$(document).ready(function(){
	function currentUser(){

		$.get({
			url : "ProjectRents/currentUser",
			success : function(user){
				if(user == null){
					userLogged = 'none';
					console.log("NO ONE IS LOGGED");
					currentUserLogged = null;
				}else{
					userLogged = user.role;
					currentUserLogged = user;
				}
				console.log("********************* ",userLogged)
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
	$('#content-login').attr("hidden", false);
	$('#content').attr("hidden", true);
	$('form#login').submit(function(event){
		event.preventDefault();
		console.log("usloooo")
		var user = new Object();
		user.username=$('#username').val()
		user.password=$('#password').val()
		var temp = JSON.stringify(user);
	
		$.post({
			url : 'ProjectRents/login',
			contentType : 'application/json',
			data :temp,
			success : function(pom){
				
				if(pom.role=="ADMIN")
					window.location.href="./admin.html";
					if(pom.role=="HOST")
						window.location.href="./host.html";
					if(pom.role=="GUEST")
						window.location.href="./guest.html";
				alert('Succesfully loged in.');
			},
			error: function(message) {
				$('#error').text(message.responseText);
				$('#error').show();
				$('#error').delay(4000).fadeOut('slow');
//				$('#error').text("Nesipravno korisnicko ime ili lozinka");
//				$("#error").show().delay(3000).fadeOut();
			}
		})
	})
//	$('a[href="#apartments"]').click(function(){
//		$('form#login').attr("hidden", true);
//		$('#content').attr("hidden", false);
//		
//		$.ajax({
//			url:'ProjectRents/allActiveApartments',
//			type : "GET",
//			contentType : 'application/json',
//			success : function(data){
//				drawApartments(data)
//			}
//			
//		})
//	})


})



	/*function goToPage(){
		console.log('gotopage~~~~~~')
		 if(userLogged == 'ADMIN'){
				window.location="./admin.html";
			}else if(userLogged== 'HOST'){
				window.location="./host.html";
			}else if(userLogged== 'GUEST'){
				window.location="./guest.html";
			}
	}*/