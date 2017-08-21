--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.4
-- Dumped by pg_dump version 9.6.4

-- Started on 2017-08-21 13:47:27 UTC

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
-- TOC entry 217 (class 1259 OID 16892)
-- Name: course_timeline; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE course_timeline (
    year integer,
    tick integer,
    courseid integer,
    id integer NOT NULL
);


ALTER TABLE course_timeline OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16883)
-- Name: course_timeline_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE course_timeline_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE course_timeline_id_seq OWNER TO postgres;

--
-- TOC entry 2231 (class 0 OID 0)
-- Dependencies: 215
-- Name: course_timeline_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE course_timeline_id_seq OWNED BY course_timeline.id;


--
-- TOC entry 2105 (class 2604 OID 16895)
-- Name: course_timeline id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY course_timeline ALTER COLUMN id SET DEFAULT nextval('course_timeline_id_seq'::regclass);


--
-- TOC entry 2226 (class 0 OID 16892)
-- Dependencies: 217
-- Data for Name: course_timeline; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY course_timeline (year, tick, courseid, id) FROM stdin;
1604	1	3	1
1618	2	3	2
1633	3	3	3
1634	4	3	4
1643	6	3	5
1639	5	3	6
1643	7	3	7
1647	9	3	8
1644	8	3	9
1697	12	3	10
1711	13	3	11
1719	15	3	12
1713	14	3	13
1721	16	3	14
1669	10	3	15
1688	11	3	16
1738	17	3	17
1739	18	3	18
1771	20	3	19
1769	19	3	20
1773	21	3	21
1774	22	3	22
1775	23	3	23
1778	24	3	24
1779	25	3	25
1785	26	3	26
1786	27	3	27
1787	28	3	28
1789	29	3	29
1792	30	3	30
1793	31	3	31
1795	32	3	32
1796	33	3	33
1797	34	3	34
1799	35	3	35
1800	36	3	36
1802	37	3	37
1807	38	3	38
1809	39	3	39
1821	40	3	40
1854	41	3	41
1855	42	3	42
1875	43	3	43
1905	44	3	44
1945	45	3	45
\.


--
-- TOC entry 2232 (class 0 OID 0)
-- Dependencies: 215
-- Name: course_timeline_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('course_timeline_id_seq', 45, true);


--
-- TOC entry 2107 (class 2606 OID 16898)
-- Name: course_timeline course_timeline_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY course_timeline
    ADD CONSTRAINT course_timeline_pkey PRIMARY KEY (id);


-- Completed on 2017-08-21 13:47:27 UTC

--
-- PostgreSQL database dump complete
--

