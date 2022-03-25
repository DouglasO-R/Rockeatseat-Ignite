# Chapter 1 - Node Introduction

## Regras do REST

1. Cliente Server
    > Relacionamento de consumo de dados entre aplicação cliente e servidor, nao necessariamente envolve um front end


2. Stateles
    >  o servidor nao armazena o estado de nenhuma requisição.

3. Cache
   > aplicação precisar ser construida para que o cache possa ser feito,
   nao é necessario inicar uma aplicação com cache porem a aplicação deve fornecer suporte

4. Interface Uniforme
   > Contrato que informa dados que serao compartilhados pela api  entre cliente e servidor contem:
   > + Identificação dos Recursos
       * http://endereçodoservidor.com.br/clients 
       + http://endereçodoservidor.com.br/products
   > + Representação do Recurso
       + Json,XML 
   > + Mensagens auto descritivas
        + Descrever mensagens de relatam o ocorrido
   > + Hateos(Hypertext As The Engine Of Application State)
        + Retorno de links na api 

5. Camadas
   > A Aplicação deve ser construidasd em camadas como camadas de segurançã e balanceamento de carga

6. Codigo Sob Demanda
   > As funcionalidas de cliente sejam extendidas na forma de scripts e mini aplicativos

## Metosdos HTTp

- GET
  - Leitura
- POST
  - Criação
- PUT
  - Atualização de dados total 
- DELETE
  - Deleção de dados 
- PATCH 
  - atualização parcial de dados

### HTTP Codes
- 1xx
  - Informativo : A solicitação foi aceita ou processo contuianua em andamento
- 2xx
  - Confirmação 
    - 200 - Requisição bem suycedida
    - 201 - recurso criado
- 3xx
  - Redirecionamento 
    - 301 - Moved Permanently
    - 302 - Moved
- 4xx 
  - Erro do cliente
    - 400 - Bad Request
    - 401 - Unauthorized
    - 403 - Forbiden
    - 404 - Not found
    - 422 - Unprocessable Entity
- 5xx
  - Erro no Servidor - Servidor falhou ao concluir a solicitação
    - 500 - Internal Server Error
    - 502 - Bad Gateway

## Parametros da Requisição
- Header Params
  - parametros que vao no cabeçalho
  - possui chave, valor e separação
- Query Params
  - parametros na Url
- Route Params
  - parametros declarados na rota
- Body Params 
  - parametros no corpo da requisição