$( document ).ready(function() {

	$("#textMode").click(function() {
		
		tmDelete();
	
		$("#texModeArea").show(200);
		$("#uiMode").removeClass("btn-primary");
		$("#uiMode").addClass("btn-default");
		$("#textMode").removeClass("btn-default");
		$("#textMode").addClass("btn-primary");
		
		
		$("#step").text("Step 2: Input TM and Verifiy it.");
	});
	
	
	$("#uiMode").click(function() {
	
		tmDelete();
	
		$("#texModeArea").hide();
		$("#uiMode").removeClass("btn-default");
		$("#uiMode").addClass("btn-primary");
		$("#textMode").removeClass("btn-primary");
		$("#textMode").addClass("btn-default");
		
		
		$("#step").text("Step 2: Input TM and Verifiy it.");
	});
	

});