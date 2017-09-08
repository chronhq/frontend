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
-- TOC entry 186 (class 1259 OID 16387)
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE admin (
    id integer NOT NULL,
    en character varying(255),
    ru character varying(255),
    sr_adm0_a3 character varying(10)
);


ALTER TABLE admin OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 16385)
-- Name: admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE admin_id_seq OWNER TO postgres;

--
-- TOC entry 2197 (class 0 OID 0)
-- Dependencies: 185
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE admin_id_seq OWNED BY admin.id;


--
-- TOC entry 2071 (class 2604 OID 16390)
-- Name: admin id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY admin ALTER COLUMN id SET DEFAULT nextval('admin_id_seq'::regclass);


--
-- TOC entry 2192 (class 0 OID 16387)
-- Dependencies: 186
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO admin VALUES (0, 'United Kingdom', 'Соедиденное Королевство', 'UK');
INSERT INTO admin VALUES (1, 'Spanish Empire', 'Испанская империя', 'ESP');
INSERT INTO admin VALUES (2, 'United States of America', 'Соединённые Штаты Америки', 'USA');
INSERT INTO admin VALUES (3, 'Vermont Republic', 'Республика Вермонт', 'VRT');
INSERT INTO admin VALUES (4, '', '', '');
INSERT INTO admin VALUES (5, 'Russian Empire', 'Российская Империя', 'TRE');
INSERT INTO admin VALUES (6, 'Kingdom of Hawaii', 'Королевство Гавайи', 'KOH');
INSERT INTO admin VALUES (7, 'France', 'Франция', 'FRA');
INSERT INTO admin VALUES (8, 'Mexico', 'Мексика', 'MEX');
INSERT INTO admin VALUES (9, 'Republic of Texas', 'Республика Техас', 'ROT');
INSERT INTO admin VALUES (10, 'Republic of the Rio Grande', 'Республика Рио Гранде', 'RRG');
INSERT INTO admin VALUES (11, 'Republic of Yucatan', 'Республика Юкатан', 'YU');
INSERT INTO admin VALUES (12, 'Confederate States of America', 'Конфедеративные Штаты Америки', 'CSA');
INSERT INTO admin VALUES (13, 'United States of America', 'Соединённые Штаты Америки', 'CSA');
INSERT INTO admin VALUES (14, 'Canada', 'Канада', 'CAN');
INSERT INTO admin VALUES (15, '', '', 'NaN');
INSERT INTO admin VALUES (16, 'United Kingdom', 'Британская Империя', 'TBE');
INSERT INTO admin VALUES (17, 'Republic of Hawaii', 'Республика Гавайи', 'ROH');
INSERT INTO admin VALUES (18, 'The Dominion of Newfoundland', 'Доминион Ньюфаундленд', 'DON');
INSERT INTO admin VALUES (19, 'Ainu Lands', 'Земли Айнов', NULL);
INSERT INTO admin VALUES (20, 'Japan', 'Япония', NULL);
INSERT INTO admin VALUES (21, 'Russia', 'Россия', NULL);
INSERT INTO admin VALUES (22, 'Neutral territory', 'Нейтральная территория', NULL);
INSERT INTO admin VALUES (23, 'Japan', 'Земли Айнов', NULL);


--
-- TOC entry 2198 (class 0 OID 0)
-- Dependencies: 185
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('admin_id_seq', 24, false);


--
-- TOC entry 2073 (class 2606 OID 16395)
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


-- Completed on 2017-09-08 11:20:06 UTC

--
-- PostgreSQL database dump complete
--

