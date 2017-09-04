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
-- TOC entry 219 (class 1259 OID 16902)
-- Name: course_event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE course_event (
    title text NOT NULL,
    course_timeline_id integer NOT NULL,
    cities integer,
    geopoint point,
    persons text,
    description text NOT NULL,
    id integer NOT NULL
);


ALTER TABLE course_event OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16896)
-- Name: course_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE course_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE course_event_id_seq OWNER TO postgres;

--
-- TOC entry 2231 (class 0 OID 0)
-- Dependencies: 218
-- Name: course_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE course_event_id_seq OWNED BY course_event.id;


--
-- TOC entry 2105 (class 2604 OID 16905)
-- Name: course_event id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY course_event ALTER COLUMN id SET DEFAULT nextval('course_event_id_seq'::regclass);


--
-- TOC entry 2226 (class 0 OID 16902)
-- Dependencies: 219
-- Data for Name: course_event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY course_event (title, course_timeline_id, cities, geopoint, persons, description, id) FROM stdin;
Какидзаки Ёсихиро получает имя Мацумаэ и лицензию сёгуна на торговлю с айнами	1	0	\N	[527]	Токугава Иэясу, ставший годом ранее сёгуном, выдал Какидзаки Ёсихиро лицензию на монопольную торговлю с айнами. В отличие от других владетельных князей, он не получил от сёгуна земли (то есть остров Хоккайдо по-прежнему не входил в территорию Японии), но при этом стал прямым вассалом сёгуна и попросил о смене имени своего дома на Мацумаэ. 	1
Первый европеец на Хоккайдо	2	\N	\N	[527,528]	В Мацумаэ впервые приезжает европеец — миссионер Джироламо Анджелис. Несмотря на запрет проповеди христианства в Японии, Мацумаэ Ёсихиро дает ему разрешение, заявив, что «Мацумаэ — не Япония». Анджелис со слов айнов составил первую карту Хоккайдо, а также описал торговые отношения между японцами и айнами. В то время айны сами приезжали для торговли в Мацумаэ, японцы же в земли айнов не плавали.     	2
Разделение японских и айнских земель на Хоккайдо	3	\N	\N	\N	В Мацумаэ впервые приезжает европеец — миссионер Джироламо Анджелис. Несмотря на запрет проповеди христианства в Японии, Мацумаэ Ёсихиро дает ему разрешение, заявив, что «Мацумаэ — не Япония». Анджелис со слов айнов составил первую карту Хоккайдо, а также описал торговые отношения между японцами и айнами. В то время айны сами приезжали для торговли в Мацумаэ, японцы же в земли айнов не плавали. 	3
Начало предоставления торговых участков вассалам дома Мацумаэ	4	\N	\N 	[556]	После разделения японских и айнских земель на Хоккайдо айнам было запрещено свободно приезжать для торговли в Мацумаэ: вместо этого земли айнов были разделены на торговые участки, которые стали выдаваться вассалам дома Мацумаэ в качестве платы за службу. 	4
Выход русских к побережью Охотского моря, основание острога в устье реки Улья	5	\N	\N	\N	Отряд казаков под руководством И. Москвитина, сплавившись по реке Улья, впервые вышел к побережью Охотского моря и основал в устье реки острог        	5
Экспедиция М. де Фриза	6	\N	\N	[529]	Голландцы под командованием М. де Фриза на кораблях «Кастрикум» и «Брескенс» впервые совершили плавание вдоль восточного берега Хоккайдо к Курильским островам и Сахалину. Де Фриз принял о. Кунашир за северо-восточную оконечность Хоккайдо, открыл о. Итуруп, назвав его «островом Штатов», а о. Уруп посчитал оконечностью Америки и назвал его «землей Компании». Затем «Кастрикум» прошел вдоль южного и восточного побережий Сахалина, однако, не обнаружив пролива между Хоккайдо и Сахалином, голландцы посчитали их одним островом. 	6
Восстание Сякусяина	9	0	\N	[]	В 1669 г. вспыхнуло восстание айнов против княжества Мацумаэ, вызванное ужесточившейся торговой политикой последнего. Восстание было подавлено, а айны южной половины Хоккайдо оказались в большей зависимости от княжества: теперь из их числа японцами назначались старосты для более эффективного контроля над населением. 	7
Экспедиция Василия Пояркова выходит к устью Амура	7	0	\N	[530]	Отряд во главе с Василием Поярковым вышел из Якутска, сплавился вверх по течению рек Лена, Алдан, Учур, пересек Становой хребет, выйдя в бассейн Амура.	8
Освоение Верхнекамчатского острога	11	0	\N	[533,534]	Отряд В. Атласова совершил переход из Анадыря на Камчатку и основал там первый острог — Верхнекамчатский, что положило начало российскому присутствию на полуострове. Это ознаменовалось еще одним событием: на Камчатке Атласов встретил занесенного туда течением японца по имени Дэмбэй, от которого русскими были получены первые достоверные сведения о Японии.    	9
Основание зимовья в устье реки Охоты	8	0	\N	[531]	Казаки под предводительством атамана С. Шелковникова после тяжёлого боя с местными племенами заложили зимовье в устье реки Охоты, впоследствии замененное острогом. Позднее здесь был оборудован первый и основной порт на Охотском море — Охотск.         	10
Экспедиция И. Козыревского	13	0	\N	[535]	Члены экспедиции под руководством И. Козыревского совершили повторное плавание на о. Парамушир, и в результате боев с местным населением привели его в подданство, а также собрали сведения о других островах Курильской гряды.         	11
Присвоение дому Мацумаэ статуса даймё, Мацумаэ — полноценное княжество.        	14	0	\N	[]	В 1717 г. земли Мацумаэ посетила инспекция центрального правительства, по результатам которой спустя два года дому Мацумаэ был присвоен статус даймё, а его земли стали полноценным княжеством.  Появляются первые достоверные свидетельства о передаче торговых участков в землях айнов купцам из центральной Японии.      	12
Экспедиция И. Черного	18	0	\N	[542]	В 1766–1769 гг. казачий сотник И. Черный совершил ряд плаваний к средним и южным Курильским островам для возвращения в подданство «сошлых» курильцев с северных островов, которые скрывались там, не желая платить ясак. В результате Черный не только вернул в подданство «сошлых», но и взял ясаки со всего населения Итурупа и даже с двоих айнов Кунашира.	16
Вождь Кунашира, айн Цукиноэ, прогоняет торговцев Хидая Кюбээ с Кунашира	21	0	\N	[543,544]	Судно торгового дома Хидая Кюбээ пристало к Кунаширу с намерением учредить там торговую контору, однако вождь острова по имени Цукиноэ разграбил судно и не дал этому сбыться.	21
Русская колония на о. Уруп	32	0	\N	[549]	Для развития успехов экспедиции Лаксмана Г. И. Щелихов инициирует создание русской колонии на о. Уруп для постоянной торговли с айнами южных Курил и японцами.	31
Перевод западных земель айнов под прямое управление центрального правительства	38	0	\N	[551,552]	Нападения Хвостова и Давыдова на японские поселения на Курилах и Сахалине, в результате которых японское правительство переводит под свое прямое управление западные земли айнов, княжество Мацумаэ переводится на северо-восток Хонсю.	36
Столкновения русских и айнов на о. Маканрур и о. Уруп	19	0	\N	[]	 Конфликт за места промысла каланов между русскими и айнами южных Курил с жертвами с обеих сторон. В результате была утрачена возможность взаимного сближения.	17
Экспедиция И. Антипина	22	0	\N	[545]	На о. Уруп прибыли члены экспедиции под руководством И. Антипина, в задачи которой входило комплексное исследование южных Курильских островов, а также установление торговых отношений с японцами. 	22
Восточные земли айнов переводятся под временное управление центрального правительства Японии	35	0	\N	[]	Под влиянием появления русской колонии на Урупе и посещения экспедицией Броутона гаваней Вулканического залива, японское правительство отправляет экспедицию в восточные земли айнов, в ходе которой объявляется о временном переводе этих земель под прямое управление бакуфу.	33
По итогам Русско-японской войны 1904-1905 гг. Японии отошла территория Сахалина к югу от 50° с. ш.	44	0	\N	[]	 	43
Экспедиция И. Евреинова и Ф. Лужина	15	0	\N	[537,538,539]	И. Евреинов и Ф. Лужин по приказу Петра I совершили разведывательное плавание от Камчатки и смогли добраться до 6-го Курильского острова, вероятнее всего, Харимкотан.     	18
Первая японская правительственная экспедиция в земли айнов	25	0	\N	[]	После того, как в 1774 г. слухи о посещении русскими Хоккайдо достигли центрального правительства, была организована первая японская экспедиция на Курилы и Сахалин. В 1785 г. экспедиция побывала в южной оконечности Сахалина и на Кунашире.	25
Основание японской фактории на о. Итуруп	36	0	\N	[]	Японцы основывают на Итурупе факторию и начинают рыболовный промысел.	34
Окончание Второй мировой войны	45	0	\N	[]	В ходе Сахалинской и Курильской операций Советско-Японской войны 1945 г. от японских войск были полностью освобождены Сахалин и Курильские острова, включая Итуруп и Кунашир.	44
Первое плавание экспедиции М. Шпанберга	16	0	\N	[540]	В  рамках Второй Камчатской экспедиции М. Шпанберг в поисках морского пути в Японию совершил плавание вдоль гряды Курильских островов, впервые достигнув 18-го острова Уруп.         	19
Восстание айнов Кунашира и Мэнаси	29	0	\N	[543]	Из-за жестокого обращения сотрудников торгового дома Хидая Кюбээ на Кунашире и в северо-восточной части Хоккайдо разгорелось восстание айнов против японцев. Восстание было подавлено, однако у торгового дома Хидая Кюбээ княжеством Мацумаэ были изъяты торговые участки, отданные ему ранее.	28
Вторичный перевод земель айнов под прямое управление центрального правительства Японии	41	0	\N	[555]	В связи с предложением миссии Е. В. Путятина разграничить территории между Россией и Японией, японское правительство для изучения этого вопроса объявило о вторичном переводе земель айнов под своё прямое управление.	40
Экспедиция И. Козыревского и Д. Анциферова 	12	0	\N	[535,536]	Экспедиция под руководством И. Козыревского и Д. Анциферова посетила два самых северных острова Курильской гряды — Шумшу и Парамушир — и привели в подданство население первого из них. От местных айнов члены экспедиции получили первые сведения о торговых отношениях между японцами и айнами.        	15
Экспедиция А. Лаксмана в Японию	31	0	\N	[548]	Получив разрешение центрального правительства, А. Лаксман проследовал на судне из Нэмуро в Хакодатэ, а затем пешим ходом до Мацумаэ. Лаксманом было получено разрешение на заход одного русского судна в Нагасаки.	30
Симодский трактат 1855 г.	42	0	\N	[555]	В результате переговоров между Е. В. Путятиным и чиновниками центрального правительства Японии было принято решение о проведении российско-японской границы между островами Уруп и Итуруп. Сахалин оставался в нераздельном владении обеих стран.	41
Экспедиция по инициативе Токугава Мицукуни на судне «Кайфумару»        	10	0	\N	[532]	Токугава Мицукуни, глава княжества Мито, инициировал экспедицию в земли айнов на судне «Кайфумару». Судно прошло вдоль северо-восточного побережья Хонсю, проливом Цугару, затем вдоль западного берега Хоккайдо до устья реки Исикари и поднялось вверх по течению реки. Эта экспедиция обозначила начало интереса к землям айнов в центральной Японии.         	13
Экспедиция А. Лаксмана в Японию	30	0	\N	[548]	Из Охотска в Нэмуро прибыла российская экспедиция под руководством А. Лаксмана для возвращения на родину японцев, унесенных течением.	29
Возвращение земель айнов под управление княжества Мацумаэ	40	0	\N	[]	Со снижением напряженности в регионе центральное правительство Японии возвращает все земли айнов под управление княжества Мацумаэ.	39
Передача торговых участков Аккэси, Киитаппу, Кунашир и Соя торговому дому Хидая Кюбээ	20	0	\N	[543]	Княжество Мацумаэ за свои долги передало на откуп торговому дому Хидая Кюбээ торговые участки Аккэси, Киитаппу, Кунашир и Соя, до тех пор бывшие в прямом управлении дома Мацумаэ.	20
Посещение Сахалина французской экспедицией Лаперуза	28	0	\N	[547]	Кругосветная экспедиция Лаперуза обследовала берега Приморья и западный берег Сахалина, однако не обнаружив пролива между Сахалином и материком, вернулась на юг, где открыла пролив между Сахалином и Хоккайдо, названный именем главы экспедиции. Затем экспедиция обследовала острова в районе Урупа и отправилась на Камчатку.	27
Перевод Сахалина под прямое управление центрального правительства	39	0	\N	[553,554]	Правительство Японии объявляет о переводе под свое прямое управление Сахалина, который отныне называется «северными землями айнов». Это произошло благодаря экспедиции Мацуда Дэндзюро и Мамия Риндзо, установившей годом ранее островное положение Сахалина.	38
Посещение Хоккайдо Д. Шабалиным и И. Антипиным	24	0	\N	[545,546]	По договоренности с японцами Д. Шабалин и И. Антипин прибыли в Аккэси на Хоккайдо, где в ходе переговоров японцы отказались от прямых торговых отношений, но согласились вести обмен через айнов южных Курил. Русские пообещали оставаться на Урупе и не посещать Итуруп, Кунашир и Хоккайдо.	24
Экспедиция У. Броутона к Хоккайдо и Курильским островам	33	0	\N	[550]	Британская экспедиция У. Броутона обследовала восточный берег Хоккайдо, дойдя до о. Симушир. В ходе плавания экспедиция посетила порт Муроран на Хоккайдо, после чего отправилась в Макао.	32
Петербургский договор 1875 г.	43	0	\N	[]	В процессе заключения Петербургского договора Япония отказывалась от прав на о. Сахалин в обмен на всю гряду Курильских островов.	42
Первая японская правительственная экспедиция в земли айнов	26	0	\N	[]	Участники экспедиции смогли продвинуться дальше по сравнению с прошлым годом: на Сахалине они достигли 48° с. ш., а на востоке доплыли до Урупа. Однако из-за смены состава правительства в Японии экспедиция была свернута.	26
Временное управление восточными землями айнов заменяется на вечное	37	0	\N	[]	Центральное правительство Японии заменяет временное управление восточными землями айнов на «вечное».	35
Второе плавание экспедиции М. Шпанберга	17	0	\N	[540,541]	М. Шпанберг и В. Вальтон повторно отправились в сторону Японии, пройдя всю гряду Курильских островов и достигнув японского осрова Хонсю в районе г. Сэндай (Шпанберг) и пров. Ава (Вальтон)   	14
Посещение Хоккайдо Д. Шабалиным	23	0	\N	[546]	Д. Шабалин со спутниками на трех байдарах совершил плавание вдоль Итурупа и Кунашира до Ноккамаппу в северо-восточной оконечности Хоккайдо, где попросил об установлении торговых отношений чиновников княжества Мацумаэ. Японцы и русские договорились встретиться для переговоров через год.	23
Экспедиция У. Броутона к Сахалину и Хоккайдо	34	0	\N	[550]	Броутон повторно отправился в район Хоккайдо. Экспедиция прошла вдоль восточного побережья Японии, посетила гавани Хакодатэ и Муроран, прошла проливом Цугару, проследовала вдоль западного побережья Хоккайдо и Сахалина.	37
\.


--
-- TOC entry 2232 (class 0 OID 0)
-- Dependencies: 218
-- Name: course_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('course_event_id_seq', 44, true);


--
-- TOC entry 2107 (class 2606 OID 16927)
-- Name: course_event course_event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY course_event
    ADD CONSTRAINT course_event_pkey PRIMARY KEY (id);


-- Completed on 2017-08-21 13:47:28 UTC

--
-- PostgreSQL database dump complete
--

