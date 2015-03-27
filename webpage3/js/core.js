var validTM = "?";

$( document ).ready(function() {
	updateVerifyUI();

	$("#lexicalVerification").click(function() {
		verifyLex();
		if (validTM == "T") {
			$("#verifyAlert").hide();
		}
		
	});
	
});

function verifyLex() {
		/* 
			TODO VERIFICATION CODE
			
			use: $("textInput").val()
			
			to obtain input text
		*/
	
		if (Math.random() > 0.5) {
			validTM = "T"; //VALID
			
			var def = new Definition(
				["q1", "q2", "q3", "h"],
				["a","b"],
				"B",
				"q1",
				["h"]
			);
			
			var trans = [
				new Transition("q1", "a", "q2", "a", "R"),
				new Transition("q2", "b", "q3", "b", "R"),
				new Transition("q3", "a", "q3", "a", "R"),
				new Transition("q3", "B", "h", "B", "S")
			]
			
			tMachine = new TuringMachine(def, trans, "abaa");
			
			
			
		} else {
			validTM = "F"; //INVALID
		}
		updateVerifyUI();
}


function updateVerifyUI() {
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

