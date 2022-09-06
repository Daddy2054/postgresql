create TABLE products (
    id serial primary key,
    title varchar not null,
    price INT not null default 0
);