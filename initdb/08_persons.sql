--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.4
-- Dumped by pg_dump version 9.6.4

-- Started on 2017-08-21 13:47:28 UTC

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
-- TOC entry 202 (class 1259 OID 33240)
-- Name: persons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE persons (
    id serial PRIMARY KEY,
    name_eng text,
    name_rus text,
    birth_date text,
    birth_place bigint,
    death_date text,
    death_place bigint
);


ALTER TABLE persons OWNER TO postgres;



--CREATE SEQUENCE persons_id_seq
 --   START WITH 1
 --   INCREMENT BY 1
 --   NO MINVALUE
 --   NO MAXVALUE
 --   CACHE 1;

--ALTER TABLE persons_id_seq OWNER TO postgres;

--ALTER TABLE ONLY persons ALTER COLUMN id SET DEFAULT nextval('persons_id_seq'::regclass);

--ALTER TABLE ONLY persons
--    ADD CONSTRAINT persons_pkey PRIMARY KEY (id);

--
-- TOC entry 2171 (class 0 OID 33240)
-- Dependencies: 202
-- Data for Name: persons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY persons (id, name_eng, name_rus, birth_date, birth_place, death_date, death_place) FROM stdin;
1	William Penn	Уильям Пэнн	1644-10-14	0	1718-07-30	0
2	Benjamin Franklin	Бенджамин Франклин	1706-01-17	267	1718-07-30	269
3	Thomas Godfrey	Томас Годфри	1704-12	269	1749-12	269
4	Frederick Graff	Фредерик Графф	1775-08-27	269	1847-04-18	269
5	Oliver Evans	Оливер Эванс	1755-08-13	287	1819-04-15	285
6	Tabitha Babbitt	Табита Бабитт	1779-12-09	288	1853	0
7	Joseph Henry	Джозеф Генри	1797-12-17	156	1878-05-13	284
8	Hiram Moore	Хайрам Мур	1817-03-17	289	1902-03-06	290
9	Alexander Cartwright	Александр Картрайт	1820-04-17	285	1892-07-12	260
10	Ebenezer Thorndike	Эбенезер Торндайк	1719-07-09	292	1820	293
11	Royal Earl House	Роял Эрл Хаус	1814-09-09	0	1895-02-25	0
12	Samuel Morse	Сэмюэл Морзе	1791-04-27	267	1872-04-02	285
13	Alfred Vail	Альфред Вейл	1807-09-25	296	1859-01-18	296
14	Crawford Long	Кроуфорд Лонг	1815-10-01	295	1878-06-16	297
15	Lewis Haslett	Льюис Хаслетт	\N	151	\N	68
16	Walter Hunt	Уолтер Хант	1796-07-29	298	1859-06-08	285
17	J. Lawrence Smith	Дж. Лоуренс Смит	1818-12-17	136	1883-10-12	151
18	George Crum	Джордж Крам	1824	300	1914-07-22	0
19	David M. Smith	Дэвид М. Смит	1809	301	1881-10-10	302
20	Joshua C. Stoddard	Джошуа С. Стоддард	1814-08-26	303	\N	0
21	Gail Borden	Гейл Борден	1801-10-09	304	1874-01-11	0
22	William Austin Burt	Уильям Остин Бёрт	1792-06-13	305	1858-08-18	270
23	Joseph Gayetty	Джозеф Гейти	1827	0	\N	0
24	Hymen Lipman	Хаймен Липман	1817-03-20	0	1893-11-04	269
25	Nathan Ames	Натан Эймс	1826-11-17	306	1856-08-17	307
26	Daniel Hess	Дэниель Хесс	\N	0	\N	0
27	Coleman Sellers II	Колман Селлерс II	1827-01-28	269	1907-12-28	0
28	John P. Charlton	Джон Чарльтон	\N	0	\N	0
29	Richard Jordan Gatling	Ричард Джордан Гатлинг 	1818-09-12	0	1903-02-26	285
30	John Batterson Stetson	Джон Баттерсон Стетсон	1830-05-05	309	1906-02-18	310
31	William Bullock	Уильям Буллок	1813	311	1867-04-12	312
32	Lucien B. Smith	Люсьен Б. Смит	\N	0	\N	0
33	J.B. Sutherland	Д. Б. Сазерлэнд	\N	0	\N	0
34	Margaret E. Knight	Маргарет Найт	1838-02-14	314	1914-10-12	14
35	Daniel Chapman Stillson	Дэниель Чепмэн Стилсон	1826-03-25	315	1899-08-23	0
36	William Lyman 	Уильям Лайман	1821-03-29	317	1891-11-15	318
37	George Westinghouse	Джордж Вестингауз	1846-10-06	319	1914-03-12	285
38	Chester Greenwood	Честер Гринвуд	1858-12-04	320	1937-07-05	320
39	Jacob W. Davis	Джейкоб Дэвис	1831	0	1908	276
40	Levi Strauss	Ливай Страусс	1829-02-26	0	1902-09-26	276
41	Eli H. Janney	Эли Джанней	1831-11-12	321	1912-06-16	68
42	Christopher Latham Sholes	Кристофер Лэтем Шоулз	1819-02-14	322	1890-02-17	235
43	George F. Green	Джордж Ф. Грин	\N	0	\N	0
44	Elisha Gray	Элиша Грей	1835-08-02	324	1901-01-21	325
45	Thomas Edison	Томас Эдисон	1847-02-11	326	1931-10-18	327
46	Birdsill Holly	Бердсилл Холли	1820-11-08	329	1894-04-27	330
47	Lester Allan Pelton	Лестер Аллан Пелтон	1829-09-05	331	1908-03-14	135
48	George Eastman	Джордж Истмен	1854-07-12	333	1932-03-14	166
49	James Jacob Ritty	Джеймс Джейкоб Ритти	1836-10-29	114	1918-03-29	114
50	Alfred P. Southwick	Альфред Саусвик	1826	236	1898	236
51	Alexander Graham Bell	Александр Грэйам Белл	1847-03-03	0	1922-08-02	0
52	Schuyler Wheeler	Шуйлер Вилер	1860-05-17	0	1923-04-20	285
53	Charles Fritts	Чарльз Фритс	1850	0	1903	0
54	Hiram Maxim	Хайрем Максим	1840-02-05	334	1916-11-24	0
55	William Le Baron Jenney	Уильям Ле Барон Дженни	1832-09-25	335	1907-06-14	283
56	Charles Cretors	Чарльз Криторз	1852-12-11	336	1934-06-24	279
57	Emile Berliner	Эмиль Берлинер	1851-05-20	0	1929-08-03	284
58	Charles Fey	Чарльз Фей	1862-09-09	0	1944-11-10	276
59	Frank J. Sprague	Фрэнк Спрэйг	1857-07-25	337	1934-10-25	0
60	Marvin Stone	Марвин Стоун	1842	0	1899-05-17	284
61	Almon Brown Strowger	Элмон Браун Строуджер	1839-02-11	338	1902-05-26	110
62	Frank Edward McGurrin	Фрэнк Эдвард Макгуррин	1861-04-02	72	1933-08-17	135
63	William Phelps Eno	Уильям Фелпс Ино	1858-06-03	285	1945-12-03	0
64	Francis Robbins Upton	Френсис Роббинс Аптон	1852	339	1921-03-10	0
65	George Washington Gale Ferris Jr.	Джордж Феррис	1859-02-14	340	1896-11-22	312
66	Nikola Tesla	Никола Тесла	1856-07-10	0	1943-01-07	285
67	William Painter	Уильям Пэйнтер	1838-11-20	0	1906-07-15	196
68	Arthur Lovett Garford	Артут Ловет Гарфорд	1858-08-04	0	1933-01-23	341
69	Whitcomb L. Judson	Уайткомб Л. Джадсон	1846-03-07	279	1909-12-07	342
70	William Stewart Halsted	Уильям Стюарт Холстед	1852-09-23	285	1922-09-07	196
71	William G. Morgan	Уильям Морган	1870-01-23	330	1942-12-27	0
72	William Morrison	Уильям Морисон	1860	232	1926	232
73	John Browning	Джон Браунинг	1855-01-23	344	1926-11-26	0
74	Robert R. Montgomery	\N	\N	0	\N	0
75	Peter Cooper Hewitt	Питер Купер Хьюит	1861-05-05	285	1921-08-25	0
76	Ransom E. Olds	Рэнсом Олдс	1864-06-03	345	1950-08-26	119
77	King C. Gillette	Кинг Кэмп Жиллетт	1855-01-05	346	1932-07-09	283
78	John Stone Stone	Джон Стоун	1869-09-24	347	1943-05-20	263
79	Miller Reese Hutchison	Миллер Риз Хатчисон	1876-08-06	348	1944-02-16	285
80	Morris Michtom	Моррис Мичтом	1870	0	1938-07-21	285
81	Simon Lake	Саймон Лейк	1866-09-04	349	1945-06-23	337
82	Willis Carrier	Уиллис Кэрриер	1876-11-26	350	1950-10-07	285
83	Orville Wright	Орвилл Райт	1871-08-19	114	1948-01-30	114
84	Wilbur Wright	Уилбур Райт	1867-04-16	351	1912-05-30	114
85	Mary Anderson	Мэри Андерсон	1866-02-19	353	1953-06-27	354
86	Frederick Gardner Cottrell	Фредерик Гарнер Котрелл	1877-01-10	135	1948-11-16	3
87	Abbot Augustus Low	Эббот Аугустус Лоу	1844	285	1912	0
88	Hiram Percy Maxim	Хайрем Перси Максим	1869-02-17	285	1936-02-17	0
89	Nathaniel Baldwin	Натэниел Болдуин	1878-12-01	355	1961-01-19	0
90	Charles F. Kettering	Чарльз Кеттеринг	1876-08-29	356	1958-11-25	114
91	Lawrence Sperry	Лоуренс Сперри	1892-12-21	279	1923-12-13	0
92	Lester Wire	Лестер Вайр	1887-09-03	221	1958-04-14	221
93	John Renshaw Carson	Джон Реншоу Карсон	1886-06-28	312	1940-10-31	0
94	Clarence Saunders	Клэренс Саундерс	1881-08-09	0	1953-09-23	0
95	Walter Guyton Cady	Уолтер Гайтон Кэйди	1874-12-10	107	1974-12-09	357
96	Charles Strite	Чарльз Страйт	1878-02-27	0	1956-10-18	0
97	John Augustus Larson	Джон Аугустус Ларсон	1892-12-11	358	1965-10-01	3
98	Frank Bunker Gilbreth Sr.	Фрэнк Банкер Гилбрет	1868-07-07	359	1924-06-14	360
99	Ralph Samuelson	Ральф Самюэлсон	1903-07-03	0	1977-08-28	361
100	Harvey Fletcher	Харви Флетчер	1884-09-11	98	1981-07-23	98
101	Samuel Shlafrock	Сэмюэл Шлафрок	1886-08-26	0	1959	285
102	Robert H. Goddard	Роберт Годдард	1882-10-05	57	1945-08-10	196
103	John Dopyera	Джон Допьера	1893-06-06	0	1988-01-03	363
104	Walter Diemer	Уолтер Димер	1904-01-08	269	1998-01-08	364
105	Jacob Schick	Джейкоб Шик	1877-09-16	365	1937-07-03	0
106	Thomas Midgley Jr.	Томас Миджли	1889-05-18	366	1944-11-02	367
107	Sam Foster 	Сэм Фостер	\N	0	\N	0
108	Paul Galvin	Пол Гэлвин	1895-07-27	368	1959-11-05	0
109	William Beebe	Уильям Биб	1877-07-29	285	1962-06-04	0
110	Otis Barton	Отис Бартон	1899-06-05	285	1992-04-15	0
111	George Beauchamp	Жорж Бошам	1899-03-18	0	1941-03-20	283
112	Adolph Rickenbacker	Адольф Рикенбакер	1886-04-03	0	1976-03-21	0
113	Karl Guthe Jansky	Карл Янски	1905-10-22	0	1950-02-14	369
114	Edwin Howard Armstrong	Эдвин Говард Армстронг	1890-12-18	285	1954-01-31	285
115	Charles Francis Richter	Чарльз Фрэнсис Рихтер	1900-04-26	371	1985-09-30	44
116	Beno Gutenberg	Бено Гутенберг	1889-06-04	0	1960-01-25	44
117	Alonzo Church	Алонзо Черч	1903-06-14	284	1995-08-11	372
118	Stephen Cole Kleene	Стивен Коул Клини	1909-01-05	106	1994-01-25	116
119	Paul Tutmarc	Пол Тутмарк	1896-05-29	259	1972-09-25	261
120	George Stibitz	Джордж Штибиц	1904-04-30	373	1995-01-31	374
121	Games Slayter	Геймс Слэйтер	1896-12-09	375	1964-10-15	153
122	Chester Carlson	Честер Карлсон	1906-02-08	261	1968-09-19	285
123	Luther George Simjian	Лютер Джордж Симджян	1905-01-28	0	1997-10-23	60
124	Homer Dudley	Гомер Дадли	1896-11-14	0	1980-09-18	0
125	Jules Montenier	Жюль Монтенье	1895-03-23	0	1962-08-20	0
126	Les Paul	Лес Пол	1915-06-09	376	2009-08-13	285
127	Edward Uhl	Эдвард Ул	1918-03-24	377	2010-05-09	0
128	Percy Spencer	Перси Спенсер	1894-07-19	378	1970-09-08	325
129	Ralph Teetor	Ральф Титор	1890-08-17	379	1982-02-15	379
130	Lyman Spitzer	Лайман Спитцер	1914-06-26	153	1997-03-31	291
131	Marion Donovan	Марион Донован	1917-10-15	63	1998-11-04	285
132	John Bardeen	Джон Бардин	1908-09-23	116	1991-01-30	267
133	Walter Houser Brattain	Уолтер Хаузер Браттейн	1902-02-10	0	1987-10-13	261
134	William Shockley	Уильям Шокли	1910-02-13	0	1989-08-12	380
135	Newman Darby	Ньюман Дэрби	1928-01-31	381	2016-12-03	0
136	John Walson	Джон Уолсон	1915-03-25	383	1993-03-28	382
137	Thomas T. Goldsmith Jr.	Томас Голдсмит	1910-01-09	384	2009-03-05	385
138	Willard Libby	Уиллард Либби	1908-12-17	387	1980-09-08	283
139	Frank Zamboni	Фрэнк Замбони	1901-01-16	388	1988-07-27	389
140	Samuel W. Alderson	Сэмюэл Алдерсон	1914-10-21	230	2005-02-11	390
141	Hubert Schlafly	Хьюберт Шлэфли	1919-08-14	264	2011-04-20	13
142	Bette Nesmith Graham	Бетт Грэм	1924-03-23	266	1980-05-12	391
143	John W. Hetrick	Джон Хетрик	1918-07-23	392	1999-04-08	392
144	Norman Joseph Woodland	Норман Джозеф Вудлэнд	1921-09-06	393	2012-12-09	394
145	John Heysham Gibbon	Джон Хейшам Гиббон	1903-09-29	269	1973-02-05	395
146	Sidney Rosenthal	Сидни Розенталь	1907	285	1979	60
147	Howard Tracy Hall 	Говард Трейси Холл	1919-10-20	344	2008-07-25	98
148	Hyman G. Rickover	Хайман Джордж Риковер	1900-01-27	0	1986-07-08	0
149	Reynold B. Johnson	Рейнольд Джонсон	1906-07-16	0	1998-09-15	397
150	Art Ingels	Арт Ингельс	\N	0	\N	0
151	George Charles Devol, Jr.	Джордж Девол	1912-02-20	151	2011-08-11	398
152	Joseph Engelberger	Джозеф Энгельбергер	1925-07-26	285	2015-12-01	399
153	Charles Ginsburg	Чарльз Гинзбург	1920-07-27	276	1992-04-09	140
154	Ray Dolby	Рэй Долби	1933-01-18	220	2013-09-12	276
155	Gordon Gould	Гордон Гулд	1920-07-17	285	2005-09-16	285
156	Hal Anger	Хэл Энгер	1920-05-20	400	2005-10-31	3
157	Jack Kilby	Джек Килби	1923-11-08	101	2005-06-20	266
158	Joseph Shivers	Джозеф Шиверс	1920-11-29	401	2014-09-01	402
159	Forrest Parry	Форрест Пэрри	1921-07-04	404	2005-12-31	405
160	William R. Bennett, Jr.	Уильям Райт Беннетт	1930-01-30	407	2008-06-29	408
161	Ali Javan	Али Джаван	1926-12-26	0	2016-09-12	283
162	Richard Mattessich	Ричард Маттессич	1922-08-09	0	\N	0
163	Edward O. Thorp	Эдвард Торп	1932-08-14	279	\N	0
164	Claude Shannon	Клод Шеннон	1916-04-30	410	2001-02-24	411
165	John R. Pierce	Джон Робинсон Пирс	1910-03-27	223	2002-04-02	397
166	Nick Holonyak	Ник Холоньяк	1928-11-03	412	\N	0
167	Douglas Engelbart	Дуглас Энгельбарт	1925-01-30	220	2013-07-02	413
168	John G. Kemeny	Джон Кемени	1926-05-31	0	1992-12-26	374
169	Thomas E. Kurtz	Томас Курц	1928-02-22	415	\N	0
170	Donald Bitzer	Дональд Бицер	1934-01-01	416	\N	0
171	Robert Moog	Роберт Муг	1934-05-23	285	2005-08-21	418
172	George H. Heilmeier	Джордж Хейлмейр	1936-05-22	269	2014-04-21	419
173	Stephanie Kwolek	Стефани Кволек	1923-07-31	420	2014-06-18	421
174	George Sweigert	Джордж Свайгерт	1920-02-02	66	1999-02-23	63
175	James Russell 	Джеймс Рассел	1931	422	\N	0
176	Robert H. Dennard	Роберт Деннард	1932-09-05	424	\N	0
177	Ivan Sutherland	Айвен Сазерлэнд	1938-05-16	426	\N	0
178	Bob Sproull	Боб Спраул	1945	0	\N	0
179	Thomas J. Kelly 	Томас Келли	1929-06-14	285	2002-03-23	0
180	Gary Starkweather	Гэри Старкуэзер	1938-01-09	119	\N	0
181	Emmett Chapman	Эмметт Чепмен	1936-09-28	0	\N	0
182	Norman Abramson	Норман Абрамсон	1932-04-01	267	\N	0
183	John V. Blankenbaker	Джон Бланкенбейкер	1929	0	\N	0
184	Marcian Edward "Ted" Hoff	Тед Хофф	1937-10-28	166	\N	0
185	Federico Faggin	Федерико Фаджин	1941-12-01	0	\N	0
186	Stanley Mazor	Стэнли Мэйзор	1941-10-22	279	\N	0
187	Ray Tomlinson	Рэй Томлинсон	1941-04-23	428	2016-03-05	429
188	Ralph H. Baer	Ральф Баер	1922-03-08	0	2014-12-06	58
189	Raymond Vahan Damadian	Реймонд Дамадьян	1936-03-16	285	\N	0
190	Martin Cooper 	Мартин Купер	1928-12-26	279	\N	0
191	Arthur Fry	Артур Фрай	1931-08-19	0	\N	0
192	Spencer Silver	Спенсер Сильвер	1941-02-06	227	\N	0
193	Steven Sasson	Стивен Сассун	1950-07-04	285	\N	0
194	Robert Metcalfe	Роберт Меткалф	1946-04-07	285	\N	0
195	Paul MacCready	Пол Маккриди	1925-09-25	55	2007-08-28	44
196	Ward Christensen	Уард Кристенсен	1945-10-23	433	\N	0
197	Richard T. Whitcomb	Ричард Уиткомб	1921-02-21	434	2009-10-13	435
198	David Bradley	Дэвид Брэдли	1949-01-04	0	\N	0
199	George Mueller 	Джордж Миллер	1918-06-16	264	2015-10-12	436
200	Robert "Bob" Kahn	Роберт Кан	1938-12-23	285	\N	0
201	Vint Cerf	Винтон Серф	1943-06-23	55	\N	0
202	Gene Dolgoff	Джин Долгофф	1950-08-03	0	\N	0
203	Christoph Gerber	Кристоф Гербер	\N	0	\N	0
204	Gerd Binnig	Герд Бинниг	1947-07-20	0	\N	0
205	Calvin Quate	Кельвин Куэйт	1923-12-07	437	\N	0
206	Larry Wall	Ларри Уолл	1949-09-27	283	\N	0
207	William Cheswick	Уильям Чесуик	\N	0	\N	0
208	Steven M. Bellovin	Стивен Белловин	\N	285	\N	0
209	Phil Katz	Фил Кац	1962-11-03	235	2000-04-14	235
210	James McLurkin	Джеймс Маклюркин	1972	0	\N	0
211	Eric Fossum	Эрик Фоссум	1957-10-17	439	\N	0
212	Leonard Adleman	Леонард Адлман	1945-12-31	276	\N	0
213	Dean Kamen	Дин Кеймен	1951-04-05	285	\N	0
214	Eric Michelman	Эрик Мишелман	\N	0	\N	0
215	Brendan Eich	Брендан Эйх	1961-07-04	312	\N	0
216	Jonathan Gay	Джонатан Гей	1967	0	\N	0
217	Richard P. Binzel	Ричард Бинцел	1958	0	\N	0
218	Deborah S. Jin	Дебора Джин	1968-11-15	380	2016-09-15	440
219	Yi Cui	\N	\N	0	\N	0
220	Babak Parviz	\N	\N	0	\N	0
221	Nestor Burtnyk	\N	\N	0	\N	0
222	Marcelli Wein	\N	\N	0	\N	0
223	Christopher Chapman	Кристофер Чэпмен	1927-01-24	282	2015-10-24	441
224	Roman Kroitor	Роман Кройтор	1926-12-12	442	2012-09-17	255
225	Graeme Ferguson	Граем Фергюсон	1929-10-07	282	\N	0
226	Robert Kerr	Роберт Керр	1929-08-28	443	2010-04-29	0
227	Kenyon Taylor	Кенион Тейлор	1908-06-26	0	\N	0
228	Tom Cranston	Том Крэнстон	\N	0	\N	0
229	Fred Longstaff	Фред Лонгстафф	\N	0	\N	0
230	Charles E. Saunders	Чарльз Саундерс	1867-02-02	41	1937-07-25	282
231	John McIntosh	Джон Макинтош	1777-08-15	0	1846	0
232	Marcellus Gilmore Edson	Марселлус Гилмор Эдсон	1849-02-07	445	1940-03-06	275
233	Edward Asselbergs	Эдвард Асселбергс	1927	0	1996	446
234	Frederick Tisdall	Фредерик Тисдолл	1893	0	1949	282
235	Theodore Drake	Теодор Дрейк	1891-09-16	447	1959-10-18	0
236	Alan Brown	Алан Браун	\N	0	1960	0
237	Gary Johnston	Гэри Джонстон	1916	448	\N	0
238	Donald Hings	Дональд Хингз	1907-11-06	0	2004-02-25	450
239	Alfred J. Gross	Альфред Гросс	1918-02-22	282	2000-12-21	451
240	Reginald Fessenden	Реджинальд Фессенден	1866-10-06	452	1932-07-22	0
241	Sandford Fleming	Сэндфорд Флеминг	1827-01-07	0	1915-07-22	256
242	David W. Brunton	Дэвид Брантон	1849-06-11	453	1927-12-20	406
243	Walter Harris Callow	Уолтер Харрис Каллоу	1896	454	1958	0
244	John Michael Lyons	Джон Майкл Лайонс	\N	0	\N	0
245	Frederick Walker Baldwin	Фредерик Уокер Болдуин	1882-01-02	282	1948-08-07	0
246	James C. Floyd	Джеймс Флойд	1914-10-20	0	\N	0
247	Wallace Rupert Turnbull	Уоллэс Руперт Тернбулл	1870-10-16	456	1954-11-24	456
248	Joseph-Armand Bombardier	Жозеф-Арман Бомбардье	1907-04-16	457	1964-02-18	43
249	Ben Gulak	Бен Гулак	1989	458	\N	0
250	George Klein 	Джордж Клейн	1904-08-15	459	1992-11-04	254
251	Helmut Lucas	Хельмут Лукас	\N	0	\N	0
252	Benjamin Franklin Tibbetts	Бенджамин Франклин Тиббеттс	1813	0	1853-11-19	0
253	Thomas Ahearn	Томас Ахерн	1855-06-24	254	1938-06-28	254
254	Arthur Sicard	Артур Сикар	1876-12-17	275	1946-09-13	0
255	Robert Foulis	Роберт Фоулис	1796-05-05	0	1866-01-28	456
256	J.W. Elliot	\N	\N	0	\N	0
257	Orange Jull	Орэндж Джулл	\N	0	\N	0
258	Cluny MacPherson	Клуни Макферсон	1879-03-18	257	1966-11-16	257
259	Wilbur R. Franks	Уилбур Фрэнкс	1901-03-04	461	1986-01-04	282
260	Robert William Boyle	Роберт Уильям Бойл	1883-10-02	462	1955-04-18	0
261	William George Beers	Уильям Джордж Бирс	1843-05-05	275	1900-12-26	275
262	James Naismith	Джеймс Нейсмит	1861-11-06	463	1939-11-28	464
263	Donald Munro	Дональд Манро	\N	0	\N	0
264	Jacques Plante	Жак Плант	1929-01-17	465	1986-02-27	0
265	Thomas F. Ryan	Томас Райан	1872	449	1961-11-19	282
266	Dennis Colonello	Деннис Колонелло	\N	0	\N	0
267	Chris Haney	Крис Хэйни	1950-08-09	466	2010-05-31	282
268	Scott Abbott	Скотт Эббот	\N	275	\N	0
269	Frederick Banting	Фредерик Бантинг	1891-11-14	467	1941-02-21	468
270	Charles Best	Чарльз Бест	1899-02-27	469	1978-03-31	282
271	James Collip	Джеймс Коллип	1892-11-20	470	1965-06-19	0
272	James Hillier	Джеймс Хиллие	1915-08-22	471	2007-01-15	291
273	Eli Franklin Burton	Илай Франклин Бёртон	1879-02-14	0	1948-07-06	282
274	Arthur Prebus 	Артур Пребус	\N	0	\N	0
275	Herbert Henry Dow	Герберт Генри Доу	1866-02-26	470	1930-10-15	472
276	Thomas Willson	Томас Уилсон	1860-03-14	0	1915-12-20	285
277	William Chalmers	Уильям Чалмерс	1905	0	1994	281
278	Harry Wasylyk	Гарри Василик	1925-09-25	0	\N	0
279	John Alexander Hopps	Джон Александр Хоппс	1919-05-21	247	1998-11-24	0
280	Lewis Urry	Льюис Урри	1927-01-29	474	2004-10-19	0
281	Theodore Witte	Теодор Уитте	\N	0	\N	0
282	Joseph Coyle	Джозеф Койл	1871	0	1972	0
283	Abraham Pineo Gesner	Абрахам Пинео Геснер	1797-05-02	0	1864-04-29	256
284	Charles Fenerty	Чарльз Фенерти	1821	0	1892-06-10	256
285	Norman Breakey	Норман Брики	1891	0	1965	0
286	Peter Lymburner Robertson	Питер Робертсон	1879-12-10	0	1951-09-28	458
287	Charles C. Barnes	Чарльз Барнс	\N	0	\N	0
288	Manuel Mondragón	Мануэль Мондрагон	1859	477	1922	0
289	Julián Carrillo	Хулиан Каррильо	1875-01-28	478	1965-09-09	286
290	Ignacio Anaya	Игнасио Анайа	\N	0	1975-10-21	0
291	Yoshigei Nakatani 	Ёсигэи Накатани	\N	0	\N	0
292	Guillermo González Camarena	Гильермо Гонзалес Камарена	1917-02-17	272	1965-04-18	479
293	José Hernández-Rebollar	Хосе Эрнандес Реболлар	1969-07-14	479	\N	0
294	Miguel de Icaza	Мигель де Икаса	1972	286	\N	0
295	Federico Mena	Федерико Мена	1976-07-26	286	\N	0
296	Heberto Castillo	Эберто Кастильо	1928-08-23	480	1997-04-05	286
297	Luis E. Miramontes	Луис Мирамонтес	1925-03-16	81	2004-09-13	286
298	Enrique Corcuera	Энрике Коркуэра	\N	0	\N	0
299	Filiberto Vázquez Dávila	Филиберто Васкез Давила	1943-08-22	272	\N	0
300	Francisco D. Mier	Франциско Миер	\N	0	\N	0
301	Belisario H. Romo	Белисарио Ромо	\N	0	\N	0
302	Thomas Jefferson	Томас Джефферсон	1743-04-13	481	1826-07-04	482
303	David Rittenhouse	Дэвид Риттенхауз	1732-04-08	0	1796-06-26	269
304	Eli Whitney	Эли (Илай) Уитни	1765-12-08	483	1825-01-08	55
305	James Finley	Джеймс Финли	1756	0	1828	484
306	Benjamin Thompson	Бенджамин Томпсон	1753-03-26	485	1814-08-21	0
307	Levi Spear Parmly	\N	\N	0	\N	0
308	Simeon North	Симеон Норт	1765-07-13	486	1852-98-25	487
309	Thomas Blanchard	Томас Бланшар	1788-06-24	488	1864-04-16	14
310	Sylvester Graham	Сильвестер Грэм	1794-07-05	489	1851-09-11	490
311	William Otis	Уильям Отис	1813-09-20	491	1839-11-13	269
312	Charles Grafton Page	Чарльз Графтон Пейдж	1812-01-25	492	1868-05-05	284
313	George Pullman	Джордж Пульман	1831-03-03	493	1897-10-19	279
314	Charles Goodyear	Чарльз Гудьир	1800-12-29	55	1860-07-01	285
315	Isaac Babbitt	Исаак (Айзек) Баббит	1799-07-26	494	1862-05-26	495
316	Joseph Dart	Джозеф Дарт	1799	496	1879-09-28	236
317	Norbert Rillieux	Норбер Рилье	1806-03-17	265	1894-10-08	0
318	Edward Maynard	Эдвард Мейнард	1813-04-26	497	1891-05-04	284
319	Jonathan J. Couch	\N	\N	0	\N	0
320	Augustus Russell Pope	Огастас Рассел Поуп	1819-01-25	267	1858-05-24	495
321	Josephine Cochrane	Джозефина Кокрейн	1839-03-08	0	1913-08-14	279
322	John Landis Mason	Джон Лэндис Мейсон	1832	499	1902-02-26	285
323	James Caleb Jackson	Джеймс Калеб Джексон	1811-03-28	500	1895-07-11	501
324	E. C. Singer	\N	\N	0	\N	0
325	George Herman Babcock	Джордж Герман Бэбкок	1832-06-17	502	1893-12-16	107
326	Stephen Wilcox	Стивен Уилкокс	1830-02-12	503	1893-11-27	107
327	Alvin J. Fellows	Элвин Феллоус	\N	0	\N	0
328	O. A. North	\N	\N	0	\N	0
329	Benjamin Chew Tilghman	Бенджамин Чу Тилман	1821-10-26	269	1901-07-03	269
330	Fred Hatch	Фред Хэтч	1848-11-01	505	1929-07-07	505
331	Henry S. Parmelee	Генри Пармели	1864	0	1902	55
332	Samuel W. Francis	Сэмюэль Фрэнсис	1835	285	1886	506
333	Benjamin Forstner	Бенджамин Форстнер	1834-03-25	0	1897-02-27	175
334	Francis Edgar Stanley	Фрэнсис Эдгар Стэнли	1849-06-01	507	1918-07-13	508
335	Samuel Pierpont Langley	Сэмюэл Пирпонт Лэнгли	1834-08-22	267	1906-02-27	509
336	Robert Gair	Роберт Гейр	1839	0	1927	285
337	Warren S. Johnson	Уоррен Джонсон	1847-11-06	510	1911-12-05	283
338	Sylvanus Bowser	Сильванус Баузер	1854-08-08	63	1938-10-03	63
339	Reuben H. Donnelley	Рубен Доннелли	1864-08-20	471	1929-02-25	279
340	Dorr Felt	Дорр Фелт	1862-03-18	512	1930-08-07	279
341	John J. Loud	Джон Лауд	1844-11-02	513	1916-08-10	513
342	William Gray	Уильям Грэй	\N	0	\N	0
343	Herman Hollerith	Герман Холлерит	1860-02-29	236	1929-11-17	284
344	August Schrader	Август Шрадер	1870	0	1894	285
345	Granville Woods	Гранвилл Вудс	1856-04-23	154	1910-01-30	285
346	George Ellery Hale	Джордж Эллери Хейл	1868-06-29	279	1938-02-21	44
347	Charles Francis Jenkins	Чарльз Фрэнсин Дженкинс	1867-08-22	114	1934-06-06	284
348	Bradley A. Fiske	Брэдли Фиск	1854-06-13	515	1942-04-06	285
349	Milton Reeves	Мильтон Ривз	1864-08-25	0	1925-06-04	516
350	Charles G. Conn	Чарльз Конн	1844-01-29	517	1931-01-05	283
351	Joshua Lionel Cowen	Джошуа Кауэн	1877-08-25	285	1965-09-08	519
352	Charles Washington Merrill	Чарльз Меррилл	1869-12-21	146	1958-02-05	260
353	Thomas B. Crowe	Томас Кроу	1877	0	1952	400
354	Frederick Baldwin	Фредерик Болдуин	\N	0	\N	0
355	Arthur Pitney	Артут Питни	1871	521	1933	279
356	Thomas Sullivan 	Томас Салливан	\N	0	\N	0
357	Robert W. Wood	Роберт Вуд	1868-05-02	522	1955-08-11	523
358	Ummo F. Luebben	Уммо Луббен	1867-08	0	1953-08	224
359	John W. Page	Джон Пейдж	1865	279	\N	0
360	Lewis H. Nash	Льюис Нэш	1852	524	1923-11-11	0
361	Frank Epperson	Фрэнк Эпперсон	1894	276	1983-10	525
362	John Raphael Rogers	Джон Рафаэль Роджерс	1856-12-11	526	1934-02-18	285
363	William Elvis Sloan	Уильям Элвис Слоун	1867-10	527	1961-06-25	279
364	Lee de Forest	Ли де Форест	1873-08-26	528	1961-06-30	283
365	Elwood Thomas Baker	Элвуд Томас Бейкер	1854	0	1938-11-22	0
366	Charles Graham Baker	Чарльз Грэм Бейкер	1883-07-16	150	1950-05-15	283
367	Alfred Carlton Gilbert	Альфред Карлтон Гилберт	1884-02-15	175	1961-01-24	267
368	Edward N. Hines	Эдвард Хайнс	1870	0	1938	0
369	 Charles P. Rudabaker	Чарльз Рудабейкер	\N	0	\N	0
370	John Lloyd Wright	Джон Лойд Райт	1892-12-12	415	1972-12-20	529
371	Edward C. Wente	Эдвард Венте	1889-01-02	530	1972-06-09	531
372	Gilbert Vernam	Гилберт Вернам	1890-04-03	285	1960-02-07	532
373	Walter Deubener	Уолтер Дебенер	1887	167	1980-03-29	167
374	Malcolm Loughead	Малкольм Лофхед	1886	525	1958	0
375	Stephen J. Poplawski	Стивен Поплавски	1885-08-14	0	1956-12-09	534
376	Christian Nelson	Кристиан Нельсон	1893	0	1992	535
377	Earle Dickson	Эрл Диксон	1892-10-10	0	1961-09-21	42
378	Benjamin Katz	Бенджамин Кац	\N	0	\N	0
379	Ben P. Ellerbeck 	Бен Эллербек	\N	0	\N	0
380	Raymond DeWalt	Рэймонд Де Уолт	1885-10-09	0	1961-05-08	538
381	Louis Alan Hazeltine	Луис Алан Хэзельтин	1886-08-07	296	1964-05-24	540
382	James Cummings	Джеймс Каммингс	1895-12-28	0	1981-05-27	542
383	John Earl McLeod	Джон Эрл Маклауд	1891-03-19	0	1987-04-02	0
384	Leo Gerstenzang	Лео Герштенцанг	1892-06-03	0	1973-10-01	285
385	Lionel C Sternberger	Лайонел Стернбергер	1907-02-21	285	1964-01-30	544
386	Morris M. Titterington	Моррис Титтерингтон	1891-07-20	545	1928-07-11	0
387	Iwan Serrurier	Иван Серрурье	1878-09-21	0	1953	44
388	Lloyd Espenschied	Лойд  Эспеншид	1889-04-27	264	1986-06-01	285
389	Harold Alden Wheeler	Гарольд Элден Вилер	1903-05-10	167	1996-04-25	546
390	Richard Gurley Drew	Ричард Герли Дрю	1899-06-22	167	1980-12-14	533
391	Herbert W. Sellner	Герберт Селлнер	1887-02-05	547	1930-04-22	547
392	Francis W. Davis	Фрэнсис Дэвис	1887-08-19	269	1978-04-16	316
393	Otto Frederick Rohwedder	Отто Фредерик Роведдер	1880-07-07	51	1960-11-08	549
394	Frank Ofeldt 	Фрэнк Офелд	\N	0	\N	0
395	Lloyd Groff Copeman	Ллойд Грофф Копман	1881-12-28	71	1956-05-07	0
396	Philip Drinker	Филип Дринкер	1894-12-12	408	1972-10-19	551
397	Earle Haas	Эрл Хаас	1888	7	1981	397
398	Clarence Birdseye	Клэренс Бердсай	1886-12-09	285	1956-10-07	285
399	Ernest Lawrence	Эрнес Лоуренс	1901-08-08	552	1958-08-27	397
400	Samuel Ruben	Сэмюэль Рубен	1900-07-14	553	1988-07-16	554
401	Harold Eugene Edgerton	Гарольд Юджин Эджертон	1903-04-06	556	1990-01-04	316
402	Samuel Stephens Kistler	Сэмюэль Стивенс Кистлер	1900-03-26	557	1975-11-06	221
403	William C. Schopp	Уильям Шопп	1883	0	\N	0
404	William G. Pankonin	Уильям Панконин	1888	279	1977	277
405	John A. Borden	Джон Борден	\N	0	\N	0
406	Donald Roebling	Дональд Роблинг	1908-11-15	285	1959-08-29	267
407	Ub Iwerks	Аб Айверкс	1901-03-24	177	1971-07-07	559
408	George Nissen	Джордж Ниссен	1914-02-03	560	2010-04-07	263
409	Larry Griswold	Ларри Грисуолд	1905-09-17	223	1996-08-24	0
410	Carlton Cole "Carl" Magee 	Карлтон Коул Мэги	1872-01	562	1946-02	563
411	Arnold Orville Beckman	Арнольд Бекман	1900-04-10	564	2004-05-18	263
412	Henry Frank Phillips	Генри Фрэнк Филлипс	1889-06-04	565	1958-04-13	220
413	George Inman 	Джордж Инман	1895-06-06	566	1972-07-17	230
414	James Michael Curran	Джеймс Майкл Каррен	1903-06-09	224	1968-02-12	224
415	Edward E. Simmons	Эдвард Симмонс	1911	283	2004-05-18	11
416	Niels Christensen	Нильс Кристенсен	1865-08-16	0	1952-10-05	279
417	Sylvan Goldman	Сильвэн Голдман	1898-11-15	567	1984-11-25	225
418	Russell Harrison Varian	Рассел Харрисон Вариан	1898-04-24	284	1959-07-28	237
419	Sigurd Fergus Varian	Сигурд Фергус Вариан	1901-05-04	197	1961-10-18	77
420	Michael Sveda	Майкл Свида	1912-02-03	568	1999-08-10	13
421	Wallace Carothers	Уоллес Карозерс	1896-04-27	569	1937-04-29	269
422	Burrhus Frederic Skinner	Беррес Фредерик Скиннер	1904-03-20	570	1990-08-18	316
423	Roy J. Plunkett	Рой Планкетт	1910-06-26	571	1994-05-12	182
424	Clinton Riggs	Клинтон Риггз	1910-07-15	573	1997-05-22	563
425	Clay Puett	Клэй Пуэтт	1899-09-12	574	1998-09-23	262
426	Victor Vacquier	Виктор Вакье	1907-10-13	0	2009-01-11	263
427	Richard Thompson James	Ричард Томпсон Джеймс	1914-01-01	0	1974	0
428	Andrew Freeman	Эндрю Фриман	1909-03-10	576	1996-01-17	577
429	Granville Sloan Knox	Грэнвилл Слоун Нокс	1907-08-01	578	1998-01-31	579
430	Earl Tupper	Эрл Таппер	1907-07-28	580	1983-10-05	0
431	Joseph Buford Cox	Джозеф Бьюфорд Кокс	1905-03-18	0	2002-08-10	220
432	John C. Biggins	Джон Биггинс	1910	285	1971-09-18	360
433	Claude Schaeffer Beck	Клод Шэффер Бек	1894-11-08	582	1971-10-14	230
434	Leonard Bocour	Леонард Бокур	1910-03-18	285	1993-09-06	285
435	Sam Golden	Сэм Голден	1915-05-20	0	1997-03-11	285
436	Jacob Rabinow	Якоб Рабинов	1910-01-08	0	1999-09-11	284
437	Edward 'Ed' Lowe	Эдвард Лоу	1920-07-10	167	1995-10-04	583
438	George Clemens	Джордж Клеменс	\N	0	\N	0
439	Francis Melvin Rogallo	Фрэнсис Мельвин Рогалло	1912-01-27	585	2009-09-01	586
440	Gertrude Rogallo	Гертруда Рогалло	1914-01-13	0	2008-01-28	586
441	Walter Frederick Morrison	Уолтер Фредерик Моррисон	1920-01-16	587	2010-02-09	588
442	Gilmore Schjeldahl	Гилмор Скелдал	1912-06-01	589	2002-03-10	590
443	Norman Holter	Норман Холтер	1914-02-01	213	1983-07-21	213
444	Grace Hopper	Грейс Хоппер	1906-12-09	285	1992-01-01	592
445	Edward Seymour	Эдвард Сеймур	1904	0	1998	593
446	Richard Hamming	Ричард Хэмминг	1915-02-11	279	1998-01-07	594
447	Hugh Bradner	Хью Брэднер	1915-11-05	595	2008-05-05	263
448	Forest Dewey Dodrill	Форест Дьюи Додрилл	1902-01-26	596	1997-06-28	196
449	Andrew Kay	Эндрю Кей	1919-01-22	66	2014-08-28	597
450	Norman Larsen	Норман Ларсен	1923	279	1970-12	598
451	Virginia Apgar	Вирджиния Апгар	1909-06-07	599	1974-08-07	285
452	Frank P. Marugg	Фрэнк Мэраг	1887	400	1973-02-11	400
453	Charles H. Townes	Чарльз Таунс	1915-07-28	384	2015-01-27	135
454	William C. Brown 	Уильям Браун	1916-05-22	0	1999-02-03	0
455	Orville Carlisle	Орвилл Карлайл	1917-07-05	600	1988-08-01	600
456	James Elam	Джеймс Илэм	1918-05-31	183	1995-07-10	0
457	Peter Safar	Петер Сафар	1924-04-12	0	2003-08-02	601
458	Lawrence Jerome Fogel	Лоуренс Фогель	1928-03-02	285	2007-02-18	263
459	William Holmes Crosby	Уильям Холмс Кросби	1914-12-01	602	2005-01-15	603
460	Walton Musser	Уолтон Массер	1909	364	1998-06-08	0
461	Simon Foner	Саймон Фонер	1925-08-13	312	2007-10-02	316
462	Nicholas McKay	Николас Маккей	1920-12-08	0	2014-11-15	262
463	John Backus	Джон Бэкус	1924-12-03	269	2007-03-17	604
464	Gerard Kitchen O'Neill 	Джерард Китчен О'Нил	1927-02-06	285	1992-04-27	605
465	Louis Keller	Луис Келлер	1923	606	2010-07-11	607
466	Cyril Keller	Сирил Келлер	1922	606	\N	0
467	Marvin Minsky	Марвин Мински	1927-08-09	285	2016-01-24	267
468	Benjamin Eisenstadt	Бенджамин Айзенштадт	1906-12-07	285	1996-04-08	285
469	Robert H. Wentorf	Роберт Венторф	1926-05-28	433	1997-04-03	608
470	Dudley Allen Buck	Дадли Аллен Бак	1927-04-25	276	1959-05-21	609
471	John McCarthy	Джон Маккарти	1927-09-04	267	2011-10-24	380
472	Roger Bacon	Роджер Бейкон	1926-04-16	230	2007-01-26	611
473	Philo Farnsworth	Фило Фарнсуорт	1906-08-19	612	1971-03-11	221
474	Leonard Rivkin	Леонард Ривкин	1926	0	2015	400
475	Gregory Goodwin Pincus	Грегори Гудвин Пинкус	1903-04-09	613	1967-08-22	267
476	Irving Friedman	Ирвинг Фридман	1920-01-12	285	2005-06-28	615
477	Neal Elgar Miller 	Нил Элгар Миллер	1909-08-03	235	2002-03-23	616
478	James Edward Maceo West 	Джеймс Эдвард Масео Вест	1931-02-10	617	\N	0
479	Robert Noel Hall	Роберт Ноел Холл	1919-12-25	55	2016-11-07	396
480	Leland C. Clark Jr.	Лилэнд Кларк	1918-12-04	166	2005-09-25	231
481	Larry Stevenson	Ларри Стивенсон	1930-12-22	438	2012-03-25	438
482	Thomas J. Fogarty	Томас Фогерти	1934-02-25	231	\N	0
483	Harold Rosen	Гарольд Розен	1926-03-20	265	2017-01-30	283
484	William Powell "Bill" Lear 	Уильям Лир	1902-06-26	619	1978-05-14	174
485	Chandra Kumar Naranbhai Patel 	Пател Кумар	1938-07-02	0	\N	0
486	William B. Bridges	Уильям Бриджес	1934	620	\N	0
487	Robert Wendell Lucky	Роберт Уэнделл Лаки	1936-01-09	312	\N	0
488	Sherman Poppen	Шерман Поппен	1930-03-25	342	\N	0
489	Theodor Holm "Ted" Nelson 	Теодор Нельсон	1937-06-17	279	\N	0
490	Paul C. Fisher	Пол Фишер	1913-10-10	622	2006-10-20	623
491	Wesley Allison Clark 	Уэсли Элиссон Кларк	1927-04-10	55	2016-02-22	285
492	Charles Edwin Molnar	Чарльз Эдвин Молнар	1935-03-14	69	1966-12-13	624
493	George Claude Pimentel	Джордж Клод Пиментель	1922-05-02	625	1989-06-18	626
494	Joseph Sobek	Джозей Собек	1918-04-05	627	1998-03-27	627
495	Sinkey Boone	Синки Бун	1937-01-24	0	2010-09-01	628
496	Larry Hench	Ларри Хенч	1938-11-21	629	2015-12-16	631
497	Joseph Frederick "Joe" Sutter	Джо Саттер	1921-03-21	261	2016-08-30	422
498	John "Jack" Higson Cover	Джон "Джек" Хигсон Кавер	1920-04-06	285	2009-02-07	632
499	George Elwood Smith	Джордж Элвуд Смит	1930-05-10	633	\N	0
500	Willard Boyle	Уиллард Бойл	1924-08-19	634	2011-05-07	0
501	Merle Robbins	Мерл Роббинс	1912	635	1984-01-15	231
502	David L. Noble	Дэвид Нобл	1918-07-16	636	2004-04-25	216
503	Leon Ong Chua	Леон Чуа	1936-06-28	0	\N	0
504	Dennis Ritchie	Деннис Ритчи	1941-09-09	637	2011-10-12	638
505	Edward Joseph Hoffman 	Эдвард Джозеф Хоффман	1942-01-01	264	2004-07-01	283
506	Michael Edward Phelps	Майкл Эдвард Фелпс	1939-08-24	230	\N	0
507	Clayton Jacobson II	Клэйтон Джейкобсон II	1933-10-12	220	\N	0
508	Stanley Norman Cohen	Стэнли Норман Коэн	1935-02-17	639	\N	0
509	Herbert Boyer	Герберт Бойер	1936-07-10	640	\N	0
510	John J. Mooney	Джон Муни	1929	137	\N	0
511	Carl Donald Keith	Карл Дональд Кит	1920-05-29	0	2008-11-09	641
512	Henry Heimlich	Генри Геймлих	1920-02-03	421	2016-12-17	231
513	George Joseph Laurer	Джордж Джозеф Лорер	1925-09-23	285	\N	0
514	Wilbert Lee "Bill" Gore 	Уилберт Ли "Билл" Гор	1912-01-25	644	1986-07-26	645
515	Robert W. Gore	Роберт Гор	1937-04-15	221	\N	0
516	Charles Gaines	Чарльз Гейнс	1942-01-06	647	\N	0
517	Bob Gurnsey	Боб Гернси	1942-11-17	58	2015-08-24	647
518	David Chaum	Дэвид Чаум	1955-01-01	0	\N	0
519	Ted Selker	Тед Зелькер	1956-09-04	169	\N	0
520	Kary Mullis	Кэри Муллис	1944-12-28	649	\N	0
521	Chuck Hull	Чак Халл	1939-05-12	651	\N	0
522	Larry Hornbeck	Ларри Хорнбек	1943-09-17	264	\N	0
523	S. Scott Crump	Скотт Крамп	1953	0	\N	0
524	John Ousterhout	Джон Оустерхаут	\N	0	\N	0
525	Carl Deckard	Карл Декард	1961	0	\N	0
526	Joy Mangano	Джой Мангэно	1956-02-01	654	\N	0
527	Matsumae Yoshihiro	Мацумаэ Ёсихиро	\N	0	\N	0
528	Girolamo Angelis	Джироламо Анджелис	\N	0	\N	0
529	Maarten Gerritszoon de Vries	Маартен Герритсен Де Фриз	\N	0	\N	0
530	Vasiliy Poyarkov	Василий Поярков	\N	0	\N	0
531	Semen Shelkovnikov	Семён Шелковников	\N	0	\N	0
532	Tokugawa Mitsukuni	Токугава Мицукуни	\N	0	\N	0
533	Ivan Kozyrevsky	Иван Козыревский	\N	0	\N	0
534	Dembei	Дэмбэй	\N	0	\N	0
535	Vladimir Atlasov	Владимир Атласов	\N	0	\N	0
536	Fyodor Luzhin	Федор Федорович Лужин	\N	0	\N	0
537	Danil Antsipherov	Данил Анциферов	\N	0	\N	0
538	Peter the Great	Пётр Первый	\N	0	\N	0
539	Martyn Shanberg	Мартын Петрович Шпанберг	\N	0	\N	0
540	Ivan Evreinov	Иван Михайлович Евреинов	\N	0	\N	0
541	William Valton	Вильям Вальтон	\N	0	\N	0
542	Ivan Chorniy	Иван Черный    	\N	0	\N	0
543	Hidaya Kyuubee	Хидая Кюбээ	\N	0	\N	0
544	Tsukinoe	Цукиноэ	\N	0	\N	0
545	Ivan Antipin	Иван Михайлович Антипин	\N	0	\N	0
546	Dmitriy Shabalin	Дмитрий Яковлевич Шабалин	\N	0	\N	0
547	Dmitriy Shabalin	Дмитрий Яковлевич Шабалин	\N	0	\N	0
548	Jean-François de Galaup, comte de Lapérouse	Жан-Франсуа де Лаперуз	\N	0	\N	0
549	Adam Laxman	Адам Лаксман	\N	0	\N	0
550	Grigory Shelikhov	Григорий Иванович Щелихов	\N	0	\N	0
551	William Robert Broughton	Уильям Роберт Броутон	\N	0	\N	0
552	Nikolay Khvostov	Николай Александрович Хвостов	\N	0	\N	0
553	Gavriil Davydov	Гавриил Иванович Давыдов	\N	0	\N	0
554	Matsuda Denjuro	Мацуда Дэндзюро	\N	0	\N	0
555	Mamiya Rinzō	Мамия Риндзо	\N	0	\N	0
556	Yevfimiy Putyatin	Евфимий Васильевич Путятин	\N	0	\N	0
\.


-- Login to psql and run the following
-- What is the result?
SELECT MAX(id) FROM persons;

-- Then run...
-- This should be higher than the last result.
SELECT nextval('persons_id_seq');

-- If it's not higher... run this set the sequence last to your highest pid it. 
-- (wise to run a quick pg_dump first...)
SELECT setval('persons_id_seq', (SELECT MAX(id) FROM persons));
-- if your tables might have no rows
-- false means the set value will be returned by the next nextval() call    
SELECT setval('persons_id_seq', COALESCE((SELECT MAX(id)+1 FROM persons), 1), false);


-- Completed on 2017-08-21 13:47:28 UTC

--
-- PostgreSQL database dump complete
--

