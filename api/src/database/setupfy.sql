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
    CONSTRAINT USER_IMAGE FOREIGN KEY (user_id) REFERENCES users(id)
        on update cascade 
        on delete cascade 
);

create table posts(
    id int not null auto_increment primary key,
    description text not null,
    likes int not null default 0,
    user_id int not null,
    CONSTRAINT USER_POST FOREIGN KEY (user_id) REFERENCES users(id)
        on update cascade 
        on delete cascade
);

create table tags(
    id int not null auto_increment primary key,
    tag varchar(50) not null
);

create table tag_post(
    id int not null auto_increment primary key,
    post_id int not null,
    tag_id int not null,
    CONSTRAINT TAG_POST FOREIGN KEY (post_id) REFERENCES posts(id)
        on update cascade 
        on delete cascade,
    CONSTRAINT TAG_TAG FOREIGN KEY (tag_id) REFERENCES tags(id)
        on update cascade 
        on delete cascade
);

create table postImages(
    id int not null auto_increment primary key,
    name varchar(80) not null,
    url varchar(255) not null,
    post_id int not null,
    CONSTRAINT POST_IMAGE FOREIGN KEY (post_id) REFERENCES posts(id)
        on update cascade 
        on delete cascade 
);

create table comments(
    id int not null auto_increment primary key, 
    user_id int not null,
    post_id int not null,
    content text not null,
    CONSTRAINT USER_COMMENT FOREIGN KEY (user_id) REFERENCES users(id)
        on update cascade 
        on delete cascade,
    CONSTRAINT POST_COMMENT FOREIGN KEY (post_id) REFERENCES posts(id)
        on update cascade 
        on delete cascade
);

create table user_did_like_post(
    id int not null auto_increment primary key,
    user_id int not null,
    post_id int not null,
    CONSTRAINT USER_LIKE FOREIGN KEY (user_id) REFERENCES users(id)
        on update cascade 
        on delete cascade,
    CONSTRAINT POST_LIKE FOREIGN KEY (post_id) REFERENCES posts(id)
        on update cascade 
        on delete cascade
);