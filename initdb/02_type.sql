--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.4
-- Dumped by pg_dump version 9.6.4

-- Started on 2017-09-04 18:39:31 UTC

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
-- TOC entry 2231 (class 0 OID 0)
-- Dependencies: 187
-- Name: type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE type_id_seq OWNED BY type.id;


--
-- TOC entry 2105 (class 2604 OID 16401)
-- Name: type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY type ALTER COLUMN id SET DEFAULT nextval('type_id_seq'::regclass);


--
-- TOC entry 2226 (class 0 OID 16398)
-- Dependencies: 188
-- Data for Name: type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY type (id, en, ru, orig) FROM stdin;
0	Colony	Колония	Colony
1	Viceroyalty	Вице-королевство	Virreinato
2	State	Штат	State
3	Republic	Республика	Republic
4	Federal District	Федеральный округ	Federal District
5	Territory	Территория	Territory
6	Disputed territory	Спорная территория	Disputed territory
7	Colony	Колония	Колония
8	Kingdom	Королевство	Kingdom
9	France colony	Французская колония	Colonie française
10	Territory	Территория	Territorio
11	State	Штат	Estado
12	Federal District	Федеральный округ	Distrito Federal
13	Republic	Республика	Republica
14	Territory	Неогранизованная территория	Territorio
15	Territory	Неогранизованная территория	Territory
16	Territory	Нейтральная территория	Territory
17	Confederate State	Конфедеративный штат	Confederate State
18	Disputed State	Спорный штат	Disputed State
19	Confederate State	Штат	Confederate State
20	Confederate Territory	Конфедеративный штат	Confederate Territory
21	Disputed Territory	Спорная территория	Disputed Territory
22	Province	Провинция	Province
23	Terriitory	Территория	Territory
24	Territory	Территория	Territoire
25	Dominion	Доминион	Dominion
26	Repuplic	Республика	Republic
27	Territory	Штат	Territory
28	\N	\N	
\.


--
-- TOC entry 2232 (class 0 OID 0)
-- Dependencies: 187
-- Name: type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('type_id_seq', 27, false);


--
-- TOC entry 2107 (class 2606 OID 16403)
-- Name: type type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY type
    ADD CONSTRAINT type_pkey PRIMARY KEY (id);


-- Completed on 2017-09-04 18:39:31 UTC

--
-- PostgreSQL database dump complete
--

