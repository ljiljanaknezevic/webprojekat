$(document).ready(function(){

	$('form#login').submit(function(event){
		event.preventDefault();
		var user = new Object();
		user.username=$('#username').val()
		user.password=$('#password').val()
		var temp = JSON.stringify(user);
		console.log('username', username);
		console.log('password', password);
		$.post({
			url : 'ProjectRents/login',
			data :temp,
			contentType : 'application/json',
			success : function(temp){
				console.log(temp.username);
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
})