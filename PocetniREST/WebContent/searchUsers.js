//SEARCH MICI
$(document).ready(function() {
		 $("#searchByUsername").keyup(function () { //by username
		        $("#usersTable  tr").each(function () {
		            var name = $('td:eq(0)', this).text().toLowerCase();
		            if (name.indexOf($("#searchByUsername").val().toLowerCase()) > -1) {
		                $(this).show();
		            } else {
		                $(this).hide();
		            }
		        });
		    });
		 $("#searchByGender").keyup(function () { //by username
			 $("#usersTable tr").each(function () {
				 var username = $('td:eq(0)', this).text().toLowerCase();
				 var name = $('td:eq(3)', this).text().toLowerCase();
		         var surname = $('td:eq(4)', this).text().toLowerCase();

				 if (name.indexOf($("#searchByGender").val().toLowerCase()) > -1) {
					 $(this).show();
				 } else {
					 $(this).hide();
				 }
				 if (username.indexOf($("#searchByUsername").val().toLowerCase()) > -1 && name.indexOf($("#searchByGender").val().toLowerCase()) > -1) {
		                $(this).show();
		            } else {
		                $(this).hide();
		         }
				 if (username.indexOf($("#searchByUsername").val().toLowerCase()) > -1 && name.indexOf($("#searchByGender").val().toLowerCase()) > -1 
						 && surname.indexOf($("#searchByRole").val().toLowerCase()) > -1) {
		                $(this).show();
		            } else {
		                $(this).hide();
		         }
				 
			 });
		});
			 $("#searchByRole").keyup(function () { //by username
			        $("#usersTable tr").each(function () {
			            var name = $('td:eq(4)', this).text().toLowerCase();
			            if (name.indexOf($("#searchByRole").val().toLowerCase()) > -1) {
			                $(this).show();
			            } else {
			                $(this).hide();
			            }
			        });
			 });
});