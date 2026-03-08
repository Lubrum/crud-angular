![Java](https://img.shields.io/badge/Java-24-orange)
![Spring Boot](https://img.shields.io/badge/SpringBoot-4-green)
![Build](https://img.shields.io/badge/build-maven-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

# CRUD Spring Boot API

API REST de exemplo para gerenciamento de **courses**, desenvolvida com **Spring Boot**, **Spring Data JPA** e **MySQL**.

O projeto demonstra a implementação de um CRUD completo com:

* arquitetura em camadas
* validação de dados
* paginação
* integração com banco relacional
* execução via Docker

---

# Tecnologias

* Java 24
* Spring Boot 4
* Spring Web
* Spring Data JPA
* Spring Validation
* Maven
* MySQL
* H2 Database
* Docker

---

# Arquitetura

O projeto segue uma arquitetura em camadas:

```
Controller → Service → Repository → Database
```

Responsabilidades:

* **Controller**: expõe endpoints REST
* **Service**: regras de negócio
* **Repository**: acesso ao banco de dados
* **DTOs**: transporte de dados entre camadas

---

# Executando o banco de dados

O projeto inclui configuração para iniciar um **MySQL container**.

```yaml
services:
  mysql:
    image: mysql:latest
    container_name: mysql_container
    environment:
      MYSQL_ROOT_PASSWORD: example_password
      MYSQL_DATABASE: courses
      MYSQL_USER: example_user
      MYSQL_PASSWORD: example_password
    ports:
      - "3306:3306"
```

Suba o banco com:

```bash
docker compose up -d
```

Database criado:

```
database: courses
user: example_user
password: example_password
```

---

# Executando a aplicação

Clone o repositório:

```bash
git clone https://github.com/Lubrum/crud-spring.git
cd crud-spring
```

Execute com Maven:

```bash
mvn spring-boot:run
```

Ou compile e execute:

```bash
mvn clean package
java -jar target/crud-spring-0.0.1-SNAPSHOT.jar
```

---

# Configuração do banco

Arquivo:

```
src/main/resources/application.properties
```

Exemplo de configuração:

```
spring.datasource.url=jdbc:mysql://localhost:3306/courses
spring.datasource.username=example_user
spring.datasource.password=example_password
spring.jpa.hibernate.ddl-auto=update
```

---

# API Endpoints

Base URL

```
/api/courses
```

## Listar cursos

```
GET /api/courses
```

Parâmetros:

| Param    | Descrição         | Default |
| -------- | ----------------- | ------- |
| page     | número da página  | 0       |
| pageSize | tamanho da página | 10      |

Exemplo:

```
GET /api/courses?page=0&pageSize=10
```

---

## Buscar curso por ID

```
GET /api/courses/{id}
```

Exemplo:

```
GET /api/courses/1
```

---

## Criar curso

```
POST /api/courses
```

Exemplo de request:

```json
{
  "name": "Spring Boot",
  "category": "Backend"
}
```

Resposta:

```
201 Created
```

---

## Atualizar curso

```
PUT /api/courses/{id}
```

Exemplo:

```json
{
  "name": "Spring Boot Advanced",
  "category": "Backend"
}
```

---

## Remover curso

```
DELETE /api/courses/{id}
```

Resposta:

```
204 No Content
```

---

# Estrutura do projeto

```
src
 ├── main
 │   ├── java/com/brum
 │   │   ├── controller
 │   │   ├── service
 │   │   ├── repository
 │   │   ├── dto
 │   │   └── model
 │   └── resources
 │       └── application.properties
 └── test
```

---

# Licença

Este projeto está licenciado sob a **MIT License**.
