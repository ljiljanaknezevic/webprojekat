var userLogged = 'none';
function drawApartments(data){
	let temp='';
	for (i in data){
		var list = [];
		for(x in data[i].amenities){
			if(!data[i].amenities[x].deleted)
				list.push(data[i].amenities[x].name)
		}
		var partsOfStr = list.join(',').replace(/,/g ,'<br>').split();
		temp+=`<tr id="`+data[i].id+`">
			<td>`+data[i].hostUsername+`</td>
			<td>`+data[i].status+`</td>
			<td>`+data[i].type+`</td>
			<td>`+data[i].location.address.street+","+data[i].location.address.number+","+data[i].location.address.city+","+data[i].location.address.zipCode+`</td>
			<td class = "nameAmenitie">`+partsOfStr+`</td>
			<td>`+data[i].numberOfRooms+`</td>
			<td>`+data[i].numberOfGuest+`</td>
			<td>`+data[i].price+`</td>
			<td><img id="blah" height="150px alt="your image" src="`+data[i].images+`"</td>
			<td><button id="view-comment" class="btn btn-primary">View comments</button></td></tr>`;
	}
	$('#apartmentsTable').html(temp);
}

function drawComments(data){
	console.log(data);
	let temp='';
	for (i in data.comments){
		if(data.comments[i].hostApproved == true){
			temp+=`<tr>
			<td>`+data.comments[i].guest+`</td>
			<td>`+data.comments[i].text+`</td>
			<td>`+data.comments[i].grade+`</td>
			</tr>`;
		}
		}
		$('#tbodyComments').html(temp);
}

$(document).ready(function(){
	
		var modal = document.getElementById('modal3');
		
		var span = document.getElementsByClassName("close")[0];
		
		span.onclick = function() {
		modal.style.display = "none";
	}
		
		window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
	
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
$('#apartmentsTable').on('click','button',function(event){
	
	trid=$(event.target).closest('tr').attr('id');
	if( $(event.target).attr("id")=="view-comment"){
		
			$.ajax({
			url:"ProjectRents/getApartmentById" + trid,
			type : "GET",
			contentType:'multipart/form-data',
			success:function(data){
				modal.style.display="block";
				drawComments(data);
				
			}
		})
		
		
	}
})
})

