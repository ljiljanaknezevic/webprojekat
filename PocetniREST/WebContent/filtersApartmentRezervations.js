$(document).ready(function(){
	$("#filterType").change(function () { //filter po tipu ap
		if ($(this).val() == "Filter by type") {
			$("#apartmentsTable td.tdCol").parent().show();
		} else if ($(this).val() == "ROOM") {
			console.log($(this).val());
			$("#apartmentsTable td.tdCol:not(:contains('" + $(this).val() + "'))").parent().hide();
			$("#apartmentsTable td.tdCol:contains('" + $(this).val() + "')").parent().show();
		}
		else {
			$("#apartmentsTable td.tdCol:not(:contains('" + $(this).val() + "'))").parent().hide();
			$("#apartmentsTable td.tdCol:contains('" + $(this).val() + "')").parent().show();
		}
	});
	
	$("#filterTypePassive").change(function () { //filter po tipu ap
        if ($(this).val() == "Filter by type") {
            $("#apartmentsTable-passive td.tdCol").parent().show();
        } else if ($(this).val() == "ROOM") {
        	console.log($(this).val());
            $("#apartmentsTable-passive td.tdCol:not(:contains('" + $(this).val() + "'))").parent().hide();
            $("#apartmentsTable-passive td.tdCol:contains('" + $(this).val() + "')").parent().show();
        }
        else {
            $("#apartmentsTable-passive td.tdCol:not(:contains('" + $(this).val() + "'))").parent().hide();
            $("#apartmentsTable-passive td.tdCol:contains('" + $(this).val() + "')").parent().show();
        }
    });
})