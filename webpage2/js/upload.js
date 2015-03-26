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
		$(this).css("color", "#007f00");
	});
	
	$("#drop-zone").on("dragleave", function(e) {
		$(this).css("border-color", "#666");
		$(this).css("color", "#666");
		e = e || event;
		e.preventDefault();
	});
	
	$("#drop-zone").on("drop", function(e) {
		$(this).css("border-color", "#666");
		$(this).css("color", "#666");
		e = e || event;
		e.preventDefault();
	});

	$("#clearText").click(function() {
		$("#inputText").val('');
		validTM = "?";
		updateVerifyIcon();
		$("#inputText").focus();
	});
	
	$("#inputText").keypress( function(e) {
		if (e.charCode == 13) { //enter
			alert("bananas");
		}
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

function loadTextArea(file) {
	validTM = "?";
	updateVerifyIcon();
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