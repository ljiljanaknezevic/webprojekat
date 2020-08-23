var username = 'none';
var name = 'none';
var surname = 'none';
var gender = 'none';
var password ='none';
var role = 'none';
$(document).ready(function(){

	$.get({
		url: 'ProjectRents/currentUser',
		success: function(user) {
			console.log(user);
			 username = user.username;
			 name = user.name;
			 surname = user.surname;
			 password = user.password;
			 role = user.role;
			 if(user.gender == 'MALE')
				 gender = 'male';
			 else gender = 'female';
			
		}
	});
	
    $('ul.dropdown-menu li').click(function(e) 
    { 
    	if($(this).attr('id') == 'logout'){
    		$.get({
    			url: "ProjectRents/logout",
    			success: function() {
    				alert("Successfully logged out .");
    				window.location="./login.html";
    			}
    		})
    	}
    });
    
    $('a[href="#profile"]').click(function(){
    	$('.welcome').attr('hidden', true);
    	$('.profileLook').attr('hidden', false);
    	$('#username').val(username);
    	$('#name').val(name);
    	$('#surname').val(surname);
    	$('#gender').val(gender);
    })

    $('#submit-edit').click(function(){
    	event.preventDefault();
    	let username=$('#username').val()
		let name=$('#name').val()
		let surname=$('#surname').val()
		let gen=$('#gender').val()
		
		let gender
		if(gen=='male')
			gender=0;
		else
			gender=1;		
    	$.ajax({
    		type :"POST",
    		url :"ProjectRents/userEdit",
    		data :JSON.stringify({
    			username:username,
				password:password,
				name:name,
				surname:surname,
				gender:gender, 
				role :role
    			}),
    		contentType : "application/json",
    		success : function(data){
    			console.log(' *********** EDITED *************')
    			alert('successfully edited profile.')
    		}
    	})
    })
    
    //change password
     $('form#form-change-password').submit(function(){
    	event.preventDefault();
    	let oldpassword=$('#old-password').val()
    	let newpassword=$('#new-password').val()
		let confirmpassword=$('#confirm-new-password').val()
	
    	var checkOldPass = true;
    	if(oldpassword != password){
    		$('#error-old').text('password isnt correct for your username.try again.');
			$('#error-old').show();
			$('#error-old').delay(2000).fadeOut('slow');
			checkOldPass = false
			//console.log('password isnt correct for your username.try again.oldpassword != password')
    	}
    	
    	if(checkOldPass){
    		if(newpassword != confirmpassword){
    		$('#error-confirm').text('confirm password doesnt match new password.try again');
			$('#error-confirm').show();
			$('#error-confirm').delay(4000).fadeOut('slow');
    		console.log('confirm password doesnt match new password.try again.newpassword != confirmpassword')
    		}
	    	else {
	    		password = newpassword;
	    		$.ajax({
		    		type :"POST",
		    		url :"ProjectRents/userEditPassword",
		    		data :JSON.stringify({
		    			username:username,
		    			password: password
		    			}),
		    		contentType : "application/json",
		    		success : function(data){
		    			console.log(' *********** EDITED *************')
		    			alert('successfully edited profile.')
		    		}
		    	})	    		
	    	}
    	}
    	
    })
})