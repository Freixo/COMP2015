/*
	Default driver template for JS/CC generated parsers for Mozilla/Rhino
	
	WARNING: Do not use for parsers that should run as browser-based JavaScript!
			 Use driver_web.js_ instead!
	
	Features:
	- Parser trace messages
	- Step-by-step parsing
	- Integrated panic-mode error recovery
	- Pseudo-graphical parse tree generation
	
	Written 2007 by Jan Max Meyer, J.M.K S.F. Software Technologies
        Modified 2007 from driver.js_ to support Mozilla/Rhino
           by Louis P.Santillan <lpsantil@gmail.com>
	
	This is in the public domain.
*/
var semTree = [];
var states=[],alphabet=[],blank,initial,final=[],transitions=[],input=[];

var validTM = "?";

$( document ).ready(function() {
	updateVerifyUI();


	$("#lexicalVerification").click(function() {

		verifyLex($("#inputText").val());
		console.log(validTM);
		if(validTM=="T")
			verifySemantic();

		if (validTM == "T") {
			$("#verifyAlert").hide();			
		}
	});
});

function updateVerifyUI() {
	if (validTM == "T") {
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

