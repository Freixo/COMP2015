Identificação:
Hugo Freixo ei11086
Pedro Fernandes ei11008
Pedro Rocha ei11078
Tiago Miranda ei1166

Intruções de Compilação
o nosso projeto não necessita pois é uma página web disponível em http://paginas.fe.up.pt/~ei11008/tms/

Descrição de Exemplos
1) exemplo funcional (working_example.txt)
2) exemplo com falha sintática - erro na tag TRANSITIONS (example syntax error.txt)
3) exemplo com falha semántica - falta definição de um estado (example semantic1(States Missing).txt)
4) exemplo com falha semántica - define-se um NFA em vez de um DFA (example semantic2(NFA Check).txt)
4) exemplo com verificação semántica - estado "ilha" (example semantic warning(island state).txt)

Descrição de utilização:
1) ir ao link http://paginas.fe.up.pt/~ei11008/tms/
2) correr a página localmente a partir do ficheiro index.html, é necessátio o 
XAMPP(ou programa similar) a correr

Análise Lexical:
presente no ficheiro js/parser.js quando o input tem erros lexicais é mostrada uma 
mensagem com a linha do erro e o que foi encontrado vs o que devia estar lá

Análise Sintática:
presente no ficheiro js/parser.js quando o input tem erros sintáticos é mostrada uma 
mensagem com a linha do erro e o que foi encontrado vs o que devia estar lá

Análise Semântica:
presente no ficheiro js/parser.js quando o input tem erros semánticos é mostrada uma 
mensagem explicativa do erro presente

Representação Intermédia: 
a máquina de turing é guardada numa class onde é guardada toda a informação relevante

Testes:
Os testes utilizados foram desenvolvidos à mão com pouca automatização devido à aplcação
ser uma página web

Arquitetura:
a arquitetura da linguagem de input foi desenvolvida tendo em base XML, sendo representado cada elemento
com uma tag distinta(ex:ALPHABET, INPUT, ...) para facilitar a utilização da aplicação por parte do
utilizador as tags ALPHABET, STATES e INPUT são opcionais sendo as duas primeiras inferidas a partir
do resto da linguagem e a última podendo ser inserida manualmente na GUI.
O input seria algo do género:
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

Na tag transition é representado estado inicial, o que se le da fita, estado final, 
o que se escreve na fita e em que direção se move na fita.

Pontos Positivos:
A ferramente desenvolvida foi feita a pensar na fácil utilização e aprendizagem da mesma por parte
dos utilizadores mesmo estando estes pouco familiarizados com máquinas de turing.
Extras:
- tags opcionais;
- a fita tanto se pode deslocar para a esquerda ou direita ou ficar no sítio;
- verificação da existência de estados isolados;
- página web responsiva com link para a página da cadeira, faculdade e wikipédia de turing machines;
- modos de input: texto, ficheiro (.txt), e GUI para mais fácil utilização;
- desenho do DFA e visualização do atual estado da fita e do DFA;
- estatísticas em relação ao processamento.

Pontos Negativos:
Bugs:
- botão next fica "desligado" quando se atinge um estado de aceitação, apesar de ainda se puder carregar
e continuar o processamento;
Implementação Futura:
- integração com redes sociais.