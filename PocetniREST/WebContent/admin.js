function addUsersTr(user){
	let tr = $('<tr></tr>');
	let tdUsername = $('<td>' + user.username + '</td>');
	let tdName = $('<td>' + user.name+ '</td>');
	
	let tdSurname = $('<td>' + user.surname + '</td>');
	
	let tdGender = $('<td>' + user.gender + '</td>');
	let tdRole = $('<td>' + user.role+ '</td>');
	tr.append(tdUsername).append(tdName).append(tdSurname).append(tdGender).append(tdRole);
	
	
	$('#tbodyAll').append(tr);
}
function addSearchTable(user)
{
	let tr = $('<tr></tr>');
	let tdUsername = $('<td>' + user.username + '</td>');
	let tdName = $('<td>' + user.name+ '</td>');
	
	let tdSurname = $('<td>' + user.surname + '</td>');
	
	let tdGender = $('<td>' + user.gender + '</td>');
	let tdRole = $('<td>' + user.role+ '</td>');
	tr.append(tdUsername).append(tdName).append(tdSurname).append(tdGender).append(tdRole);
	
	
	$('#tbSearch').append(tr);
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
		url:"ProjectRents/allUsers",
		success:function(users){
			$('#search').attr('hidden', false);
			$('#allUsers').attr('hidden', false);
			$('#allUsers tbody').html('');
			if(users!=null){
				for(let user of users){
					addUsersTr(user);
				}
			}
		},
		error:function(message){
			console.log('Error')
			}
	});
});
$('#search').submit((event)=>{
	event.preventDefault();
	
	let username;
	let name;
	let surname;
	
	username=$('#searchUsername').val();
	name=$('#searchName').val();
	surname=$('#searchSurname').val();
	
	$.post({
		url:'ProjectRents/searchUsername',
		data:JSON.stringify({
			username:username,
			name:name,
			surname:surname
		}),
		contentType:'application/json',
		success:function(users){
			$('#searchResults').attr('hidden',false);
			$('#searchTable tbody').html('');
			$('#allUsers').attr('hidden', true);
			for (let user of users)
			{
				addSearchTable(user);
			}
		}
	});
	
});
});



