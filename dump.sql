create table usuarios (
  id serial primary key,
  nome varchar(255) not null,
  email varchar(255) unique not null,
  senha varchar(255) not null
);

create table categorias (
  id serial primary key,
  descricao varchar(255)
);

insert into categorias(descricao) values
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');


create table produtos (
  id serial primary key,
  descricao varchar(255) not null,
  quantidade_estoque integer not null,
  valor integer not null,
  categoria_id integer references categorias(id)
);


create table clientes (
  id serial primary key,
  nome varchar(255) not null,
  email varchar(255) unique not null,
  cpf varchar(255) unique not null,
  cep varchar(255),
  rua varchar(255),
  numero varchar(255),
  bairro varchar(255),
  cidade varchar(255),
  estado varchar(255) 
);