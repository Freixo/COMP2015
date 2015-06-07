$( document ).ready(function() {

	$("#textMode").click(function() {
		
		tmDelete();
	
		$("#texModeArea").show(200);
		$("#uiMode").removeClass("btn-success");
		$("#uiMode").addClass("btn-primary");
		$("#textMode").removeClass("btn-primary");
		$("#textMode").addClass("btn-success");
		
		
		$("#step").html("<b>Step 2:</b> Input TM and Verifiy it.");
	});
	
	
	$("#uiMode").click(function() {
	
		tmDelete();
	
		$("#texModeArea").hide();
		$("#uiMode").removeClass("btn-primary");
		$("#uiMode").addClass("btn-success");
		$("#textMode").removeClass("btn-success");
		$("#textMode").addClass("btn-primary");
		
		
		$("#step").html("<b>Step 2:</b> Input TM and Verifiy it.");
	});
	

});