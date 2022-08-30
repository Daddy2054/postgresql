--exersize database tasklist given solution
CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar,
    email varchar
);

CREATE TABLE animals (
    id serial PRIMARY KEY,
    region_id REFERENCES regions (id),
    user_id REFERENCES users (id),
    individuals integer,
    sighting_date date,
    description text
);

