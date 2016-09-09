--create table for pantry inventory;
CREATE TABLE inventory (
id serial PRIMARY KEY,
category varchar(255),
item varchar(255)
);

--create table for recipe favorites;
CREATE TABLE query (
id serial PRIMARY KEY,
ingredient varchar(255)
);

--only use 5 category types for inventory category (produce, proteins, dairy, grains, other)
--40 items were inserted because I have no food.. condiments, spices, and other dry staples were not included since a query would yield a variety of results;
INSERT INTO inventory (category, item) VALUES
('category', 'item');
