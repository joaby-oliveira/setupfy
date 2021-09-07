DROP DATABASE IF EXISTS setupfy;

CREATE DATABASE IF NOT EXISTS setupfy;

use setupfy;

create table users(
    id int not null auto_increment primary key,
    userName varchar(50) not null,
    email varchar(120) not null,
    password varchar(120) not null
);

create table userImages(
    id int not null auto_increment primary key,
    name varchar(80) not null,
    url varchar(255) not null,
    user_id int not null,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

create table posts(
    id int not null auto_increment primary key,
    description text not null,
    likes int not null default 0,
    user_id int not null,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

create table tags(
    id int not null auto_increment primary key,
    tag varchar(50) not null
);

create table tag_post(
    id int not null auto_increment primary key,
    post_id int not null,
    tag_id int not null,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);

create table postImages(
    id int not null auto_increment primary key,
    name varchar(80) not null,
    url varchar(255) not null,
    post_id int not null,
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

create table comments(
    id int not null auto_increment primary key, 
    user_id int not null,
    post_id int not null,
    content text not null,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);