$(document).ready(function(){
	$("#filterType").change(function () { //filter po tipu ap
		console.log("*****************")
        if ($(this).val() == "Filter by type") {
            $("#table td.tdCol").parent().show();
        } else if ($(this).val() == "ROOM") {
console.log($(this).val());
            $("#table td.tdCol:not(:contains('" + $(this).val() + "'))").parent().hide();
            $("#table td.tdCol:contains('" + $(this).val() + "')").parent().show();
        }
        else {
            $("#table td.tdCol:not(:contains('" + $(this).val() + "'))").parent().hide();
            $("#table td.tdCol:contains('" + $(this).val() + "')").parent().show();
        }
    });
})