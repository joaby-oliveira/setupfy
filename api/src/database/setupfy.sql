DROP DATABASE IF EXISTS setupfy;

CREATE DATABASE IF NOT EXISTS setupfy;

use setupfy;

create table users(
    id int not null auto_increment primary key,
    userName varchar(50) not null,
    email varchar(120) not null,
    password varchar(120) not null
);

create table posts(
    id int not null auto_increment primary key,
    cont text not null,
    img varchar(255),
    likes int not null
);

create table comments(
    id int not null auto_increment primary key, 
    user_id int not null,
    post_id int not null,
    cont text not null,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);