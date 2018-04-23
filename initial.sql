create table if not exists users (
	id serial primary key,
	cpf char(11) not null,
	name text not null,
	date_of_birth date,
	sex char(1)
);

insert into users(cpf, name, date_of_birth, sex) values('33526469881', 'Igor Ming de Mesquita', '03/18/1993', 'm');
insert into users(cpf, name, date_of_birth, sex) values('87047387722', 'Maurício Fonseca da Silva', '01/02/1994', 'm');
insert into users(cpf, name, date_of_birth, sex) values('64231268444', 'Jéssica Feitosa', '10/22/1988', 'f');
insert into users(cpf, name, date_of_birth, sex) values('42560975971', 'Ramon Cardoso dos Santos', '12/02/1978', 'm');
insert into users(cpf, name, date_of_birth, sex) values('64231268444', 'Rebeca Sales Almeida', '10/22/1998', 'f');
