--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

-- Started on 2017-04-10 15:17:54

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
-- TOC entry 202 (class 1259 OID 16827)
-- Name: surveys; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE surveys (
    id integer NOT NULL,
    start_date date DEFAULT ('now'::text)::date NOT NULL,
    end_date date DEFAULT ('now'::text)::date NOT NULL,
    name text,
    active boolean DEFAULT false NOT NULL,
    json json NOT NULL
);


ALTER TABLE surveys OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16825)
-- Name: surveys_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE surveys_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE surveys_id_seq OWNER TO postgres;

--
-- TOC entry 2187 (class 0 OID 0)
-- Dependencies: 201
-- Name: surveys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE surveys_id_seq OWNED BY surveys.id;


--
-- TOC entry 2058 (class 2604 OID 16830)
-- Name: surveys id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY surveys ALTER COLUMN id SET DEFAULT nextval('surveys_id_seq'::regclass);


--
-- TOC entry 2182 (class 0 OID 16827)
-- Dependencies: 202
-- Data for Name: surveys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY surveys (id, start_date, end_date, name, active, json) FROM stdin;
1	2017-04-10	2018-04-10	Базовый	t	[{"question":"Я","options":[{"type":"radio","value":"учитель"},{"type":"radio","value":"учащийся"},{"type":"radio","value":"научный работник"},{"type":"radio-text","value":"укажите свой вариант:"}]},{"question":"Подобный формат отображения данных для меня:","options":[{"type":"radio","value":"удобный"},{"type":"radio","value":"неудобный"},{"type":"text","value":"Я бы добавил"},{"type":"text","value":"Я бы убрал"}]},{"question":"Я считаю, что для моих нужд он:","options":[{"type":"radio","value":"подходит"},{"type":"radio","value":"не подходит"},{"type":"text","value":"Почему?"},{"type":"text","value":"Мне не хватает"}]},{"question":"Я думаю, что буду пользоваться ресурсом","options":[{"type":"radio","value":"регулярно"},{"type":"radio","value":"время от времени"},{"type":"radio","value":"больше никогда"}]},{"question":"Я рассматриваю возможность оформления платной подписки на сервис:","options":[{"type":"radio","value":"да"},{"type":"radio","value":"нет"}]},{"question":"Я уже использую подобный сервис:","options":[{"type":"radio","value":"да"},{"type":"radio","value":"нет"}]},{"question":"Мне бы хотелось показать сервис знакомым или коллегам","noSeparator":true,"options":[{"type":"radio","value":"да"},{"type":"radio","value":"нет"}]},{"question":"В качестве: ","options":[{"type":"radio","value":"развлечения"},{"type":"radio","value":"рабочего процесса"},{"type":"radio-text","value":"свой вариант"}]},{"question":"Вы всё делаете:","options":[{"type":"radio","value":"правильно"},{"type":"radio-text","value":"неправильно, но я знаю как лучше"}]},{"question":"Я хочу получать","options":[{"type":"radio","value":"только новости про обновление сервиса"},{"type":"radio","value":"новые опросы, я помогу сделать сервис лучше"},{"type":"radio","value":"не хочу получать вашу рассылку"}]},{"question":"Пожалуйста, оставьте свой контакт для связи.","options":[{"type":"text"}]}]
\.


--
-- TOC entry 2188 (class 0 OID 0)
-- Dependencies: 201
-- Name: surveys_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('surveys_id_seq', 1, true);


--
-- TOC entry 2063 (class 2606 OID 16838)
-- Name: surveys surveys_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY surveys
    ADD CONSTRAINT surveys_pkey PRIMARY KEY (id);


-- Completed on 2017-04-10 15:17:55

--
-- PostgreSQL database dump complete
--

