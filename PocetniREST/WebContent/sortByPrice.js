$(document).ready(function(){
    
    //sorting
    function comparer(index) { 
	    return function (a, b) {
	        var valA = getCellValue(a, index), valB = getCellValue(b, index)
	        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
	    }
	};
	function getCellValue(row, index) { 
	    return $(row).children('td').eq(index).text() 
	};
	$("th[name=sort]").click(function () {
		
		if ($(this.getElementsByTagName("span")).attr(`class`) == "glyphicon glyphicon-arrow-down") {
			$(this.getElementsByTagName("span")).removeClass("glyphicon glyphicon-arrow-down");
			$(this.getElementsByTagName("span")).toggleClass("glyphicon glyphicon-arrow-up");
		} else {
			$(this.getElementsByTagName("span")).removeClass("glyphicon glyphicon-up-down");
			$(this.getElementsByTagName("span")).toggleClass("glyphicon glyphicon-arrow-down");
		}
		var table = $(this).parents('table').eq(0)
		var rows = table.find('tr:gt(1)').toArray().sort(comparer($(this).index()))
		this.asc = !this.asc
		if (!this.asc) { rows = rows.reverse() }
		for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
	});
   
})