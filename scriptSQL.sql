CREATE SEQUENCE users_seq;

CREATE TABLE users(
   id INT DEFAULT NEXTVAL ('users_seq') PRIMARY KEY,
   nome VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   createdAt TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP
);

CREATE SEQUENCE posts_seq;

CREATE TABLE posts(
   id INT DEFAULT NEXTVAL ('posts_seq') PRIMARY KEY,
   titulo VARCHAR(255) NOT NULL,
   conteudo TEXT NOT NULL,
   autorId INT NOT NULL,
   publicado BOOLEAN,
   createdAt TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY(autorId) REFERENCES users(id)
);

INSERT INTO users (nome, email)
VALUES 
   ('Amanda Costa', 'a@a.com'),
   ('Beatriz Martins', 'b@b.com'),
   ('Carla Souza', 'c@c.com');

INSERT INTO posts (titulo, conteudo, autorId, publicado)
VALUES 
   ('Iniciando em JS', 'Conteúdo para iniciantes', 1 , true),
   ('Dicas de React', 'Melhores práticas', 2 , true),
   ('Sintaxe CommonJS', 'Usando módulos', 3 , false);