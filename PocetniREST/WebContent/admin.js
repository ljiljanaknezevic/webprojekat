function addUsersTr(user){
	let tr = $('<tr></tr>');
	let tdUsername = $('<td>' + user.username + '</td>');
	let tdName = $('<td>' + user.name+ '</td>');
	
	let tdSurname = $('<td>' + user.surname + '</td>');
	
	let gender;
	switch(user.gender)
	{
		case 0: gender="Male";break;
		case 1: gender="Female";break;
	}
	
	let role;
	switch(user.role)
	{
		case 0: role="Admin";break;
		case 1: role="Host";break;
		case 2: role="Guest";break;
	}
	
	let tdGender = $('<td>' + gender + '</td>');
	let tdRole = $('<td>' + role+ '</td>');
	
	tr.append(tdUsername).append(tdName).append(td.Surname).append(td.Gender).append(td.Role);
	$('tbody').append(tr);
}





$(document).ready(function(){

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
$('#users').click(function(e)
{
	$.get({
		url:'ProjectRents/allUsers',
		contentType:'application.json',
		success:function(users){
			$('#allUsers').attr('hidden', false);
			$('#allUsers tbody').html('');
			for(let user of users)
			{
				addUsersTr(user);
			}
		},
		error:
			console.log('Neceeeeeeeee')
	});
});
});



