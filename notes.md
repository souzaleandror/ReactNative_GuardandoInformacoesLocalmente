#### 11/01/2024

Curso de React Native: guardando informações localmente

```
npx expo init gatito
npx expo start
npm install -g json server
npm install json-server@alpha
npm i
npm fund
npm audit fix
npm cache clean --force
rm -rf node_modules
npm install
npx expo start
json-server db.json
json-server --watch --host 192.168.178.24  db.json
npm start
touch db.json
npx expo install react-native-web@~0.19.6 react-dom@18.2.0 @expo/webpack-config
npm install webpack-dev-server
npm install @react-native-async-storage/async-storage
```

@01-Armazenamento com AsyncStorage

@@01
Apresentação

[00:00] Olá, meu nome é Matheus, eu sou instrutor da Alura e vou te acompanhar durante todo o curso React Native: Guardando informações localmente.
[00:07] Nesse curso, vamos ver qual é a importância de guardar informações localmente, dentro do nosso dispositivo. Também conheceremos as ferramentas para podermos salvar essas informações dentro do dispositivo, que é o AsyncStorage e o SQLite.

[00:20] Aprenderemos a diferença entre essas duas ferramentas, para o que cada uma delas serve, qual a funcionalidade e em qual situação elas devem ser usadas.

[00:29] No final desse projeto, você será capaz de montar uma aplicação que guardará informações localmente.

[00:36] Nosso projeto vai ser um aplicativo para salvar notas. Nessa aplicação, podemos criar uma nova nota, clicando no botão "+" no canto inferior direito, o que abre uma janela flutuante com os campos para preenchermos. Eu vou clicar e escrever "Criar uma nova nota" como título, também podemos escolher a categoria dessa nota, que vou selecionar "Trabalho", e inserir o conteúdo da nota, que eu vou escrever "Conteúdo da nota".

[00:59] Quando clicamos em "Salvar", no canto inferior esquerdo da janela flutuante, essa nota será guardada no banco de dados, atualizando a lista automaticamente. Podemos também editar uma nota, clicando nela, trocando o título, então vou apagar o título atual e escrever “Trocar o título”, trocando a categoria dela, então vou clicar na categoria e selecionar "Outros", e até mesmo o conteúdo, então vou apagar o conteúdo e escrever "Outro conteúdo", depois vou clicar em "Salvar".

[01:20] Também é possível apagar uma nota. Então clicamos em uma nota que já existe, nós podemos deletá-la do banco de dados, clicando no botão "Deletar", localizado no centro inferior da janela flutuante, aberta quando clicamos na nota. Tudo isso atualizando automaticamente, em tempo real, a lista.

[01:33] Então, nesse curso, você terá vários exercícios, para poder treinar e guardar tudo que foi visto dentro do curso, e um desafio no final para exercitar um pouco tudo que foi visto durante o curso.

[01:46] Nele você poderá expressar sua criatividade e, quem sabe, explorar um novo mundo dentro do React Native.

[01:55] Meu nome é Matheus, vejo você no próximo vídeo.

@@02
Preparando o ambiente: projeto

Antes de iniciar o curso, é importante que você tenha em mãos os arquivos iniciais do projeto. Assim, clique neste link para baixá-lo. Depois, extraia o conteúdo deste arquivo zip em uma pasta de sua preferência.
Após extrair o conteúdo do zip, abra um terminal e rode o comando npm install na pasta em que você extraiu o arquivo. Por fim, aguarde a instalação das bibliotecas.

Observação: é necessário ter o NodeJS e o NPM instalados em seu computador antes de rodar o comando acima.

https://github.com/alura-cursos/salvandoLocalmente/archive/refs/heads/main.zip

https://nodejs.org/en/

@@03
Instalando o projeto

[00:00] Logo após você ter baixado o ZIP e encontrado os arquivos do projeto, antes de começarmos realmente a rodar o projeto, precisamos instalar algumas coisas.
[00:09] Vou abrir o Terminal no meu Visual Studio Code e vou rodar o comando npm install, porque precisamos instalar todas as dependências que o projeto precisa antes de conseguirmos inicializar o projeto.

[00:20] Enquanto ele vai instalando as coisas do Node, eu quero apresentar um pouco como o projeto já está. Temos três arquivos principais. O “App.js”, que já foi editado e já importa alguns componentes, que vou apresentar mais tarde. Ele está bem simples, tem só um SafeAreaView, tem o nosso componente novo, que é o NotaEditor, e um StatusBar.

[00:48] Dentro da raiz do projeto, temos uma pasta chamada source, ou "src". Dentro dessa pasta, tem outra pasta chamada "components", onde temos dois componentes: o "Nota.js" e o "NotaEditor.js".

[01:02] O “Nota.js” vai ser a nossa representação do que é uma nota. Dentro do arquivo tem todas as estilizações e toda a estrutura do componente, que é uma View com texto dentro.

[01:16] Ele também tem uma estilização um pouco mais adaptada, que vai ser bem importante para nós no futuro. Outro componente é o “NotaEditor.js” em que vamos usar um componente novo, que não foi visto ainda, que é o Modal.

[01:35] O Modal é um componente do próprio React Native, e ele vai servir para subir uma caixa na parte de baixo do meu dispositivo. Vou até mostrar para vocês.

[01:50] Já terminou de instalar todo o meu Node. Vou inicializar o processo, escrevendo npm start, e esperar ele inicializar.

[02:01] O Expo abriu e vou abrir agora o emulador de Android. Depois do projeto já buildado, eu vou mostrar como funcionam os componentes. O componente Nota não vamos conseguir visualizar ainda, mas a estrutura, como você pôde ver, é bem simples.

[02:24] A modal aparece quando apertamos o botão verde com o sinal de “+” no canto inferior direito. Apertando esse botão, ele vai subir a nossa modal. Então, a modal é, simplesmente, esse encapsulamento, como se fosse um componente, ou uma view, para poder mostrar uma modal que vai subir e descer.

[02:44] Voltando para o VSCode, notamos que a estrutura também é tranquila. Tem o encapsulamento da Modal, tem a View em que ficam todas as informações do título da Modal, e o TextInput, em que vamos realmente adicionar uma nota.

[02:58] Voltando para o celular, notamos o componente de teste para podermos ver o título da nota e assim por diante. Além disso, temos dois botões na modal: o botão de “Salvar”, que por enquanto não faz nada, e o botão de “Cancelar”, que a única função, por enquanto, fechando essa modal.

[03:13] Com tudo isso pronto, já a aplicação rodando no nosso emulador, já apresentado todo o projeto, podemos começar a desenvolver.

@@04
Por que salvar localmente?

[00:00] Depois de termos configurado o nosso ambiente e preparado o nosso projeto, nosso próximo passo será entender por que precisamos guardar informações localmente.
[00:10] No mundo em que tudo é online, nós nos perguntamos porque precisamos guardar informações no nosso celular. Vamos pensar em um aplicativo mensageiro, como, por exemplo, o WhatsApp, o Telegram, entre outros.

[00:21] Nas mensagens, podemos ter vídeos, áudios, além de texto. Agora imaginem que, toda vez que fôssemos abrir o aplicativo, tivéssemos que baixar todas as imagens, todos os vídeos, todos os áudios, além das mensagens do servidor.

[00:43] Imaginem, mil mensagens, mil vídeos, mil fotos, todos eles tendo que ser baixados a partir do momento que o aplicativo é aberto. Iria ser tão custoso tanto para o aplicativo quanto para o servidor que cuidaria das informações, porque teria que baixar todas as informações de uma vez.

[01:01] Isso é custoso também por conta da internet. Imagina, uma pessoa com internet móvel, com um pacote que não é muito grande. Ela abriria o aplicativo e acabaria a internet, por exemplo, ou a internet móvel é tão lenta que ela não conseguiria baixar as informações, as imagens, os vídeos e afins.

[01:22] Então, o ideal seria que essas informações já ficassem salvas no dispositivo e, quando fosse carregar as mensagens, a atualização seria apenas das novas mensagens que aparecem no dispositivo.

[01:34] Novamente, elas ficam salvas dentro do dispositivo e, quando for abrir o aplicativo, ele só carrega do próprio celular, e não baixando diretamente do servidor.

[01:46] Quais são as nossas opções, então, para guardar essas informações? As principais no React Native são duas: o AsyncStorage e o SQLite.

[01:56] O que é cada uma delas? Vou abrir a documentação do AsyncStorage. Na verdade, o AsyncStorage é nativo do próprio React Native, só que ele foi descontinuado, ou seja, o React Native não dá mais suporte para essa ferramenta nativa deles.

[02:16] Porém, logo no começo da documentação, eles recomendam baixarmos alguns pacotes da comunidade. Clicando no link do "community packages" que eles nos dão, temos um diretório com várias outras bibliotecas que cuidam do AsyncStorage, do mesmo jeito que o Nativo cuidava.

[02:34] O legal desse site também é que ele oferece várias outras opções para nós, não só a do AsyncStorage necessariamente. Além disso, ele tem uma nota para qualquer pacote dessa biblioteca da comunidade, informando quando ela foi atualizada a última vez, quantos downloads mensais e outras informações bem interessantes.

[02:52] O que vamos usar vai ser o “react-native-async-storage-/async-storage”. Esse é o principal. Clicando no link deste pacote, vamos abrir o GitHub e, descendo toda a página do GitHub, ele apresenta uma documentação para nós, na seção "Getting Started".

[03:07] Clicando no link da documentação, ele já dá os passos da instalação. Se clicarmos na “Home”, ou seja, no símbolo do "AsyncStorage", no canto superior esquerdo, ele dá uma pequena descrição do que é o AsyncStorage.

[03:18] A ideia do AsyncStorage é persistir dados e informações na nossa aplicação. Outra vantagem dele é ser multiplataforma, ou seja, ele funciona tanto para Android, quanto para IOS, Web e os sistemas operacionais Windows e MacOS.

[03:33] Outra coisa legal é que ele é uma API com algumas funcionalidades mais simples. Para podermos entender o que é esse mais simples, precisamos entender como ele guarda as informações.

[03:43] O AsyncStorage guarda informação no seguinte sentido: ele guarda uma chave e um valor dentro de um array. Essa chave e valor é bem parecido com um objeto JSON, só que ao invés de guardar uma chave como, por exemplo, um inteiro, ele guarda apenas strings como chave e valor.

[04:03] Ele não aceita nenhum outro tipo de informação a não ser strings, ou seja, textos. Então, a identificação pode ser, por exemplo, um número como string. Até mesmo uma letra ou uma palavra pode ser um identificador para aquele valor. O valor tem que ser string, como, por exemplo, o conteúdo de um lembrete de uma nota.

[04:26] Como funciona o SQLite? Vamos ver a documentação dele. O que vamos usar é a versão do Expo, dado que estamos trabalhando com o Expo aqui.

[04:36] O SQLite já é um pouco mais robusto que o AsyncStorage, porque o AsyncStorage só consegue guardar strings, e o SQLite já consegue ter uma abrangência maior de relacionamentos.

[04:47] Conseguimos ter relacionamentos entre elementos, objetos, conseguimos guardar outros tipos de informações além de strings, como imagens, áudios, vídeos. Tudo isso também consegue ser guardado dentro do SQLite.

[05:01] Essas são as principais diferenças entre eles. E qual deles vamos usar para essa aplicação? Vou voltar para a tela do simulador e percebemos que, neste momento, a nossa aplicação só guarda um lembrete com um texto.

Tela do aplicativo aberta no emulador com a opção de criar nota aberta na parte inferior na janela. Nela há o título com "Criar nota" em letras pretas, a descrição com "Conteúdo da nota" em letras pretas, um campo escrito "Digite aqui seu lembrete" em letras cinza-claro, o botão retangular verde claro escrito "Salvar", localizado no canto inferior esquerdo, e o botão retangular azul claro escrito "Cancelar", no canto inferior direito.

[05:20] Então só vamos guardar o conteúdo textual do lembrete. Já que só vamos trabalhar com texto, podemos usar o AsyncStorage, já que ele é feito para guardar conteúdos mais simples desse tipo.

[05:33] Vamos aprender, então, como conseguiremos implementar o AsyncStorage. Vejo você no próximo vídeo.

@@05
Instalando e usando AsyncStorage

[00:00] Agora que decidimos utilizar o AsyncStorage para a nossa aplicação, o próximo passo vai ser instalá-lo.
[00:06] Eu tenho que encerrar, primeiro, o serviço que está subindo no nosso aplicativo porque, como vamos instalar um novo pacote, é bom que ele primeiro seja instalado e depois reiniciamos a aplicação.

[00:16] Eu já encerrei o aplicativo e agora vamos conferir na documentação como vamos fazer para instalar. A documentação do AsyncStorage dá três opções para nós: o NPM, o Yarn e o Expo CLI. Aqui, vou usar o NPM, porque já instalei todo o meu projeto usando NPM, mas se você quiser o Yarn ou o Expo CLI, não tem problema, vai funcionar do mesmo jeito.

[00:39] Eu vou copiar o comando NPM npm install @react-native-async-storage/async-storage, voltar ao meu editor de código e abrir o Terminal. Vou pressionar “Ctrl + V” e, só um detalhe: antes que você instale, é importante que, pela consistência do projeto e do vídeo, você utilize a mesma versão que eu estou usando.

[01:00] Porque pode ser que, no futuro, algumas funcionalidades dessa ferramenta talvez não operem do jeito esperado dentro do curso. Então, para que você consiga acompanhar exatamente do mesmo jeito que estou fazendo, utilize a versão 1.15.17.

[01:15] No final do meu comando do npm, vou colocar um `@1.15.17` e isso vai garantir que a versão que vamos usar dentro do projeto é a mesma.

[01:25] Agora basta aguardar a instalação do NPM. Assim que a instalação estiver completa, podemos subir a nossa aplicação, escrevendo npm start no Terminal, para rodar de novo o nosso aplicativo.

[01:46] Vou reiniciar meu emulador. Subiu a nossa aplicação, vamos ver se no Terminal deu algum erro. Nenhum erro, a biblioteca foi instalada. Como podemos usar essa biblioteca, então?

[02:21] O primeiro passo é chamarmos esse AsyncStorage para o lugar em que precisamos salvar alguma informação. No nosso projeto, temos o “NotaEditor.js”.

[02:33] Nele temos a Modal, onde está o botão de salvar. Então, se eu voltar para o meu emulador, clicar no botão de “+”, no canto inferior direito, essa janela que aparece na parte inferior da tela é a nossa modal. Nela é onde temos o botão de “Salvar”.

[02:49] Isso, no nosso projeto, está exatamente no arquivo “NotaEditor.js”. Então o primeiro passo será importar o AsyncStorage que acabamos de instalar dentro do “NotaEditor.js”.

[02:59] Vou colocar import AsyncStorage from e agora precisamos passar o pacote que acabamos de instalar, que é o react-native-async-storage/async-storage.

[03:12] Ele já está no projeto, mas como ele funciona? Voltando para a documentação rapidamente, temos aqui, no menu lateral esquerdo, uma opção chamada “Usage”. Dentro do “Usage”, entendemos como conseguimos fazer para guardar informações e também ler as informações guardadas do AsyncStorage.

[03:31] Para podermos salvar, precisamos usar a função setItem(). Ele pede para que passemos um @storage_Key, ou seja, uma chave, e um value. Lembrando que ambos são em strings.

[03:48] Outra coisa muito importante é que essa função entra em uma promise. É interessante, para nós, trabalharmos até com Async await, porque, para podermos guardar uma informação dentro do AsyncStorage, deixando essa parte síncrona.

[04:06] Ou seja, antes que aconteça qualquer outra coisa na aplicação, que pelo menos as nossas informações estejam guardadas dentro do AsyncStorage.

[04:19] Voltando para o nosso código, temos o AsyncStorage e vamos criar uma função, lembrando que vai ser o Async await. Então, uma função assíncrona, async function. Vou chamar de async function salvaNota(). Essa função vai salvar uma nota. Podemos construir uma nota como exemplo de como seria uma nota.

[04:47] Vou criar uma constante chamada const umaNota, ela vai ser um objeto JSON, const umaNota = {. O primeiro valor vai ser a identificação, vou chamar de id mesmo. Vou colocar como string id: “1”.

[05:02] Agora, o conteúdo vou chamar de texto e vou usar a própria variável de texto que temos dentro do componente, então, texto: texto.

[05:24] Agora que temos uma nota, podemos usar a função AsyncStorage, então await AsyncStorage.setItem(), lembrando que temos que passar a chave e o valor, await AsyncStorage .setItem(umaNota.id, umaNota.texto). Ele vai pegar o conteúdo textual.

[05:52] Salvei. A função não está sendo usada em nenhum lugar ainda, então precisamos adicioná-la dentro do botão de salvar. Onde temos o nosso TouchableOpacity style={estilos.modalBotaoSalvar}, adicionaremos onPress. Nele terá uma arrow function que vai chamar a nossa função de {salvaNota()}.

[06:19] Salvei. Vou para o meu emulador e vou recarregar só para garantir. Vamos criar uma nova nota com o título “Uma nota”. Clico no botão “Salvar” e nada aconteceu. O Terminal não teve nada de erro, então parece que foi ok.

[06:44] Como vamos fazer para verificar se está tudo certo? Voltando para a documentação, notamos que resgatamos com a função de leitura, que é o getItem. A função getItem também precisa de uma chave, que é a chave que passamos para nossa nota.

[07:04] Ela vai retornar para nós o conteúdo daquele ID, ou seja, aquela identificação. Voltando para o código, fora da salvaNota(){}, vou criar outra função assíncrona, lembrando que ele trabalha com promises, então async function mostraNota() {.

[07:29] Aqui ele vai fazer um console.log e vai receber o ID. Vou colocar {await AsyncStorage.getItem e passar uma chave estática, que será o próprio (“1”)}.

[07:55] Agora, chamo essa função depois do nosso await AsyncStorage.setItem, então, mostraNota(). Salvei. Voltei para o meu emulador e vou abrir o Terminal para acompanharmos ao vivo.

[08:13] Vou criar uma nova nota com o título “Uma nova nota” e clicar em “Salvar”. Apareceu o nosso console.log, quer dizer que ele realmente conseguiu pegar do AsyncStorage.

[08:28] Lembrando por que é importante ter essa função de maneira síncrona, porque, antes que consigamos visualizar a nota que existe dentro do AsyncStorage, precisamos salvá-la. Então precisamos da garantia que ela foi salva, esperando primeiro ela ser salva e depois a leitura. Por isso é importante trabalhar com Async await.

[08:49] Conseguimos salvar uma nota e conseguimos recuperar essa nota. Nosso próximo passo será deixar um pouco mais dinâmico, porque estamos trabalhando com um conteúdo muito estático, nós definimos um ID fixo para essa nota.

[09:03] Então aprenderemos, no próximo vídeo, como podemos fazer para deixar mais dinâmico. Vejo vocês.

@@06
Salvando com AsyncStorage

Quando lidamos com um problema, primeiro precisamos ver quais as soluções viáveis e depois escolher a que melhor se encaixa com a nossa situação.
No caso do nosso projeto, o problema é: neste momento, precisamos guardar apenas o conteúdo da nota. Logo, escolhemos o AsyncStorage como nossa solução.

Pensando nisso, escolha a alternativa que melhor descreve a maneira que o AsyncStorage guarda as informações das notas:

O AsyncStorage guarda informações de uma maneira parecida com um objeto JSON: chave : valor. O detalhe é que tanto a chave quanto o valor devem ser strings e sua entrada é no formato ["chave", "valor"].
 
Isso mesmo! O AsyncStorage só consegue guardar strings e nada mais: nem mesmo números, apenas texto.
Alternativa correta
O AsyncStorage guarda informações de uma maneira parecida com um objeto JSON: chave : valor. O detalhe é que a chave deve ser um número inteiro (int) enquanto o valor deve ser uma string e sua entrada é no formato [chave, "valor"].
 
Alternativa correta
O AsyncStorage guarda informações de uma maneira parecida com um objeto JSON: chave : valor. O detalhe é que tanto a chave quanto o valor devem ser strings e sua entrada é no formato {"chave": "valor"}.
 
A estrutura que é salva dentro do AsyncStorage está incorreta. Por mais que ela seja parecida com um objeto JSON, a sua estrutura é diferente.
Alternativa correta
O AsyncStorage guarda informações de uma maneira parecida com um objeto JSON: chave : valor. O detalhe é que tanto a chave quanto o valor devem ser objetos e sua entrada é no formato [objeto.chave, objeto.valor].

@@07
Faça como eu fiz: utilizando o AsyncStorage

Agora é a sua vez! A partir do conteúdo visto nesta aula, implemente o AsyncStorage e a funcionalidade de criar e salvar uma nota em seu projeto.
Siga os passos a seguir:

Instale o AsyncStorage na versão 1.15.17~;
Crie uma nota;
Salve essa nota no AsyncStorage;
Mostre a nota salva no console.

O objetivo desta atividade é que você instale o AsyncStorage e verifique como podemos salvar uma nota e disponibilizá-la no console.
Você pode conferir sua resposta com o código abaixo:

// NotaEditor.js
import React, { useState } from "react"
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function NotaEditor() {
  const [texto, setTexto] = useState("")
  const [modalVisivel, setModalVisivel] = useState(false)
  async function salvaNota() {
    const umaNota = {
      id: "1",
      texto: texto,
    }
    await AsyncStorage.setItem(umaNota.id, umaNota.texto)
    mostraNota()
  }
  async function mostraNota() {
    console.log(await AsyncStorage.getItem("1"))
  }
  return(
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {setModalVisivel(false)}}
      >
        <View style={estilos.centralizaModal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={estilos.modal}>
              <Text style={estilos.modalTitulo}>Criar nota</Text>
              <Text style={estilos.modalSubTitulo}>Conteúdo da nota</Text>
              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={3}
                onChangeText={novoTexto => setTexto(novoTexto)}
                placeholder="Digite aqui seu lembrete"
                value={texto}/>
              <View style={estilos.modalBotoes}>
                <TouchableOpacity style={estilos.modalBotaoSalvar} onPress={() => {salvaNota()}}>
                  <Text style={estilos.modalBotaoTexto}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.modalBotaoCancelar} onPress={() => {setModalVisivel(false)}}>
                  <Text style={estilos.modalBotaoTexto}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => {setModalVisivel(true)}} style={estilos.adicionarMemo}>
        <Text style={estilos.adicionarMemoTexto}>+</Text>
      </TouchableOpacity>
    </>
  )
}

@@08
O que aprendemos?

Nesta aula, vimos:
A importância de salvar informações localmente;
Como instalar o AsyncStorage;
Criar uma nota;
Salvar a nota dentro do AsyncStorage;
Mostrar a nota no console.

#### 12/01/2024

@02-Salvando mais notas

@@01
Projeto da aula anterior

Para acompanhar o curso a partir deste ponto, você pode baixar o projeto completo da aula anterior neste link.

https://github.com/alura-cursos/salvandoLocalmente/archive/refs/heads/aula1.zip

@@02
Usando um ID dinâmico

[00:00] Vamos deixar a nossa aplicação um pouco mais dinâmica, porque, por enquanto, o nosso ID é estático. Essa já é uma das desvantagens de usar o AsyncStorage, ele não gera um ID automaticamente ou sequencialmente para nós.
[00:15] Nesse caso, temos a identificação "1" e, toda vez que escrevermos uma nova nota, ele vai sempre sobrescrever a nota com a identificação "1".

[00:24] Vamos criar uma função que vai gerar um ID automaticamente para nós. Só um detalhe: essa função não é completamente segura, ela não é uma função para você enviar para uma produção. Essa é só uma sugestão de como podemos deixá-la um pouco mais dinâmica.

[00:43] Vou criar uma função function geraId() { que vai gerar um ID sequencial. Como assim, sequencial? Primeiro temos que saber quantas notas já existem salvas dentro do meu AsyncStorage. Em seguida, pegamos esse tamanho e só somamos 1.

[01:04] Ou seja, se tiverem três notas, nós assumimos que a nota 1 seja ID 1, nota 2 seja ID 2 e nota 3 seja ID 3. Portanto, se pegarmos o comprimento desse vetor e somarmos 1, teremos o próximo ID. Assim, toda vez que for fazer essa checagem, ele vai sempre somar 1.

[01:23] Como isso pode gerar problemas? Por exemplo, caso o ID 1 seja apagado e geremos um novo ID baseado no tamanho, ele vai simplesmente sobrescrever a última entrada que já foi feita dentro do AsyncStorage.

[01:40] Por isso que eu não recomendo, mas, dado que não vamos ter a opção de apagar uma nota, podemos considerar que esse problema não vai acontecer. Entretanto, tenham este detalhe em mente.

[01:53] Então criei minha função geraId. Como sabemos a quantidade de itens que já estão dentro do AsyncStorage? Vamos para a documentação. Abrindo a documentação, na parte de “Usage” só temos dois exemplos: de como guardar uma informação e de como ler essa informação dentro do AsyncStorage.

[02:16] Queremos saber o que mais o AsyncStorage consegue fazer. Então, no menu da lateral esquerda, clicamos na opção “API”. Nela temos acesso a todas as funções que existem no AsyncStorage.

[02:29] getItem, setItem, mergeItem, removeItem, getAllKeys, e assim por diante. O que criamos aqui foi justamente a função getAllKeys. O que ela faz? Ela retorna todas as chaves que existem da nossa aplicação, dentro do AsyncStorage.

[02:50] Ela retorna dentro de um vetor, um Array<string>, ou seja, se tivermos dez chaves, por exemplo, ela vai retornar para nós todas as dez chaves. Para nós, não importa exatamente qual o valor dessas chaves, mas o comprimento desse Array.

[03:10] Podemos usar essa função para conseguir pegar todas as chaves e, em seguida, pegamos o comprimento e somamos 1. Vamos voltar para o nosso código. Agora, vou salvar dentro de uma constante, a const todasChaves, todas as chaves, = AsyncStorage.getAllKeys(). Assim ele vai retornar todas as chaves.

[03:42] Vamos ver quais são todas as chaves? Para isso, escrevemos console.log(todasChaves). Essa função não foi chamada ainda, podemos chamar, então, antes do mostraNota().

[03:58] Então, geraId() antes do mostraNota. Agora vou abrir nosso emulador. Assim que criarmos uma nova nota, ele deve retornar uma promise.

[04:12] Lembrando, por conta disso, precisamos fazer essa função assíncrona. Ela vai ter que ser um async function geraId(), e precisamos esperar pelo AsyncStorage, então, nela, digitamos await AsyncStorage.getAllKeys().

[04:25] Salvei. Voltei para o nosso emulador e vou salvar uma nova nota. Ele nos trouxe um Array com apenas um valor. Mesmo que eu tenho adicionado agora uma, duas ou três vezes, ele sempre sobrescreveu a primeira nota, o ID 1.

[04:45] Conseguimos pegar todas as chaves e podemos fazer uma verificação primeiro. Vou deixar esse console.log(todasChaves) aqui e faremos uma verificação.

[04:55] Se todas as chaves forem menores ou iguais a 0, ou seja, se não tiver nenhum valor dentro de todas as chaves, if(todasChaves <= 0), podemos retornar return 1. Portanto, o primeiro registro vai ter o ID 1.

[05:13] Caso contrário, como já tem o return ali, podemos só continuar escrevendo. Podemos escrever que, do contrário, return todasChaves.length + 1. Salvei isso, vamos ver o que retorna dentro do nosso ID.

[05:32] Vou dar um console.log(geraId()), dentro do salvaNota(). Vamos ver o que acontece. Vou voltar ao emulador, rodar de novo “Uma nova nota” e o que ele trouxe para nós foi uma promise.

[05:55] Faltou escrever um await nessa função assíncrona, ou seja, console.log(await geraId()). Voltei para o emulador e, olha que legal, ele retorna o nosso Array e depois retorna 2, porque, sequencialmente, seria a segunda nota.

[06:17] Então já está trabalhando a função. Podemos pegar esse geraId e atribuir agora a um valor. Vou recortar essa função, console.log(await geraId()), e, acima do umaNota, vou criar outra constante que vai ser const novoId.

[06:36] Ela vai ser const novoId = await geraId(). No lugar do id que está com "1" em string, podemos colocar o id: novoId. Porém tem um detalhe: o AsyncStorage só consegue guardar strings, tanto a chave quanto o valor.

[06:57] Então, se deixarmos desse jeito, ele vai guardar apenas o valor como inteiro, ou vai ser 1, 2, 3, assim por diante, mas é um valor inteiro, e não uma string.

[07:07] No final da chamada do nosso id: novoId, precisamos colocar a função toString, id: novoId.toString(). Assim ele vai converter o valor dessa nossa função para uma string.

[07:23] Vamos testar se está funcionando. Eu vou printar, depois de salvaNota, e emitir uma nova nota, com console.log(umaNota).

[07:42] Vou apagar os outros console.log para não nos confundir, ou seja, o de dentro de id e o console.log do mostraNota. Salvei meu código, voltei para o emulador e vou gerar uma nova nota.

[08:00] O objeto que foi retornado para nós no console foi com o "id: “2”" e "Uma nova nota". Se eu colocar agora “Nota 3” e clicar em “Salvar”, o nosso objeto de "Uma nova nota" vai ser "id: “3”".

[08:16] Então, nosso geraId() está funcionando. Nosso próximo passo, agora que temos um ID dinâmico e conseguimos salvar várias outras notas, é recuperar todas essas notas e mostrar na nossa tela.

[08:27] Vejo você no próximo vídeo.

@@03
Pegando todas as entradas

[00:00] Uma coisa interessante é descobrirmos onde vamos chamar a função mostrarNota().
[00:05] Porque, por enquanto, estávamos chamando essa função dentro do “NotaEditor.js”. Contudo, nesse caso, fizemos isso para podermos saber se as notas estavam sendo salvas dentro do AsyncStorage.

[00:18] Só que essas notas não vão ser mostradas dentro do editor, elas vão ser mostradas na página principal, no “App.js”. Essa função assíncrona de async function mostraNota() {} não deve ficar aqui.

[00:31] Vou apagar essa função daqui e agora vamos para o nosso “App.js”, que não tem o AsyncStorage importado. Então, o primeiro passo vai ser importar o AsyncStorage.

[00:44] Vou colocar o import depois do React Native. Então, import AsyncStorage from “@react-native-async-storage/async-storage”. Agora precisamos pegar todas as notas. Como fazemos isso?

[01:08] Na documentação, nós usamos, na última vez, o getAllKeys, que nos retorna um array com todas as chaves que existem dentro do AsyncStorage. O que precisamos aqui é o getItem, porque vamos pegar apenas um item.

[01:26] Temos o multiGet. O que esse multiGet faz? Ele procura por várias chaves dentro de um array. Ele recebe um array de chave, static: multiGet(keys: Array<string>. Podemos usar, então, o retorno e daquela função de getAllKeys para poder retornar para nós a lista de todas as entradas do AsyncStorage.

[02:04] Vamos para o nosso código e vamos criar uma nova função. Como devolve para nós uma promise, vamos criar uma função assíncrona, async function, que vai se chamar async function mostraNotas() {.

[02:25] O primeiro passo é pegar todas as chaves. Vamos criar a nossa constante const todasChaves = await AsyncStorage.getAllKeys. Nela temos todas as nossas chaves do nosso AsyncStorage.

[02:47] O próximo passo é retornar todos os elementos guardados dentro do AsyncStorage. Com isso, precisamos de outro await AsyncStorage.multiGet(todasChaves).

[03:06] Mas onde vamos salvar todas essas notas? Podemos criar um estado, dentro do nosso componente “App.js”, chamado notas. Então, const [notas, setNotas] = useState.

[03:30] Ele vai inicializar com um vetor, um array vazio, const [notas, setNotas] = useState ([]), porque, no final, o retorno desse multiGet é um array de arrays.

[03:44] Agora podemos salvar dentro do próprio setNotas. Antes vamos guardar isso em uma constate, const todasNotas = await AsyncStorage.multiGet(todasChaves) e vamos dar um setNotas(todasNotas).

[04:07] Para verificar se está funcionando, podemos dar um console.log(notas). Salvei, porém, novamente, essa função não está sendo chamada em nenhum lugar.

[04:22] Então é interessante que atualizemos o mostraNotas() depois que uma nova nota foi adicionada. Essa função mostraNotas() pode ser chamada dentro do NotaEditor, então vamos passá-la para lá.

[04:35] Aqui onde temos o componente NotaEditor, vamos passar <NotaEditor mostraNotas=[mostraNotas]/>. Salvei o “App.js”. Dentro do NotaEditor, vamos receber essa função.

[04:54] Na declaração da função, vou passar export default function NotaEditor((mostraNotas)) {. Depois que o salvaNotas rodou, ao final dele, onde está a nossa função antiga de mostraNota(), basta substituir por mostraNotas().

[05:23] Vamos testar e ver se está funcionando. Ele deve mostrar, no nosso console, a nota que vai ser salva, já que temos o console.log aqui. Também deve mostrar para nós todas as notas que estão salvas dentro do AsyncStorage.

[05:37] Vamos abrir o emulador, criar uma nova nota, com o título “Outra nota”. Em teoria, deve ter o ID 4 e devem ter quatro entradas dentro do AsyncStorage. Vamos conferir. Salvei a nota, ID 4, retornou-nos um Array [], vazio.

[06:03] Mas não se preocupem, na verdade, porque ele está realmente salvando. Se formos no “App.js”, ao invés de dar um console.log(notas), podemos escrever console.log(todasNotas).

[06:20] Se rodarmos de novo o emulador, “Outra nota > Salvar”, ele retorna para nós todas as entradas que estão sendo salvas. É só uma questão da sincronização do próprio Async await, mas as notas estão sendo salvas.

[06:36] Já conseguimos mostrar todas as nossas notas no console.log, então, o próximo passo é colocá-las dentro do flatList. Vamos lá.

@@04
Mostrando as notas

[00:00] O nosso próximo passo vai ser pegar todas essas notas e mostrar dentro de um flatList.
[00:06] Podemos resgatar o componente de flatList e adicioná-lo logo antes do NotaEditor. Vou codar <flatList, ele é do próprio Native. Foi adicionado. Esse flatList pede algumas informações.

[00:21] A primeira delas é o data, de onde vamos puxar as informações para iterar cada elemento de um array. Temos data=[notas], é exatamente onde queremos iterar.

[00:33] A próxima informação que temos que passar é qual vai ser o componente renderizado dentro do flatList, que é o renderItem. E o item que vamos passar será para cada nota. Vamos passar o componente de Nota, renderItem-((nota) -> <Nota).

[00:52] Um detalhe importante deste Nota é que ele não está no autoimport, então temos que importá-lo automaticamente. O "Nota.js" foi exportado sem default, então podemos importá-lo manualmente como import {Nota} from “./src/componentes/Nota”. Com isso, ele foi automaticamente.

[01:15] Então escreveremos que a renderização é para cada elemento de nota renderItem={(nota) => <Nota />}. O próximo passo é o keyExtractor, que vai ser a chave única para cada um dos componentes renderizados dentro do flatList.

[01:36] Lembrando de como funciona o multiGet: ele retorna para nós um array com vários arrays dentro. Na posição inicial, na posição 0, é uma identificação, e, na posição 1, a segunda posição, é o nosso conteúdo, o valor de verdade da nota.

[02:00] Já que queremos colocar um ID, podemos usar a nota na posição inicial dela que é 0, ou seja, vai ser o ID, a identificação, keyExtractor={nota -> nota[0]}/>. Passando essas informações, fechando o flatList. Salvei.

[02:18] Voltamos para a aplicação e está aqui a lista. Então, para cada vez que adicionar uma nova nota, ele vai carregar. Vou criar “Outra nota” e ele adicionou uma nova nota.

[02:35] Só que queremos passar as informações das notas reais para dentro desses cartões. Então, dentro de “Nota.js”, temos que receber as informações de Nota. No “App.js”, antes de tudo, passamos esse objeto de Nota, que instanciamos antes, para dentro como objeto, renderItem=((nota) -> <Nota {...nota} />;

[03:00] Passamos todas as informações que estão dentro dessa nota e agora, dentro de Nota, recebemos esse item, export function Nota({item }). Com este item, podemos ver o que está sendo retornado.

[03:19] Já sabemos o que está sendo retornado, na verdade. É um array, a posição 0 é o ID, e a posição 1 e o texto. Então, podemos apagar esse Lorem Ipisum e colocar item na posição 1, que é a posição do texto, Text style={style.texto} numberOfLines={5}>{item[1]}</Text>.

[03:35] Fechei as chaves e voltei para o meu emulador. Vou só autorizar e já fez automaticamente para nós. Ele já pegou todas as informações de cada uma das entradas do AsyncStorage e já mostrou dentro do cartão.

Tela do aplicativo. Na metade superior da tela há um a lista com as notas salvas. Cada nota está apenas com o título em exibição, alinhado à esquerda, e entre às notas há uma linha de espessura média de cor alaranjada para separá-las

[03:48] Com isso, nós conseguimos até fechar essa parte do AsyncStorage. Contudo, tenho algumas observações. Conforme formos criando mais notas, quando passarmos de uma certa quantidade, as novas notas são adicionadas depois da posição 1.

[04:11] Por exemplo, ao criarmos várias notas em sequência, a última nota ficou abaixo de "Uma nota" ao invés de ficar lá no final da lista. Isso acontece porque o AsyncStorage trabalha com sorte, ele reorganiza as keys antes de retornar para nós no multiGet.

[04:26] Então, ao invés de retornar por ordem de entrada no AsyncStorage, ele pega todas as chaves, dá um sort, organiza por ordem alfabética, já que são strings, e quem vier primeiro na ordem alfabética é quem aparece primeiro na lista. Essa é apenas uma observação com relação ao AsyncStorage.

[04:54] Encerramos o AsyncStorage. O próximo passo é aprendermos uma coisa um pouco mais complexa, completa e robusta, que vai ser o SQLite. Vejo você no próximo vídeo.

@@05
Desafio: salvando objetos no AsyncStorage

O AsyncStorage só consegue guardar strings como chave e valor, mas existe uma maneira de guardar objetos contendo mais informações. Podemos transformar um objeto JSON em uma string e depois guardar essa string no AsyncStorage. Para recuperar a informação, podemos receber seu conteúdo e depois transformar novamente em um objeto JSON.
Pegue, como exemplo, o objeto abaixo:

const umObjeto = {
  id: "1",
  titulo: "Um título",
  texto: "Um texto qualquer"
}COPIAR CÓDIGO
Escreva duas funções, uma que guarde esse objeto no AsyncStorage e outra que mostre no console esse objeto recebido pelo AsyncStorage.

O objetivo desta atividade é que você pratique a escrita de códidos que salvam objetos no AsyncStorage.
Vamos ver a solução?

A primeira função precisa preencher a estrutura básica da função .setItem(). Podemos colocar como chave umObjeto.id e como valor JSON.stringify(umObjeto). A função JSON.stringify() vai transformar nosso objeto em uma string, permitindo ser salvo dentro do AsyncStorage.

async function salvaObjeto() {
  const umObjeto = {
    id: "1",
    titulo: "Um título",
    texto: "Um texto qualquer"
  }
  await AsyncStorage.setItem(umObjeto.id, JSON.stringify(umObjeto))
}COPIAR CÓDIGO
A segunda função utiliza a função .getItem() do AsyncStorage recebendo a chave "1". Depois pegamos esse resultado e salvamos em uma variável. Quando for imprimir no console precisamos transformar em um objeto novamente através da função JSON.parse().

async function mostraObjeto() {
  const entrada = await AsyncStorage.getItem("1")
  console.log(JSON.parse(entrada))
}COPIAR CÓDIGO
Uma observação importante é que esta solução para guardar um objeto dentro do AsyncStorage não é ideal, dado que a função da ferramenta é guardar apenas strings. Considere essa solução como uma "gambiarra" e não como uma solução oficial.

@@6
Faça como eu fiz: exibindo notas em tela

Agora é a sua vez! A partir do conteúdo visto nesta aula, implemente a funcionalidade de criar um id de maneira dinâmica para notas e exibir em tela todas as notas salvas no AsyncStorage. Siga os passos:
Crie uma função que gera ids dinamicamente;
Monte uma função que retorna todas as entradas dentro do AsyncStorage;
Mostre todas as notas salvas dentro de uma FlatList.

Você pode conferir sua resposta com o código abaixo:
// NotaEditor.js
import React, { useState } from "react"
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function NotaEditor({mostraNotas}) {
  const [texto, setTexto] = useState("")
  const [modalVisivel, setModalVisivel] = useState(false)
  async function salvaNota() {
    const novoId = await geraId()
    const umaNota = {
      id: novoId.toString(),
      texto: texto,
    }
    console.log(umaNota)
    await AsyncStorage.setItem(umaNota.id, umaNota.texto)
    mostraNotas()
  }
  async function geraId() {
    const todasChaves = await AsyncStorage.getAllKeys()
    if(todasChaves <= 0) {
      return 1
    }
    return todasChaves.length + 1
  }
  return(
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {setModalVisivel(false)}}
      >
        <View style={estilos.centralizaModal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={estilos.modal}>
              <Text style={estilos.modalTitulo}>Criar nota</Text>
              <Text style={estilos.modalSubTitulo}>Conteúdo da nota</Text>
              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={3}
                onChangeText={novoTexto => setTexto(novoTexto)}
                placeholder="Digite aqui seu lembrete"
                value={texto}/>
              <View style={estilos.modalBotoes}>
                <TouchableOpacity style={estilos.modalBotaoSalvar} onPress={() => {salvaNota()}}>
                  <Text style={estilos.modalBotaoTexto}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.modalBotaoCancelar} onPress={() => {setModalVisivel(false)}}>
                  <Text style={estilos.modalBotaoTexto}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => {setModalVisivel(true)}} style={estilos.adicionarMemo}>
        <Text style={estilos.adicionarMemoTexto}>+</Text>
      </TouchableOpacity>
    </>
  )
}
// App.js
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NotaEditor from "./src/componentes/NotaEditor"
import { Nota } from "./src/componentes/Nota"
import { useState } from "react"
export default function App() {
  const [notas, setNotas] = useState([])
  async function mostraNotas() {
    const todasChaves = await AsyncStorage.getAllKeys()
    const todasNotas = await AsyncStorage.multiGet(todasChaves)
    setNotas(todasNotas)
    console.log(todasNotas)
  }
  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota {...nota}/>}
        keyExtractor={nota => nota[0]}/>
      <NotaEditor mostraNotas={mostraNotas}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

@@07
O que aprendemos?

Nesta aula, vimos:
Como criar uma identificação única de forma dinâmica;
Funções para pegar todas as entradas do AsyncStorage;
A utilização do FlatList para mostrar todas as notas na página principal.

#### 13/01/2024

@03-SQLite e banco de dados

@@01
Projeto da aula anterior

Para acompanhar a partir deste ponto, você pode baixar o projeto completo da aula anterior neste link.

https://github.com/alura-cursos/salvandoLocalmente/archive/refs/heads/aula2.zip

@@02
Dados compostos e relacionamentos

[00:00] Anteriormente, eu comentei sobre as desvantagens de se utilizar o AsyncStorage. Vamos lembrar quais são essas desvantagens.
[00:07] Uma das desvantagens, ou limitações, do AsyncStorage é: ele guarda apenas strings. No caso, estamos guardando apenas um texto, o conteúdo da nossa nota, mas e se quiséssemos guardar mais informações como, por exemplo, o título da nota e uma categoria além do texto da nota?

[00:25] Para isso, teríamos que aumentar a quantidade de entradas do objeto JSON, transformá-lo em string, guardá-lo dentro do AsyncStorage, retirá-lo e transformá-lo em objeto JSON de novo para podermos trabalhar e preencher a nossa nota.

[00:45] Isso, na verdade, é meio que uma adaptação para o AsyncStorage porque, na verdade, a função do AsyncStorage é guardar apenas strings.

[00:53] Limitação de espaço. Isso é uma coisa específica até para o Android, porque é uma limitação do AsyncStorage com o Android. Se viermos na documentação do AsyncStorage, ela fala que o tamanho total que o AsyncStorage consegue guardar é de 6 MB.

[01:13] Por entrada, existe uma limitação de 2 MB, então, a cada chave-valor só podemos guardar 2 MB de informação. Outra coisa muito importante é que as informações guardadas no AsyncStorage não são criptografadas.

[01:26] Então, não é um lugar seguro para guardar informações sensíveis como, por exemplo, do cartão de crédito, senhas, ou qualquer outro tipo de informação sensível.

[01:36] Não consegue fazer consultas. Vou explicar depois melhor o que são as consultas, mas, por exemplo, só conseguimos retirar informações do AsyncStorage com o objeto inteiro, a informação completa que vem dentro da chave-valor.

[01:51] Nós não conseguimos pegar partes específicas que estão guardadas dentro do AsyncStorage. Por exemplo, no nosso objeto, pegar só o texto. Considerando o dado composto já com título, categoria e texto, ele não vai conseguir pegar informações distintas, como apenas o título.

[02:08] Nós teríamos que pegar esse objeto e fazer um filtro manual, fazer uma função que vai filtrar e retornar para nós apenas a informação que precisamos.

[02:19] Outra coisa é que o AsyncStorage não consegue lidar com relacionamentos. Como assim relacionamentos? O que são relacionamentos de dados?

[02:30] Vou usar o exemplo de uma escola. Uma escola tem um aluno ou uma aluna que vai conter algumas informações: uma identificação única, porque a pessoa pode ter o mesmo nome e sobrenome que outra pessoa, o nome completo, a idade e o endereço,

[02:47] Então, essas são as informações que vão montar o aluno ou a aluna. Outra coisa, esse aluno ou essa aluna está dentro de uma classe, e essa classe pertence a qual série? 1º do colegial, 1º do ginásio, 1º do fundamental?

[03:05] Qual é a identificação dessa classe? Além disso, a classe está situada em qual andar dentro da escola? Quantos alunos tem dentro dessa classe? Essa classe está dentro de uma unidade, quantas unidades mais existem?

[03:18] Pode ser que essa escola tenha uma filial no Brasil inteiro, na região Norte, na região Sul, na região Central. De onde é essa unidade?

[03:27] Então isso acaba criando um relacionamento entre o aluno, a classe e a unidade. Cada um desses conjuntos contém informações específicas voltadas para eles mesmos.

[03:40] A unidade vai ter o endereço de onde está situada, a classe vai ter as informações que eu falei, de série, andar e unidade, e o aluno vai ter praticamente todas essas informações, além das informações básicas de identificação única, que são nome, sobrenome, idade e endereço. Também tem que identificar a qual série, a qual classe e a qual unidade ele pertence.

[04:11] Agora que entendemos relacionamentos, o SQLite? Eu tinha explicado, no começo do curso, que vamos trabalhar com dois modos de guardar dados dentro do nosso aplicativo: o AsyncStorage e o SQLite.

[04:26] A função do AsyncStorage é simplesmente guardar informações mais simples, e até agora funcionou perfeitamente para o que precisávamos. Porém, agora que estamos trabalhando com dados um pouco mais compostos, completos e com relacionamentos, é importante que tenhamos uma ferramenta que consiga lidar com essas informações.

[04:45] O SQLite vai ser um banco de dados. Quais são as vantagens de ter um banco de dados na aplicação? Ele nos permite fazer consultas e filtros. Voltando ao que eu tinha falado sobre o AsyncStorage sobre consultas, dentro da própria ferramenta de um banco de dados, nós conseguimos fazer essas buscas que vão retornar para apenas as informações necessárias.

[05:11] Por exemplo, se procurarmos apenas as classes que temos dentro do meu banco de dados, conseguimos retornar apenas essas informações, em vez de pegar todo o conjunto de informações.

[05:24] No caso do exemplo do aluno, no AsyncStorage, esse aluno teria todas as informações de aluno, classe e de unidade condensado em um lugar só.

[05:36] No banco de dados, conseguimos isolar em tabelas cada uma dessas entidades. Depois conseguimos fazer filtros e consultas baseados nessas tabelas, nesses conjuntos de informações.

[05:47] Por fim, conseguimos pegar apenas as informações que queremos através do banco de dados. Por exemplo, filtrar apenas por alunos que são pertencentes à classe tal. Se queremos apenas alunos que nasceram no dia tal, temos uma lista de alunos que nasceram na data tal.

[06:07] Eu quero resgatar todas as unidades da região Norte, por exemplo, nós conseguimos fazer um filtro que, em vez de retornar alunos e classes, só vamos receber as informações necessárias que pedimos, que são as informações das unidades.

[06:22] Ele consegue lidar com relacionamentos. Então foi isso que eu expliquei sobre ter vários conjuntos de dados que formam toda a estrutura da escola. A escola, na verdade, é um conjunto de alunos, classes e unidades, isso tudo forma a empresa escola, digamos assim.

[06:38] Pode guardar imagens, vídeos, entre outros, o que era uma limitação do AsyncStorage, que só conseguia guardar strings. Aqui temos liberdade para guardar outras objetos como imagens dos alunos, vídeos de apresentações e áudios.

[06:53] Garante informações mais seguras porque o jeito que ele guarda a informação criptografada. Existe uma própria segurança da ferramenta para guardar as informações, para que elas não sejam vazadas para outras pessoas.

[07:07] Resumindo, aprendemos sobre as limitações do AsyncStorage, o relacionamento dos dados, o que é o SQLite, que é um banco de dados, e as vantagens de usarmos um banco de dados na nossa aplicação.

[07:19] A seguir, vamos usar as informações que descobrimos para incrementar um pouco o nosso projeto. Eu usei o exemplo de criarmos título e categoria para a nossa nota, e é exatamente isso que faremos.

[07:34] Então o nosso próximo passo será adicionar as informações de título e de categoria, usando uma ferramenta mais adequada para lidar com esse tipo de informação, que vai ser o SQLite. Vejo você no próximo vídeo.

@@03
Instalando o SQlite

[00:00] Nosso próximo passo vai ser instalar o SQLite dentro do nosso projeto.
[00:05] Toda vez que vamos instalar uma nova biblioteca no nosso projeto, é importante encerrar o aplicativo antes de instalar a nova biblioteca. Vou no meu Terminal e parei o nosso servidor, o nosso Expo.

[00:18] Agora basta instalarmos o SQLite. Vou abrir a documentação e, logo no começo, vão ter informações sobre a instalação importando database, mas é importante irmos na parte de instalação, ou seja, a seção "Instalation".

[00:34] Nela terá um comando para rodarmos no nosso Terminal, que instala o expo-sqlite. Vou copiar esse código, vou para o meu editor de código e dar um “Ctrl + V” no Terminal.

[00:49] Detalhe, só por questão de consistência, para que você consiga acompanhar este curso, independentemente da época, recomendo a instalação da mesma versão que eu vou usar, que é a 10.1.0.

[01:06] Depois, basta apertar “Enter” e esperar ele instalar no Terminal. Terminada a instalação, podemos agora iniciar o projeto novamente, npm start, e ver se ele ainda funciona.

[01:20] Está funcionando, está ok. Temos agora o SQLite no nosso projeto, só que não estamos usando-o. A documentação deixa explícito como fazer isso, mas o nosso próximo passo é abrir a conexão com o banco de dados dentro do projeto.

[01:41] Então, no nosso editor de código, vou criar um novo arquivo e a única função dele arquivo será abrir a conexão com o banco. Com essa conexão aberta, podemos fazer as queries, recuperar as informações do banco de dados e salvá-las dentro do banco de dados.

[02:00] Só que esse arquivo não ficará dentro de "componentes", e sim dentro de uma nova pasta chamada “Services”. “Services” é onde guardamos todos os arquivos que trabalham com serviços, ou seja, é um serviço que faz a conexão com o banco, que nos fornece alguma informação, que faz algo para nós.

[02:21] Dentro de "src", eu vou criar uma nova pasta chamada "servicos", então vou clicar em “src” com o botão direito do mouse, selecionar "New folder" e escrever "servicos". Dentro de “servicos”, vou criar um novo arquivo chamado “SQLite.js”, então vou clicar em "servicos" com o botão direito do mouse, selecionar "New File" e escrever "SQLite.js".

[02:39] Agora precisamos importar tudo que é do SQLite, import * as SQLite from "expo-sqlite", e criar uma nova função chamada function abreConexao(){}, que terá o papel de abrir a conexão com o banco.

[03:10] Para isso, vamos chamar o SQLite, nossa variável que acabamos de importar, com SQLite.openDatabase(), que é uma função. Essa função tem o retorno de um database e nós precisamos salvar esse retorno em algum lugar.

[03:30] Então vou criar uma constante, const database. Dentro dessa função de SQLite.openDatabase(), só precisamos passar uma informação que é o nome do database que vamos criar. Vou chamá-lo de const database = SQLite.openDatabase(“db.db”).

[03:50] Agora vamos retornar return database e vamos exportar, export db, que vai ser o retorno da função do abreConexao, então, export const db = abreConexao().

[04:16] Assim, ficará salva a nossa constante db com a conexão aberta. Agora podemos importar esse db em outro arquivo que vai cuidar só das nossas queries. Então, isolamos as responsabilidades.

[04:30] No arquivo de “SQLite.js”, a única função será a de abrir a conexão com o banco de dados. Agora que temos a conexão aberta, podemos fazer as transações com o banco de dados em outro arquivo, que será o arquivo das notas.

[04:42] Salvei esse arquivo. O próximo passo será criar o arquivo que irá salvar e trabalhar com as notas dentro do banco de dados. Vejo você no próximo vídeo.

@@04
Para saber mais: sobre serviços

Durante o curso, foi criada uma pasta chamada servicos, onde o arquivo SQLite.js está localizado. Fizemos isto pela razão de que, no desenvolvimento de código, uma boa prática é isolar funcionalidades dentro do projeto. O que for componente fica em uma pasta componentes, o que for lógica fica em outra pasta, etc.
A pasta de servicos guarda toda a lógica que conversa com aplicações externas, neste caso, o SQLite.

No caso do AsyncStorage, não precisamos criar essa pasta e arquivos, pois a própria ferramenta nos dá as funções que conversam com a aplicação AsyncStorage, basta apenas implementar em nosso projeto.

Lembrando que a sua aplicação não vai quebrar sem a pasta servicos, é apenas uma convenção para melhorar a visibilidade e manutenção da aplicação. Assim, se você precisar fazer uma manutenção no código, saberá encontrar mais facilmente a parte responsável p

@@05
Para saber mais: banco de dados

Ao longo desta aula, utilizamos conceitos relacionados a banco de dados e modelagem de dados, que cria um sistema de armazenamento local. Não é obrigatório que você seja expert nesses assuntos, mas estudar um pouco sobre isso pode ajudar muito seu dia a dia de trabalho.
Pensando nisso, separamos alguns conteúdos para você:

Curso: Modelagem de banco de dados relacional: entidades, relacionamentos e atributos
Artigo: Entidade: atributos simples, compostos e multivalorados

https://www.alura.com.br/curso-online-modelagem-banco-relacional-entidade-relacionamento-atributo?_gl=1*eqfvag*_ga*MTgwMzIzMjk2Ni4xNjg4ODE5OTcz*_ga_1EPWSW3PCS*MTcwNTE4MDg2MC4xNjIuMS4xNzA1MTgyMTkyLjAuMC4w*_fplc*T1RTRnJxZ0g0WHFvbSUyRmVHakRDUDFhVTV6eTROUGxRSmEwMmVKRnNHYzRxZmdrZ0g4cWs4WlcxbUNXSFNIRXglMkJCUUtjNEUlMkJTTE1Ed2dzYkxhZzNtZUViQWVsMmFzWlROSjFvaEY3SkYyaURwMGxZUmZ3ZWNkQlA4MnBMbHV3JTNEJTNE

https://www.luis.blog.br/analise-de-entidade-atributos-simples-compostos-multivalorados.html

@@06
A tabela de notas

[00:00] Agora que temos a nossa conexão com o banco de dados, o próximo passo será criar o arquivo que cuidará dos relacionamentos entre as notas e o banco de dados, guardando assim as informações dentro do banco de dados.
[00:12] Novamente, isolando essas funcionalidades, eu vou criar um novo arquivo, dentro da pasta “servicos”, chamado de “notas.js”. Para conversarmos com o banco de dados e fazermos as queries, precisamos de uma conexão com o banco para fazer transações com o banco de dados.

[00:29] Primeiro, precisamos importar a nossa constante db, que foi criada dentro do arquivo “SQLite.js”, escrevendo import { db } from “./SQLite” no nosso arquivo. Como está no mesmo nível de pastas, podemos chamar de ./SQLite.

[00:45] O que fazemos com isso agora? Primeiro precisamos inicializar a tabela. Vou criar uma nova função com function criaTabela() {. Dentro dela vamos chamar o db.

[01:00] A partir do db, precisamos fazer uma transação, que pode ser uma query. Vou criar um db.transaction e agora ele imediatamente faz uma função de call-back, que vai receber dentro dela uma transaction, ou seja, uma transação.

[01:19] Vou escrever db.transaction((transaction) => e, dentro da arrow function, passamos o transaction. Nela podemos fazer um transaction.executeSql. Aqui dentro é onde escrevemos o nosso statement, ou seja, o nosso texto que é o nosso comando SQL.

[01:38] Agora tudo será escrito no formato de string. Qual será o comando? Cada linguagem de banco tem o seu jeito de escrever. Toda palavra reservada do SQLite, eu prefiro escrever com letra maiúscula, tudo em “CAPS”, para garantir que vai funcionar.

[02:00] Tem algumas linguagens que não têm problema com isso, você pode escrever em camel case, ou seja, pode escrever tudo minúsculo, não tem problema. Por precaução, eu prefiro escrever tudo com letra maiúscula, porque são palavras reservadas da linguagem, e em letras minúsculas, a depender do caso, para as coisas que são minhas.

[02:21] Vou colocar tudo em “CAPS”, transaction.executeSql(“CREATE TABLE IF NOT EXISTS”), porque vamos rodar essa função assim que a aplicação for executada. A aplicação será aberta e precisará de uma tabela, ou seja, de acesso ao banco de dados, senão, ela não vai adicionar nota em nenhum lugar, porque não vai existir o banco de dados.

[02:43] Caso já exista esse banco de dados e a tabela já tenha sido criada, ele não precisa criar nada, ele simplesmente prossegue para o próximo passo. Contudo, se for a primeira vez que o aplicativo estiver iniciando, a tabela ainda não existirá e precisará ser criada. Por isso é importante.

[03:03] Outro detalhe: para facilitar a visualização das linhas do statement que estou escrevendo, eu vou quebrar em linhas. O detalhe importante é que eu escrevi agora "CREATE TABLE IF NOT EXISTS" e já fechei aspas logo em seguida.

[03:17] Vou pressionar “Espaço”, deixando um espaço vazio do lado de EXISTS", o que é muito importante. Depois do fechamento das aspas, eu vou concatenar, pressionar “Enter + Tab” e continuar escrevendo o meu statement, transaction.executeSql("CREATE TABLE IF NOT EXISTS" +. Em seguida, pressionamos "Enter".

[02:36] Precisamos passar agora o nome da tabela, que vai ser "Notas ". Pressionamos "Espaço" antes do fechamento das aspas e concatenamos, ou seja, escrevemos <+>. Em seguida, pressionamos “Enter” e escrevemos apenas as "").

[03:51] Agora passamos nessas aspas vazias o que terá dentro dessas notas, ou seja, o ID. O que será o ID? A identificação vai ser inteira, a chave primária para o banco de dados e o autoincrement, que é uma coisa que faltada no AsyncStorage. Nós fizemos uma função chamada criaId para gerar um ID automático para nós.

[04:13] Aqui, o próprio SQLite vai fazer o ID automaticamente. Então abrimos parênteses e a primeira identificação vai ser o ID, escrevendo tudo em “CAPS”, “(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT)”).

[05:02] Terminei de escrever, fechei os parênteses. Depois dos parênteses, antes do fechamento das aspas – isso é muito importante –, ponto e vírgula: “(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);”).

[05:14] Porque, novamente, dependendo da linguagem do banco onde você vai escrever, o ponto e vírgula indica o fechamento do statement. Sem o ponto e vírgula, o banco não considera que foi terminada a escrita do statement, e ele tentará juntar com a outra chamada de statement, gerando uma confusão. Sendo assim, usamos o ponto e vírgula para fechar o statement do nosso banco.

[05:44] Temos agora o nosso criaTabela, só que ela não é exportada, não temos como usá-la ainda. Portanto, no começo do código, vamos adicionar o comando export, ou seja, export function criaTabela().

[05:55] Salvei e agora vamos chamar essa função assim que a nossa aplicação é inicializada. No nosso “App.js”, vamos usar o useEffect, que é do próprio React. Ele vai ter o call-back, useEffect((_ -> {,em que vai importar aquele criaTabela().

[06:27] Importou certo a tabela do Notas, precisamos, só para finalizar, do array vazio, }, []). Salvei e voltei para o meu aplicativo e parece que está tudo ok.

[06:43] O que acontece? Toda vez que esse aplicativo iniciar, ele vai tentar criar a tabela de notas. Caso a tabela não exista, ele vai criá-la, caso exista, ele não prossegue para onde tem que ir.

[06:59] O que podemos fazer aqui também é limpar algumas funcionalidades do AsyncStorage que não vamos mais usar. Vou deixar as funções salvas, o nome das funções já criadas, mas vou apagar o conteúdo delas.

[07:16] Tudo que tem o AsyncStorage, vou apagar. Dentro do mostraNotas(), vou apagar tudo que tem a ver com o AsyncStorage, inclusive o import dele no nosso projeto.

[07:29] Dentro do “NotaEditor.js”, outro lugar que usamos, temos o geraId(), que não precisa mais existir, porque o próprio banco vai fazer isso por nós, então apagaremos toda a função.

[07:44] Na função salvaNota(), o await AsyncStorage não precisa existir mais, então vamos apagar essa linha, e essa função geraId() também não existe mais, então apagamos a linha da const novoId. Deixei só umaNota e, para o ID não ficar vazio, vou deixar uma string com "1", então id: "1",, deixando algo guardado.

[08:00] Também apagaremos o import do nosso “NotaEditor.js”. O próximo passo será escrever as queries que criarão uma nova nota no nosso banco, e recuperarão as informações para nós. E vamos preenchendo o nosso aplicativo com essas informações.

[08:21] Vejo você no próximo vídeo.

@@07
Adaptando o projeto

[00:00] Antes de começarmos a escrever as queries e as funções que vão pegar as informações do banco de dados, vamos adaptar o nosso projeto para receber as novas informações dos cartões.
[00:10] Então, vamos adicionar as entradas de título, de categoria, e adaptar o cartão para poder mostrar essas informações. No nosso “NotaEditor.js”, vamos ter duas varáveis novas.

[00:22] Vamos ter a constante de título, const [titulo, setTitulo] = useState(“ “), começando com um título vazio, e a const [categoria, setCategoria] = useState().

[00:50] Eu não vou iniciar a categoria vazia porque, quando eu for selecionar uma categoria, eu quero que ela venha de um picker. Esse picker precisa ter um valor inicial que precisa ser alguma coisa, não pode ser vazio.

[01:03] Então, vamos ter agora três categorias, que vai ser “Pessoal”, “Trabalho” e “Outros”, e eu quero inicializar com o primeiro, que vai ser o Pessoal. Assim, ao invés de ser uma string vazia inicializada, vai ser const [categoria, setCategoria] = useState(“Pessoal”).

[01:20] Agora, dentro do "componente", na parte mais visual, podemos copiar esse Text e TextInput, de onde vem o conteúdo da nota. Em Text, podemos alterar de Conteúdo para Título da nota.

[01:40] No TextInput, a estilização está certa, mas não temos mais multiline e nem numberOfLines, então vamos apagar essas duas linhas. No onChangeText, precisamos alterar para novoTitulo e, invés de ser setTexto, vai ser setTitulo, passando o nosso novoTitulo. Então, onchangeText={novoTitulo -> setTitulo (novoTitulo)}.

[02:03] O placeholder será placeholder=”Digite um título” e o value será value={titulo}/>. Para o picker, complica um pouco, porque o React Native não tem um componente de picker por padrão.

[02:22] Então, eu vou instalar um componente de picker que se chama react-native-picker. Para isso, preciso instalar uma biblioteca nova e, portanto, tenho que encerrar a aplicação. Finalizei, escrevo npm install @react-native-picker/picker no Terminal e a versão que eu vou usar é a `@2.2.1`.

[02:53] Pressionei “Enter”, basta esperar o NPM instalar. Depois de instalado, podemos importar no projeto, só que, para utilizarmos o picker, temos que englobá-lo dentro de uma view.

[03:07] Então, vou criar uma nova View dentro do TextInput em "NotaEditor.js". A View já está importada no projeto e ela terá um style que já existe dentro do projeto, View style={estilos.modalPicker}>.

[03:36] Dentro deste código, temos o componente de <Picker, que importou sozinho. Dentro do objeto de <Picker, precisamos passar duas informações. Uma delas é o selectedValue, e ela vai estar qual o valor inicial, ou seja, o valor default desse picker.

[03:56] Por isso que é importante ter inicializado com alguma coisa dentro, como foi o caso do “Pessoal”, porque senão ele ia inicializar como vazio e, caso não selecionássemos e pegássemos o valor que aparece no picker sem mudar nada, ele ia pegar um valor vazio.

[04:13] Então, selectedValue={categoria}. Outra informação importante de passarmos é a que passamos no TextInput, ou seja, o onChange. Porém, ao invés de ser onChangeText, vai ser onValueChange.

[04:30] Agora, a mesma coisa que fizemos com o input: onValueChange={novaCategoria => setCategoria(novaCategoria)}. Dentro do <Picker, vamos chamar outro componente que é o <Picker.Item.

[04:52] Nele passamos duas informações, a label, que é o nome daquela categoria, e o value, o valor que vai ser enviado do banco de dados. Então, <Picker.Item label="Pessoal" value="Pessoal"/>. Essa tag é auto-fechável.

[05:18] Copiamos esse trecho, colamos mais duas vezes para criar as labels. Agora preencheremos o segundo valor, substituindo "Pessoal", por "Trabalho". No último, de "Pessoal" mudamos para "Outros", representando outras categorias.

[05:34] Finalizamos as alterações do “NotaEditor.js”. O próximo será o “Nota.js”. Antes, vamos conferir como ficou. Temos que inicializar novamente, digitando npm start no terminal e pressionando "Enter" para iniciar o serviço novamente.

[05:47] Abri a modal, clicando no "+" no canto inferior direito. Nela está o título da nota e o picker. Inclusive, faltou colocar um título para o picker, porque ele está acabando de repente. Vou voltar para o nosso código do "NotaEditor.js" e inserir um Text antes do View do nosso Picker.

[06:12] O título do picker será "Categoria", então <Text style[{estilos.modalSubstitulo}>Categoria</Text>. Vejamos como ficou. “Categoria”, está aqui. “Pessoal, Trabalho, Outros”.

[06:28] O próximo vai ser mudar a nota, então vamos no componente “Nota.js”. Tenho que fazer uma leve alteração que acabei esquecendo de mudar. Alterar a variável style, na function Nota(), para estilos.

[05:47] No return(), alteramos style.cartao para estilos.cartao e estilos.texto. Em seguida, adicionamos duas entradas. Temos agora o Text style={estilos.titulo}></Text>, vou deixar vazio por enquanto, e o <Text style={estilos.categoria}></Text>.

[07:27] Outra coisa para arrumar. Temos a styleFunction(categorias[]) e precisamos da lista de categorias para pegar as cores de cada categoria.

[07:37] Eu tinha deixado [Pessoal] porque não tínhamos essa categoria antes. Agora, como vamos receber essa categoria do banco de dados, podemos deixar um valor vazio por enquanto, então const estilos = styleFunction(categorias[""]).

[07:46] Porque as informações de título, a categoria e até mesmo o texto do conteúdo da nota virão do banco de dados, então podemos preencher essas informações depois.

[08:00] Já preparamos o nosso projeto para receber as informações do banco de dados, para as novas informações que vão ser recebidas dentro da nota. O próximo passo vai ser pegar as informações e salvá-las no banco de dados. Vejo você no próximo vídeo.

@@08
Faça como eu fiz: implementando SQLite

Agora é a sua vez! A partir do conteúdo visto nesta aula, implemente o SQLite em seu projeto.
Siga os passos:

Instale o SQLite na versão 10.1.0;
Separe a responsabilidade de trabalhar com o banco de dados em uma pasta de serviços;
Crie a função que abre a conexão com o banco de dados;
Crie a função que monta a tabela de notas com as seguinte colunas: id, título, categoria e texto;
Limpe as importações e funções remanescentes do AsyncStorage;
Adapte os componentes NotaEditor.js e Nota.js para receber as novas informações de uma nota;
Utilize o componente Picker na versão 2.2.1 para selecionar uma categoria. O componente Picker tem como única função dar a funcionalidade da tag <select> do HTML, pois no React Native, por padrão, não existe uma ferramenta para criar um menu de opções.
Para saber mais sobre a tag <select> veja a documentação neste link.

https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/select

Nesta atividade, o objetivo é instalar o SQLite e abrir a conexão com o banco de dados.
Você pode conferir sua resposta com o código abaixo:

// NotaEditor.js
import { Picker } from "@react-native-picker/picker"
import React, { useState } from "react"
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
export default function NotaEditor({mostraNotas}) {
  const [titulo, setTitulo] = useState("")
  const [categoria, setCategoria] = useState("Pessoal")
  const [texto, setTexto] = useState("")
  const [modalVisivel, setModalVisivel] = useState(false)
  async function salvaNota() {
    const umaNota = {
      id: "1",
      texto: texto,
    }
    console.log(umaNota)
    mostraNotas()
  }
  return(
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {setModalVisivel(false)}}
      >
        <View style={estilos.centralizaModal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={estilos.modal}>
              <Text style={estilos.modalTitulo}>Criar nota</Text>
              <Text style={estilos.modalSubTitulo}>Título da nota</Text>
              <TextInput
                style={estilos.modalInput}
                onChangeText={novoTitulo => setTitulo(novoTitulo)}
                placeholder="Digite um título"
                value={titulo}/>
              <Text style={estilos.modalSubTitulo}>Categoria</Text>
              <View style={estilos.modalPicker}>
                <Picker
                  selectedValue={categoria}
                  onValueChange={novaCategoria => setCategoria(novaCategoria)}>
                    <Picker.Item label="Pessoal" value="Pessoal"/>
                    <Picker.Item label="Trabalho" value="Trabalho"/>
                    <Picker.Item label="Outros" value="Outros"/>
                </Picker>
              </View>
              <Text style={estilos.modalSubTitulo}>Conteúdo da nota</Text>
              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={3}
                onChangeText={novoTexto => setTexto(novoTexto)}
                placeholder="Digite aqui seu lembrete"
                value={texto}/>
              <View style={estilos.modalBotoes}>
                <TouchableOpacity style={estilos.modalBotaoSalvar} onPress={() => {salvaNota()}}>
                  <Text style={estilos.modalBotaoTexto}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.modalBotaoCancelar} onPress={() => {setModalVisivel(false)}}>
                  <Text style={estilos.modalBotaoTexto}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => {setModalVisivel(true)}} style={estilos.adicionarMemo}>
        <Text style={estilos.adicionarMemoTexto}>+</Text>
      </TouchableOpacity>
    </>
  )
}
// Nota.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";
export function Nota({item}) {
  const categorias = {Pessoal: "#FF924F", Outros: "#00911F", Trabalho: "#2F71EB"}
  const estilos = styleFunction(categorias[""])

  return (
    <View style={estilos.cartao}>
      <Text style={estilos.titulo}></Text>
      <Text style={estilos.categoria}></Text>
      <Text style={estilos.texto} numberOfLines={5}>{item[1]}</Text>
    </View>
  )
}
// App.js
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import { Nota } from "./src/componentes/Nota"
import { useEffect, useState } from "react"
import { criaTabela } from "./src/servicos/Notas"
export default function App() {
  useEffect(() => {
    criaTabela()
  }, [])
  const [notas, setNotas] = useState([])
  async function mostraNotas() {
    setNotas(todasNotas)
    console.log(todasNotas)
  }
  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota {...nota}/>}
        keyExtractor={nota => nota[0]}/>
      <NotaEditor mostraNotas={mostraNotas}/>
      <StatusBar/>
    </SafeAreaView>
  )
}
// SQLite.js
import * as SQLite from "expo-sqlite"
function abreConexao() {
  const database = SQLite.openDatabase("db.db")
  return database
}
export const db = abreConexao()
// Notas.js
import { db } from "./SQLite"
export function criaTabela() {
  db.transaction((transaction) => {
    transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
      "Notas " +
      "(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);")
  })
}COPIAR CÓDIGO

@@09
O que aprendemos?

Nesta aula, vimos:
As vantagens e desvantagens da ferramenta atual (AsyncStorage);
Instalação do SQLite;
Separação da responsabilidade de acessar o banco de dados dos componentes principais;
A criação da tabela de Notas;
Como criar statements/queries para acessar informações do banco de dados.