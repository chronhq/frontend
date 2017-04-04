ALTER ROLE postgres WITH PASSWORD 'postgres';
CREATE DATABASE chronist WITH TEMPLATE = template0 OWNER = postgres;