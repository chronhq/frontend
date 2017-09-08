--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

-- Started on 2017-09-08 11:20:09 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 206 (class 1259 OID 16863)
-- Name: course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE course (
    name text NOT NULL,
    author text NOT NULL,
    description text NOT NULL,
    "сreated" timestamp with time zone NOT NULL,
    edited timestamp with time zone NOT NULL,
    active boolean NOT NULL,
    id integer NOT NULL,
    url text NOT NULL,
    ui integer NOT NULL,
    projection json NOT NULL,
    img text
);


ALTER TABLE course OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16861)
-- Name: course_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE course_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE course_id_seq OWNER TO postgres;

--
-- TOC entry 2197 (class 0 OID 0)
-- Dependencies: 205
-- Name: course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE course_id_seq OWNED BY course.id;


--
-- TOC entry 2071 (class 2604 OID 16866)
-- Name: course id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY course ALTER COLUMN id SET DEFAULT nextval('course_id_seq'::regclass);


--
-- TOC entry 2192 (class 0 OID 16863)
-- Dependencies: 206
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO course VALUES ('Интерактивная карта мира', 'Хронист', 'Изменение политических границ и изобретения в Северной Америке с XVIII - XXIвв. (Дополняется)', '2017-08-16 09:59:08.23+00', '2017-08-16 09:59:08.23+00', true, 0, 'world', 0, '{"clip": [[-180, 90], [180, -90]], "rotate":  [0, 0, 0], "center": [0, 0], "name": "Equirectangular"}', NULL);
INSERT INTO course VALUES ('Testcourse', 'Хронист', 'This is test course', '2017-08-16 09:59:08.23+00', '2017-08-16 09:59:08.23+00', true, 1, 'testcourse', 0, '{"clip": [[-180, 90], [180, -90]], "rotate":  [0, 0, 0], "center": [0, 0], "name": "Equirectangular"}', NULL);
INSERT INTO course VALUES ('Yet another course', 'Хронист', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', '2017-08-17 10:42:57.414+00', '2017-08-17 10:42:57.414+00', false, 2, 'loremipsum', 0, '{"clip": [[-180, 90], [180, -90]], "rotate":  [0, 0, 0], "center": [0, 0], "name": "Equirectangular"}', NULL);
INSERT INTO course VALUES ('История российско-японских отношений в XVII - XXвв.', 'Щепкин В.В.', 'Русские исследования Дальнего Востока и Сахалина. Завоевание японцами северных провинций и их отношения с айнами.', '2017-08-17 10:42:57.418+00', '2017-08-17 10:42:57.418+00', true, 3, 'ainu', 1, '{"clip": [[110, 65], [170, 35]], "rotate":  [-15, -1, 3], "center": [143, 47], "name": "Mercator"}', NULL);


--
-- TOC entry 2198 (class 0 OID 0)
-- Dependencies: 205
-- Name: course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('course_id_seq', 4, false);


--
-- TOC entry 2073 (class 2606 OID 16871)
-- Name: course course_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY course
    ADD CONSTRAINT course_pkey PRIMARY KEY (id);


-- Completed on 2017-09-08 11:20:09 UTC

--
-- PostgreSQL database dump complete
--

