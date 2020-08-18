$(document).ready(function(){

	$('form#login').submit(function(event){
		event.preventDefault();
		let username=$('#username').val()
		let password=$('#password').val()
		console.log('username', username);
		console.log('password', password);
		$.post({
			url : 'ProjectRents/login',
			data : JSON.stringify({
				username, 
				password
			}),
			contentType : 'application/json',
			success : function(user){
				console.log('proslo mico bravo.spavaj');
				alert('uspesno ulogovani');
			},
			error: function() {
				$('#error').text("Greska, pogresno ime ili sifra");
				$("#error").show().delay(3000).fadeOut();
			}
		})
	})
})