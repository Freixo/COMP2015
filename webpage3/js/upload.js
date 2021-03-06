window.addEventListener("dragover",function(e){
  e = e || event;
  e.preventDefault();
},false);

window.addEventListener("drop",function(e){
  e = e || event;
  e.preventDefault();
},false);

$( document ).ready(function() {
    $("#drop-zone").on("dragenter", function() {
		$(this).css("border-color", "#007f00");
		$(this).css("background-color", "rgba(0,127,0,0.2)");
		$(this).css("color", "#007f00");
		$("#fUp").hide();
	});

	$("#drop-zone").on("dragleave", function(e) {
		$(this).css("border-color", "#666");
		$(this).css("background-color", "rgba(102,102,102,0.2)");
		$(this).css("color", "#666");
		$("#fUp").show();
		e = e || event;
		e.preventDefault();
	});

	$("#drop-zone").on("drop", function(e) {
		$(this).css("border-color", "#666");
		$(this).css("background-color", "rgba(102,102,102,0.2)");
		$(this).css("color", "#666");
		$("#fUp").show();
		e = e || event;
		e.preventDefault();
	});

	$("#clearText").click(function() {
		$("#inputText").val('');
		validTM = "?";
		updateVerifyUI();
		$("#inputText").focus();
	});
	
	$("#example1").click(function() {
		$("#inputText").val("<TM>\n\t<STATES>q0,q1,q2</STATES>\n\t<ALPHABET>1,0,X,B</ALPHABET>\n\t<BLANK>B</BLANK>\n\t<INITSTATE>q0</INITSTATE>\n\t<ENDSTATES>q2</ENDSTATES>\n\t<TRANSITIONS>\n\t\t<TRANSITION>(q0,0)>(q0,1,R)</TRANSITION>\n\t\t<TRANSITION>(q0,1)>(q1,0,S)</TRANSITION>\n\t\t<TRANSITION>(q1,0)>(q2,1,L)</TRANSITION>\n\t</TRANSITIONS>\n\t<INPUT>01010101010</INPUT>\n</TM>");
		
		textAreaAdjust($("#inputText").get(0));
		validTM = "?";
		updateVerifyUI();
		$("#inputText").focus();
	});

	var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function(e) {
		var file = fileInput.files[0];
		loadTextArea(file);
		fileInput.replaceWith(fileInput.val('').clone(true));
    });

});


function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var file = evt.dataTransfer.files[0];
	loadTextArea(file);
}

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop-zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
var textZone = document.getElementById('inputText');
textZone.addEventListener('dragover', handleDragOver, false);
textZone.addEventListener('drop', handleFileSelect, false);

function loadTextArea(file) {
	validTM = "?";
	updateVerifyUI();
	var textArea = document.getElementById('inputText');

	var textType = /text.*/;
	if (file.type.match(textType)) {
		var reader = new FileReader();

		reader.onload = function(e) {
			textArea.value = reader.result;
		}

		reader.readAsText(file);
	} else {
		textArea.value = "File not supported!";
	}
}
