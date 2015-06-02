/* input mode selection */

$(document).ready(function(){

	$(".modeSelectionBtns > #fileMode").click(function() {
		$(this).removeClass( "btn-default" );
		$(this).addClass( "btn-info" );
		
		$(".modeSelectionBtns > #xmlMode").removeClass( "btn-info" ).addClass( "btn-default" );
		$(".modeSelectionBtns > #textMode").removeClass( "btn-info" ).addClass( "btn-default" );
		
		$("#textMod").hide(400);
		$("#xmlMod").hide(400);
		$("#drop-zone").show(800);
		
		$("#lexicalVerification").show(800);
	});
	
	$(".modeSelectionBtns > #xmlMode").click(function() {
		$(this).removeClass( "btn-default" );
		$(this).addClass( "btn-info" );
		
		$(".modeSelectionBtns > #fileMode").removeClass( "btn-info" ).addClass( "btn-default" );
		$(".modeSelectionBtns > #textMode").removeClass( "btn-info" ).addClass( "btn-default" );
		
		$("#textMod").hide(400);
		$("#drop-zone").hide(400);
		$("#xmlMod").closest(".explanation").show(800);
		$("#xmlMod").show(800);
		
		$("#lexicalVerification").show(800);
	});
	
	$(".modeSelectionBtns > #textMode").click(function() {
		$(this).removeClass( "btn-default" );
		$(this).addClass( "btn-info" );
		
		$(".modeSelectionBtns > #xmlMode").removeClass( "btn-info" ).addClass( "btn-default" );
		$(".modeSelectionBtns > #fileMode").removeClass( "btn-info" ).addClass( "btn-default" );
		
		$("#drop-zone").hide(400);
		$("#xmlMod").hide(400);
		$("#textMod").show(800);
		
		$("#lexicalVerification").show(800);
	});
});