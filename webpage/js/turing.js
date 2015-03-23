function TuringMachine(definition, transitions, input) {
	this.definition = definition;
	this.transitions = transitions;
	this.input = input;
}

function Definition(states, alphabet, blank, initial, finals){
	this.states = states;
	this.alphabet = alphabet;
	this.blank = blank;
	this.initial = initial;
	this.finals = finals;
	
}

function Transition(nodeA, input, nodeB, output, direction) {
	this.nodeA = nodeA;
	this.input = input;
	this.nodeB = nodeB;
	this.output = output;
	this.direction = direction;
}

$( document ).ready(function() {
    
	var def = new Definition(
		["q0", "q1", "q2"],
		["0","1","X","B"],
		"B",
		"q0",
		["q2"]
	);
	
	var trans = [
		new Transition("q0", "0", "q0", "1", "R"),
		new Transition("q0", "1", "q1", "0", "S"),
		new Transition("q1", "0", "q2", "1", "L")
	]
	
	var tm = TuringMachine(def, trans, "1000001100");
	
});