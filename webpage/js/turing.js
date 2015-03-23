String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

function TuringMachine(definition, transitions, input) {
	this.definition = definition;
	this.transitions = transitions;
	this.input = input;
	
	this.tape = this.definition.blank + this.input + this.definition.blank;
	this.tapePos = 0;
	this.curState = this.definition.initial;
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
			return 0;
		}
	}
	
	if ( $.inArray(this.curState, this.definition.finals) != -1) {
		alert("SUCCESS");
		return 1;
	} else {
		alert("FAIL. NO TRANSITION FOUND!");
		return -1;
	}
}

TuringMachine.prototype.reset = function() {
	this.tape = this.definition.blank + this.input + this.definition.blank;
	this.tapePos = 0;
	this.curState = this.definition.initial;
}


function Definition(states, alphabet, blank, initial, finals){
	this.states = states;
	this.alphabet = alphabet;
	this.blank = blank;
	this.initial = initial;
	this.finals = finals;
	
}

function Transition(stateA, input, stateB, output, direction) {
	this.stateA = stateA;
	this.input = input;
	this.stateB = stateB;
	this.output = output;
	this.direction = direction;
}

$( document ).ready(function() {
    
	var def = new Definition(
		["q0", "q1", "q2", "q3", "h"],
		["a","b"],
		"B",
		"q0",
		["h"]
	);
	
	var trans = [
		new Transition("q0", "B", "q1", "B", "R"),
		new Transition("q1", "a", "q2", "a", "R"),
		new Transition("q2", "b", "q3", "b", "R"),
		
		new Transition("q3", "a", "q3", "a", "R"),
		new Transition("q3", "B", "h", "B", "S")
	]
	
	var tm = new TuringMachine(def, trans, "abaa");
	
	var spacing = "";
	for (var i = 0; i < tm.tapePos; i++) {
	spacing = spacing + " ";
	}
	$("#tapePos").text(spacing + "______^");
	$("#cur").text(tm.curState);
	
	$("#tape").text(tm.tape);
	
	$("#test").click(function() {
		
		tm.next();
		
		$("#tape").text(tm.tape);
		var spacing = "";
		for (var i = 0; i < tm.tapePos; i++) {
			spacing = spacing + "_";
		}
		$("#tapePos").text(spacing + "______^");
		$("#cur").text(tm.curState);

	});
	
	$("#reset").click(function() {
		tm.reset();

		var spacing = "";
		for (var i = 0; i < tm.tapePos; i++) {
		spacing = spacing + " ";
		}
		$("#tapePos").text(spacing + "______^");
		$("#cur").text(tm.curState);

		$("#tape").text(tm.tape);
		
	});
	
	
});