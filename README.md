# Sistema de Cadastro de Veículos

Esta é uma aplicação web para gerenciar o cadastro de veículos, desenvolvida utilizando Node.js para o backend, MySQL Workbench como banco de dados, e HTML com JavaScript para o frontend.

## Funcionalidades

- Cadastro de veículos
- Visualização de todos os veículos cadastrados
- Edição de dados de veículos
- Exclusão de veículos do sistema

## Tecnologias Utilizadas

- **Backend**: Node.js, Express
- **Banco de Dados**: MySQL Workbench
- **Frontend**: HTML, CSS, JavaScript
- **Gerenciamento de Pacotes**: npm

## Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em sua máquina:

- [Node.js](https://nodejs.org/)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
- [Live Server (Extensão do VS Code)](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### Passos para execução

#1. **Clone o repositório:**
   ```bash
   git clone https://github.com/LuisFelipeTeixeira/Cadastro_veiculo.git
   ```

#2. Instale as dependências do projeto: Navegue até a pasta do projeto e execute o comando:
   ```
   npm install
   ```

#3. Configuração do banco de dados:
   Abra o MySQL Workbench e crie um banco de dados para a aplicação
   Execute o script SQL para gerar as tabelas necessárias:
   ```
   CREATE DATABASE cadastro_veiculos;

USE cadastro_veiculos;

CREATE TABLE veiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    ano INT,
    cor VARCHAR(20),
    placa VARCHAR(10)
);


-- 1. Adicionar um veículo
DELIMITER $$
CREATE PROCEDURE AdicionarVeiculo(IN pMarca VARCHAR(50), IN pModelo VARCHAR(50), IN pAno INT, IN pCor VARCHAR(20), IN pPlaca VARCHAR(10))
BEGIN
    INSERT INTO veiculos (marca, modelo, ano, cor, placa)
    VALUES (pMarca, pModelo, pAno, pCor, pPlaca);
END$$
DELIMITER ;

-- 2. Atualizar informações de um veículo
DELIMITER $$
CREATE PROCEDURE AtualizarVeiculo(IN pID INT, IN pMarca VARCHAR(50), IN pModelo VARCHAR(50), IN pAno INT, IN pCor VARCHAR(20), IN pPlaca VARCHAR(10))
BEGIN
    UPDATE veiculos
    SET marca = pMarca, modelo = pModelo, ano = pAno, cor = pCor, placa = pPlaca
    WHERE id = pID;
END$$
DELIMITER ;

-- 3. Deletar um veículo
DELIMITER $$
CREATE PROCEDURE DeletarVeiculo(IN pID INT)
BEGIN
    DELETE FROM veiculos WHERE id = pID;
END$$
DELIMITER ;

-- 4. Buscar um veículo por ID
DELIMITER $$
CREATE PROCEDURE BuscarVeiculoPorID(IN pID INT)
BEGIN
    SELECT * FROM veiculos WHERE id = pID;
END$$
DELIMITER ;

-- 5. Listar todos os veículos
DELIMITER $$
CREATE PROCEDURE ListarVeiculos()
BEGIN
    SELECT * FROM veiculos;
END$$
DELIMITER ;
```



#4. Inicie o servidor backend: Execute o seguinte comando no terminal:
```
   npm start
```

#5. Abra o frontend:
   - No Visual Studio Code, clique com o botão direito no arquivo index.html e selecione "Open with Live Server".
   - O Live Server abrirá seu navegador com o frontend da aplicação.

   
   ##Rotas da API:
   - GET /veiculos: Retorna todos os veículos cadastrados. (em desenvolvimento).
   - POST /veiculos: Cadastra um novo veículo.
   - PUT /veiculos/:id: Atualiza as informações de um veículo. (em desenvolvimento).
   - DELETE /veiculos/:id: Remove um veículo do sistema. (em desenvolvimento).

