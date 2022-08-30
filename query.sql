--exersize Database Tasklist: my solution
create database sightings;

CREATE TABLE users (
    lastname varchar,
    firstname varchar,
    address varchar,
    city varchar,
    id int,
    PRIMARY KEY (id)
);
CREATE TABLE sightings (
    id int,
    datesighting date,
    typeanimal varchar,
    numberanimals int,
    description text,
    region varchar,
    userid int,
    PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES users (id)
);