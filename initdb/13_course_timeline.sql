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
-- TOC entry 209 (class 1259 OID 16883)
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
-- TOC entry 210 (class 1259 OID 16886)
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
-- TOC entry 2197 (class 0 OID 0)
-- Dependencies: 210
-- Name: course_timeline_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE course_timeline_id_seq OWNED BY course_timeline.id;


--
-- TOC entry 2071 (class 2604 OID 16888)
-- Name: course_timeline id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY course_timeline ALTER COLUMN id SET DEFAULT nextval('course_timeline_id_seq'::regclass);


--
-- TOC entry 2191 (class 0 OID 16883)
-- Dependencies: 209
-- Data for Name: course_timeline; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO course_timeline VALUES (1604, 1, 3, 1);
INSERT INTO course_timeline VALUES (1618, 2, 3, 2);
INSERT INTO course_timeline VALUES (1633, 3, 3, 3);
INSERT INTO course_timeline VALUES (1634, 4, 3, 4);
INSERT INTO course_timeline VALUES (1643, 6, 3, 5);
INSERT INTO course_timeline VALUES (1639, 5, 3, 6);
INSERT INTO course_timeline VALUES (1643, 7, 3, 7);
INSERT INTO course_timeline VALUES (1647, 9, 3, 8);
INSERT INTO course_timeline VALUES (1644, 8, 3, 9);
INSERT INTO course_timeline VALUES (1697, 12, 3, 10);
INSERT INTO course_timeline VALUES (1711, 13, 3, 11);
INSERT INTO course_timeline VALUES (1719, 15, 3, 12);
INSERT INTO course_timeline VALUES (1713, 14, 3, 13);
INSERT INTO course_timeline VALUES (1721, 16, 3, 14);
INSERT INTO course_timeline VALUES (1669, 10, 3, 15);
INSERT INTO course_timeline VALUES (1688, 11, 3, 16);
INSERT INTO course_timeline VALUES (1738, 17, 3, 17);
INSERT INTO course_timeline VALUES (1739, 18, 3, 18);
INSERT INTO course_timeline VALUES (1771, 20, 3, 19);
INSERT INTO course_timeline VALUES (1769, 19, 3, 20);
INSERT INTO course_timeline VALUES (1773, 21, 3, 21);
INSERT INTO course_timeline VALUES (1774, 22, 3, 22);
INSERT INTO course_timeline VALUES (1775, 23, 3, 23);
INSERT INTO course_timeline VALUES (1778, 24, 3, 24);
INSERT INTO course_timeline VALUES (1779, 25, 3, 25);
INSERT INTO course_timeline VALUES (1785, 26, 3, 26);
INSERT INTO course_timeline VALUES (1786, 27, 3, 27);
INSERT INTO course_timeline VALUES (1787, 28, 3, 28);
INSERT INTO course_timeline VALUES (1789, 29, 3, 29);
INSERT INTO course_timeline VALUES (1792, 30, 3, 30);
INSERT INTO course_timeline VALUES (1793, 31, 3, 31);
INSERT INTO course_timeline VALUES (1795, 32, 3, 32);
INSERT INTO course_timeline VALUES (1796, 33, 3, 33);
INSERT INTO course_timeline VALUES (1797, 34, 3, 34);
INSERT INTO course_timeline VALUES (1799, 35, 3, 35);
INSERT INTO course_timeline VALUES (1800, 36, 3, 36);
INSERT INTO course_timeline VALUES (1802, 37, 3, 37);
INSERT INTO course_timeline VALUES (1807, 38, 3, 38);
INSERT INTO course_timeline VALUES (1809, 39, 3, 39);
INSERT INTO course_timeline VALUES (1821, 40, 3, 40);
INSERT INTO course_timeline VALUES (1854, 41, 3, 41);
INSERT INTO course_timeline VALUES (1855, 42, 3, 42);
INSERT INTO course_timeline VALUES (1875, 43, 3, 43);
INSERT INTO course_timeline VALUES (1905, 44, 3, 44);
INSERT INTO course_timeline VALUES (1945, 45, 3, 45);


--
-- TOC entry 2198 (class 0 OID 0)
-- Dependencies: 210
-- Name: course_timeline_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('course_timeline_id_seq', 46, false);


--
-- TOC entry 2073 (class 2606 OID 16890)
-- Name: course_timeline course_timeline_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY course_timeline
    ADD CONSTRAINT course_timeline_pkey PRIMARY KEY (id);


-- Completed on 2017-09-08 11:20:10 UTC

--
-- PostgreSQL database dump complete
--

