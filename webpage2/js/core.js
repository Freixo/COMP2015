var validTM = "?";

$( document ).ready(function() {
	updateVerifyIcon();

	$("#lexicalVerification").click(function() {
		/* 
		
			TODO VERIFICATION CODE
			
			use: $("textInput").val()
			
			to obtain input text
		
		*/
	
		if (Math.random() > 0.5) {
			validTM = "T"; //VALID
		} else {
			validTM = "F"; //INVALID
		}
		updateVerifyIcon();
	});
});


function updateVerifyIcon() {
	if (validTM == "T") {
	console.log($("#lexicalVerification span")[0]);
		$("#lexicalVerification span").first().removeClass('glyphicon-question-sign');
		$("#lexicalVerification span").first().removeClass('glyphicon-remove-sign');
		$("#lexicalVerification span").first().addClass('glyphicon-ok-sign');
		$("#lexicalVerification").removeClass('btn-primary');
		$("#lexicalVerification").removeClass('btn-danger');
		$("#lexicalVerification").addClass('btn-success');
	} else if (validTM == "F") {
		$("#lexicalVerification span").first().removeClass('glyphicon-question-sign');
		$("#lexicalVerification span").first().removeClass('glyphicon-ok-sign');
		$("#lexicalVerification span").first().addClass('glyphicon-remove-sign');
		$("#lexicalVerification").removeClass('btn-primary');
		$("#lexicalVerification").removeClass('btn-success');
		$("#lexicalVerification").addClass('btn-danger');
	} else  {
		$("#lexicalVerification span").first().removeClass('glyphicon-remove-sign');
		$("#lexicalVerification span").first().removeClass('glyphicon-ok-sign');
		$("#lexicalVerification span").first().addClass('glyphicon-question-sign');
		$("#lexicalVerification").removeClass('btn-danger');
		$("#lexicalVerification").removeClass('btn-success');
		$("#lexicalVerification").addClass('btn-primary');
	}
}  