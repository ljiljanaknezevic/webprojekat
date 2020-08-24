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
	$('form#login').submit(function(event){
		event.preventDefault();
	//	currentUser();
		
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
				//console.log(temp.role)
				alert('Succesfully loged in.');
			
				//console.log(temp.role)
				/*alert('Succesfully loged in.');
				if(temp != null){
				if(temp.role == 'ADMIN'){
					window.location="./admin.html";
				}else if(temp.role== 'HOST'){
					window.location="./host.html";
				}else if(temp.role== 'GUEST'){
					window.location="./guest.html";
				}
				}else
					window.location="./home.html";*/
			},
			error: function(message) {
				$('#error').text(message.responseText);
				$('#error').show();
				$('#error').delay(4000).fadeOut('slow');
			}
		})
	})
	
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