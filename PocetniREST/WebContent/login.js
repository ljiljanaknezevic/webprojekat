$(document).ready(function(){
	var userLogged='none';
	$("#form-signin").submit(funLogin());
	isLoggedIn();
	
	function funLogin(){
		return function(event){
			event.preventDefault();
			let username=$('#username').val()
			let password=$('#password').val()
			$.post({
				url:'rest/login',
				data:JSON.stringify({username:username,password:password}),
				contentType:'application/json',
				success:function(data){
				
				isLoggedIn();
				window.location.href="homepage.html";
				},
				error:function(message){
					$('#error').text(message.responseText);
					$('#error').show();
					$('#error').delay(4000).fadeOut('slow');
				}
				
			});
		}
	}
	
	function isLoggedIn(){
		$.get({
			url:"rest/currentUser",
			success:function(user){
				if(user==null){
					userLogged='none';
					currentUser=null;
				}
				else{
					alert("Success!!!!!!!!!!!!!!!!!!");
				}
			}
		})
	}
})