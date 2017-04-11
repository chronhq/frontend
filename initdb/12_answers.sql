--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

-- Started on 2017-04-11 13:59:37

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
-- TOC entry 203 (class 1259 OID 16833)
-- Name: answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE answers (
    id integer NOT NULL,
    survey integer,
    "timestamp" timestamp without time zone DEFAULT ('now'::text)::date NOT NULL,
    answer json NOT NULL
);


ALTER TABLE answers OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16840)
-- Name: answers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE answers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE answers_id_seq OWNER TO postgres;

--
-- TOC entry 2186 (class 0 OID 0)
-- Dependencies: 204
-- Name: answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE answers_id_seq OWNED BY answers.id;


--
-- TOC entry 2059 (class 2604 OID 16842)
-- Name: answers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY answers ALTER COLUMN id SET DEFAULT nextval('answers_id_seq'::regclass);


--
-- TOC entry 2180 (class 0 OID 16833)
-- Dependencies: 203
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY answers (id, survey, "timestamp", answer) FROM stdin;
\.


--
-- TOC entry 2187 (class 0 OID 0)
-- Dependencies: 204
-- Name: answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('answers_id_seq', 0, true);


--
-- TOC entry 2061 (class 2606 OID 16844)
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- TOC entry 2062 (class 2606 OID 16845)
-- Name: answers answers_survey_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY answers
    ADD CONSTRAINT answers_survey_fkey FOREIGN KEY (survey) REFERENCES surveys(id);


-- Completed on 2017-04-11 13:59:37

--
-- PostgreSQL database dump complete
--

