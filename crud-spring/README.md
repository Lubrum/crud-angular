# CRUD Spring Boot

Projeto de exemplo de uma API CRUD construída com **Spring Boot**.
O objetivo deste repositório é demonstrar a criação de uma aplicação backend simples usando **Spring Boot, JPA e banco de dados relacional**.

## Tecnologias utilizadas

* Java 24
* Spring Boot 4
* Spring Web
* Spring Data JPA
* Spring Validation
* Maven
* MySQL
* H2 Database (para desenvolvimento/teste)

## Dependências principais

* `spring-boot-starter-web` — criação de APIs REST
* `spring-boot-starter-data-jpa` — acesso a banco de dados com JPA/Hibernate
* `spring-boot-starter-validation` — validação de dados
* `mysql-connector-j` — driver para MySQL
* `h2` — banco em memória para testes
* `spring-boot-devtools` — ferramentas de desenvolvimento

## Requisitos

* Java 24 ou superior
* Maven 3.9+

## Como executar o projeto

Clone o repositório:

```
git clone https://github.com/Lubrum/crud-spring.git
cd crud-spring
```

Execute com Maven:

```
mvn spring-boot:run
```

Ou compile e execute o jar:

```
mvn clean package
java -jar target/crud-spring-0.0.1-SNAPSHOT.jar
```

## Banco de dados

O projeto pode utilizar:

* **H2 (em memória)** para desenvolvimento
* **MySQL** para execução em ambiente real

As configurações podem ser definidas no arquivo:

```
src/main/resources/application.properties
```

## Estrutura do projeto

```
src
 ├── main
 │   ├── java
 │   │   └── com/brum
 │   │       ├── controller
 │   │       ├── service
 │   │       ├── repository
 │   │       └── model
 │   └── resources
 │       └── application.properties
 └── test
```

## Licença

Este projeto está licenciado sob a **MIT License**.
