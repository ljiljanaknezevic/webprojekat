var userLogged = 'none';
function drawApartments(data){
	let temp='';
	for (i in data){
		temp+=`<tr id="`+data[i].id+`">
			<td>`+data[i].status+`</td>
			<td>`+data[i].type+`</td>
			<td>`+data[i].location+`</td>
			<td>`+data[i].numberOfRooms+`</td>
			<td>`+data[i].numberOfGuest+`</td>
			<td>`+data[i].price+`</td>
			<td><button id="view-comment" class="btn btn-primary">View comments</button></td></tr>`;
	}
	$('#apartmentsTable').html(temp);
}

$(document).ready(function(){
	
	
	$('a[href="#apartments"]').click(function(){
		$('form#login').attr("hidden", true);
		$('#content').attr("hidden", false);
		$('#content-registration').attr("hidden", true);
		$.ajax({
			url:'ProjectRents/allActiveApartments',
			type : "GET",
			contentType : 'application/json',
			success : function(data){
				drawApartments(data)
			}
			
		})
	})
})

