--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

-- Started on 2017-09-08 10:41:22 UTC

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
-- TOC entry 213 (class 1259 OID 16909)
-- Name: course_trace; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE course_trace (
    title text NOT NULL,
    course_timeline_id integer NOT NULL,
    start_year integer NOT NULL,
    end_year integer,
    path text NOT NULL,
    vehicle text,
    personsid text,
    description text NOT NULL,
    id integer NOT NULL
);


ALTER TABLE course_trace OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16907)
-- Name: course_trace_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE course_trace_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE course_trace_id_seq OWNER TO postgres;

--
-- TOC entry 2231 (class 0 OID 0)
-- Dependencies: 212
-- Name: course_trace_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE course_trace_id_seq OWNED BY course_trace.id;


--
-- TOC entry 2105 (class 2604 OID 16912)
-- Name: course_trace id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY course_trace ALTER COLUMN id SET DEFAULT nextval('course_trace_id_seq'::regclass);


--
-- TOC entry 2226 (class 0 OID 16909)
-- Dependencies: 213
-- Data for Name: course_trace; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY course_trace (title, course_timeline_id, start_year, end_year, path, vehicle, personsid, description, id) FROM stdin;
\.


--
-- TOC entry 2232 (class 0 OID 0)
-- Dependencies: 212
-- Name: course_trace_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('course_trace_id_seq', 1, false);


--
-- TOC entry 2107 (class 2606 OID 16920)
-- Name: course_trace course_trace_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY course_trace
    ADD CONSTRAINT course_trace_pkey PRIMARY KEY (id);


-- Completed on 2017-09-08 10:41:23 UTC

--
-- PostgreSQL database dump complete
--

