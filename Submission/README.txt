Identifica��o:
Hugo Freixo ei11086
Pedro Fernandes ei11008
Pedro Rocha ei11078
Tiago Miranda ei1166

Intru��es de Compila��o
o nosso projeto n�o necessita pois � uma p�gina web dispon�vel em http://paginas.fe.up.pt/~ei11008/tms/

Descri��o de Exemplos
1) exemplo funcional (working_example.txt)
2) exemplo com falha sint�tica - erro na tag TRANSITIONS (example syntax error.txt)
3) exemplo com falha sem�ntica - falta defini��o de um estado (example semantic1(States Missing).txt)
4) exemplo com falha sem�ntica - define-se um NFA em vez de um DFA (example semantic2(NFA Check).txt)
4) exemplo com verifica��o sem�ntica - estado "ilha" (example semantic warning(island state).txt)

Descri��o de utiliza��o:
1) ir ao link http://paginas.fe.up.pt/~ei11008/tms/
2) correr a p�gina localmente a partir do ficheiro index.html, � necess�tio o 
XAMPP(ou programa similar) a correr

An�lise Lexical:
presente no ficheiro js/parser.js quando o input tem erros lexicais � mostrada uma 
mensagem com a linha do erro e o que foi encontrado vs o que devia estar l�

An�lise Sint�tica:
presente no ficheiro js/parser.js quando o input tem erros sint�ticos � mostrada uma 
mensagem com a linha do erro e o que foi encontrado vs o que devia estar l�

An�lise Sem�ntica:
presente no ficheiro js/parser.js quando o input tem erros sem�nticos � mostrada uma 
mensagem explicativa do erro presente

Representa��o Interm�dia: 
a m�quina de turing � guardada numa class onde � guardada toda a informa��o relevante

Testes:
Os testes utilizados foram desenvolvidos � m�o com pouca automatiza��o devido � aplca��o
ser uma p�gina web

Arquitetura:
a arquitetura da linguagem de input foi desenvolvida tendo em base XML, sendo representado cada elemento
com uma tag distinta(ex:ALPHABET, INPUT, ...) para facilitar a utiliza��o da aplica��o por parte do
utilizador as tags ALPHABET, STATES e INPUT s�o opcionais sendo as duas primeiras inferidas a partir
do resto da linguagem e a �ltima podendo ser inserida manualmente na GUI.
O input seria algo do g�nero:
<TM>
	<STATES>q1,q2,q3,hf</STATES>
	<ALPHABET>a,b,B</ALPHABET>
	<BLANK>B</BLANK>
	<INITSTATE>q1</INITSTATE>
	<ENDSTATES>hf</ENDSTATES>
	<TRANSITIONS>
		<TRANSITION>(q1,a)>(q2,a,R)</TRANSITION>
		<TRANSITION>(q2,b)>(q3,b,R)</TRANSITION>
		<TRANSITION>(q3,a)>(q3,a,R)</TRANSITION>
		<TRANSITION>(q3,B)>(hf,B,S)</TRANSITION>
	</TRANSITIONS>
	<INPUT>abaa</INPUT>
</TM>

Na tag transition � representado estado inicial, o que se le da fita, estado final, 
o que se escreve na fita e em que dire��o se move na fita.

Pontos Positivos:
A ferramente desenvolvida foi feita a pensar na f�cil utiliza��o e aprendizagem da mesma por parte
dos utilizadores mesmo estando estes pouco familiarizados com m�quinas de turing.
Extras:
- tags opcionais;
- a fita tanto se pode deslocar para a esquerda ou direita ou ficar no s�tio;
- verifica��o da exist�ncia de estados isolados;
- p�gina web responsiva com link para a p�gina da cadeira, faculdade e wikip�dia de turing machines;
- modos de input: texto, ficheiro (.txt), e GUI para mais f�cil utiliza��o;
- desenho do DFA e visualiza��o do atual estado da fita e do DFA;
- estat�sticas em rela��o ao processamento.

Pontos Negativos:
Bugs:
- bot�o next fica "desligado" quando se atinge um estado de aceita��o, apesar de ainda se puder carregar
e continuar o processamento;
Implementa��o Futura:
- integra��o com redes sociais.