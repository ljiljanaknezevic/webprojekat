$(document).ready(function() {
	
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
				alert('uspesno registrovani');
			},
			error:function(message){
				$('#error').text(message);
				$('#error').show().delay(3000).hide();
			}
		})
		
		
	})
	
})