--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

-- Started on 2017-09-08 11:20:06 UTC

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
-- TOC entry 188 (class 1259 OID 16398)
-- Name: type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE type (
    id integer NOT NULL,
    en character varying(50),
    ru character varying(50),
    orig character varying(50)
);


ALTER TABLE type OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 16396)
-- Name: type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE type_id_seq OWNER TO postgres;

--
-- TOC entry 2197 (class 0 OID 0)
-- Dependencies: 187
-- Name: type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE type_id_seq OWNED BY type.id;


--
-- TOC entry 2071 (class 2604 OID 16401)
-- Name: type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY type ALTER COLUMN id SET DEFAULT nextval('type_id_seq'::regclass);


--
-- TOC entry 2192 (class 0 OID 16398)
-- Dependencies: 188
-- Data for Name: type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO type VALUES (0, 'Colony', 'Колония', 'Colony');
INSERT INTO type VALUES (1, 'Viceroyalty', 'Вице-королевство', 'Virreinato');
INSERT INTO type VALUES (2, 'State', 'Штат', 'State');
INSERT INTO type VALUES (3, 'Republic', 'Республика', 'Republic');
INSERT INTO type VALUES (4, 'Federal District', 'Федеральный округ', 'Federal District');
INSERT INTO type VALUES (5, 'Territory', 'Территория', 'Territory');
INSERT INTO type VALUES (6, 'Disputed territory', 'Спорная территория', 'Disputed territory');
INSERT INTO type VALUES (7, 'Colony', 'Колония', 'Колония');
INSERT INTO type VALUES (8, 'Kingdom', 'Королевство', 'Kingdom');
INSERT INTO type VALUES (9, 'France colony', 'Французская колония', 'Colonie française');
INSERT INTO type VALUES (10, 'Territory', 'Территория', 'Territorio');
INSERT INTO type VALUES (11, 'State', 'Штат', 'Estado');
INSERT INTO type VALUES (12, 'Federal District', 'Федеральный округ', 'Distrito Federal');
INSERT INTO type VALUES (13, 'Republic', 'Республика', 'Republica');
INSERT INTO type VALUES (14, 'Territory', 'Неогранизованная территория', 'Territorio');
INSERT INTO type VALUES (15, 'Territory', 'Неогранизованная территория', 'Territory');
INSERT INTO type VALUES (16, 'Territory', 'Нейтральная территория', 'Territory');
INSERT INTO type VALUES (17, 'Confederate State', 'Конфедеративный штат', 'Confederate State');
INSERT INTO type VALUES (18, 'Disputed State', 'Спорный штат', 'Disputed State');
INSERT INTO type VALUES (19, 'Confederate State', 'Штат', 'Confederate State');
INSERT INTO type VALUES (20, 'Confederate Territory', 'Конфедеративный штат', 'Confederate Territory');
INSERT INTO type VALUES (21, 'Disputed Territory', 'Спорная территория', 'Disputed Territory');
INSERT INTO type VALUES (22, 'Province', 'Провинция', 'Province');
INSERT INTO type VALUES (23, 'Terriitory', 'Территория', 'Territory');
INSERT INTO type VALUES (24, 'Territory', 'Территория', 'Territoire');
INSERT INTO type VALUES (25, 'Dominion', 'Доминион', 'Dominion');
INSERT INTO type VALUES (26, 'Repuplic', 'Республика', 'Republic');
INSERT INTO type VALUES (27, 'Territory', 'Штат', 'Territory');
INSERT INTO type VALUES (28, NULL, NULL, '');


--
-- TOC entry 2198 (class 0 OID 0)
-- Dependencies: 187
-- Name: type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('type_id_seq', 29, false);


--
-- TOC entry 2073 (class 2606 OID 16403)
-- Name: type type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY type
    ADD CONSTRAINT type_pkey PRIMARY KEY (id);


-- Completed on 2017-09-08 11:20:06 UTC

--
-- PostgreSQL database dump complete
--

