--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

-- Started on 2017-04-05 18:02:48

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
-- TOC entry 192 (class 1259 OID 16417)
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
-- TOC entry 191 (class 1259 OID 16415)
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
-- TOC entry 2172 (class 0 OID 0)
-- Dependencies: 191
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE admin_id_seq OWNED BY admin.id;


--
-- TOC entry 2046 (class 2604 OID 16420)
-- Name: admin id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY admin ALTER COLUMN id SET DEFAULT nextval('admin_id_seq'::regclass);


--
-- TOC entry 2167 (class 0 OID 16417)
-- Dependencies: 192
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY admin (id, en, ru, sr_adm0_a3) FROM stdin;
0	United Kingdom	Объедиденное Королевство	UK
1	Spanish Empire	Испанская империя	ESP
2	United States of America	Соединённые Штаты Америки	USA
3	Vermont Republic	Республика Вермонт	VRT
4			
5	Russian Empire	Российская Империя	TRE
6	Kingdom of Hawaii	Королевство Гавайи	KOH
7	France	Франция	FRA
8	Mexico	Мексика	MEX
9	Republic of Texas	Республика Техас	ROT
10	Republic of the Rio Grande	Республика Рио Гранде	RRG
11	Republic of Yucatan	Республика Юкатан	YU
12	Confederate States of America	Конфедеративные Штаты Америки	CSA
13	United States of America	Соединённые Штаты Америки	CSA
14	Canada	Канада	CAN
15			NaN
16	United Kingdom	Объедиденное Королевство	TBE
17	Republic of Hawaii	Республика Гавайи	ROH
18	The Dominion of Newfoundland	Доминион Ньюфаундленд	DON
\.


--
-- TOC entry 2173 (class 0 OID 0)
-- Dependencies: 191
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('admin_id_seq', 1, false);


--
-- TOC entry 2048 (class 2606 OID 16425)
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


-- Completed on 2017-04-05 18:02:48

--
-- PostgreSQL database dump complete
--

