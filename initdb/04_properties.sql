--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.4
-- Dumped by pg_dump version 9.6.4

-- Started on 2017-08-30 18:54:13 UTC

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
-- TOC entry 191 (class 1259 OID 16738)
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
-- TOC entry 192 (class 1259 OID 16744)
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
-- TOC entry 2233 (class 0 OID 0)
-- Dependencies: 192
-- Name: properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE properties_id_seq OWNED BY properties.id;


--
-- TOC entry 2105 (class 2604 OID 16746)
-- Name: properties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY properties ALTER COLUMN id SET DEFAULT nextval('properties_id_seq'::regclass);


--
-- TOC entry 2227 (class 0 OID 16738)
-- Dependencies: 191
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY properties (id, admin, disputed, color, name, nameru, type, wikipedia) FROM stdin;
4	2		#bdd7e7	Massachusetts	Массачусетс	2	http://en.wikipedia.org/wiki/Massachusetts
5	2		#bdd7e7	Connecticut	Коннектикут	2	http://en.wikipedia.org/wiki/Connecticut
6	2		#bdd7e7	New Hampshire	Нью-Гэмпшир	2	http://en.wikipedia.org/wiki/New_Hampshire
7	2		#bdd7e7	Rhode Island	Род-Айленд	2	http://en.wikipedia.org/wiki/Rhode_Island
9	2		#bdd7e7	Virginia	Виргиния	2	http://en.wikipedia.org/wiki/Virginia
10	2		#bdd7e7	Delaware	Делавэр	2	http://en.wikipedia.org/wiki/Delaware
12	2		#bdd7e7	Maryland	Мэриленд	2	http://en.wikipedia.org/wiki/Maryland
13	2		#bdd7e7	New Jersey	Нью-Джерси	2	http://en.wikipedia.org/wiki/New_Jersey
14	2		#bdd7e7	New York	Нью-Йорк	2	http://en.wikipedia.org/wiki/New_York
15	2		#bdd7e7	Pennsylvania	Пенсильвания	2	http://en.wikipedia.org/wiki/Pennsylvania
21	2		#bdd7e7	Georgia	Джорджия	2	http://en.wikipedia.org/wiki/Georgia_(U.S._state)
22	2		#bdd7e7	South Carolina	Южная Каролина	2	http://en.wikipedia.org/wiki/South_Carolina
57	4	#ffffcc;#6baed6;#d7b5d8	#111111	Disputed land	Спорные земли	6	
62	4	#ffffcc;#d7b5d8	#111111	Disputed land	Спорные земли	6	
16	2		#6baed6	District of Maine	Округ Мэн	5	https://en.wikipedia.org/wiki/District_of_Maine
27	2		#6baed6	Northwest territory	Северо-западная территория	5	https://en.wikipedia.org/wiki/Northwest_Territory
30	2		#6baed6	Southwest Territory	Юго-западная Территория	5	http://en.wikipedia.org/wiki/Tennessee
38	2		#6baed6	Mississippi	Миссисипи	5	http://en.wikipedia.org/wiki/Mississippi
40	2		#6baed6	unorganized territory	неогранизованная территор	5	
41	2		#6baed6	Indiana	Индиана	5	http://en.wikipedia.org/wiki/Indiana
44	2		#6baed6	District of Louisiana	Округ Луизиана	5	https://en.wikipedia.org/wiki/District_of_Louisiana
47	2		#6baed6	Louisiana	Луизиана	5	http://en.wikipedia.org/wiki/Missouri
48	2		#6baed6	Territory of Orleans	Орлеанская территория	5	https://en.wikipedia.org/wiki/Louisiana
49	2		#6baed6	Michigan	Мичиган	5	http://en.wikipedia.org/wiki/Michigan
50	2		#6baed6	Illinois	Иллинойс	5	http://en.wikipedia.org/wiki/Illinois
51	2		#6baed6	Missouri	Миссури	5	http://en.wikipedia.org/wiki/Missouri
54	2		#6baed6	Alabama	Алабама	5	http://en.wikipedia.org/wiki/Alabama
58	2		#6baed6	Arkansas	Арканзас	5	http://en.wikipedia.org/wiki/Arkansas
60	2		#6baed6	Florida	Флорида	5	http://en.wikipedia.org/wiki/Florida
63	2		#6baed6	unorganized territory	неогранизованная тер	5	
11	2		#08519c	District of Columbia	округ Колумбия	4	http://en.wikipedia.org/wiki/Washington,_D.C.
29	5		#fbb4b9	Russian America	Русская Америкa	7	https://en.wikipedia.org/wiki/Russian_America
3	1		#d7b5d8	New Spain	Новая Испания	1	https://en.wikipedia.org/wiki/New_Spain
19	1		#d7b5d8	Louisiana	Луизиана	0	https://en.wikipedia.org/wiki/Louisiana_(New_France)
20	1		#d7b5d8	La Florida	Испанская Флорида	5	https://en.wikipedia.org/wiki/Spanish_Florida
26	1		#d7b5d8	Republic of West Florida	Западная Флорида	5	https://en.wikipedia.org/wiki/Republic_of_West_Florida
39	7		#d7b5d8	La Louisiane	Округ Луизиана	9	https://en.wikipedia.org/wiki/Louisiana_(New_France)
8	3		#253494	Vermont	Республика Вермонт	3	https://en.wikipedia.org/wiki/Vermont_Republic
35	6		#fe9929	Hawaii	Гавайи	8	https://en.wikipedia.org/wiki/Kingdom_of_Hawaii
24	4	#ffffcc;#6baed6	#111111	Disputed land	Спорные земли	6	
28	4	#bdd7e7;#d7b5d8	#111111	Disputed land	Спорные земли	6	
31	4	#ffffcc;#d7b5d8	#111111	Disputed land	Спорные земли	6	
45	4	#ffffcc;#fbb4b9	#111111	Disputed land	Спорные земли	6	
65	8		#edf8e9	Baja California	Нижняя Калифорния	10	https://en.wikipedia.org/wiki/Baja_California
70	8		#edf8e9	Colima	Колима	10	
76	8		#edf8e9	Tlaxcala	Тласкала	10	
66	8		#bae4b3	Durango	Дуранго	11	
67	8		#bae4b3	Sonora y Sinaloa	Сонора и Синалоа	11	https://en.wikipedia.org/wiki/Estado_de_Occidente
68	8		#bae4b3	Zacatecas	Сакатекас	11	
69	8		#bae4b3	San Luis Potosi	Сан-Луис-Потоси	11	
71	8		#bae4b3	Jalisco	Халиско	11	
72	8		#bae4b3	Michoacаn	Мичоакан	11	
73	8		#bae4b3	Oaxaca	Оахака	11	
74	8		#bae4b3	Puebla	Пуэбла	11	
75	8		#bae4b3	Tabasco	Табаско	11	
79	8		#bae4b3	Mexico	Мехико	11	
77	8		#006d2c	Distrito Federal	Федеральный округ	12	
95	2		#bdd7e7	Arkansas	Арканзас	2	http://en.wikipedia.org/wiki/Arkansas
100	2		#bdd7e7	Michigan	Мичиган	2	http://en.wikipedia.org/wiki/Michigan
105	2		#bdd7e7	Florida	Флорида	2	http://en.wikipedia.org/wiki/Florida
106	2		#bdd7e7	Texas	Техас	2	http://en.wikipedia.org/wiki/Texas
107	2		#bdd7e7	Iowa	Айова	2	http://en.wikipedia.org/wiki/Iowa
111	2		#bdd7e7	Wisconsin	Висконсин	2	http://en.wikipedia.org/wiki/Wisconsin
114	2		#bdd7e7	California	Калифорния	2	http://en.wikipedia.org/wiki/California
130	2		#bdd7e7	Minnesota	Миннесота	2	http://en.wikipedia.org/wiki/Minnesota
131	2		#bdd7e7	Oregon	Орегон	2	http://en.wikipedia.org/wiki/Oregon
136	2		#bdd7e7	Kansas	Канзас	2	http://en.wikipedia.org/wiki/Kansas
84	2		#6baed6	unorganized territory	неогранизованная тер	5	http://en.wikipedia.org/wiki/Kansas
94	2		#6baed6	Wisconsin	Висконсин	5	http://en.wikipedia.org/wiki/Wisconsin
101	2		#6baed6	Iowa	Айова	5	http://en.wikipedia.org/wiki/Iowa
109	2		#6baed6	unorganied territory	неогранизованная территор	5	http://en.wikipedia.org/wiki/California
110	2		#6baed6	Oregon	Орегон	5	http://en.wikipedia.org/wiki/Oregon
112	2		#6baed6	Minnesota	Миннесота	5	http://en.wikipedia.org/wiki/Minnesota
115	2		#6baed6	New Mexico	Нью-Мексико	5	http://en.wikipedia.org/wiki/New_Mexico
116	2		#6baed6	Utah	Юта	5	http://en.wikipedia.org/wiki/Utah
117	2		#6baed6	unorganized territory	неогранизованная тер	15	http://en.wikipedia.org/wiki/Kansas
118	2		#6baed6	Neutral Strip	Оклахома	16	https://en.wikipedia.org/wiki/Oklahoma_Panhandle
119	2		#6baed6	Washington	Вашингтон	5	http://en.wikipedia.org/wiki/Washington_(state)
120	2		#6baed6	unorganized territory	неогранизованная тер	15	
121	2		#6baed6	Kansas	Канзас	5	http://en.wikipedia.org/wiki/Kansas
122	2		#6baed6	Nebraska	Небраска	5	http://en.wikipedia.org/wiki/Nebraska
123	2		#6baed6	Oklahoma	Оклахома	5	http://en.wikipedia.org/wiki/Oklahoma
124	2		#6baed6	Indian Territory	Индейская Территория	5	https://en.wikipedia.org/wiki/Indian_Territory
98	9		#8c96c6	Republic of Texas	Республика Техас	3	https://en.wikipedia.org/wiki/Republic_of_Texas
108	11		#41ab5d	Yucatаn	Юкатан	13	https://en.wikipedia.org/wiki/Republic_of_Yucat%C3%A1n
135	12		#fcae91	Arkansas	Арканзас	17	http://en.wikipedia.org/wiki/Arkansas
138	12		#fcae91	Louisiana	Луизиана	17	https://en.wikipedia.org/wiki/Louisiana
139	12		#fcae91	Texas	Техас	19	http://en.wikipedia.org/wiki/Texas
140	12		#fcae91	Alabama	Алабама	17	http://en.wikipedia.org/wiki/Alabama
102	10		#d7b5d8	Republic of the Rio Grande	Республика Рио Гранде	13	https://en.wikipedia.org/wiki/Republic_of_the_Rio_Grande
96	4	#edf8e9;#8c96c6	#111111	Disputed land	Спорные земли	6	
104	4	#bae4b3;#d7b5d8	#111111	Disputed land	Спорные земли	6	
137	2	#d7b5d8;#fcae91	#111111	Missouri	Миссури	18	http://en.wikipedia.org/wiki/Missouri
151	8		#bae4b3	Campeche	Кампече	11	
166	8		#bae4b3	Hidalgo	Идальго	11	
167	8		#bae4b3	Morelos	Морелос	11	
199	8		#bae4b3	Nayarit	Наярит	11	
154	2		#bdd7e7	West Virginia	Западная Виргиния	2	http://en.wikipedia.org/wiki/West_Virginia
156	2		#bdd7e7	Nevada	Невада	2	http://en.wikipedia.org/wiki/Nevada
161	2		#bdd7e7	Nebraska	Небраска	2	http://en.wikipedia.org/wiki/Nebraska
175	2		#bdd7e7	Colorado	Колорадо	2	http://en.wikipedia.org/wiki/Colorado
181	2		#bdd7e7	Montana	Монтана	2	http://en.wikipedia.org/wiki/Montana
152	2		#6baed6	Idaho	Айдахо	5	http://en.wikipedia.org/wiki/Idaho
153	2		#6baed6	Arizona	Аризона	5	http://en.wikipedia.org/wiki/Arizona
155	2		#6baed6	Montana	Монтана	5	http://en.wikipedia.org/wiki/Montana
162	2		#6baed6	Alaska Territory	Территория Аляска	5	http://en.wikipedia.org/wiki/Alaska
165	2		#6baed6	Wyoming	Вайоминг	23	http://en.wikipedia.org/wiki/Wyoming
159	14		#9e9ac8	New Brunswick	Нью-Брансуик	22	http://en.wikipedia.org/wiki/New_Brunswick
160	14		#9e9ac8	Nova Scotia	Новая Шотландия	22	http://en.wikipedia.org/wiki/Nova_Scotia
163	14		#9e9ac8	Ontario	Онтарио	22	http://en.wikipedia.org/wiki/Ontario
164	14		#9e9ac8	Quebec	Квебек	22	http://en.wikipedia.org/wiki/Northwest_Territories
168	14		#9e9ac8	Manitoba	Манитоба	22	http://en.wikipedia.org/wiki/Manitoba
171	14		#9e9ac8	British Columbia	Британская Колумбия	22	http://en.wikipedia.org/wiki/British_Columbia
172	14		#9e9ac8	Prince Edward Island	Остров Принца Эдуарда	22	http://en.wikipedia.org/wiki/Prince_Edward_Island
179	14		#9e9ac8	Quebec	Северо-Западные территории	22	http://en.wikipedia.org/wiki/Northwest_Territories
185	14		#9e9ac8	Quebec	Квебек	22	http://en.wikipedia.org/wiki/Quebec
141	12		#fcae91	Florida	Флорида	17	http://en.wikipedia.org/wiki/Florida
142	12		#fcae91	Georgia	Джорджия	17	http://en.wikipedia.org/wiki/Georgia_(U.S._state)
143	12		#fcae91	Mississippi	Миссисипи	17	http://en.wikipedia.org/wiki/Mississippi
144	12		#fcae91	South Carolina	Южная Каролина	17	http://en.wikipedia.org/wiki/South_Carolina
146	12		#fcae91	North Carolina	Северная Каролина	17	http://en.wikipedia.org/wiki/North_Carolina
147	12		#fcae91	Tennessee	Теннесси	17	http://en.wikipedia.org/wiki/Tennessee
148	12		#fcae91	Virginia	Виргиния	17	http://en.wikipedia.org/wiki/Virginia
157	13		#fcae91	Virginia	Виргиния	17	http://en.wikipedia.org/wiki/Virginia
149	12		#fb6a4a	Indian Territory	Индейская Территория	20	https://en.wikipedia.org/wiki/Indian_Territory
150	12		#fb6a4a	Arizona	Аризона	20	http://en.wikipedia.org/wiki/Arizona
177	14	9;16	#111111	Disputed Land	Спорная территория	21	https://en.wikipedia.org/wiki/District_of_Keewatin
169	14		#756bb1	Northwest Territories	Северо-Западные территории	24	http://en.wikipedia.org/wiki/Northwest_Territories
176	14		#756bb1	the Keewatin District	Киватин	24	https://en.wikipedia.org/wiki/District_of_Keewatin
191	14		#756bb1	Yukon	Юкон	24	http://en.wikipedia.org/wiki/Yukon
173	16		#d7b5d8	the Dominion of Newfoundland	Доминион Ньюфаундленд	25	http://en.wikipedia.org/wiki/Newfoundland_and_Labrador
174	0		#d7b5d8	Arctic Islands	Острова Арктики	25	https://en.wikipedia.org/wiki/British_Arctic_Territories
196	18		#d7b5d8	Newfoundland	Доминион Ньюфаундленд	25	http://en.wikipedia.org/wiki/Newfoundland_and_Labrador
201	16		#d7b5d8	Newfoundland	Доминион Ньюфаундленд	25	http://en.wikipedia.org/wiki/Newfoundland_and_Labrador
186	17		#993404	Hawaii	Гавайи	26	https://en.wikipedia.org/wiki/Republic_of_Hawaii
145	2	#d7b5d8;#fcae91	#111111	Kentucky	Кентукки	18	http://en.wikipedia.org/wiki/Kentucky
158	2	#d7b5d8;#6baed6	#111111	Greer County	Округ Грир	21	https://en.wikipedia.org/wiki/Greer_County,_Texas
170	15	#6baed6;#9e9ac8	#111111	Alaska Disputed Territory	Территория Аляска (спор)	21	https://en.wikipedia.org/wiki/Alaska_boundary_dispute
180	14	#9e9ac8;#756bb1	#111111	Disputed Land	Спорная территория	21	https://en.wikipedia.org/wiki/District_of_Keewatin
0	0		#ffffcc	New Brunswick	Нью-Брансуик	0	http://en.wikipedia.org/wiki/New_Brunswick
1	0		#ffffcc	Nova Scotia	Новая Шотландия	0	http://en.wikipedia.org/wiki/Nova_Scotia
2	0		#ffffcc	Prince Edward Island	Остров Принца Эдуарда	0	http://en.wikipedia.org/wiki/Prince_Edward_Island
17	0		#ffffcc	the Dominion of Newfoundland	Доминион Ньюфаундленд	0	http://en.wikipedia.org/wiki/Newfoundland_and_Labrador
18	0		#ffffcc	Rupert's Land	Земля Руперта	0	https://en.wikipedia.org/wiki/Rupert%27s_Land
25	0		#ffffcc	Province of Quebec	Провинция Квебек	0	https://en.wikipedia.org/wiki/Province_of_Quebec_(1763%E2%80%931791)
33	0		#ffffcc	Upper Canada	Верхняя Канада	0	https://en.wikipedia.org/wiki/Upper_Canada
34	0		#ffffcc	Lower Canada	Нижняя Канада	0	https://en.wikipedia.org/wiki/Lower_Canada
43	0		#ffffcc	Arctic Islands	Острова Арктики	0	https://en.wikipedia.org/wiki/British_Arctic_Territories
46	0		#ffffcc	Northwest Territories	Северо-Западные территории	0	http://en.wikipedia.org/wiki/Northwest_Territories
103	0		#ffffcc	Province of Canada	Провинция Канада	0	https://en.wikipedia.org/wiki/Province_of_Canada
129	0		#ffffcc	British Columbia	Британская Колумбия	0	http://en.wikipedia.org/wiki/British_Columbia
83	8		#edf8e9	Alta California		10	http://en.wikipedia.org/wiki/California
86	8		#edf8e9	Nuevo Mexico	Нью-Мексико	10	https://es.wikipedia.org/wiki/Nuevo_M%C3%A9xico
93	8		#edf8e9	Aguascalientes	Агуаскальентес	10	
97	8		#edf8e9	Nuevo Mexico	Нью-Мексико	10	http://en.wikipedia.org/wiki/California
113	8		#edf8e9	unorganized territory	неогранизованная тер	14	
178	8		#edf8e9	Tepic	Тепик	10	
192	8		#edf8e9	Quintana Roo	Кинтана-Роо	10	
200	8		#edf8e9	Baja California Sur	Южная Нижняя Калифорния	10	https://en.wikipedia.org/wiki/Baja_California_Sur
78	8		#bae4b3	Guanajuato	Гуанахуато	11	
80	8		#bae4b3	Querеtaro	Керетаро	11	
81	8		#bae4b3	Veracruz	Веракрус	11	
82	8		#bae4b3	Chiapas	Чьяпас	11	
85	8		#bae4b3	Chihuahua	Чиуауа	11	https://en.wikipedia.org/wiki/Chihuahua_(state)
87	8		#bae4b3	Yucatаn	Юкатан	11	
88	8		#bae4b3	Nuevo Leon	Нуэво-Леон	11	https://en.wikipedia.org/wiki/Nuevo_Le%C3%B3n
89	8		#bae4b3	Tamaulipas	Тамаулипас	11	https://en.wikipedia.org/wiki/Tamaulipas
90	8		#bae4b3	Coahuila y Texas	Коауила и Техас	11	https://en.wikipedia.org/wiki/Coahuila
91	8		#bae4b3	Sinaloa	Синалоа	11	
92	8		#bae4b3	Sonora	Сонора	11	https://en.wikipedia.org/wiki/Sonora
99	8		#bae4b3	Coahuila	Коауила	11	https://en.wikipedia.org/wiki/Coahuila
125	8		#bae4b3	Aguascalientes	Агуаскальентес	11	
126	8		#bae4b3	Colima	Колима	11	
127	8		#bae4b3	Tlaxcala	Тласкала	11	
128	8		#bae4b3	Guerrero	Герреро	11	
203	8		#bae4b3	Baja California	Нижняя Калифорния	11	https://en.wikipedia.org/wiki/Baja_California
206	8		#bae4b3	Baja California Sur	Южная Нижняя Калифорния	11	https://en.wikipedia.org/wiki/Baja_California_Sur
207	8		#bae4b3	Quintana Roo	Кинтана-Роо	11	
23	2		#bdd7e7	North Carolina	Северная Каролина	2	http://en.wikipedia.org/wiki/North_Carolina
32	2		#bdd7e7	Vermont	Вермонт	2	http://en.wikipedia.org/wiki/Vermont
36	2		#bdd7e7	Kentucky	Кентукки	2	http://en.wikipedia.org/wiki/Kentucky
37	2		#bdd7e7	Tennessee	Теннесси	2	http://en.wikipedia.org/wiki/Tennessee
42	2		#bdd7e7	Ohio	Огайо	2	http://en.wikipedia.org/wiki/Ohio
52	2		#bdd7e7	Louisiana	Луизиана	2	https://en.wikipedia.org/wiki/Louisiana
53	2		#bdd7e7	Indiana	Индиана	2	http://en.wikipedia.org/wiki/Indiana
55	2		#bdd7e7	Mississippi	Миссисипи	2	http://en.wikipedia.org/wiki/Mississippi
56	2		#bdd7e7	Illinois	Иллинойс	2	http://en.wikipedia.org/wiki/Illinois
59	2		#bdd7e7	Alabama	Алабама	2	http://en.wikipedia.org/wiki/Alabama
61	2		#bdd7e7	Maine	Мэн	2	http://en.wikipedia.org/wiki/Maine
64	2		#bdd7e7	Missouri	Миссури	2	http://en.wikipedia.org/wiki/Missouri
182	2		#bdd7e7	North Dakota	Северная Дакота	2	http://en.wikipedia.org/wiki/North_Dakota
183	2		#bdd7e7	Washington	Вашингтон	2	http://en.wikipedia.org/wiki/Washington_(state)
184	2		#bdd7e7	South Dakota	Южная Дакота	2	http://en.wikipedia.org/wiki/South_Dakota
187	2		#bdd7e7	Idaho	Айдахо	2	http://en.wikipedia.org/wiki/Idaho
188	2		#bdd7e7	Wyoming	Вайоминг	2	http://en.wikipedia.org/wiki/Wyoming
189	2		#bdd7e7	Территория	Гавайи	27	http://en.wikipedia.org/wiki/Hawaii
190	2		#bdd7e7	Utah	Юта	2	http://en.wikipedia.org/wiki/Utah
195	2		#bdd7e7	Oklahoma	Оклахома	2	http://en.wikipedia.org/wiki/Oklahoma
197	2		#bdd7e7	Arizona	Аризона	2	http://en.wikipedia.org/wiki/Arizona
198	2		#bdd7e7	New Mexico	Нью-Мексико	2	http://en.wikipedia.org/wiki/New_Mexico
204	2		#bdd7e7	Hawaii	Гавайи	2	http://en.wikipedia.org/wiki/Hawaii
205	2		#bdd7e7	Alaska	Аляска	2	http://en.wikipedia.org/wiki/Alaska
132	2		#6baed6	Dakota	Дакота	5	http://en.wikipedia.org/wiki/North_Dakota
133	2		#6baed6	Colorado	Колорадо	5	http://en.wikipedia.org/wiki/Colorado
134	2		#6baed6	Nevada	Невада	5	http://en.wikipedia.org/wiki/Nevada
193	14		#9e9ac8	Alberta	Альберта	22	http://en.wikipedia.org/wiki/Alberta
194	14		#9e9ac8	Saskatchewan	Саскачеван	22	http://en.wikipedia.org/wiki/Saskatchewan
202	14		#9e9ac8	Newfoundland and Labrador	Ньюфаундленд и Лабрадор	22	http://en.wikipedia.org/wiki/Newfoundland_and_Labrador
208	14		#756bb1	Nunavut	Нунавут	24	http://en.wikipedia.org/wiki/Nunavut
\.


--
-- TOC entry 2234 (class 0 OID 0)
-- Dependencies: 192
-- Name: properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('properties_id_seq', 209, false);


--
-- TOC entry 2107 (class 2606 OID 16748)
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (id);


--
-- TOC entry 2108 (class 2606 OID 16749)
-- Name: properties properties_admin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY properties
    ADD CONSTRAINT properties_admin_fkey FOREIGN KEY (admin) REFERENCES admin(id);


--
-- TOC entry 2109 (class 2606 OID 16754)
-- Name: properties properties_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY properties
    ADD CONSTRAINT properties_type_fkey FOREIGN KEY (type) REFERENCES type(id);


-- Completed on 2017-08-30 18:54:13 UTC

--
-- PostgreSQL database dump complete
--

