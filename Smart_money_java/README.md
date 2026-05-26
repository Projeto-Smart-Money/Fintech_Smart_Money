# Smart Money Backend

Backend da aplicacao Smart Money, criado com Spring Boot para fornecer a API REST usada pelo frontend React.

## Tecnologias

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Oracle Database
- Gradle Wrapper
- Maven tambem esta configurado no projeto

## Estrutura Principal

```text
src/main/java/com/example/fintechbackend
|-- controller
|   |-- RendaController.java
|   |-- DespesaController.java
|   `-- MetaController.java
|-- model
|   |-- Rendas.java
|   |-- Despesas.java
|   `-- Meta.java
|-- repository
|   |-- RendaRepository.java
|   |-- DespesaRepository.java
|   `-- MetaRepository.java
`-- FintechBackendApplication.java
```

## Configuracao do Banco

As configuracoes ficam em:

```text
src/main/resources/application.properties
```

Principais propriedades:

```properties
server.port=8080

spring.datasource.url=jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver

spring.jpa.database-platform=org.hibernate.dialect.OracleDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Importante: nao exponha usuario e senha reais em repositorios publicos.

## Como Rodar

Dentro da pasta do backend:

```powershell
cd C:\Users\joaon\Desktop\fintech\smart_money\Smart_money_java
.\gradlew.bat bootRun
```

A API deve iniciar em:

```text
http://localhost:8080
```

## Como Testar a Compilacao

```powershell
.\gradlew.bat test
```

## Endpoints

### Rendas

Base:

```text
/api/rendas
```

| Metodo | Rota | Descricao |
| --- | --- | --- |
| GET | `/api/rendas` | Lista todas as rendas |
| POST | `/api/rendas` | Cria uma nova renda |
| PUT | `/api/rendas/{id}` | Atualiza uma renda existente |
| DELETE | `/api/rendas/{id}` | Remove uma renda |

### Despesas

Base:

```text
/api/despesas
```

| Metodo | Rota | Descricao |
| --- | --- | --- |
| GET | `/api/despesas` | Lista todas as despesas |
| POST | `/api/despesas` | Cria uma nova despesa |
| PUT | `/api/despesas/{id}` | Atualiza uma despesa existente |
| DELETE | `/api/despesas/{id}` | Remove uma despesa |

### Metas

Base:

```text
/api/metas
```

| Metodo | Rota | Descricao |
| --- | --- | --- |
| GET | `/api/metas` | Lista todas as metas |
| POST | `/api/metas` | Cria uma nova meta |
| PUT | `/api/metas/{id}` | Atualiza uma meta existente |
| DELETE | `/api/metas/{id}` | Remove uma meta |

## Formato do JSON

O backend usa o campo `transactionDate` para datas.

Exemplo para criar uma renda:

```json
{
  "title": "Salario",
  "description": "Receita fixa mensal",
  "amount": 2500.0,
  "category": "Trabalho",
  "transactionDate": "2026-05-26"
}
```

O frontend converte automaticamente entre:

- `date`, usado na interface React
- `transactionDate`, usado pela API Java

## Integracao com o Frontend

O frontend espera a API neste endereco:

```text
http://localhost:8080/api
```

Esse valor esta definido em:

```text
src/services/apiClient.js
```

Para rodar o frontend:

```powershell
cd C:\Users\joaon\Desktop\fintech\smart_money
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:8080
```

## Observacoes

- O backend possui CORS liberado nos controllers com `@CrossOrigin(origins = "*")`.
- Os dados sao persistidos no Oracle quando o backend esta rodando e o banco esta acessivel.
- Se o frontend mostrar dados locais, normalmente significa que a API nao respondeu ou o backend nao esta ativo.
- Login e cadastro ainda nao possuem controller de autenticacao no backend; atualmente essa parte e simulada no frontend.
