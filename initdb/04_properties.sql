--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

-- Started on 2017-04-05 18:02:49

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
-- TOC entry 194 (class 1259 OID 16428)
-- Name: properties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE properties (
    id bigint NOT NULL,
    admin integer,
    disputed character varying(50),
    mapcolor13 integer NOT NULL,
    name character varying(255),
    nameru character varying(255),
    type integer,
    wikipedia character varying(255)
);


ALTER TABLE properties OWNER TO postgres;

--
-- TOC entry 193 (class 1259 OID 16426)
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
-- TOC entry 2174 (class 0 OID 0)
-- Dependencies: 193
-- Name: properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE properties_id_seq OWNED BY properties.id;


--
-- TOC entry 2046 (class 2604 OID 16431)
-- Name: properties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY properties ALTER COLUMN id SET DEFAULT nextval('properties_id_seq'::regclass);


--
-- TOC entry 2169 (class 0 OID 16428)
-- Dependencies: 194
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY properties (id, admin, disputed, mapcolor13, name, nameru, type, wikipedia) FROM stdin;
0	0		1	New Brunswick	Нью-Брансуик	0	http://en.wikipedia.org/wiki/New_Brunswick
1	0		1	Nova Scotia	Новая Шотландия	0	http://en.wikipedia.org/wiki/Nova_Scotia
2	0		1	Prince Edward Island	Остров Принца Эдуарда	0	http://en.wikipedia.org/wiki/Prince_Edward_Island
3	1		18	New Spain	Новая Испания	1	https://en.wikipedia.org/wiki/New_Spain
4	2		5	Massachusetts	Массачусетс	2	http://en.wikipedia.org/wiki/Massachusetts
5	2		5	Connecticut	Коннектикут	2	http://en.wikipedia.org/wiki/Connecticut
6	2		5	New Hampshire	Нью-Гэмпшир	2	http://en.wikipedia.org/wiki/New_Hampshire
7	2		5	Rhode Island	Род-Айленд	2	http://en.wikipedia.org/wiki/Rhode_Island
8	3		20	Vermont	Республика Вермонт	3	https://en.wikipedia.org/wiki/Vermont_Republic
9	2		5	Virginia	Виргиния	2	http://en.wikipedia.org/wiki/Virginia
10	2		5	Delaware	Делавэр	2	http://en.wikipedia.org/wiki/Delaware
11	2		8	District of Columbia	округ Колумбия	4	http://en.wikipedia.org/wiki/Washington,_D.C.
12	2		5	Maryland	Мэриленд	2	http://en.wikipedia.org/wiki/Maryland
13	2		5	New Jersey	Нью-Джерси	2	http://en.wikipedia.org/wiki/New_Jersey
14	2		5	New York	Нью-Йорк	2	http://en.wikipedia.org/wiki/New_York
15	2		5	Pennsylvania	Пенсильвания	2	http://en.wikipedia.org/wiki/Pennsylvania
16	2		7	District of Maine	Округ Мэн	5	https://en.wikipedia.org/wiki/District_of_Maine
17	0		1	the Dominion of Newfoundland	Доминион Ньюфаундленд	0	http://en.wikipedia.org/wiki/Newfoundland_and_Labrador
18	0		1	Rupert's Land	Земля Руперта	0	https://en.wikipedia.org/wiki/Rupert%27s_Land
19	1		18	Louisiana	Луизиана	0	https://en.wikipedia.org/wiki/Louisiana_(New_France)
20	1		18	La Florida	Испанская Флорида	5	https://en.wikipedia.org/wiki/Spanish_Florida
21	2		5	Georgia	Джорджия	2	http://en.wikipedia.org/wiki/Georgia_(U.S._state)
22	2		5	South Carolina	Южная Каролина	2	http://en.wikipedia.org/wiki/South_Carolina
23	2		5	North Carolina	Северная Каролина	2	http://en.wikipedia.org/wiki/North_Carolina
24	4	1;7	6	Disputed land	Спорные земли	6	
25	0		1	Province of Quebec	Провинция Квебек	0	https://en.wikipedia.org/wiki/Province_of_Quebec_(1763%E2%80%931791)
26	1		18	Republic of West Florida	Западная Флорида	5	https://en.wikipedia.org/wiki/Republic_of_West_Florida
27	2		7	Northwest territory	Северо-западная территория	5	https://en.wikipedia.org/wiki/Northwest_Territory
28	4	5;18	6	Disputed land	Спорные земли	6	
29	5		9	Russian America	Русская Америкa	7	https://en.wikipedia.org/wiki/Russian_America
30	2		7	Southwest Territory	Юго-западная Территория	5	http://en.wikipedia.org/wiki/Tennessee
31	4	1;18	6	Disputed land	Спорные земли	6	
32	2		5	Vermont	Вермонт	2	http://en.wikipedia.org/wiki/Vermont
33	0		1	Upper Canada	Верхняя Канада	0	https://en.wikipedia.org/wiki/Upper_Canada
34	0		1	Lower Canada	Нижняя Канада	0	https://en.wikipedia.org/wiki/Lower_Canada
35	6		21	Hawaii	Гавайи	8	https://en.wikipedia.org/wiki/Kingdom_of_Hawaii
36	2		5	Kentucky	Кентукки	2	http://en.wikipedia.org/wiki/Kentucky
37	2		5	Tennessee	Теннесси	2	http://en.wikipedia.org/wiki/Tennessee
38	2		7	Mississippi	Миссисипи	5	http://en.wikipedia.org/wiki/Mississippi
39	7		19	La Louisiane	Округ Луизиана	9	https://en.wikipedia.org/wiki/Louisiana_(New_France)
40	2		7	unorganized territory	неогранизованная территор	5	
41	2		7	Indiana	Индиана	5	http://en.wikipedia.org/wiki/Indiana
42	2		5	Ohio	Огайо	2	http://en.wikipedia.org/wiki/Ohio
43	0		1	Arctic Islands	Острова Арктики	0	https://en.wikipedia.org/wiki/British_Arctic_Territories
44	2		7	District of Louisiana	Округ Луизиана	5	https://en.wikipedia.org/wiki/District_of_Louisiana
45	4	1;9	6	Disputed land	Спорные земли	6	
46	0		1	Northwest Territories	Северо-Западные территории	0	http://en.wikipedia.org/wiki/Northwest_Territories
47	2		7	Louisiana	Луизиана	5	http://en.wikipedia.org/wiki/Missouri
48	2		7	Territory of Orleans	Орлеанская территория	5	https://en.wikipedia.org/wiki/Louisiana
49	2		7	Michigan	Мичиган	5	http://en.wikipedia.org/wiki/Michigan
50	2		7	Illinois	Иллинойс	5	http://en.wikipedia.org/wiki/Illinois
51	2		7	Missouri	Миссури	5	http://en.wikipedia.org/wiki/Missouri
52	2		5	Louisiana	Луизиана	2	https://en.wikipedia.org/wiki/Louisiana
53	2		5	Indiana	Индиана	2	http://en.wikipedia.org/wiki/Indiana
54	2		7	Alabama	Алабама	5	http://en.wikipedia.org/wiki/Alabama
55	2		5	Mississippi	Миссисипи	2	http://en.wikipedia.org/wiki/Mississippi
56	2		5	Illinois	Иллинойс	2	http://en.wikipedia.org/wiki/Illinois
57	4	1;7;18	6	Disputed land	Спорные земли	6	
58	2		7	Arkansas	Арканзас	5	http://en.wikipedia.org/wiki/Arkansas
59	2		5	Alabama	Алабама	2	http://en.wikipedia.org/wiki/Alabama
60	2		7	Florida	Флорида	5	http://en.wikipedia.org/wiki/Florida
61	2		5	Maine	Мэн	2	http://en.wikipedia.org/wiki/Maine
62	4	1;5	6	Disputed land	Спорные земли	6	
63	2		7	unorganized territory	неогранизованная тер	5	
64	2		5	Missouri	Миссури	2	http://en.wikipedia.org/wiki/Missouri
65	8		2	Baja California	Нижняя Калифорния	10	https://en.wikipedia.org/wiki/Baja_California
66	8		3	Durango	Дуранго	11	
67	8		3	Sonora y Sinaloa	Сонора и Синалоа	11	https://en.wikipedia.org/wiki/Estado_de_Occidente
68	8		3	Zacatecas	Сакатекас	11	
69	8		3	San Luis Potosi	Сан-Луис-Потоси	11	
70	8		2	Colima	Колима	10	
71	8		3	Jalisco	Халиско	11	
72	8		3	Michoacаn	Мичоакан	11	
73	8		3	Oaxaca	Оахака	11	
74	8		3	Puebla	Пуэбла	11	
75	8		3	Tabasco	Табаско	11	
76	8		2	Tlaxcala	Тласкала	10	
77	8		4	Distrito Federal	Федеральный округ	12	
78	8		3	Guanajuato	Гуанахуато	11	
79	8		3	Mexico	Мехико	11	
80	8		3	Querеtaro	Керетаро	11	
81	8		3	Veracruz	Веракрус	11	
82	8		3	Chiapas	Чьяпас	11	
83	8		2	Alta California		10	http://en.wikipedia.org/wiki/California
84	2		7	unorganized territory	неогранизованная тер	5	http://en.wikipedia.org/wiki/Kansas
85	8		3	Chihuahua	Чиуауа	11	https://en.wikipedia.org/wiki/Chihuahua_(state)
86	8		2	Nuevo Mexico	Нью-Мексико	10	https://es.wikipedia.org/wiki/Nuevo_M%C3%A9xico
87	8		3	Yucatаn	Юкатан	11	
88	8		3	Nuevo Leon	Нуэво-Леон	11	https://en.wikipedia.org/wiki/Nuevo_Le%C3%B3n
89	8		3	Tamaulipas	Тамаулипас	11	https://en.wikipedia.org/wiki/Tamaulipas
90	8		3	Coahuila y Texas	Коауила и Техас	11	https://en.wikipedia.org/wiki/Coahuila
91	8		3	Sinaloa	Синалоа	11	
92	8		3	Sonora	Сонора	11	https://en.wikipedia.org/wiki/Sonora
93	8		2	Aguascalientes	Агуаскальентес	10	
94	2		7	Wisconsin	Висконсин	5	http://en.wikipedia.org/wiki/Wisconsin
95	2		5	Arkansas	Арканзас	2	http://en.wikipedia.org/wiki/Arkansas
96	4	2;11	6	Disputed land	Спорные земли	6	
97	8		2	Nuevo Mexico	Нью-Мексико	10	http://en.wikipedia.org/wiki/California
98	9		11	Republic of Texas	Республика Техас	3	https://en.wikipedia.org/wiki/Republic_of_Texas
99	8		3	Coahuila	Коауила	11	https://en.wikipedia.org/wiki/Coahuila
100	2		5	Michigan	Мичиган	2	http://en.wikipedia.org/wiki/Michigan
101	2		7	Iowa	Айова	5	http://en.wikipedia.org/wiki/Iowa
102	10		18	Republic of the Rio Grande	Республика Рио Гранде	13	https://en.wikipedia.org/wiki/Republic_of_the_Rio_Grande
103	0		1	Province of Canada	Провинция Канада	0	https://en.wikipedia.org/wiki/Province_of_Canada
104	4	3;5	6	Disputed land	Спорные земли	6	
105	2		5	Florida	Флорида	2	http://en.wikipedia.org/wiki/Florida
106	2		5	Texas	Техас	2	http://en.wikipedia.org/wiki/Texas
107	2		5	Iowa	Айова	2	http://en.wikipedia.org/wiki/Iowa
108	11		12	Yucatаn	Юкатан	13	https://en.wikipedia.org/wiki/Republic_of_Yucat%C3%A1n
109	2		7	unorganied territory	неогранизованная территор	5	http://en.wikipedia.org/wiki/California
110	2		7	Oregon	Орегон	5	http://en.wikipedia.org/wiki/Oregon
111	2		5	Wisconsin	Висконсин	2	http://en.wikipedia.org/wiki/Wisconsin
112	2		7	Minnesota	Миннесота	5	http://en.wikipedia.org/wiki/Minnesota
113	8		2	unorganized territory	неогранизованная тер	14	
114	2		5	California	Калифорния	2	http://en.wikipedia.org/wiki/California
115	2		7	New Mexico	Нью-Мексико	5	http://en.wikipedia.org/wiki/New_Mexico
116	2		7	Utah	Юта	5	http://en.wikipedia.org/wiki/Utah
117	2		7	unorganized territory	неогранизованная тер	15	http://en.wikipedia.org/wiki/Kansas
118	2		7	Neutral Strip	Оклахома	16	https://en.wikipedia.org/wiki/Oklahoma_Panhandle
119	2		7	Washington	Вашингтон	5	http://en.wikipedia.org/wiki/Washington_(state)
120	2		7	unorganized territory	неогранизованная тер	15	
121	2		7	Kansas	Канзас	5	http://en.wikipedia.org/wiki/Kansas
122	2		7	Nebraska	Небраска	5	http://en.wikipedia.org/wiki/Nebraska
123	2		7	Oklahoma	Оклахома	5	http://en.wikipedia.org/wiki/Oklahoma
124	2		7	Indian Territory	Индейская Территория	5	https://en.wikipedia.org/wiki/Indian_Territory
125	8		3	Aguascalientes	Агуаскальентес	11	
126	8		3	Colima	Колима	11	
127	8		3	Tlaxcala	Тласкала	11	
128	8		3	Guerrero	Герреро	11	
129	0		1	British Columbia	Британская Колумбия	0	http://en.wikipedia.org/wiki/British_Columbia
130	2		5	Minnesota	Миннесота	2	http://en.wikipedia.org/wiki/Minnesota
131	2		5	Oregon	Орегон	2	http://en.wikipedia.org/wiki/Oregon
132	2		7	Dakota	Дакота	5	http://en.wikipedia.org/wiki/North_Dakota
133	2		7	Colorado	Колорадо	5	http://en.wikipedia.org/wiki/Colorado
134	2		7	Nevada	Невада	5	http://en.wikipedia.org/wiki/Nevada
135	12		13	Arkansas	Арканзас	17	http://en.wikipedia.org/wiki/Arkansas
136	2		5	Kansas	Канзас	2	http://en.wikipedia.org/wiki/Kansas
137	2	5;13	14	Missouri	Миссури	18	http://en.wikipedia.org/wiki/Missouri
138	12		13	Louisiana	Луизиана	17	https://en.wikipedia.org/wiki/Louisiana
139	12		13	Texas	Техас	19	http://en.wikipedia.org/wiki/Texas
140	12		13	Alabama	Алабама	17	http://en.wikipedia.org/wiki/Alabama
141	12		13	Florida	Флорида	17	http://en.wikipedia.org/wiki/Florida
142	12		13	Georgia	Джорджия	17	http://en.wikipedia.org/wiki/Georgia_(U.S._state)
143	12		13	Mississippi	Миссисипи	17	http://en.wikipedia.org/wiki/Mississippi
144	12		13	South Carolina	Южная Каролина	17	http://en.wikipedia.org/wiki/South_Carolina
145	2	5;13	14	Kentucky	Кентукки	18	http://en.wikipedia.org/wiki/Kentucky
146	12		13	North Carolina	Северная Каролина	17	http://en.wikipedia.org/wiki/North_Carolina
147	12		13	Tennessee	Теннесси	17	http://en.wikipedia.org/wiki/Tennessee
148	12		13	Virginia	Виргиния	17	http://en.wikipedia.org/wiki/Virginia
149	12		15	Indian Territory	Индейская Территория	20	https://en.wikipedia.org/wiki/Indian_Territory
150	12		15	Arizona	Аризона	20	http://en.wikipedia.org/wiki/Arizona
151	8		3	Campeche	Кампече	11	
152	2		7	Idaho	Айдахо	5	http://en.wikipedia.org/wiki/Idaho
153	2		7	Arizona	Аризона	5	http://en.wikipedia.org/wiki/Arizona
154	2		5	West Virginia	Западная Виргиния	2	http://en.wikipedia.org/wiki/West_Virginia
155	2		7	Montana	Монтана	5	http://en.wikipedia.org/wiki/Montana
156	2		5	Nevada	Невада	2	http://en.wikipedia.org/wiki/Nevada
157	13		13	Virginia	Виргиния	17	http://en.wikipedia.org/wiki/Virginia
158	2	5;7	16	Greer County	Округ Грир	21	https://en.wikipedia.org/wiki/Greer_County,_Texas
159	14		10	New Brunswick	Нью-Брансуик	22	http://en.wikipedia.org/wiki/New_Brunswick
160	14		10	Nova Scotia	Новая Шотландия	22	http://en.wikipedia.org/wiki/Nova_Scotia
161	2		5	Nebraska	Небраска	2	http://en.wikipedia.org/wiki/Nebraska
162	2		7	Alaska Territory	Территория Аляска	5	http://en.wikipedia.org/wiki/Alaska
163	14		10	Ontario	Онтарио	22	http://en.wikipedia.org/wiki/Ontario
164	14		10	Quebec	Квебек	22	http://en.wikipedia.org/wiki/Northwest_Territories
165	2		7	Wyoming	Вайоминг	23	http://en.wikipedia.org/wiki/Wyoming
166	8		3	Hidalgo	Идальго	11	
167	8		3	Morelos	Морелос	11	
168	14		10	Manitoba	Манитоба	22	http://en.wikipedia.org/wiki/Manitoba
169	14		17	Northwest Territories	Северо-Западные территории	24	http://en.wikipedia.org/wiki/Northwest_Territories
170	15	6;10	16	Alaska Disputed Territory	Территория Аляска (спор)	21	https://en.wikipedia.org/wiki/Alaska_boundary_dispute
171	14		10	British Columbia	Британская Колумбия	22	http://en.wikipedia.org/wiki/British_Columbia
172	14		10	Prince Edward Island	Остров Принца Эдуарда	22	http://en.wikipedia.org/wiki/Prince_Edward_Island
173	16		18	the Dominion of Newfoundland	Доминион Ньюфаундленд	25	http://en.wikipedia.org/wiki/Newfoundland_and_Labrador
174	0		18	Arctic Islands	Острова Арктики	25	https://en.wikipedia.org/wiki/British_Arctic_Territories
175	2		5	Colorado	Колорадо	2	http://en.wikipedia.org/wiki/Colorado
176	14		17	the Keewatin District	Киватин	24	https://en.wikipedia.org/wiki/District_of_Keewatin
177	14	9;16	16	Disputed Land	Спорная территория	21	https://en.wikipedia.org/wiki/District_of_Keewatin
178	8		2	Tepic	Тепик	10	
179	14		10	Quebec	Северо-Западные территории	22	http://en.wikipedia.org/wiki/Northwest_Territories
180	14	10;17	16	Disputed Land	Спорная территория	21	https://en.wikipedia.org/wiki/District_of_Keewatin
181	2		5	Montana	Монтана	2	http://en.wikipedia.org/wiki/Montana
182	2		5	North Dakota	Северная Дакота	2	http://en.wikipedia.org/wiki/North_Dakota
183	2		5	Washington	Вашингтон	2	http://en.wikipedia.org/wiki/Washington_(state)
184	2		5	South Dakota	Южная Дакота	2	http://en.wikipedia.org/wiki/South_Dakota
185	14		10	Quebec	Квебек	22	http://en.wikipedia.org/wiki/Quebec
186	17		22	Hawaii	Гавайи	26	https://en.wikipedia.org/wiki/Republic_of_Hawaii
187	2		5	Idaho	Айдахо	2	http://en.wikipedia.org/wiki/Idaho
188	2		5	Wyoming	Вайоминг	2	http://en.wikipedia.org/wiki/Wyoming
189	2		5	Территория	Гавайи	27	http://en.wikipedia.org/wiki/Hawaii
190	2		5	Utah	Юта	2	http://en.wikipedia.org/wiki/Utah
191	14		17	Yukon	Юкон	24	http://en.wikipedia.org/wiki/Yukon
192	8		2	Quintana Roo	Кинтана-Роо	10	
193	14		10	Alberta	Альберта	22	http://en.wikipedia.org/wiki/Alberta
194	14		10	Saskatchewan	Саскачеван	22	http://en.wikipedia.org/wiki/Saskatchewan
195	2		5	Oklahoma	Оклахома	2	http://en.wikipedia.org/wiki/Oklahoma
196	18		18	Newfoundland	Доминион Ньюфаундленд	25	http://en.wikipedia.org/wiki/Newfoundland_and_Labrador
197	2		5	Arizona	Аризона	2	http://en.wikipedia.org/wiki/Arizona
198	2		5	New Mexico	Нью-Мексико	2	http://en.wikipedia.org/wiki/New_Mexico
199	8		3	Nayarit	Наярит	11	
200	8		2	Baja California Sur	Южная Нижняя Калифорния	10	https://en.wikipedia.org/wiki/Baja_California_Sur
201	16		18	Newfoundland	Доминион Ньюфаундленд	25	http://en.wikipedia.org/wiki/Newfoundland_and_Labrador
202	14		10	Newfoundland and Labrador	Ньюфаундленд и Лабрадор	22	http://en.wikipedia.org/wiki/Newfoundland_and_Labrador
203	8		3	Baja California	Нижняя Калифорния	11	https://en.wikipedia.org/wiki/Baja_California
204	2		5	Hawaii	Гавайи	2	http://en.wikipedia.org/wiki/Hawaii
205	2		5	Alaska	Аляска	2	http://en.wikipedia.org/wiki/Alaska
206	8		3	Baja California Sur	Южная Нижняя Калифорния	11	https://en.wikipedia.org/wiki/Baja_California_Sur
207	8		3	Quintana Roo	Кинтана-Роо	11	
208	14		17	Nunavut	Нунавут	24	http://en.wikipedia.org/wiki/Nunavut
\.


--
-- TOC entry 2175 (class 0 OID 0)
-- Dependencies: 193
-- Name: properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('properties_id_seq', 1, false);


--
-- TOC entry 2048 (class 2606 OID 16436)
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (id);


--
-- TOC entry 2049 (class 2606 OID 16437)
-- Name: properties properties_admin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY properties
    ADD CONSTRAINT properties_admin_fkey FOREIGN KEY (admin) REFERENCES admin(id);


--
-- TOC entry 2050 (class 2606 OID 16442)
-- Name: properties properties_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY properties
    ADD CONSTRAINT properties_type_fkey FOREIGN KEY (type) REFERENCES type(id);


-- Completed on 2017-04-05 18:02:49

--
-- PostgreSQL database dump complete
--

