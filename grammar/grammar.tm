/~ --- Token definitions --- ~/

/~ Characters to be ignored ~/
!   ' |\t\n' ;

/~ Non-associative tokens ~/
    '\(' LEFTPARA
    '\)' RIGHTPARA
    '>' ARROW
    '<TM>' TMSTART
    '</TM>' TMEND
    '<STATES>' STATESTART
    '</STATES>' STATESEND
    '<ALPHABET>' ALPHABETSTART
    '</ALPHABET>' ALPHABETEND
    '<BLANK>' BLANKSTART
    '</BLANK>'BLANKEND
    '<INITSTATE>' INITSTATESTART
    '</INITSTATE>' INITSTATEND
	'<ENDSTATES>' ENDSTATESTART
    '</ENDSTATES>' ENDSTATEND
    '<TRANSITIONS>' TRANSITIONSSTART
    '</TRANSITIONS>' TRANSITIONSEND
    '<TRANSITION>' TRANSITIONSTART
    '</TRANSITION>' TRANSITIONEND
    '<INPUT>' INPUTSTART
    '</INPUT>' INPUTEND
    ',' COMMA
	'[R L S]' DIRECTION
	'[0-9 a-z A-Z]' CHAR
    '[0-9 a-z A-Z]+' STRING
    ;

##

/~ --- Grammar specification --- ~/

TM: TMSTART definitioncomp TMEND;

TM: TMSTART definitionincomp TMEND;

definitioncomp: states alphabet blank initstate endstate transitions input;

definitionincomp: blank initstate endstate transitions input;

states: STATESTART statesmul STATESEND;

statesmul: STRING | STRING COMMA statesmul;

alphabet: ALPHABETSTART alphabetmul ALPHABETEND;

alphabetmul: CHAR | CHAR COMMA alphabetmul;

blank: BLANKSTART CHAR BLANKEND;

initstate: INITSTATESTART STRING INITSTATEND;

endstate: ENDSTATESTART statesmul ENDSTATEND;

transitions: TRANSITIONSSTART transition TRANSITIONSEND;

transition: TRANSITIONSTART LEFTPARA STRING COMMA CHAR RIGHTPARA ARROW LEFTPARA STRING COMMA CHAR COMMA DIRECTION RIGHTPARA TRANSITIONEND | TRANSITIONSTART LEFTPARA STRING COMMA CHAR RIGHTPARA ARROW LEFTPARA STRING COMMA CHAR COMMA DIRECTION RIGHTPARA TRANSITIONEND transition;

input: INPUTSTART STRING INPUTEND;