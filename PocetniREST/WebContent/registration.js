$(document).ready(function() {
	
	$('form#registerNew').submit(function(event){
		event.preventDefault()
		console.log('saljemo rest')
		let username=$('#username').val()
		let name=$('#name').val()
		let surname=$('#surname').val()
		let gender=$('#gender').val()
		let password=$('#pass').val()
		let passwordControl=$('#passControl').val()
		$.ajax({
			type:"POST",
			url:"ProjectRents/users",
			data:JSON.stringify({
				username:username,
				name:name,
				surname:surname,
				gender:gender,
				password:password
			}),
			contentType:"application/json",
			success:function(data){
				
				console.log(data.response)
				window.location.href='homepage.html';
			},
			error:function(message){
				$('#error').text(message);
				$('#error').show().delay(3000).hide();
			}
		})
		
		
	})
	
})