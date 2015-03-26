var curTransitionID = 0;
var curLinkID = 0;


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
		return 1;
	} else {
		return -1;
	}
}

TuringMachine.prototype.reset = function() {
	this.tape = this.definition.blank + this.input + this.definition.blank;
	this.tapePos = 0;
	this.curState = this.definition.initial;
	
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
	
}

TuringMachine.prototype.init = function() {
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
									links[u].text.push(transitions[j].input + ", " + transitions[j].output + " // " + transitions[j].direction);
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
								li.text.push(transitions[j].input + ", " + transitions[j].output + " // " + transitions[j].direction);
								links.push(li);
								
								transitions[j].linkID = li.linkID;
							} else {
								var li = new Link(nodes[i], nodes[k]);
								li.linkID = curLinkID++;
								li.text.push(transitions[j].input + ", " + transitions[j].output + " // " + transitions[j].direction);
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
	
	$("#init").click(function() {
		clearCanvas();
		tm.init();
	});
	
	$("#clear").click(function() {
		clearCanvas();
	});
	
	
});