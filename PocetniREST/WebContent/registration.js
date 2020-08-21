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
					alert('uspesno registrovani');
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