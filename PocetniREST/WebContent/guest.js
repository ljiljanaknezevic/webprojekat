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
    	console.log(role)
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

})