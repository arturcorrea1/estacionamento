create database cadastro_carros;
use cadastro_carros;

create table usuario(
	placa varchar(7) primary key unique,
    dono varchar(45),
    cpf varchar(45),
    modelo varchar(45),
    vaga enum('A1','A2','A3','B1','B2','B3','C1','C2','C3'),
    tipo enum('deficiente', 'gestante', 'padrão') default ('padrão')
);