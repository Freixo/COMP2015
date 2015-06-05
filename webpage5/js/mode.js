$( document ).ready(function() {

	$("#textMode").click(function() {
		
		tmDelete();
	
		$("#texModeArea").show(200);
		$("#uiMode").removeClass("btn-success");
		$("#uiMode").addClass("btn-primary");
		$("#textMode").removeClass("btn-primary");
		$("#textMode").addClass("btn-success");
		
		
		$("#step").text("Step 2: Input TM and Verifiy it.");
	});
	
	
	$("#uiMode").click(function() {
	
		tmDelete();
	
		$("#texModeArea").hide();
		$("#uiMode").removeClass("btn-primary");
		$("#uiMode").addClass("btn-success");
		$("#textMode").removeClass("btn-success");
		$("#textMode").addClass("btn-primary");
		
		
		$("#step").text("Step 2: Input TM and Verifiy it.");
	});
	

});