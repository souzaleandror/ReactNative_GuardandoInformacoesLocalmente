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