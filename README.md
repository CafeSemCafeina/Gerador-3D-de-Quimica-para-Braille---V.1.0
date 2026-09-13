# Química ao Alcance das Mãos 🤲⚛️
**Gerador 3D de Química para Braille**

Uma plataforma web open-source desenvolvida para democratizar o ensino acessível. Este sistema permite a conversão instantânea de fórmulas químicas e textos convencionais em modelos 3D de matrizes Braille, prontos para impressão. 

O gerador segue rigorosamente as diretrizes oficiais da **[Grafia Química Braille para Uso no Brasil](http://portal.mec.gov.br/docman/agosto-2017-pdf/70081-grafia-quimica-braille-pdf/file)**, garantindo precisão técnica para educadores e alunos.

---

📖 Manual de Instruções
Veja como extrair o máximo potencial do gerador digital e realizar a impressão 3D das suas matrizes em Braille.

1. Como Usar os Recursos do Site
Gerador Braille 3D: Digite qualquer fórmula química, palavra ou texto longo no campo principal. O sistema aplicará as normas de grafia instantaneamente e montará o modelo 3D em tempo real. Clicando em "Visualizar STL" você avalia o resultado e, em seguida, basta clicar em Baixar Arquivo STL para levar à impressora.

Leitura Tátil 2D: Abaixo do modelo 3D, você verá um mapa bidimensional das celas geradas, em que as bolinhas pretas indicam os pontos em relevo. É uma forma simples e visual de validar o que foi escrito e ajudar alunos ou educadores a se familiarizarem com a grafia Braille num primeiro momento.

Texto Braille (Unicode): Essa caixa gera o seu texto utilizando a fonte Unicode oficial do Braille digital. O botão "Copiar Texto Braille" permite que você copie os símbolos e cole-os diretamente em e-mails, redes sociais, documentos do Word ou painéis de comunicação.

Tradutor Reverso e Áudio: Achou uma frase em Braille na internet e quer saber o que está escrito? Basta colar os caracteres em braille na caixa "Digite o texto Braille". O site fará a leitura reversa traduzindo para o português no mesmo instante. Também é possível clicar em "Ouvir" para o sistema ditar o texto em voz alta para você.


2. Customização Ergonômica da Matriz
Ao abrir o painel de "Opções Avançadas de Impressão 3D" logo abaixo do campo de texto, você desbloqueia o controle de toda a geometria matemática da peça gerada: altura e diâmetro dos pontos, espessura da base, arredondamento das bordas, etc.

Por que isso é útil?

Acessibilidade sob medida: Alguns alunos com perda de sensibilidade tátil podem preferir que os pontos Braille sejam ligeiramente mais altos ou mais espaçados para facilitar a distinção.

Calibração do Bico da Impressora: Se estiver usando impressoras com bicos maiores (0.6mm ou 0.8mm) para imprimir mais rápido, você pode aumentar o Diâmetro do Ponto para evitar que fiquem finos ou falhados demais.


3. Guia de Impressão 3D (Fatiamento no OrcaSlicer)
⚠️ REGRA DE OURO: IMPRESSÃO SEMPRE NA VERTICAL (EM PÉ)
Ao exportar o arquivo 3D .stl e jogá-lo no software para impressão (fatiador), certifique-se de que a placa de texto está posicionada na vertical ("em pé") sobre a mesa, orientada ao longo do eixo Z.

Passo 1: Impressora
Abra o OrcaSlicer e selecione sua impressora na lista de dispositivos. O programa tem perfis prontos para máquinas modernas.

Passo 2: Filamento e Posição
Arraste o seu .stl para dentro da plataforma. Perceba que a peça já é gerada em pé. Utilize PLA ou PETG. Evite usar filamento ABS em impressoras de câmara aberta, pois a peça longa certamente sofrerá Warping (encolhimento do plástico, fazendo a base descolar da mesa).

Passo 3: Fatiamento da Peça 3D
No canto superior direito, clique em "Pré-Visualizar" (ou aperte Ctrl + R) para gerar as camadas de impressão. Confira se os pontos subiram de forma perfeitamente lisa na visualização e, em seguida, clique em Exportar Arquivo G-code para imprimir.


💡 Dica Extra: Impressão Multimaterial (Colorida)
Caso possua uma máquina multicolorida, você pode pintar os pontos Braille de outra cor usando a ferramenta do próprio fatiador. Isso gera um excelente contraste e ajuda incrivelmente alunos com baixa visão ou professores com visão regular a identificar os caracteres braille!

Por que NÃO imprimir a peça deitada de barriga na mesa?
Se a placa for impressa deitada horizontalmente, a ponta esférica de cada pontinho do Braille será fatiada em "degraus" por causa do empilhamento do eixo Z da impressora (conhecido como efeito escada ou staircasing). Esses micrômetros de plástico serrilhado deixam a superfície do Braille extremamente áspera e desconfortável, podendo até arranhar e machucar as pontas dos dedos da pessoa cega após minutos de leitura contínua.

A vantagem absoluta de imprimir EM PÉ:
Na vertical, os motores dos eixos X e Y desenham perfeitamente o arco contínuo e orgânico das bolinhas laterais. A extrusora faz movimentos arredondados contínuos e sobe de forma muito mais suave. O resultado final são semiesferas perfeitamente lisas, sedosas ao toque, e que garantem 100% de conforto e segurança na leitura tátil.

Ainda não possui um software fatiador?
Caso seja o seu primeiro contato com impressão 3D ou se você está estruturando um laboratório maker na sua escola, recomendamos o download do OrcaSlicer. Pois é uma das ferramentas de fatiamento de código aberto mais robusta e amigável no momento, já contendo perfis prontos e perfeitamente calibrados para praticamente todas as marcas do mercado.
https://www.orcaslicer.com/download/


📜 Licença
Este projeto é software livre e está licenciado sob os termos da GNU Affero General Public License V 3.0 (AGPLv3).
Você tem a liberdade de usar, estudar, compartilhar e modificar este sistema, garantindo que ele permaneça sempre de código aberto e gratuito para a comunidade educacional. Para mais detalhes, consulte o arquivo LICENSE no repositório.


## 🚀 Como Rodar o Projeto Localmente
O projeto foi inicializado com [Vite](https://vitejs.dev/). Para rodar o ambiente de desenvolvimento na sua máquina, siga os passos:

1. Clone o repositório:
   ```bash
   git clone [https://github.com/SEU-USUARIO/quimica-ao-alcance-das-maos.git](https://github.com/SEU-USUARIO/quimica-ao-alcance-das-maos.git)






















# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
