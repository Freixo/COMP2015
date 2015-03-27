var curTransitionID = 0;
var curLinkID = 0;

var tMachine;
var tmRunning = false;


String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

function TuringMachine(definition, transitions, input) {
	this.definition = definition;
	this.transitions = transitions;
	this.input = input;
	
	this.tape = this.definition.blank + this.input + this.definition.blank;
	this.tapePos = 1;
	this.curState = this.definition.initial;
	
	this.halt = false;
}
TuringMachine.prototype.next = function() {
	
	var input = this.tape[this.tapePos];
	for (var i = 0; i < this.transitions.length; i++) {
		if (this.curState == this.transitions[i].stateA && input == this.transitions[i].input) {
			var dir = this.transitions[i].direction;
			if (dir == "R") {
				this.tape = this.tape.replaceAt(this.tapePos, this.transitions[i].output);
				this.tapePos++;
				this.curState = this.transitions[i].stateB;
			} else if (dir == "L") {
				this.tape = this.tape.replaceAt(this.tapePos, this.transitions[i].output);
				this.tapePos--;
				this.curState = this.transitions[i].stateB;
			} else if(dir == "S") {
				this.curState = this.transitions[i].stateB;
			}
			
			for (var k = 0; k < nodes.length; k++) {
				nodes[k].highlighted = false;
				if (this.curState == nodes[k].text) {
					nodes[k].highlighted = true;
				}
			}
			
			resetCaret();
			draw();
			
			return 0;
		}
	}
	resetCaret();
	draw();
	
	if ( $.inArray(this.curState, this.definition.finals) != -1) {
		this.halt = true;
		return 1;
	} else {
		this.halt = true;
		return -1;
	}
}

TuringMachine.prototype.reset = function() {
	this.halt = false;
	this.tape = this.definition.blank + this.input + this.definition.blank;
	this.tapePos = 1;
	this.curState = this.definition.initial;
	
	for (var k = 0; k < nodes.length; k++) {
		nodes[k].highlighted = false;
		if (this.curState == nodes[k].text) {
			nodes[k].highlighted = true;
		}
	}
	
}

TuringMachine.prototype.init = function() {
	this.halt = false;
	var states = this.definition.states;
	var numOfStates = states.length;
	var offx = 150;
	var offy = 0;
	for (var i = 0; i < numOfStates; i++) {
		if ((i % 4) == 0) {
			offx = 150;
			offy += 150
		}
		var tmp_node = new Node(offx, offy);
		offx += 150;
		tmp_node.text = states[i];
		if ($.inArray(states[i], this.definition.finals) != -1) {
			tmp_node.isAcceptState = true;
		}
		nodes.push(tmp_node);
	}
	
	var transitions = this.transitions;
	for (var i = 0; i < nodes.length; i++) {
		for (var j = 0; j < transitions.length; j++) {
			if (nodes[i].text == transitions[j].stateA) {
				for (var k = 0; k < nodes.length; k++) {
					if (nodes[k].text == transitions[j].stateB) {
					
						var tmp_trans = this.hasTransitionLink(transitions[j]);
						if (tmp_trans) {
						
							/*
								*************************
							
								WARNING MIGHT BE A BUG HERE
								
								
								*************************
							
							*/
						
							for (var u = 0; u < links.length; u++) {
								if (tmp_trans.linkID == links[u].linkID) {
									links[u].text.push(transitions[j].input + ":" + transitions[j].output + ", " + transitions[j].direction);
									break;
								}
							}
						} else {
						
							if (transitions[j].stateA == transitions[j].stateB) {
								var pos = {
									'x': nodes[i].x,
									'y': nodes[i].y - 100,
								};
								var li = new SelfLink(nodes[i], pos);
								li.linkID = curLinkID++;
								li.text.push(transitions[j].input + ":" + transitions[j].output + ", " + transitions[j].direction);
								links.push(li);
								
								transitions[j].linkID = li.linkID;
							} else {
								var li = new Link(nodes[i], nodes[k]);
								li.linkID = curLinkID++;
								li.text.push(transitions[j].input + ":" + transitions[j].output + ", " + transitions[j].direction);
								links.push(li);
								
								transitions[j].linkID = li.linkID;
							}
							
						}
					}
				}
			}
			
		}
	}
	
	
	for (var k = 0; k < nodes.length; k++) {
		nodes[k].highlighted = false;
		if (this.curState == nodes[k].text) {
			nodes[k].highlighted = true;
			var pos = {
				'x': nodes[k].x - 50,
				'y': nodes[k].y - 50,
			};
			links.push(new StartLink(nodes[k], pos));
		}
	}
	
	resetCaret();
	draw();
}

TuringMachine.prototype.hasTransitionLink = function(transition) {
	for (var i = 0; i < this.transitions.length; i++) {
		if (this.transitions[i].id != transition.id && this.transitions[i].linkID != null && this.transitions[i].isSame(transition)) {
			return this.transitions[i];
		}
	}
	return false;
}

function Definition(states, alphabet, blank, initial, finals){
	this.states = states;
	this.alphabet = alphabet;
	this.blank = blank;
	this.initial = initial;
	this.finals = finals;
	
}

function Transition(stateA, input, stateB, output, direction) {
	this.id = curTransitionID++;

	this.stateA = stateA;
	this.input = input;
	this.stateB = stateB;
	this.output = output;
	this.direction = direction;
	
	this.linkID = null;
}

Transition.prototype.isSame = function(transition) {
	return this.stateA == transition.stateA && this.stateB == transition.stateB;
}

function initializeTape() {
	$("#tape").empty();
	for (var i = 0, len = tMachine.tape.length; i < len; i++) {
		if (i == 1) {
			$("#tape").append("<li class=\"active\"><a> "+tMachine.tape[i]+" </a></li>");
		} else {
			$("#tape").append("<li><a> "+tMachine.tape[i]+" </a></li>");
		}
	}
}

function updateTape() {
	$("#tape").empty();
	for (var i = 0, len = tMachine.tape.length; i < len; i++) {
		if (i == tMachine.tapePos) {
			$("#tape").append("<li class=\"active\"><a> "+tMachine.tape[i]+" </a></li>");
		} else {
			$("#tape").append("<li><a> "+tMachine.tape[i]+" </a></li>");
		}
	}
}

function clearTape() {
	$("#tape").empty();
	for (var i = 0; i < 9; i++) {
		$("#tape").append("<li><a>&nbsp;</a></li>");
	}
}

function tmInit() {
	if (validTM != "T") {
		if (validTM == "?") {
			$("#verifyAlert").removeClass("alert-danger");
			$("#verifyAlert").addClass("alert-warning");
			$("#verifyAlert").last().text("You must verify the Turing Machine Code first.");
		} else if (validTM == "F") {
			$("#verifyAlert").removeClass("alert-warning");
			$("#verifyAlert").addClass("alert-danger");
			$("#verifyAlert").last().text("Invalid Turing machine code.");
		}
		$("#verifyAlert").show(300);
		return;
	}
	
	$("#verifyAlert").hide();
	
	clearCanvas();
	tMachine.init();
	tmRunning = true;
	$("#init").addClass("disabled");
	$("#delete").removeClass("disabled");
	$("#reset").removeClass("disabled");
	$("#next").removeClass("disabled");
	
	initializeTape();
}

function tmDelete() {
	clearCanvas();
	tmRunning = false;
	$("#delete").addClass("disabled");
	$("#reset").addClass("disabled");
	$("#next").addClass("disabled");
	$("#init").removeClass("disabled");
	
	tMachine = null;
	
	validTM = "?";
	updateVerifyUI();
	clearTape();
	
}

function tmReset() {
	tMachine.reset();
	$("#next").removeClass("disabled");
}

function tmNext() {
	tMachine.next();
	if (tMachine.halt) {
		$("#next").addClass("disabled");
		$("html").focus();
	} else {
		$("#next").removeClass("disabled");
	}
	
	updateTape();
}


$( document ).ready(function() {

	$("#init").click(tmInit);
	
	$("#delete").click(tmDelete);
	
	$("#reset").click(tmReset);
	
	$("#next").click(tmNext);
	
});