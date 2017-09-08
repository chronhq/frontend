--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

-- Started on 2017-09-08 11:20:07 UTC

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
-- TOC entry 192 (class 1259 OID 16760)
-- Name: properties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE properties (
    id integer NOT NULL,
    admin integer,
    disputed character varying(50),
    color character varying(255) NOT NULL,
    name character varying(255),
    nameru character varying(255),
    type integer,
    wikipedia character varying(255)
);


ALTER TABLE properties OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 16758)
-- Name: properties_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE properties_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE properties_id_seq OWNER TO postgres;

--
-- TOC entry 2199 (class 0 OID 0)
-- Dependencies: 191
-- Name: properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE properties_id_seq OWNED BY properties.id;


--
-- TOC entry 2071 (class 2604 OID 16763)
-- Name: properties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY properties ALTER COLUMN id SET DEFAULT nextval('properties_id_seq'::regclass);


--
-- TOC entry 2194 (class 0 OID 16760)
-- Dependencies: 192
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO properties VALUES (4, 2, '', '#bdd7e7', 'Massachusetts', 'Массачусетс', 2, 'http://en.wikipedia.org/wiki/Massachusetts');
INSERT INTO properties VALUES (5, 2, '', '#bdd7e7', 'Connecticut', 'Коннектикут', 2, 'http://en.wikipedia.org/wiki/Connecticut');
INSERT INTO properties VALUES (6, 2, '', '#bdd7e7', 'New Hampshire', 'Нью-Гэмпшир', 2, 'http://en.wikipedia.org/wiki/New_Hampshire');
INSERT INTO properties VALUES (7, 2, '', '#bdd7e7', 'Rhode Island', 'Род-Айленд', 2, 'http://en.wikipedia.org/wiki/Rhode_Island');
INSERT INTO properties VALUES (9, 2, '', '#bdd7e7', 'Virginia', 'Виргиния', 2, 'http://en.wikipedia.org/wiki/Virginia');
INSERT INTO properties VALUES (10, 2, '', '#bdd7e7', 'Delaware', 'Делавэр', 2, 'http://en.wikipedia.org/wiki/Delaware');
INSERT INTO properties VALUES (12, 2, '', '#bdd7e7', 'Maryland', 'Мэриленд', 2, 'http://en.wikipedia.org/wiki/Maryland');
INSERT INTO properties VALUES (13, 2, '', '#bdd7e7', 'New Jersey', 'Нью-Джерси', 2, 'http://en.wikipedia.org/wiki/New_Jersey');
INSERT INTO properties VALUES (14, 2, '', '#bdd7e7', 'New York', 'Нью-Йорк', 2, 'http://en.wikipedia.org/wiki/New_York');
INSERT INTO properties VALUES (15, 2, '', '#bdd7e7', 'Pennsylvania', 'Пенсильвания', 2, 'http://en.wikipedia.org/wiki/Pennsylvania');
INSERT INTO properties VALUES (21, 2, '', '#bdd7e7', 'Georgia', 'Джорджия', 2, 'http://en.wikipedia.org/wiki/Georgia_(U.S._state)');
INSERT INTO properties VALUES (22, 2, '', '#bdd7e7', 'South Carolina', 'Южная Каролина', 2, 'http://en.wikipedia.org/wiki/South_Carolina');
INSERT INTO properties VALUES (57, 4, '#ffffcc;#6baed6;#d7b5d8', '#111111', 'Disputed land', 'Спорные земли', 6, '');
INSERT INTO properties VALUES (62, 4, '#ffffcc;#d7b5d8', '#111111', 'Disputed land', 'Спорные земли', 6, '');
INSERT INTO properties VALUES (16, 2, '', '#6baed6', 'District of Maine', 'Округ Мэн', 5, 'https://en.wikipedia.org/wiki/District_of_Maine');
INSERT INTO properties VALUES (27, 2, '', '#6baed6', 'Northwest territory', 'Северо-западная территория', 5, 'https://en.wikipedia.org/wiki/Northwest_Territory');
INSERT INTO properties VALUES (30, 2, '', '#6baed6', 'Southwest Territory', 'Юго-западная Территория', 5, 'http://en.wikipedia.org/wiki/Tennessee');
INSERT INTO properties VALUES (38, 2, '', '#6baed6', 'Mississippi', 'Миссисипи', 5, 'http://en.wikipedia.org/wiki/Mississippi');
INSERT INTO properties VALUES (40, 2, '', '#6baed6', 'unorganized territory', 'неогранизованная территор', 5, '');
INSERT INTO properties VALUES (41, 2, '', '#6baed6', 'Indiana', 'Индиана', 5, 'http://en.wikipedia.org/wiki/Indiana');
INSERT INTO properties VALUES (44, 2, '', '#6baed6', 'District of Louisiana', 'Округ Луизиана', 5, 'https://en.wikipedia.org/wiki/District_of_Louisiana');
INSERT INTO properties VALUES (47, 2, '', '#6baed6', 'Louisiana', 'Луизиана', 5, 'http://en.wikipedia.org/wiki/Missouri');
INSERT INTO properties VALUES (48, 2, '', '#6baed6', 'Territory of Orleans', 'Орлеанская территория', 5, 'https://en.wikipedia.org/wiki/Louisiana');
INSERT INTO properties VALUES (49, 2, '', '#6baed6', 'Michigan', 'Мичиган', 5, 'http://en.wikipedia.org/wiki/Michigan');
INSERT INTO properties VALUES (50, 2, '', '#6baed6', 'Illinois', 'Иллинойс', 5, 'http://en.wikipedia.org/wiki/Illinois');
INSERT INTO properties VALUES (51, 2, '', '#6baed6', 'Missouri', 'Миссури', 5, 'http://en.wikipedia.org/wiki/Missouri');
INSERT INTO properties VALUES (54, 2, '', '#6baed6', 'Alabama', 'Алабама', 5, 'http://en.wikipedia.org/wiki/Alabama');
INSERT INTO properties VALUES (58, 2, '', '#6baed6', 'Arkansas', 'Арканзас', 5, 'http://en.wikipedia.org/wiki/Arkansas');
INSERT INTO properties VALUES (60, 2, '', '#6baed6', 'Florida', 'Флорида', 5, 'http://en.wikipedia.org/wiki/Florida');
INSERT INTO properties VALUES (63, 2, '', '#6baed6', 'unorganized territory', 'неогранизованная тер', 5, '');
INSERT INTO properties VALUES (11, 2, '', '#08519c', 'District of Columbia', 'округ Колумбия', 4, 'http://en.wikipedia.org/wiki/Washington,_D.C.');
INSERT INTO properties VALUES (29, 5, '', '#fbb4b9', 'Russian America', 'Русская Америкa', 7, 'https://en.wikipedia.org/wiki/Russian_America');
INSERT INTO properties VALUES (3, 1, '', '#d7b5d8', 'New Spain', 'Новая Испания', 1, 'https://en.wikipedia.org/wiki/New_Spain');
INSERT INTO properties VALUES (19, 1, '', '#d7b5d8', 'Louisiana', 'Луизиана', 0, 'https://en.wikipedia.org/wiki/Louisiana_(New_France)');
INSERT INTO properties VALUES (20, 1, '', '#d7b5d8', 'La Florida', 'Испанская Флорида', 5, 'https://en.wikipedia.org/wiki/Spanish_Florida');
INSERT INTO properties VALUES (26, 1, '', '#d7b5d8', 'Republic of West Florida', 'Западная Флорида', 5, 'https://en.wikipedia.org/wiki/Republic_of_West_Florida');
INSERT INTO properties VALUES (39, 7, '', '#d7b5d8', 'La Louisiane', 'Округ Луизиана', 9, 'https://en.wikipedia.org/wiki/Louisiana_(New_France)');
INSERT INTO properties VALUES (8, 3, '', '#253494', 'Vermont', 'Республика Вермонт', 3, 'https://en.wikipedia.org/wiki/Vermont_Republic');
INSERT INTO properties VALUES (35, 6, '', '#fe9929', 'Hawaii', 'Гавайи', 8, 'https://en.wikipedia.org/wiki/Kingdom_of_Hawaii');
INSERT INTO properties VALUES (24, 4, '#ffffcc;#6baed6', '#111111', 'Disputed land', 'Спорные земли', 6, '');
INSERT INTO properties VALUES (28, 4, '#bdd7e7;#d7b5d8', '#111111', 'Disputed land', 'Спорные земли', 6, '');
INSERT INTO properties VALUES (31, 4, '#ffffcc;#d7b5d8', '#111111', 'Disputed land', 'Спорные земли', 6, '');
INSERT INTO properties VALUES (45, 4, '#ffffcc;#fbb4b9', '#111111', 'Disputed land', 'Спорные земли', 6, '');
INSERT INTO properties VALUES (65, 8, '', '#edf8e9', 'Baja California', 'Нижняя Калифорния', 10, 'https://en.wikipedia.org/wiki/Baja_California');
INSERT INTO properties VALUES (70, 8, '', '#edf8e9', 'Colima', 'Колима', 10, '');
INSERT INTO properties VALUES (76, 8, '', '#edf8e9', 'Tlaxcala', 'Тласкала', 10, '');
INSERT INTO properties VALUES (66, 8, '', '#bae4b3', 'Durango', 'Дуранго', 11, '');
INSERT INTO properties VALUES (67, 8, '', '#bae4b3', 'Sonora y Sinaloa', 'Сонора и Синалоа', 11, 'https://en.wikipedia.org/wiki/Estado_de_Occidente');
INSERT INTO properties VALUES (68, 8, '', '#bae4b3', 'Zacatecas', 'Сакатекас', 11, '');
INSERT INTO properties VALUES (69, 8, '', '#bae4b3', 'San Luis Potosi', 'Сан-Луис-Потоси', 11, '');
INSERT INTO properties VALUES (71, 8, '', '#bae4b3', 'Jalisco', 'Халиско', 11, '');
INSERT INTO properties VALUES (72, 8, '', '#bae4b3', 'Michoacаn', 'Мичоакан', 11, '');
INSERT INTO properties VALUES (73, 8, '', '#bae4b3', 'Oaxaca', 'Оахака', 11, '');
INSERT INTO properties VALUES (74, 8, '', '#bae4b3', 'Puebla', 'Пуэбла', 11, '');
INSERT INTO properties VALUES (75, 8, '', '#bae4b3', 'Tabasco', 'Табаско', 11, '');
INSERT INTO properties VALUES (79, 8, '', '#bae4b3', 'Mexico', 'Мехико', 11, '');
INSERT INTO properties VALUES (77, 8, '', '#006d2c', 'Distrito Federal', 'Федеральный округ', 12, '');
INSERT INTO properties VALUES (95, 2, '', '#bdd7e7', 'Arkansas', 'Арканзас', 2, 'http://en.wikipedia.org/wiki/Arkansas');
INSERT INTO properties VALUES (100, 2, '', '#bdd7e7', 'Michigan', 'Мичиган', 2, 'http://en.wikipedia.org/wiki/Michigan');
INSERT INTO properties VALUES (105, 2, '', '#bdd7e7', 'Florida', 'Флорида', 2, 'http://en.wikipedia.org/wiki/Florida');
INSERT INTO properties VALUES (106, 2, '', '#bdd7e7', 'Texas', 'Техас', 2, 'http://en.wikipedia.org/wiki/Texas');
INSERT INTO properties VALUES (107, 2, '', '#bdd7e7', 'Iowa', 'Айова', 2, 'http://en.wikipedia.org/wiki/Iowa');
INSERT INTO properties VALUES (111, 2, '', '#bdd7e7', 'Wisconsin', 'Висконсин', 2, 'http://en.wikipedia.org/wiki/Wisconsin');
INSERT INTO properties VALUES (114, 2, '', '#bdd7e7', 'California', 'Калифорния', 2, 'http://en.wikipedia.org/wiki/California');
INSERT INTO properties VALUES (130, 2, '', '#bdd7e7', 'Minnesota', 'Миннесота', 2, 'http://en.wikipedia.org/wiki/Minnesota');
INSERT INTO properties VALUES (131, 2, '', '#bdd7e7', 'Oregon', 'Орегон', 2, 'http://en.wikipedia.org/wiki/Oregon');
INSERT INTO properties VALUES (136, 2, '', '#bdd7e7', 'Kansas', 'Канзас', 2, 'http://en.wikipedia.org/wiki/Kansas');
INSERT INTO properties VALUES (84, 2, '', '#6baed6', 'unorganized territory', 'неогранизованная тер', 5, 'http://en.wikipedia.org/wiki/Kansas');
INSERT INTO properties VALUES (94, 2, '', '#6baed6', 'Wisconsin', 'Висконсин', 5, 'http://en.wikipedia.org/wiki/Wisconsin');
INSERT INTO properties VALUES (101, 2, '', '#6baed6', 'Iowa', 'Айова', 5, 'http://en.wikipedia.org/wiki/Iowa');
INSERT INTO properties VALUES (109, 2, '', '#6baed6', 'unorganied territory', 'неогранизованная территор', 5, 'http://en.wikipedia.org/wiki/California');
INSERT INTO properties VALUES (110, 2, '', '#6baed6', 'Oregon', 'Орегон', 5, 'http://en.wikipedia.org/wiki/Oregon');
INSERT INTO properties VALUES (112, 2, '', '#6baed6', 'Minnesota', 'Миннесота', 5, 'http://en.wikipedia.org/wiki/Minnesota');
INSERT INTO properties VALUES (115, 2, '', '#6baed6', 'New Mexico', 'Нью-Мексико', 5, 'http://en.wikipedia.org/wiki/New_Mexico');
INSERT INTO properties VALUES (116, 2, '', '#6baed6', 'Utah', 'Юта', 5, 'http://en.wikipedia.org/wiki/Utah');
INSERT INTO properties VALUES (117, 2, '', '#6baed6', 'unorganized territory', 'неогранизованная тер', 15, 'http://en.wikipedia.org/wiki/Kansas');
INSERT INTO properties VALUES (118, 2, '', '#6baed6', 'Neutral Strip', 'Оклахома', 16, 'https://en.wikipedia.org/wiki/Oklahoma_Panhandle');
INSERT INTO properties VALUES (119, 2, '', '#6baed6', 'Washington', 'Вашингтон', 5, 'http://en.wikipedia.org/wiki/Washington_(state)');
INSERT INTO properties VALUES (120, 2, '', '#6baed6', 'unorganized territory', 'неогранизованная тер', 15, '');
INSERT INTO properties VALUES (121, 2, '', '#6baed6', 'Kansas', 'Канзас', 5, 'http://en.wikipedia.org/wiki/Kansas');
INSERT INTO properties VALUES (122, 2, '', '#6baed6', 'Nebraska', 'Небраска', 5, 'http://en.wikipedia.org/wiki/Nebraska');
INSERT INTO properties VALUES (123, 2, '', '#6baed6', 'Oklahoma', 'Оклахома', 5, 'http://en.wikipedia.org/wiki/Oklahoma');
INSERT INTO properties VALUES (124, 2, '', '#6baed6', 'Indian Territory', 'Индейская Территория', 5, 'https://en.wikipedia.org/wiki/Indian_Territory');
INSERT INTO properties VALUES (98, 9, '', '#8c96c6', 'Republic of Texas', 'Республика Техас', 3, 'https://en.wikipedia.org/wiki/Republic_of_Texas');
INSERT INTO properties VALUES (108, 11, '', '#41ab5d', 'Yucatаn', 'Юкатан', 13, 'https://en.wikipedia.org/wiki/Republic_of_Yucat%C3%A1n');
INSERT INTO properties VALUES (135, 12, '', '#fcae91', 'Arkansas', 'Арканзас', 17, 'http://en.wikipedia.org/wiki/Arkansas');
INSERT INTO properties VALUES (138, 12, '', '#fcae91', 'Louisiana', 'Луизиана', 17, 'https://en.wikipedia.org/wiki/Louisiana');
INSERT INTO properties VALUES (139, 12, '', '#fcae91', 'Texas', 'Техас', 19, 'http://en.wikipedia.org/wiki/Texas');
INSERT INTO properties VALUES (140, 12, '', '#fcae91', 'Alabama', 'Алабама', 17, 'http://en.wikipedia.org/wiki/Alabama');
INSERT INTO properties VALUES (102, 10, '', '#d7b5d8', 'Republic of the Rio Grande', 'Республика Рио Гранде', 13, 'https://en.wikipedia.org/wiki/Republic_of_the_Rio_Grande');
INSERT INTO properties VALUES (96, 4, '#edf8e9;#8c96c6', '#111111', 'Disputed land', 'Спорные земли', 6, '');
INSERT INTO properties VALUES (104, 4, '#bae4b3;#d7b5d8', '#111111', 'Disputed land', 'Спорные земли', 6, '');
INSERT INTO properties VALUES (137, 2, '#d7b5d8;#fcae91', '#111111', 'Missouri', 'Миссури', 18, 'http://en.wikipedia.org/wiki/Missouri');
INSERT INTO properties VALUES (151, 8, '', '#bae4b3', 'Campeche', 'Кампече', 11, '');
INSERT INTO properties VALUES (166, 8, '', '#bae4b3', 'Hidalgo', 'Идальго', 11, '');
INSERT INTO properties VALUES (167, 8, '', '#bae4b3', 'Morelos', 'Морелос', 11, '');
INSERT INTO properties VALUES (199, 8, '', '#bae4b3', 'Nayarit', 'Наярит', 11, '');
INSERT INTO properties VALUES (154, 2, '', '#bdd7e7', 'West Virginia', 'Западная Виргиния', 2, 'http://en.wikipedia.org/wiki/West_Virginia');
INSERT INTO properties VALUES (156, 2, '', '#bdd7e7', 'Nevada', 'Невада', 2, 'http://en.wikipedia.org/wiki/Nevada');
INSERT INTO properties VALUES (161, 2, '', '#bdd7e7', 'Nebraska', 'Небраска', 2, 'http://en.wikipedia.org/wiki/Nebraska');
INSERT INTO properties VALUES (175, 2, '', '#bdd7e7', 'Colorado', 'Колорадо', 2, 'http://en.wikipedia.org/wiki/Colorado');
INSERT INTO properties VALUES (181, 2, '', '#bdd7e7', 'Montana', 'Монтана', 2, 'http://en.wikipedia.org/wiki/Montana');
INSERT INTO properties VALUES (152, 2, '', '#6baed6', 'Idaho', 'Айдахо', 5, 'http://en.wikipedia.org/wiki/Idaho');
INSERT INTO properties VALUES (153, 2, '', '#6baed6', 'Arizona', 'Аризона', 5, 'http://en.wikipedia.org/wiki/Arizona');
INSERT INTO properties VALUES (155, 2, '', '#6baed6', 'Montana', 'Монтана', 5, 'http://en.wikipedia.org/wiki/Montana');
INSERT INTO properties VALUES (162, 2, '', '#6baed6', 'Alaska Territory', 'Территория Аляска', 5, 'http://en.wikipedia.org/wiki/Alaska');
INSERT INTO properties VALUES (165, 2, '', '#6baed6', 'Wyoming', 'Вайоминг', 23, 'http://en.wikipedia.org/wiki/Wyoming');
INSERT INTO properties VALUES (159, 14, '', '#9e9ac8', 'New Brunswick', 'Нью-Брансуик', 22, 'http://en.wikipedia.org/wiki/New_Brunswick');
INSERT INTO properties VALUES (160, 14, '', '#9e9ac8', 'Nova Scotia', 'Новая Шотландия', 22, 'http://en.wikipedia.org/wiki/Nova_Scotia');
INSERT INTO properties VALUES (163, 14, '', '#9e9ac8', 'Ontario', 'Онтарио', 22, 'http://en.wikipedia.org/wiki/Ontario');
INSERT INTO properties VALUES (164, 14, '', '#9e9ac8', 'Quebec', 'Квебек', 22, 'http://en.wikipedia.org/wiki/Northwest_Territories');
INSERT INTO properties VALUES (168, 14, '', '#9e9ac8', 'Manitoba', 'Манитоба', 22, 'http://en.wikipedia.org/wiki/Manitoba');
INSERT INTO properties VALUES (171, 14, '', '#9e9ac8', 'British Columbia', 'Британская Колумбия', 22, 'http://en.wikipedia.org/wiki/British_Columbia');
INSERT INTO properties VALUES (172, 14, '', '#9e9ac8', 'Prince Edward Island', 'Остров Принца Эдуарда', 22, 'http://en.wikipedia.org/wiki/Prince_Edward_Island');
INSERT INTO properties VALUES (179, 14, '', '#9e9ac8', 'Quebec', 'Северо-Западные территории', 22, 'http://en.wikipedia.org/wiki/Northwest_Territories');
INSERT INTO properties VALUES (185, 14, '', '#9e9ac8', 'Quebec', 'Квебек', 22, 'http://en.wikipedia.org/wiki/Quebec');
INSERT INTO properties VALUES (141, 12, '', '#fcae91', 'Florida', 'Флорида', 17, 'http://en.wikipedia.org/wiki/Florida');
INSERT INTO properties VALUES (142, 12, '', '#fcae91', 'Georgia', 'Джорджия', 17, 'http://en.wikipedia.org/wiki/Georgia_(U.S._state)');
INSERT INTO properties VALUES (143, 12, '', '#fcae91', 'Mississippi', 'Миссисипи', 17, 'http://en.wikipedia.org/wiki/Mississippi');
INSERT INTO properties VALUES (144, 12, '', '#fcae91', 'South Carolina', 'Южная Каролина', 17, 'http://en.wikipedia.org/wiki/South_Carolina');
INSERT INTO properties VALUES (146, 12, '', '#fcae91', 'North Carolina', 'Северная Каролина', 17, 'http://en.wikipedia.org/wiki/North_Carolina');
INSERT INTO properties VALUES (147, 12, '', '#fcae91', 'Tennessee', 'Теннесси', 17, 'http://en.wikipedia.org/wiki/Tennessee');
INSERT INTO properties VALUES (148, 12, '', '#fcae91', 'Virginia', 'Виргиния', 17, 'http://en.wikipedia.org/wiki/Virginia');
INSERT INTO properties VALUES (157, 13, '', '#fcae91', 'Virginia', 'Виргиния', 17, 'http://en.wikipedia.org/wiki/Virginia');
INSERT INTO properties VALUES (149, 12, '', '#fb6a4a', 'Indian Territory', 'Индейская Территория', 20, 'https://en.wikipedia.org/wiki/Indian_Territory');
INSERT INTO properties VALUES (150, 12, '', '#fb6a4a', 'Arizona', 'Аризона', 20, 'http://en.wikipedia.org/wiki/Arizona');
INSERT INTO properties VALUES (177, 14, '9;16', '#111111', 'Disputed Land', 'Спорная территория', 21, 'https://en.wikipedia.org/wiki/District_of_Keewatin');
INSERT INTO properties VALUES (169, 14, '', '#756bb1', 'Northwest Territories', 'Северо-Западные территории', 24, 'http://en.wikipedia.org/wiki/Northwest_Territories');
INSERT INTO properties VALUES (176, 14, '', '#756bb1', 'the Keewatin District', 'Киватин', 24, 'https://en.wikipedia.org/wiki/District_of_Keewatin');
INSERT INTO properties VALUES (191, 14, '', '#756bb1', 'Yukon', 'Юкон', 24, 'http://en.wikipedia.org/wiki/Yukon');
INSERT INTO properties VALUES (173, 16, '', '#d7b5d8', 'the Dominion of Newfoundland', 'Доминион Ньюфаундленд', 25, 'http://en.wikipedia.org/wiki/Newfoundland_and_Labrador');
INSERT INTO properties VALUES (174, 0, '', '#d7b5d8', 'Arctic Islands', 'Острова Арктики', 25, 'https://en.wikipedia.org/wiki/British_Arctic_Territories');
INSERT INTO properties VALUES (196, 18, '', '#d7b5d8', 'Newfoundland', 'Доминион Ньюфаундленд', 25, 'http://en.wikipedia.org/wiki/Newfoundland_and_Labrador');
INSERT INTO properties VALUES (201, 16, '', '#d7b5d8', 'Newfoundland', 'Доминион Ньюфаундленд', 25, 'http://en.wikipedia.org/wiki/Newfoundland_and_Labrador');
INSERT INTO properties VALUES (186, 17, '', '#993404', 'Hawaii', 'Гавайи', 26, 'https://en.wikipedia.org/wiki/Republic_of_Hawaii');
INSERT INTO properties VALUES (145, 2, '#d7b5d8;#fcae91', '#111111', 'Kentucky', 'Кентукки', 18, 'http://en.wikipedia.org/wiki/Kentucky');
INSERT INTO properties VALUES (158, 2, '#d7b5d8;#6baed6', '#111111', 'Greer County', 'Округ Грир', 21, 'https://en.wikipedia.org/wiki/Greer_County,_Texas');
INSERT INTO properties VALUES (170, 15, '#6baed6;#9e9ac8', '#111111', 'Alaska Disputed Territory', 'Территория Аляска (спор)', 21, 'https://en.wikipedia.org/wiki/Alaska_boundary_dispute');
INSERT INTO properties VALUES (180, 14, '#9e9ac8;#756bb1', '#111111', 'Disputed Land', 'Спорная территория', 21, 'https://en.wikipedia.org/wiki/District_of_Keewatin');
INSERT INTO properties VALUES (0, 0, '', '#ffffcc', 'New Brunswick', 'Нью-Брансуик', 0, 'http://en.wikipedia.org/wiki/New_Brunswick');
INSERT INTO properties VALUES (1, 0, '', '#ffffcc', 'Nova Scotia', 'Новая Шотландия', 0, 'http://en.wikipedia.org/wiki/Nova_Scotia');
INSERT INTO properties VALUES (2, 0, '', '#ffffcc', 'Prince Edward Island', 'Остров Принца Эдуарда', 0, 'http://en.wikipedia.org/wiki/Prince_Edward_Island');
INSERT INTO properties VALUES (17, 0, '', '#ffffcc', 'the Dominion of Newfoundland', 'Доминион Ньюфаундленд', 0, 'http://en.wikipedia.org/wiki/Newfoundland_and_Labrador');
INSERT INTO properties VALUES (18, 0, '', '#ffffcc', 'Rupert''s Land', 'Земля Руперта', 0, 'https://en.wikipedia.org/wiki/Rupert%27s_Land');
INSERT INTO properties VALUES (25, 0, '', '#ffffcc', 'Province of Quebec', 'Провинция Квебек', 0, 'https://en.wikipedia.org/wiki/Province_of_Quebec_(1763%E2%80%931791)');
INSERT INTO properties VALUES (33, 0, '', '#ffffcc', 'Upper Canada', 'Верхняя Канада', 0, 'https://en.wikipedia.org/wiki/Upper_Canada');
INSERT INTO properties VALUES (34, 0, '', '#ffffcc', 'Lower Canada', 'Нижняя Канада', 0, 'https://en.wikipedia.org/wiki/Lower_Canada');
INSERT INTO properties VALUES (43, 0, '', '#ffffcc', 'Arctic Islands', 'Острова Арктики', 0, 'https://en.wikipedia.org/wiki/British_Arctic_Territories');
INSERT INTO properties VALUES (46, 0, '', '#ffffcc', 'Northwest Territories', 'Северо-Западные территории', 0, 'http://en.wikipedia.org/wiki/Northwest_Territories');
INSERT INTO properties VALUES (103, 0, '', '#ffffcc', 'Province of Canada', 'Провинция Канада', 0, 'https://en.wikipedia.org/wiki/Province_of_Canada');
INSERT INTO properties VALUES (129, 0, '', '#ffffcc', 'British Columbia', 'Британская Колумбия', 0, 'http://en.wikipedia.org/wiki/British_Columbia');
INSERT INTO properties VALUES (83, 8, '', '#edf8e9', 'Alta California', '', 10, 'http://en.wikipedia.org/wiki/California');
INSERT INTO properties VALUES (86, 8, '', '#edf8e9', 'Nuevo Mexico', 'Нью-Мексико', 10, 'https://es.wikipedia.org/wiki/Nuevo_M%C3%A9xico');
INSERT INTO properties VALUES (93, 8, '', '#edf8e9', 'Aguascalientes', 'Агуаскальентес', 10, '');
INSERT INTO properties VALUES (97, 8, '', '#edf8e9', 'Nuevo Mexico', 'Нью-Мексико', 10, 'http://en.wikipedia.org/wiki/California');
INSERT INTO properties VALUES (113, 8, '', '#edf8e9', 'unorganized territory', 'неогранизованная тер', 14, '');
INSERT INTO properties VALUES (178, 8, '', '#edf8e9', 'Tepic', 'Тепик', 10, '');
INSERT INTO properties VALUES (192, 8, '', '#edf8e9', 'Quintana Roo', 'Кинтана-Роо', 10, '');
INSERT INTO properties VALUES (200, 8, '', '#edf8e9', 'Baja California Sur', 'Южная Нижняя Калифорния', 10, 'https://en.wikipedia.org/wiki/Baja_California_Sur');
INSERT INTO properties VALUES (78, 8, '', '#bae4b3', 'Guanajuato', 'Гуанахуато', 11, '');
INSERT INTO properties VALUES (80, 8, '', '#bae4b3', 'Querеtaro', 'Керетаро', 11, '');
INSERT INTO properties VALUES (81, 8, '', '#bae4b3', 'Veracruz', 'Веракрус', 11, '');
INSERT INTO properties VALUES (82, 8, '', '#bae4b3', 'Chiapas', 'Чьяпас', 11, '');
INSERT INTO properties VALUES (85, 8, '', '#bae4b3', 'Chihuahua', 'Чиуауа', 11, 'https://en.wikipedia.org/wiki/Chihuahua_(state)');
INSERT INTO properties VALUES (87, 8, '', '#bae4b3', 'Yucatаn', 'Юкатан', 11, '');
INSERT INTO properties VALUES (88, 8, '', '#bae4b3', 'Nuevo Leon', 'Нуэво-Леон', 11, 'https://en.wikipedia.org/wiki/Nuevo_Le%C3%B3n');
INSERT INTO properties VALUES (89, 8, '', '#bae4b3', 'Tamaulipas', 'Тамаулипас', 11, 'https://en.wikipedia.org/wiki/Tamaulipas');
INSERT INTO properties VALUES (90, 8, '', '#bae4b3', 'Coahuila y Texas', 'Коауила и Техас', 11, 'https://en.wikipedia.org/wiki/Coahuila');
INSERT INTO properties VALUES (91, 8, '', '#bae4b3', 'Sinaloa', 'Синалоа', 11, '');
INSERT INTO properties VALUES (92, 8, '', '#bae4b3', 'Sonora', 'Сонора', 11, 'https://en.wikipedia.org/wiki/Sonora');
INSERT INTO properties VALUES (99, 8, '', '#bae4b3', 'Coahuila', 'Коауила', 11, 'https://en.wikipedia.org/wiki/Coahuila');
INSERT INTO properties VALUES (125, 8, '', '#bae4b3', 'Aguascalientes', 'Агуаскальентес', 11, '');
INSERT INTO properties VALUES (126, 8, '', '#bae4b3', 'Colima', 'Колима', 11, '');
INSERT INTO properties VALUES (127, 8, '', '#bae4b3', 'Tlaxcala', 'Тласкала', 11, '');
INSERT INTO properties VALUES (128, 8, '', '#bae4b3', 'Guerrero', 'Герреро', 11, '');
INSERT INTO properties VALUES (203, 8, '', '#bae4b3', 'Baja California', 'Нижняя Калифорния', 11, 'https://en.wikipedia.org/wiki/Baja_California');
INSERT INTO properties VALUES (206, 8, '', '#bae4b3', 'Baja California Sur', 'Южная Нижняя Калифорния', 11, 'https://en.wikipedia.org/wiki/Baja_California_Sur');
INSERT INTO properties VALUES (207, 8, '', '#bae4b3', 'Quintana Roo', 'Кинтана-Роо', 11, '');
INSERT INTO properties VALUES (23, 2, '', '#bdd7e7', 'North Carolina', 'Северная Каролина', 2, 'http://en.wikipedia.org/wiki/North_Carolina');
INSERT INTO properties VALUES (32, 2, '', '#bdd7e7', 'Vermont', 'Вермонт', 2, 'http://en.wikipedia.org/wiki/Vermont');
INSERT INTO properties VALUES (36, 2, '', '#bdd7e7', 'Kentucky', 'Кентукки', 2, 'http://en.wikipedia.org/wiki/Kentucky');
INSERT INTO properties VALUES (37, 2, '', '#bdd7e7', 'Tennessee', 'Теннесси', 2, 'http://en.wikipedia.org/wiki/Tennessee');
INSERT INTO properties VALUES (42, 2, '', '#bdd7e7', 'Ohio', 'Огайо', 2, 'http://en.wikipedia.org/wiki/Ohio');
INSERT INTO properties VALUES (52, 2, '', '#bdd7e7', 'Louisiana', 'Луизиана', 2, 'https://en.wikipedia.org/wiki/Louisiana');
INSERT INTO properties VALUES (53, 2, '', '#bdd7e7', 'Indiana', 'Индиана', 2, 'http://en.wikipedia.org/wiki/Indiana');
INSERT INTO properties VALUES (55, 2, '', '#bdd7e7', 'Mississippi', 'Миссисипи', 2, 'http://en.wikipedia.org/wiki/Mississippi');
INSERT INTO properties VALUES (56, 2, '', '#bdd7e7', 'Illinois', 'Иллинойс', 2, 'http://en.wikipedia.org/wiki/Illinois');
INSERT INTO properties VALUES (59, 2, '', '#bdd7e7', 'Alabama', 'Алабама', 2, 'http://en.wikipedia.org/wiki/Alabama');
INSERT INTO properties VALUES (61, 2, '', '#bdd7e7', 'Maine', 'Мэн', 2, 'http://en.wikipedia.org/wiki/Maine');
INSERT INTO properties VALUES (64, 2, '', '#bdd7e7', 'Missouri', 'Миссури', 2, 'http://en.wikipedia.org/wiki/Missouri');
INSERT INTO properties VALUES (182, 2, '', '#bdd7e7', 'North Dakota', 'Северная Дакота', 2, 'http://en.wikipedia.org/wiki/North_Dakota');
INSERT INTO properties VALUES (183, 2, '', '#bdd7e7', 'Washington', 'Вашингтон', 2, 'http://en.wikipedia.org/wiki/Washington_(state)');
INSERT INTO properties VALUES (184, 2, '', '#bdd7e7', 'South Dakota', 'Южная Дакота', 2, 'http://en.wikipedia.org/wiki/South_Dakota');
INSERT INTO properties VALUES (187, 2, '', '#bdd7e7', 'Idaho', 'Айдахо', 2, 'http://en.wikipedia.org/wiki/Idaho');
INSERT INTO properties VALUES (188, 2, '', '#bdd7e7', 'Wyoming', 'Вайоминг', 2, 'http://en.wikipedia.org/wiki/Wyoming');
INSERT INTO properties VALUES (189, 2, '', '#bdd7e7', 'Территория', 'Гавайи', 27, 'http://en.wikipedia.org/wiki/Hawaii');
INSERT INTO properties VALUES (190, 2, '', '#bdd7e7', 'Utah', 'Юта', 2, 'http://en.wikipedia.org/wiki/Utah');
INSERT INTO properties VALUES (195, 2, '', '#bdd7e7', 'Oklahoma', 'Оклахома', 2, 'http://en.wikipedia.org/wiki/Oklahoma');
INSERT INTO properties VALUES (197, 2, '', '#bdd7e7', 'Arizona', 'Аризона', 2, 'http://en.wikipedia.org/wiki/Arizona');
INSERT INTO properties VALUES (198, 2, '', '#bdd7e7', 'New Mexico', 'Нью-Мексико', 2, 'http://en.wikipedia.org/wiki/New_Mexico');
INSERT INTO properties VALUES (204, 2, '', '#bdd7e7', 'Hawaii', 'Гавайи', 2, 'http://en.wikipedia.org/wiki/Hawaii');
INSERT INTO properties VALUES (205, 2, '', '#bdd7e7', 'Alaska', 'Аляска', 2, 'http://en.wikipedia.org/wiki/Alaska');
INSERT INTO properties VALUES (132, 2, '', '#6baed6', 'Dakota', 'Дакота', 5, 'http://en.wikipedia.org/wiki/North_Dakota');
INSERT INTO properties VALUES (133, 2, '', '#6baed6', 'Colorado', 'Колорадо', 5, 'http://en.wikipedia.org/wiki/Colorado');
INSERT INTO properties VALUES (134, 2, '', '#6baed6', 'Nevada', 'Невада', 5, 'http://en.wikipedia.org/wiki/Nevada');
INSERT INTO properties VALUES (193, 14, '', '#9e9ac8', 'Alberta', 'Альберта', 22, 'http://en.wikipedia.org/wiki/Alberta');
INSERT INTO properties VALUES (194, 14, '', '#9e9ac8', 'Saskatchewan', 'Саскачеван', 22, 'http://en.wikipedia.org/wiki/Saskatchewan');
INSERT INTO properties VALUES (202, 14, '', '#9e9ac8', 'Newfoundland and Labrador', 'Ньюфаундленд и Лабрадор', 22, 'http://en.wikipedia.org/wiki/Newfoundland_and_Labrador');
INSERT INTO properties VALUES (208, 14, '', '#756bb1', 'Nunavut', 'Нунавут', 24, 'http://en.wikipedia.org/wiki/Nunavut');
INSERT INTO properties VALUES (209, 19, '', '#85a0d3', 'Hokkaido', 'Хоккайдо', 28, NULL);
INSERT INTO properties VALUES (210, 19, '', '#85a0d3', 'Shumshu island', 'о. Шумшу', 28, NULL);
INSERT INTO properties VALUES (211, 19, '', '#85a0d3', 'Paramushir island', 'о. Парамушир', 28, NULL);
INSERT INTO properties VALUES (212, 19, '', '#85a0d3', 'Atlasova island', 'о. Атласова', 28, NULL);
INSERT INTO properties VALUES (213, 19, '', '#85a0d3', 'Onekotan island', 'о. Онекотан', 28, NULL);
INSERT INTO properties VALUES (214, 19, '', '#85a0d3', 'Makanrushi island', 'о. Маканруши', 28, NULL);
INSERT INTO properties VALUES (215, 19, '', '#85a0d3', 'Harimkotan island', 'о. Харимкотан', 28, NULL);
INSERT INTO properties VALUES (216, 19, '', '#85a0d3', 'Shiashkotan island', 'о. Шиашкотан', 28, NULL);
INSERT INTO properties VALUES (217, 19, '', '#85a0d3', 'Ekarma island', 'о. Экарма', 28, NULL);
INSERT INTO properties VALUES (218, 19, '', '#85a0d3', 'Matua island', 'о. Матуа', 28, NULL);
INSERT INTO properties VALUES (219, 19, '', '#85a0d3', 'Rasshua island', 'о. Расшуа', 28, NULL);
INSERT INTO properties VALUES (220, 19, '', '#85a0d3', 'Ketoi island', 'о. Кетой', 28, NULL);
INSERT INTO properties VALUES (221, 19, '', '#85a0d3', 'Simushir island', 'о. Симушир', 28, NULL);
INSERT INTO properties VALUES (222, 19, '', '#85a0d3', 'Urup island', 'о. Уруп', 28, NULL);
INSERT INTO properties VALUES (223, 19, '', '#85a0d3', 'Iturup island', 'о. Итуруп', 28, NULL);
INSERT INTO properties VALUES (224, 19, '', '#85a0d3', 'Kunashir island', 'о. Кунашир', 28, NULL);
INSERT INTO properties VALUES (225, 19, '', '#85a0d3', 'Shikotan island', 'о. Шикотан', 28, NULL);
INSERT INTO properties VALUES (226, 19, '', '#85a0d3', 'Chyornye Bratya islands', 'о-ва Черные Братья', 28, NULL);
INSERT INTO properties VALUES (227, 19, '', '#85a0d3', 'South Kuril Ridge', 'Южно-Курильская гряда', 28, NULL);
INSERT INTO properties VALUES (228, 20, '', '#e84444', 'Honshu', 'Хонсю', 28, NULL);
INSERT INTO properties VALUES (229, 19, '', '#85a0d3', 'Sakhalin', 'Сахалин', 28, NULL);
INSERT INTO properties VALUES (230, 20, '', '#f48081', 'Matsumae', 'Мацумаэ', 28, NULL);
INSERT INTO properties VALUES (231, 20, '', '#f48081', 'Hokkaido', 'Хоккайдо', 28, NULL);
INSERT INTO properties VALUES (232, 21, '', '#80d0de', 'Shumshu island', 'Курильские острова', 28, NULL);
INSERT INTO properties VALUES (233, 21, '', '#80d0de', 'Paramushir island', 'о. Парамушир', 28, NULL);
INSERT INTO properties VALUES (234, 20, '', '#e84444', 'Hokkaido', 'Хоккайдо', 28, NULL);
INSERT INTO properties VALUES (235, 21, '', '#80d0de', 'Shumshu island', 'о. Шумшу', 28, NULL);
INSERT INTO properties VALUES (236, 21, '', '#80d0de', 'Atlasova island', 'о. Атласова', 28, NULL);
INSERT INTO properties VALUES (237, 21, '', '#80d0de', 'Onekotan island', 'о. Онекотан', 28, NULL);
INSERT INTO properties VALUES (238, 21, '', '#80d0de', 'Makanrushi island', 'о. Маканруши', 28, NULL);
INSERT INTO properties VALUES (239, 21, '', '#80d0de', 'Harimkotan island', 'о. Харимкотан', 28, NULL);
INSERT INTO properties VALUES (240, 21, '', '#80d0de', 'Shiashkotan island', 'о. Шиашкотан', 28, NULL);
INSERT INTO properties VALUES (241, 21, '', '#80d0de', 'Ekarma island', 'о. Экарма', 28, NULL);
INSERT INTO properties VALUES (242, 21, '', '#80d0de', 'Matua island', 'о. Матуа', 28, NULL);
INSERT INTO properties VALUES (243, 21, '', '#80d0de', 'Rasshua island', 'о. Расшуа', 28, NULL);
INSERT INTO properties VALUES (244, 21, '', '#80d0de', 'Ketoi island', 'о. Кетой', 28, NULL);
INSERT INTO properties VALUES (245, 21, '', '#80d0de', 'Simushir island', 'о. Симушир', 28, NULL);
INSERT INTO properties VALUES (246, 21, '', '#80d0de', 'Urup island', 'о. Уруп', 28, NULL);
INSERT INTO properties VALUES (247, 21, '', '#80d0de', 'Iturup island', 'о. Итуруп', 28, NULL);
INSERT INTO properties VALUES (248, 21, '', '#80d0de', 'Chyornye Bratya islands', 'о-ва Черные Братья', 28, NULL);
INSERT INTO properties VALUES (249, 22, '', '#7f7f7f', 'Iturup island', 'о. Итуруп', 28, NULL);
INSERT INTO properties VALUES (250, 22, '', '#7f7f7f', 'Kunashir island', 'о. Кунашир', 28, NULL);
INSERT INTO properties VALUES (251, 20, '', '#f48081', 'Kunashir island', 'о. Кунашир', 28, NULL);
INSERT INTO properties VALUES (252, 20, '', '#f48081', 'Shikotan island', 'о. Шикотан', 28, NULL);
INSERT INTO properties VALUES (253, 20, '', '#f48081', 'South Kuril Ridge', 'Южно-Курильская гряда', 28, NULL);
INSERT INTO properties VALUES (254, 23, '', '#f48081', 'Hokkaido', 'Япония', 28, NULL);
INSERT INTO properties VALUES (255, 20, '', '#f48081', 'Iturup island', 'о. Итуруп', 28, NULL);
INSERT INTO properties VALUES (256, 20, '', '#e84444', 'Iturup island', 'о. Итуруп', 28, NULL);
INSERT INTO properties VALUES (257, 20, '', '#e84444', 'Kunashir island', 'о. Кунашир', 28, NULL);
INSERT INTO properties VALUES (258, 20, '', '#e84444', 'Shikotan island', 'о. Шикотан', 28, NULL);
INSERT INTO properties VALUES (259, 20, '', '#e84444', 'South Kuril Ridge', 'Южно-Курильская гряда', 28, NULL);
INSERT INTO properties VALUES (260, 20, '', '#e84444', 'Sakhalin', 'Сахалин', 28, NULL);
INSERT INTO properties VALUES (261, 20, '', '#f48081', 'Sakhalin', 'Сахалин', 28, NULL);
INSERT INTO properties VALUES (262, 20, '', '#f48081', 'Hokkaido', 'Хоккайдо', 28, NULL);
INSERT INTO properties VALUES (263, 20, '', '#f48081', 'Iturup island', 'о. Итуруп', 28, NULL);
INSERT INTO properties VALUES (264, 20, '', '#f48081', 'Kunashir island', 'о. Кунашир', 28, NULL);
INSERT INTO properties VALUES (265, 20, '', '#f48081', 'Shikotan island', 'о. Шикотан', 28, NULL);
INSERT INTO properties VALUES (266, 20, '', '#f48081', 'South Kuril Ridge', 'Южно-Курильская гряда', 28, NULL);
INSERT INTO properties VALUES (267, 20, '#e84444;#80d0de', '#e84444;#80d0de', 'Sakhalin', 'Сахалин', 28, NULL);
INSERT INTO properties VALUES (268, 21, '', '#80d0de', 'Sakhalin', 'Сахалин', 28, NULL);
INSERT INTO properties VALUES (269, 20, '', '#e84444', 'Shumshu island', 'о. Шумшу', 28, NULL);
INSERT INTO properties VALUES (270, 20, '', '#e84444', 'Paramushir island', 'о. Парамушир', 28, NULL);
INSERT INTO properties VALUES (271, 20, '', '#e84444', 'Atlasova island', 'о. Атласова', 28, NULL);
INSERT INTO properties VALUES (272, 20, '', '#e84444', 'Onekotan island', 'о. Онекотан', 28, NULL);
INSERT INTO properties VALUES (273, 20, '', '#e84444', 'Makanrushi island', 'о. Маканруши', 28, NULL);
INSERT INTO properties VALUES (274, 20, '', '#e84444', 'Harimkotan island', 'о. Харимкотан', 28, NULL);
INSERT INTO properties VALUES (275, 20, '', '#e84444', 'Shiashkotan island', 'о. Шиашкотан', 28, NULL);
INSERT INTO properties VALUES (276, 20, '', '#e84444', 'Ekarma island', 'о. Экарма', 28, NULL);
INSERT INTO properties VALUES (277, 20, '', '#e84444', 'Matua island', 'о. Матуа', 28, NULL);
INSERT INTO properties VALUES (278, 20, '', '#e84444', 'Rasshua island', 'о. Расшуа', 28, NULL);
INSERT INTO properties VALUES (279, 20, '', '#e84444', 'Ketoi island', 'о. Кетой', 28, NULL);
INSERT INTO properties VALUES (280, 20, '', '#e84444', 'Simushir island', 'о. Симушир', 28, NULL);
INSERT INTO properties VALUES (281, 20, '', '#e84444', 'Urup island', 'о. Уруп', 28, NULL);
INSERT INTO properties VALUES (282, 20, '', '#e84444', 'Chyornye Bratya islands', 'о-ва Черные Братья', 28, NULL);
INSERT INTO properties VALUES (283, 21, '', '#80d0de', 'Kunashir island', 'о. Кунашир', 28, NULL);
INSERT INTO properties VALUES (284, 21, '', '#80d0de', 'Shikotan island', 'о. Шикотан', 28, NULL);
INSERT INTO properties VALUES (285, 21, '', '#80d0de', 'South Kuril Ridge', 'Южно-Курильская гряда', 28, NULL);


--
-- TOC entry 2200 (class 0 OID 0)
-- Dependencies: 191
-- Name: properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('properties_id_seq', 286, false);


--
-- TOC entry 2073 (class 2606 OID 16768)
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (id);


--
-- TOC entry 2074 (class 2606 OID 16769)
-- Name: properties properties_admin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY properties
    ADD CONSTRAINT properties_admin_fkey FOREIGN KEY (admin) REFERENCES admin(id);


--
-- TOC entry 2075 (class 2606 OID 16774)
-- Name: properties properties_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY properties
    ADD CONSTRAINT properties_type_fkey FOREIGN KEY (type) REFERENCES type(id);


-- Completed on 2017-09-08 11:20:07 UTC

--
-- PostgreSQL database dump complete
--

