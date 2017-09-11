--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

-- Started on 2017-09-11 15:06:45 UTC

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
-- TOC entry 202 (class 1259 OID 16841)
-- Name: cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE cities (
    id integer NOT NULL,
    scalerank bigint,
    cityclass bigint,
    name_eng text,
    name_rus text,
    founded text,
    adm_0 text,
    admin_1 text,
    population double precision,
    x double precision,
    y double precision
);


ALTER TABLE cities OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16847)
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE cities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cities_id_seq OWNER TO postgres;

--
-- TOC entry 2230 (class 0 OID 0)
-- Dependencies: 203
-- Name: cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE cities_id_seq OWNED BY cities.id;


--
-- TOC entry 2104 (class 2604 OID 16849)
-- Name: cities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY cities ALTER COLUMN id SET DEFAULT nextval('cities_id_seq'::regclass);


--
-- TOC entry 2224 (class 0 OID 16841)
-- Dependencies: 202
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO cities VALUES (1, 8, 2, 'Glendale', 'Глендэйл', '1887', 'USA', 'Arizona', 240112, -112.195823813712423, 33.5819411407757684);
INSERT INTO cities VALUES (2, 8, 2, 'Mesa', 'Меса', '1878', 'USA', 'Arizona', 396375, -111.736084433827784, 33.4239146108271825);
INSERT INTO cities VALUES (3, 8, 2, 'Berkeley', 'Беркли', '1878-04-04', 'USA', 'California', 100158, -122.271151979442848, 37.8739013865611582);
INSERT INTO cities VALUES (4, 8, 2, 'Riverside', 'Риверсайд', '1883-10-11', 'USA', 'California', 297554, -117.398038576103033, 33.9419450063369936);
INSERT INTO cities VALUES (5, 8, 2, 'Vallejo', 'Вальехо', '1851', 'USA', 'California', 120446, -122.258052003856847, 38.1119488719137323);
INSERT INTO cities VALUES (6, 8, 2, 'Aurora', 'Орора', '1891', 'USA', 'Colorado', 276393, -104.808496950076062, 39.695857359875852);
INSERT INTO cities VALUES (7, 8, 2, 'Kansas City', 'Канзас-Сити', '1872', 'USA', 'Kansas', 146866, -94.6301463771237223, 39.1135805169434363);
INSERT INTO cities VALUES (8, 8, 2, 'Independence', 'Индепенданс', '1827', 'USA', 'Missouri', 113288, -94.4152812111022399, 39.0911139109801482);
INSERT INTO cities VALUES (9, 8, 2, 'Metairie', 'Метэри', '1761', 'USA', 'Louisiana', 146136, -90.15277653172312, 29.9838661895894845);
INSERT INTO cities VALUES (10, 8, 2, 'McAllen', 'МакАллен', '1904', 'USA', 'Texas', 122578, -98.2297253842945679, 26.2030375356031264);
INSERT INTO cities VALUES (11, 8, 2, 'Pasadena', 'Пасадина', '1893', 'USA', 'Texas', 144696, -95.1477429624073068, 29.6608626495491947);
INSERT INTO cities VALUES (12, 8, 2, 'Arlington', 'Аргингтон', '1876', 'USA', 'Texas', 1472, -97.0202384865032741, 32.6847607615403604);
INSERT INTO cities VALUES (13, 8, 2, 'Stamford', 'Стэмфорд', '1641', 'USA', 'Connecticut', 117083, -73.5391911231280346, 41.0533455597509942);
INSERT INTO cities VALUES (14, 8, 2, 'Springfield', 'Спрингфилд', '1635', 'USA', 'Massachusetts', 152227, -72.5799990251423992, 42.1200246369037359);
INSERT INTO cities VALUES (15, 8, 1, 'Montpelier', 'Монтпилиер', '1787', 'USA', 'Vermont', 7828, -72.5758132341268123, 44.2599715363262476);
INSERT INTO cities VALUES (16, 8, 2, 'Coral Springs', 'Корал-Спрингс', '1963', 'USA', 'Florida', 131674, -80.270821575628986, 26.2708370147699988);
INSERT INTO cities VALUES (17, 8, 2, 'Joliet', 'Джолиет', '1833', 'USA', 'Illinois', 134957, -88.1066740333425713, 41.5299831329950919);
INSERT INTO cities VALUES (18, 8, 2, 'Rockford', 'Рокфорд', '1834', 'USA', 'Illinois', 152765, -89.0696901873178604, 42.2697054230371805);
INSERT INTO cities VALUES (19, 8, 2, 'South Bend', 'Саут-Бенд', '1865', 'USA', 'Indiana', 103760, -86.2500173357440332, 41.6833071076049535);
INSERT INTO cities VALUES (20, 8, 2, 'Durham', 'Дарем', '1869', 'USA', 'North Carolina', 204734, -78.9199996355193889, 35.9999589223609675);
INSERT INTO cities VALUES (21, 8, 2, 'Hampton', 'Хамптон', '1849', 'USA', 'Virginia', 146437, -76.3499497901315181, 37.0300252472348532);
INSERT INTO cities VALUES (22, 8, 1, 'Dover', 'Довер', '1683', 'USA', 'Delaware', 33286, -75.5247030046464261, 39.1580865672303844);
INSERT INTO cities VALUES (23, 8, 1, 'Annapolis', 'Аннаполис', '1649', 'USA', 'Maryland', 36252, -76.4924992286086507, 38.9783300975030329);
INSERT INTO cities VALUES (24, 8, 2, 'Allentown', 'Аллентаун', '1762', 'USA', 'Pennsylvania', 105519, -75.5000275082270633, 40.5999882192543922);
INSERT INTO cities VALUES (25, 8, 2, 'Hidalgo del Parral', 'Идальго-дель-Парраль', '1821', 'MEX', 'Chihuahua', 101768, -105.666635784714941, 26.9333547149678907);
INSERT INTO cities VALUES (26, 8, 2, 'Gomez Palacio', 'Гомес-Паласио', '1885', 'MEX', 'Durango', 228577, -103.500023846229681, 25.570052916459872);
INSERT INTO cities VALUES (27, 8, 2, 'Ciudad Valles', 'Сьюдад-Вальес', '1533-07-25', 'MEX', 'San Luis Potose', 109504, -99.0200130633342042, 21.9799878122788108);
INSERT INTO cities VALUES (28, 8, 2, 'Reynosa', 'Рейноса', '1749', 'MEX', 'Tamaulipas', 498654, -98.300031170427701, 26.0799959503161176);
INSERT INTO cities VALUES (29, 8, 2, 'Ciudad Madero', 'Сьюдад-Мадеро', '1824', 'MEX', 'Tamaulipas', 192736, -97.8361059995273621, 22.3189076934651247);
INSERT INTO cities VALUES (30, 8, 1, 'Tlaxcala', 'Тласкала', '1857-02-05', 'MEX', 'Tlaxcala', NULL, -98.2300096046722047, 19.3199951364868525);
INSERT INTO cities VALUES (31, 8, 2, 'Irapuato', 'Ирапуато', '1589', 'MEX', 'Guanajuato', 339554, -101.499990887237246, 20.6700160918960556);
INSERT INTO cities VALUES (32, 8, 2, 'Celaya', 'Селая', '1570', 'MEX', 'Guanajuato', 305901, -100.800007773627783, 20.5300246368174157);
INSERT INTO cities VALUES (33, 8, 1, 'Chilpancingo', 'Чильпансинго-де-лос-Браво', '1591', 'MEX', 'Guerrero', 165250, -99.5000096046773024, 17.5499739776257684);
INSERT INTO cities VALUES (34, 8, 2, 'Iguala', 'Игуала-де-ла-Индепенденсия', '1347', 'MEX', 'Guerrero', 112106, -99.5399813250550096, 18.3700014434493859);
INSERT INTO cities VALUES (35, 8, 2, 'Nezahualcoyotl', 'Несауалькойотль', '1963-04-03', 'MEX', 'MExico', 1232220, -99.0299866147664858, 19.410015481539407);
INSERT INTO cities VALUES (36, 8, 2, 'San Juan del Rio', 'Сан-Хуан-дель-Рио', '1531', 'MEX', 'Querctaro', 118173, -100.000030763533459, 20.3799821156578673);
INSERT INTO cities VALUES (37, 8, 2, 'Orizaba', 'Орисаба', '1521', 'MEX', 'Veracruz', 121348, -97.1299992286911191, 18.8500238230084847);
INSERT INTO cities VALUES (38, 8, 1, 'Xalapa', 'Халапа', '1313', 'MEX', 'Veracruz', 425148, -96.9199862078570504, 19.5299823191049278);
INSERT INTO cities VALUES (39, 8, 2, 'San Cristobal de Las Casas', 'Сан-Кристобаль-де-лас-Касас', '1528', 'MEX', 'Chiapas', 128996, -92.6333744728138697, 16.7499969675312741);
INSERT INTO cities VALUES (40, 8, 2, 'Oshawa', 'Ошава', '1850', 'CAN', 'Ontario', 247989, -78.8499780697637931, 43.8799947296840926);
INSERT INTO cities VALUES (41, 8, 2, 'London', 'Лондон', '1826', 'CAN', 'Ontario', 346765, -81.2499866146953877, 42.9699985952404404);
INSERT INTO cities VALUES (42, 8, 2, 'Kitchener', 'Китченер', '1833', 'CAN', 'Ontario', 409112, -80.5000065528434305, 43.449995136583432);
INSERT INTO cities VALUES (43, 8, 2, 'Sherbrooke', 'Шурбрук', '1793', 'CAN', 'Québec', 129447, -71.899988852613717, 45.400005309117212);
INSERT INTO cities VALUES (44, 7, 2, 'Pasadena', 'Пасадина', '1886-06-19', 'USA', 'California', 144618, -118.138871909439274, 34.1603812856347986);
INSERT INTO cities VALUES (45, 7, 2, 'Visalia', 'Висейлия', '1874-02-27', 'USA', 'California', 107431, -119.316009360615922, 36.3250295196929756);
INSERT INTO cities VALUES (46, 7, 2, 'Santa Rosa', 'Санта-Роза', '1850', 'USA', 'California', 155118, -122.699988852816944, 38.4504036652093646);
INSERT INTO cities VALUES (47, 7, 2, 'Oceanside', 'Оушенсайд', '1888-07-03', 'USA', 'California', 161029, -117.334967490490783, 33.220464496894067);
INSERT INTO cities VALUES (48, 7, 2, 'Modesto', 'Модесто', '1870-11-08', 'USA', 'California', 216008, -120.989989870062701, 37.6554134308311674);
INSERT INTO cities VALUES (49, 7, 2, 'Fort Collins', 'Форт Коллинс', '1864', 'USA', 'Colorado', 129252, -105.058869264530131, 40.5606882924964793);
INSERT INTO cities VALUES (50, 7, 2, 'Pueblo', 'Пуэбло', '1885-11-15', 'USA', 'Colorado', 104293, -104.630006552939918, 38.2803882029690428);
INSERT INTO cities VALUES (51, 7, 2, 'Davenport', 'Давенпорт', '1839-01-25', 'USA', 'Iowa', 100827, -90.5875303565947689, 41.5539868357947242);
INSERT INTO cities VALUES (52, 7, 2, 'Killeen', 'Киллин', '1881', 'USA', 'Texas', 103009, -97.7274821388497799, 31.1172853790471251);
INSERT INTO cities VALUES (53, 7, 2, 'Beaumont', 'Бомонт', '1835', 'USA', 'Texas', 111485, -94.1016827817389867, 30.0862630401758757);
INSERT INTO cities VALUES (54, 7, 2, 'Denton', 'Дэнтон', '1846', 'USA', 'Texas', 100975, -97.1288365089645822, 33.2157619415555132);
INSERT INTO cities VALUES (55, 7, 2, 'New Haven', 'Нью-Хейвен', '1638', 'USA', 'Connecticut', 124922, -72.9000053321098562, 41.3303829132677265);
INSERT INTO cities VALUES (56, 7, 2, 'Lowell', 'Лоуэлл', '1653', 'USA', 'Massachusetts', 103469, -71.3166911231191989, 42.6336883738849224);
INSERT INTO cities VALUES (57, 7, 2, 'Worcester', 'Вустер', '1673', 'USA', 'Massachusetts', 177216, -71.800020794345059, 42.2704288930892176);
INSERT INTO cities VALUES (58, 7, 2, 'Manchester', 'Манчестер', '1846', 'USA', 'New Hampshire', 109877, -71.4552873145259895, 42.9959918406832529);
INSERT INTO cities VALUES (59, 7, 2, 'Cape Coral', 'Кейп-Корал', '1957', 'USA', 'Florida', 102286, -81.9796836768728099, 26.6029097686774811);
INSERT INTO cities VALUES (60, 7, 2, 'Fort Lauderdale', 'Форт-Лодердейл', '1911-04-27', 'USA', 'Florida', 170510, -80.1417855241960382, 26.1360648793528263);
INSERT INTO cities VALUES (61, 7, 2, 'Columbus', 'Колумбус', '1828', 'USA', 'Georgia', 186470, -84.9800173357389781, 32.4704327586098316);
INSERT INTO cities VALUES (62, 7, 2, 'Aurora', 'Орора', '1834', 'USA', 'Illinois', 174276, -88.2999955665463858, 41.7653951203006955);
INSERT INTO cities VALUES (63, 7, 2, 'Fort Wayne', 'Форт Вэйн', '1794-10-22', 'USA', 'Indiana', 229715, -85.1299823422500026, 41.0803981720557729);
INSERT INTO cities VALUES (64, 7, 2, 'Fayetteville', 'Фейетвилл', '1762', 'USA', 'North Carolina', 124775, -78.8835935889697026, 35.0629360138286117);
INSERT INTO cities VALUES (65, 7, 2, 'Winston-Salem', 'Уинстон-Сейлем', '1766', 'USA', 'North Carolina', 193300, -80.2599953630638083, 36.1054305206686763);
INSERT INTO cities VALUES (66, 7, 2, 'Akron', 'Акрон', '1825', 'USA', 'Ohio', 208414, -81.519995973420464, 41.0703987824072101);
INSERT INTO cities VALUES (67, 7, 2, 'Clarksville', 'Кларксвилл', '1785', 'USA', 'Tennessee', 111694, -87.35943282240207, 36.5300816030271562);
INSERT INTO cities VALUES (68, 7, 2, 'Alexandria', 'Алегзандрия', '1749', 'USA', 'Virginia', 127273, -77.0999815284158103, 38.8204327586352136);
INSERT INTO cities VALUES (69, 7, 2, 'Newark', 'Ньюарк', '1693-10-31', 'USA', 'New Jersey', 280123, -74.1700053321149113, 40.7004213654136038);
INSERT INTO cities VALUES (70, 7, 2, 'Ann Arbor', 'Анн-Арбор', '1824', 'USA', 'Michigan', 113810, -83.7199908871662046, 42.3003753856023721);
INSERT INTO cities VALUES (71, 7, 2, 'Flint', 'Флинт', '1818', 'USA', 'Michigan', 117258, -83.6875380876868462, 43.0128641958265234);
INSERT INTO cities VALUES (72, 7, 2, 'Grand Rapids', 'Гранд-Рапидс', '1826', 'USA', 'Michigan', 193852, -85.6699493832677632, 42.9637199087170529);
INSERT INTO cities VALUES (73, 7, 2, 'Piedras Negras', 'Пьедрас Неграс', '1850-06-15', 'MEX', 'Coahuila', 139619, -100.531652060736008, 28.7076391794932348);
INSERT INTO cities VALUES (74, 7, 2, 'Ciudad Obregon', 'Сьюдад-Обрегон', '1927', 'MEX', 'Sonora', 258162, -109.924980511294436, 27.4666038197877889);
INSERT INTO cities VALUES (75, 7, 1, 'Zacatecas', 'Сакатекас', '1548', 'MEX', 'Zacatecas', 118562, -102.580002483921362, 22.7704305206152107);
INSERT INTO cities VALUES (76, 7, 2, 'Fresnillo', 'Фреснильо', '1554-09-02', 'MEX', 'Zacatecas', 105488, -102.859985394078706, 23.1704319447705451);
INSERT INTO cities VALUES (77, 7, 2, 'Puerto Vallarta', 'Пуэрто-Вальярта', '1851', 'MEX', 'Jalisco', 187134, -105.244981935429436, 20.6770957631198904);
INSERT INTO cities VALUES (78, 7, 1, 'Morelia', 'Морелия', '1541', 'MEX', 'Michoac', 592797, -101.189493043811652, 19.7333807566058077);
INSERT INTO cities VALUES (79, 7, 2, 'Zamora', 'Замора', '1574-01-18', 'MEX', 'Michoacen', 124916, -102.280020794467006, 19.9803682647448078);
INSERT INTO cities VALUES (80, 7, 2, 'Uruapan', 'Уруапан', '1533', 'MEX', 'Michoac', 237308, -102.07000777363281, 19.4203766062138925);
INSERT INTO cities VALUES (81, 7, 1, 'Tepic', 'Тепик', '1531-10-18', 'MEX', 'Nayarit', 280592, -104.879991294151921, 21.5053914581102994);
INSERT INTO cities VALUES (82, 7, 2, 'Ciudad del Carmen', 'Сьюдад-дель-Кармен', '1717-07-16', 'MEX', 'Campeche', 141308, -91.8244801906558479, 18.6536592837659327);
INSERT INTO cities VALUES (83, 7, 2, 'Tehuacan', 'Теуакан', '1660-03-16', 'MEX', 'Puebla', 241429, -97.3799839699031651, 18.4503582956630794);
INSERT INTO cities VALUES (84, 7, 2, 'Salamanca', 'Саламанка', '1178', 'MEX', 'Guanajuato', 138614, -101.20000919778299, 20.5704097686534659);
INSERT INTO cities VALUES (85, 7, 1, 'Guanajuato', 'Гуанахуато', '1546', 'MEX', 'Guanajuato', 78364, -101.279978476754721, 21.0204081410510675);
INSERT INTO cities VALUES (86, 7, 1, 'Pachuca', 'Пачука-де-Сото', '1174', 'MEX', 'Hidalgo', 319581, -98.7300307635283616, 20.1704341827143061);
INSERT INTO cities VALUES (87, 7, 1, 'Toluca', 'Толука-де-Лердо', '1522', 'MEX', 'MExico', 505881, -99.6719450873142847, 19.3323279579906284);
INSERT INTO cities VALUES (88, 7, 2, 'Minatitlan', 'Минатитлан', '1910', 'MEX', 'Veracruz', 150895, -94.5300028907902288, 17.9804644968331218);
INSERT INTO cities VALUES (89, 7, 2, 'Coatzacoalcos', 'Коацакоалькос', '1522', 'MEX', 'Veracruz', 230717, -94.4200096046569257, 18.1204042754795296);
INSERT INTO cities VALUES (90, 7, 2, 'Poza Rica de Hidalgo', 'Поса-Рика-де-Идальго', '1951', 'MEX', 'Veracruz', 174526, -97.4699784767394135, 20.5504368275726961);
INSERT INTO cities VALUES (91, 7, 2, 'Cordoba', 'Кордова', '1618', 'MEX', 'Veracruz', 134403, -96.9199862078570504, 18.9203812855738533);
INSERT INTO cities VALUES (92, 7, 2, 'Abbotsford', 'Абботсфорд', '1892', 'CAN', 'British Columbia', 151683, -122.299987428661694, 49.0503768097830175);
INSERT INTO cities VALUES (93, 7, 2, 'Kingston', 'Кингстон', '1673', 'CAN', 'Ontario', 114195, -76.4833008236607128, 44.2337199087220938);
INSERT INTO cities VALUES (94, 7, 2, 'Barrie', 'Барри', '1812', 'CAN', 'Ontario', 182041, -79.7000037045328895, 44.3837624298814646);
INSERT INTO cities VALUES (95, 6, 2, 'Tacoma', 'Такома', '1892', 'USA', 'Washington', 196957, -122.515013063428114, 47.2113159373797018);
INSERT INTO cities VALUES (96, 6, 2, 'Long Beach', 'Лонг-Бич', '1897-12-13', 'USA', 'California', 482618, -118.158043865819593, 33.7869673858937176);
INSERT INTO cities VALUES (97, 6, 1, 'Carson City', 'Карсон-Сити', '1858', 'USA', 'Nevada', 57341, -119.766395306255717, 39.1638484894308974);
INSERT INTO cities VALUES (98, 6, 2, 'Provo', 'Прово', '1849', 'USA', 'Utah', 105764, -111.637770021392498, 40.2488985382633473);
INSERT INTO cities VALUES (99, 6, 1, 'Little Rock', 'Литтл-Рок', '1821', 'USA', 'Arkansas', 184217, -92.3310931821225154, 34.7360825795825576);
INSERT INTO cities VALUES (100, 6, 2, 'Wichita', 'Уичито', '1868', 'USA', 'Kansas', 355244, -97.3299870216607701, 37.7199831329797917);
INSERT INTO cities VALUES (101, 6, 1, 'Jefferson City', 'Джефферсон-Сити', '1821', 'USA', 'Missouri', 35883, -92.1733250343354626, 38.5766233510822829);
INSERT INTO cities VALUES (102, 6, 2, 'Lafayette', 'Лафейетт', '1821', 'USA', 'Louisiana', 112197, -92.019949383293195, 30.1999770294341943);
INSERT INTO cities VALUES (103, 6, 2, 'Wichita Falls', 'Уичито-Фолс', '1872-09-27', 'USA', 'Texas', 101212, -98.4930684832539214, 33.9136263214411429);
INSERT INTO cities VALUES (104, 6, 2, 'Waco', 'Уэйко', '1849', 'USA', 'Texas', 118967, -97.1463806577276614, 31.5491711619265516);
INSERT INTO cities VALUES (105, 6, 2, 'Lubbock', 'Лаббок', '1890', 'USA', 'Texas', 211387, -101.879967693879507, 33.5800032745647741);
INSERT INTO cities VALUES (106, 6, 1, 'Hartford', 'Хартфорд', '1635', 'USA', 'Connecticut', 124019, -72.6819129420240273, 41.7719660196037239);
INSERT INTO cities VALUES (107, 6, 1, 'Providence', 'Провиденс', '1636', 'USA', 'Rhode Island', 50453, -71.4169255559512095, 41.8230481729243593);
INSERT INTO cities VALUES (108, 6, 2, 'Birmingham', 'Бирмингем', '1871-12-19', 'USA', 'Alabama', 231621, -86.8249951596395704, 33.5300063263225141);
INSERT INTO cities VALUES (109, 6, 2, 'Mobile', 'Мобил', '1702', 'USA', 'Alabama', 190274, -88.049984987118421, 30.6800252472094677);
INSERT INTO cities VALUES (110, 6, 2, 'St. Petersburg', 'Сент-Питерсберг', '1876', 'USA', 'Florida', 246316, -82.6793825701047354, 27.7705387563124795);
INSERT INTO cities VALUES (111, 6, 1, 'Springfield', 'Спрингфилд', '1821-04-10', 'USA', 'Illinois', 115975, -89.650016521955493, 39.8200099884569951);
INSERT INTO cities VALUES (112, 6, 1, 'Frankfort', 'Франкфорт', '1786', 'USA', 'Kentucky', 27051, -84.8733571794884369, 38.2008064972395687);
INSERT INTO cities VALUES (113, 6, 2, 'Greensboro', 'Гринсборо', '1808', 'USA', 'North Carolina', 231769, -79.8000234392338115, 36.0700063263325887);
INSERT INTO cities VALUES (114, 6, 2, 'Dayton', 'Дейтон', '1796', 'USA', 'Ohio', 159134, -84.2019332871220598, 39.7523218545566053);
INSERT INTO cities VALUES (115, 6, 2, 'Virginia Beach', 'Верджиния-Бич', '1906', 'USA', 'Virginia', 425257, -75.980264585917439, 36.8551601927612822);
INSERT INTO cities VALUES (116, 6, 1, 'Madison', 'Мадисон', '1846', 'USA', 'Wisconsin', 224625, -89.4011169858217869, 43.0730155630143372);
INSERT INTO cities VALUES (117, 6, 2, 'Green Bay', 'Грин-Бей', '1854', 'USA', 'Wisconsin', 101012, -88.0000138770921581, 44.5299808950513238);
INSERT INTO cities VALUES (118, 6, 1, 'Trenton', 'Трентон', '1719-06-03', 'USA', 'New Jersey', 84833, -74.7433553483933224, 40.2169625031070339);
INSERT INTO cities VALUES (119, 6, 1, 'Lansing', 'Лансинг', '1835', 'USA', 'Michigan', 117691, -84.5467362891876633, 42.7335272410727498);
INSERT INTO cities VALUES (120, 6, 2, 'Ensenada', 'Энсенада', '1542-09-17', 'MEX', 'Baja California', 256565, -116.619998211516588, 31.8699784535945163);
INSERT INTO cities VALUES (121, 6, 1, 'Saltillo', 'Сальтильо', '1577', 'MEX', 'Coahuila', 621250, -101.006928200926311, 25.4219045774809693);
INSERT INTO cities VALUES (122, 6, 2, 'Ciudad Juárez', 'Сьюдад-Хуарес', '1659', 'MEX', 'Chihuahua', 1512354, -106.491993915466537, 31.6923228717768701);
INSERT INTO cities VALUES (123, 6, 2, 'Delicias', 'Делисьяс', '1933', 'MEX', 'Chihuahua', 102969, -105.499979290573592, 28.1999699086578666);
INSERT INTO cities VALUES (124, 6, 1, 'Durango', 'Дуранго', '1881-04-27', 'MEX', 'Durango', 457140, -104.670029949750017, 24.0311029245917176);
INSERT INTO cities VALUES (125, 6, 2, 'Los Mochis', 'Лос-Мочис', '1903-06-01', 'MEX', 'Sinaloa', 214601, -108.99999821148613, 25.7899878122941004);
INSERT INTO cities VALUES (126, 6, 1, 'Ciudad Victoria', 'Сьюдад-Виктория', '1750-10-06', 'MEX', 'Tamaulipas', 269923, -99.1299805112512757, 23.7199591257623901);
INSERT INTO cities VALUES (127, 6, 1, 'Aguascalientes', 'Агуаскальентес', '1857-02-05', 'MEX', 'Aguascalientes', 658179, -102.29235932757355, 21.8814057826887733);
INSERT INTO cities VALUES (128, 6, 2, 'Manzanillo', 'Мансанильо', '1873', 'MEX', 'Colima', 110735, -104.323085130041349, 19.0495866167261703);
INSERT INTO cities VALUES (129, 6, 1, 'Villahermosa', 'Вильяэрмоса', '1564-06-24', 'MEX', 'Tabasco', 362401, -92.8999731870075607, 17.9999723500233735);
INSERT INTO cities VALUES (130, 6, 1, 'Cuernavaca', 'Куэрнавака', '1821', 'MEX', 'Morelos', 343769, -99.239999635600725, 18.9211047556260574);
INSERT INTO cities VALUES (131, 6, 1, 'Queretaro', 'Керетаро', '1823-12-23', 'MEX', 'Querctaro', 611785, -100.381927590572218, 20.6319643919150657);
INSERT INTO cities VALUES (132, 6, 2, 'Tapachula', 'Тапачула', '1486', 'MEX', 'Chiapas', 197961, -92.2699858009374481, 14.8999806914821988);
INSERT INTO cities VALUES (133, 6, 1, 'Chetumal', 'Четумаль', '1898-05-05', 'MEX', 'Quintana Roo', 134412, -88.2999955665463858, 18.5000193470956447);
INSERT INTO cities VALUES (134, 6, 2, 'Bakersfield', 'Бейкерсфилд', '1898-01-11', 'USA', 'California', 291389, -119.019980918231923, 35.3699715362906772);
INSERT INTO cities VALUES (135, 6, 2, 'Oakland', 'Окленд', '1852-05-04', 'USA', 'California', 399484, -122.221103354768161, 37.7689207143603198);
INSERT INTO cities VALUES (136, 6, 2, 'Charleston', 'Чарлстон', '1670', 'USA', 'South Carolina', 128000, -79.9921050000000093, 32.7923770000000019);
INSERT INTO cities VALUES (137, 8, 2, 'Paterson', 'Патерсон', '1792', 'USA', 'New Jersey', 151205, -74.1700053321149113, 40.9199945262218989);
INSERT INTO cities VALUES (139, 6, 2, 'Salinas', 'Салинас', '1874-03-04', 'USA', 'California', 148691, -121.641655519479272, 36.6822170196944697);
INSERT INTO cities VALUES (140, 6, 2, 'Eugene', 'Юджин', '1846', 'USA', 'Oregon', 145208, -123.100016115188353, 44.0500101919244003);
INSERT INTO cities VALUES (141, 6, 2, 'Cedar Rapids', 'Сидар-Рапидс', '1849', 'USA', 'Iowa', 128056, -91.6600230323803089, 41.9699821157443012);
INSERT INTO cities VALUES (142, 6, 2, 'Springfield', 'Спрингфилд', '1833', 'USA', 'Missouri', 150443, -93.3199992286759965, 37.1800160919620453);
INSERT INTO cities VALUES (143, 6, 1, 'Lincoln', 'Линкольн', '1856', 'USA', 'Nebraska', 242072, -96.6800008562936029, 40.8199747915209628);
INSERT INTO cities VALUES (144, 6, 2, 'Abilene', 'Абилин', '1881', 'USA', 'Texas', 114247, -99.7327860939360278, 32.4486253041827126);
INSERT INTO cities VALUES (145, 6, 2, 'Brownsville', 'Браунсвилл', '1848', 'USA', 'Texas', NULL, -97.500002483901028, 25.9199798777243622);
INSERT INTO cities VALUES (146, 6, 1, 'Concord', 'Конкорд', '1734', 'USA', 'New Hampshire', 40687, -71.5380471208413837, 43.2080719188090825);
INSERT INTO cities VALUES (147, 6, 2, 'Huntsville', 'Хантсвилл', '1811-12-09', 'USA', 'Alabama', 158216, -86.6099953630892401, 34.719959532707378);
INSERT INTO cities VALUES (148, 6, 2, 'Gainesville', 'Гейнсвилл', '1854', 'USA', 'Florida', 125684, -82.3250372738793317, 29.6513800242235561);
INSERT INTO cities VALUES (149, 6, 2, 'Peoria', 'Пеория', '1835', 'USA', 'Illinois', 112936, -89.670041139468708, 40.6999821157390897);
INSERT INTO cities VALUES (150, 6, 2, 'Evansville', 'Эвансвилл', '1812', 'USA', 'Indiana', 115474, -87.555829103327369, 37.9746962677464737);
INSERT INTO cities VALUES (151, 6, 2, 'Louisville', 'Луисвилл', '1828', 'USA', 'Kentucky', 243639, -85.7506501246934221, 38.226962764381426);
INSERT INTO cities VALUES (152, 6, 2, 'Lexington', 'Лексингтон', '1782', 'USA', 'Kentucky', 225366, -84.5000207943959367, 38.0500146678119222);
INSERT INTO cities VALUES (153, 6, 2, 'Toledo', 'Толидо', '1833', 'USA', 'Ohio', 306974, -83.5799735938713724, 41.6700262645060775);
INSERT INTO cities VALUES (154, 6, 1, 'Columbus', 'Колумбус', '1812', 'USA', 'Ohio', 736836, -82.9919554632240732, 39.9819202432292968);
INSERT INTO cities VALUES (155, 6, 2, 'Chattanooga', 'Чаттануга', '1839', 'USA', 'Tennessee', 155554, -85.2500008562478797, 35.0699898468364495);
INSERT INTO cities VALUES (156, 6, 1, 'Albany', 'Олбани', '1686', 'USA', 'New York', 95658, -73.8199491797698073, 42.670016905786035);
INSERT INTO cities VALUES (157, 6, 1, 'Harrisburg', 'Гаррисберг', '1791', 'USA', 'Pennsylvania', 47840, -76.8847491879201215, 40.2735998728988491);
INSERT INTO cities VALUES (158, 6, 2, 'Kelowna', 'Келоуна', '1879', 'CAN', 'British Columbia', 125109, -119.483311810160842, 49.8999890330936822);
INSERT INTO cities VALUES (159, 6, 2, 'Windsor', 'Уинсор', '1854', 'CAN', 'Ontario', 278013, -83.0333402930879032, 42.3332932729722415);
INSERT INTO cities VALUES (160, 6, 2, 'Trois-Rivipres', 'Труа-Ривьер', '1634-07-04', 'CAN', 'Québec', 119693, -72.5499491797647806, 46.3499731639388912);
INSERT INTO cities VALUES (161, 6, 2, 'Monclova', 'Монклова', '1577-07-25', 'MEX', 'Coahuila', 195764, -101.41999577004951, 26.8999975779235605);
INSERT INTO cities VALUES (162, 6, 2, 'Sudbury', 'Грейтер-Садбери', '1893', 'CAN', 'Ontario', 157857, -80.9666447364390933, 46.4999898468821016);
INSERT INTO cities VALUES (163, 6, 1, 'Fredericton', 'Фредериктон', '1785', 'CAN', 'New Brunswick', 52337, -66.6333077409389603, 45.9499975779997456);
INSERT INTO cities VALUES (164, 4, 2, 'San Bernardino', 'Сан-Бернардино', '1854', 'USA', 'California', 202381, -117.301980080874401, 34.1223295856538016);
INSERT INTO cities VALUES (165, 4, 2, 'Bridgeport', 'Бриджпорт', '1821', 'USA', 'Connecticut', 139090, -73.2019070419610927, 41.1819245156952931);
INSERT INTO cities VALUES (166, 4, 2, 'Rochester', 'Рочестер', '1803', 'USA', 'New York', 211354, -77.6218956487495433, 43.1723714964973624);
INSERT INTO cities VALUES (167, 4, 1, 'St. Paul', 'Сент-Пол', '1854', 'USA', 'Minnesota', 274792, -93.0849748146125648, 44.9439866323577277);
INSERT INTO cities VALUES (168, 4, 1, 'Olympia', 'Олимпия', '1859-01-28', 'USA', 'Washington', 44916, -122.89943404324741, 47.0380448599050922);
INSERT INTO cities VALUES (169, 4, 2, 'Spokane', 'Спокан', '1871', 'USA', 'Washington', 197262, -117.419949383394737, 47.6699959504023809);
INSERT INTO cities VALUES (170, 4, 2, 'Vancouver', 'Ванкувер', '1825', 'USA', 'Washington', 157517, -122.639992514926078, 45.6303013296261497);
INSERT INTO cities VALUES (171, 4, 2, 'Tucson', 'Тусон', '1768', 'USA', 'Arizona', 518907, -110.891932066525783, 32.206942622755669);
INSERT INTO cities VALUES (172, 4, 2, 'Fresno', 'Фресно', '1885-10-12', 'USA', 'California', 465183, -119.77298405137293, 36.747716897624457);
INSERT INTO cities VALUES (173, 4, 2, 'Colorado Springs', 'Колорадо-Спрингс', '1886-06-19', 'USA', 'Colorado', 360890, -104.791986329958846, 38.8629624624115309);
INSERT INTO cities VALUES (174, 4, 2, 'Reno', 'Рино', '1868-05-09', 'USA', 'Nevada', 202142, -119.820009604758496, 39.5299760122188104);
INSERT INTO cities VALUES (175, 4, 1, 'Salem', 'Сейлем', '1842', 'USA', 'Oregon', 146922, -123.023896730422408, 44.928070291211732);
INSERT INTO cities VALUES (176, 4, 1, 'Topeka', 'Топика', '1854', 'USA', 'Kansas', 121570, -95.6699849871488794, 39.0500053090918939);
INSERT INTO cities VALUES (177, 4, 2, 'Kansas City', 'Канзас-Сити', '1853', 'USA', 'Missouri', 441545, -94.6060400775457992, 39.109034368397495);
INSERT INTO cities VALUES (178, 4, 2, 'Sioux Falls', 'Су-Фолс', '1865', 'USA', 'South Dakota', 140336, -96.7299978045359836, 43.5499890330682931);
INSERT INTO cities VALUES (179, 4, 2, 'Shreveport', 'Шривпорт', '1836', 'USA', 'Louisiana', 200145, -93.7700234392897158, 32.5000175160970528);
INSERT INTO cities VALUES (180, 4, 1, 'Baton Rouge', 'Батон-Руж', '1699', 'USA', 'Louisiana', 223349, -91.1401581235239604, 30.4579457794351391);
INSERT INTO cities VALUES (181, 4, 2, 'Ft. Worth', 'Форт-Уэрт', '1873', 'USA', 'Texas', 618119, -97.3400380877414335, 32.7399770294442121);
INSERT INTO cities VALUES (182, 4, 2, 'Corpus Christi', 'Корпус-Кристи', '1839', 'USA', 'Texas', 277454, -97.401894777194812, 27.7428143503878495);
INSERT INTO cities VALUES (183, 4, 1, 'Austin', 'Остин', '1835', 'USA', 'Texas', 678368, -97.7447242214211656, 30.2688955442973757);
INSERT INTO cities VALUES (184, 4, 2, 'Amarillo', 'Амарилло', '1887', 'USA', 'Texas', 181766, -101.82999658385323, 35.2299800812120267);
INSERT INTO cities VALUES (185, 4, 2, 'El Paso', 'Эль-Пасо', '1659', 'USA', 'Texas', 563662, -106.511941018331243, 31.7819298053712522);
INSERT INTO cities VALUES (186, 4, 2, 'Laredo', 'Ларедо', '1755', 'USA', 'Texas', 210769, -99.507218466981854, 27.5061362904909856);
INSERT INTO cities VALUES (187, 4, 1, 'Montgomery', 'Монтгомери', '1819-12-03', 'USA', 'Alabama', 198325, -86.2791886817727232, 32.3616021922030654);
INSERT INTO cities VALUES (188, 4, 1, 'Tallahassee', 'Таллахасси', '1824', 'USA', 'Florida', 153583, -84.2800342221294017, 30.4499876088621058);
INSERT INTO cities VALUES (189, 4, 2, 'Orlando', 'Орландо', '1885', 'USA', 'Florida', 207970, -81.3819762151707522, 28.5119226845899298);
INSERT INTO cities VALUES (190, 4, 2, 'Savannah', 'Саванна', '1733', 'USA', 'Georgia', 131510, -81.1099951596165738, 32.0211061798320884);
INSERT INTO cities VALUES (191, 4, 1, 'Columbia', 'Колумбия', '1805', 'USA', 'South Carolina', 116278, -80.899982138782434, 34.0399751983947638);
INSERT INTO cities VALUES (192, 4, 1, 'Indianapolis', 'Индианаполис', '1821', 'USA', 'Indiana', 773283, -86.171993915385201, 39.7519342813144902);
INSERT INTO cities VALUES (193, 4, 2, 'Knoxville', 'Ноксвилл', '1791', 'USA', 'Tennessee', 172474, -83.9200303565680628, 35.9700124298478272);
INSERT INTO cities VALUES (194, 4, 1, 'Richmond', 'Ричмонд', '1957', 'USA', 'Virginia', 190886, -77.4519318629415778, 37.551965205784775);
INSERT INTO cities VALUES (195, 4, 1, 'Charleston', 'Чарлстон', '1670', 'USA', 'West Virginia', 50427, -81.6327281104651519, 38.3497379751047944);
INSERT INTO cities VALUES (196, 4, 2, 'Baltimore', 'Балтимор', '1729', 'USA', 'Maryland', 610892, -76.6219308456854691, 39.3019359089167253);
INSERT INTO cities VALUES (197, 4, 2, 'Syracuse', 'Сиракьюс', '1786', 'USA', 'New York', 141830, -76.1500136735942164, 43.0499937124282539);
INSERT INTO cities VALUES (198, 4, 1, 'Augusta', 'Огаста', '1754', 'USA', 'Maine', 18560, -69.7799890560557401, 44.3105627635399628);
INSERT INTO cities VALUES (199, 4, 1, 'Mexicali', 'Мехикали', '1903-03-14', 'MEX', 'Baja California', 597099, -115.481961973770794, 32.6519283812211256);
INSERT INTO cities VALUES (200, 4, 1, 'La Paz', 'Ла-Пас', '1535-05-13', 'MEX', 'Baja California Sur', 171485, -110.319995159733594, 24.1399593292146619);
INSERT INTO cities VALUES (201, 4, 2, 'Torreon', 'Торреон', '1893', 'MEX', 'Coahuila', 524066, -103.421948749438641, 25.5719987750729274);
INSERT INTO cities VALUES (202, 4, 1, 'Culiacan', 'Кульякан', '1531', 'MEX', 'Sinaloa', 582469, -107.381913755964845, 24.8319405882209061);
INSERT INTO cities VALUES (203, 4, 1, 'Hermosillo', 'Эрмосильо', '1741', 'MEX', 'Sonora', 595811, -110.954064983954808, 29.0988814483749252);
INSERT INTO cities VALUES (204, 4, 2, 'Guaymas', 'Гуаймас', '1769', 'MEX', 'Sonora', 103449, -110.889986207912898, 27.9300122263651929);
INSERT INTO cities VALUES (205, 4, 1, 'San Luis Potosi', 'Сан-Луис-Потоси', '1824-10-14', 'MEX', 'San Luis Potosi', 677704, -101.001941425210234, 22.1719220742128265);
INSERT INTO cities VALUES (206, 4, 2, 'Matamoros', 'Матаморос', '1774', 'MEX', 'Tamaulipas', 435145, -97.500002483901028, 25.8799823191304199);
INSERT INTO cities VALUES (207, 4, 2, 'Nuevo Laredo', 'Нуэво-Ларедо', '1755', 'MEX', 'Tamaulipas', 349550, -99.5500065529195268, 27.4999867950483612);
INSERT INTO cities VALUES (208, 4, 1, 'Colima', 'Колима', '1527', 'MEX', 'Colima', 127235, -103.720010418496202, 19.2299747914345254);
INSERT INTO cities VALUES (209, 4, 1, 'Campeche', 'Кампече', '1540-10-4', 'MEX', 'Campeche', 205212, -90.4999904802922828, 19.8299898467755042);
INSERT INTO cities VALUES (210, 4, 1, 'Oaxaca', 'Оахака', '1486', 'MEX', 'Oaxaca', 262566, -96.66994979021284, 17.0826898386264361);
INSERT INTO cities VALUES (211, 4, 2, 'Leon', 'Леон-де-лос-Альдама', '1576', 'MEX', 'Guanajuato', 1114626, -101.701976215252088, 21.151932653635928);
INSERT INTO cities VALUES (212, 4, 1, 'Iqaluit', 'Икалуит', '1942', 'CAN', 'Nunavut', 6124, -68.5001917461494685, 63.7504593788569238);
INSERT INTO cities VALUES (213, 3, 1, 'Helena', 'Хелена', '1864', 'USA', 'Montana', 27340, -112.035290976797697, 46.5927490428460374);
INSERT INTO cities VALUES (214, 3, 1, 'Bismarck', 'Бисмарк', '1872-05-14', 'USA', 'North Dakota', 56706, -100.7833162859975, 46.8083172801516412);
INSERT INTO cities VALUES (215, 3, 1, 'Boise', 'Бойсе', '1862', 'USA', 'Idaho', 145987, -116.227489870043655, 43.6085901072872844);
INSERT INTO cities VALUES (216, 3, 2, 'San Jose', 'Сан-Хосе', '1777', 'USA', 'California', 894943, -121.851934914876992, 37.3019287881404509);
INSERT INTO cities VALUES (217, 3, 1, 'Sacramento', 'Сакраменто', '1848', 'USA', 'California', 467898, -121.471983946450962, 38.5769672402941453);
INSERT INTO cities VALUES (218, 3, 2, 'Las Vegas', 'Лас-Вегас', '1905-05-15', 'USA', 'Nevada', 478434, -115.22195200469416, 36.2119436400242876);
INSERT INTO cities VALUES (219, 3, 1, 'Santa Fe', 'Санта-Фе', '1610', 'USA', 'New Mexico', 69205, -105.937239422411309, 35.6869289337530446);
INSERT INTO cities VALUES (220, 3, 2, 'Portland', 'Портленд', '1851-02-08', 'USA', 'Oregon', 540513, -122.681935932132873, 45.5219696817280166);
INSERT INTO cities VALUES (221, 3, 1, 'Salt Lake City', 'Солт-Лейк-Сити', '1847', 'USA', 'Utah', 178026, -111.931997781048196, 40.7769621540400635);
INSERT INTO cities VALUES (222, 3, 1, 'Cheyenne', 'Шайенн', '1867', 'USA', 'Wyoming', 55443, -104.819710735883447, 41.1400069367045305);
INSERT INTO cities VALUES (223, 3, 1, 'Des Moines', 'Де-Мойн', '1843', 'USA', 'Iowa', 193180, -93.6199809181302243, 41.5799800812373519);
INSERT INTO cities VALUES (224, 3, 2, 'Omaha', 'Омаха', '1854-07-04', 'USA', 'Nebraska', 390007, -96.0099900734132774, 41.2400008331892423);
INSERT INTO cities VALUES (225, 3, 1, 'Oklahoma City', 'Оклахома-Сити', '1889', 'USA', 'Oklahoma', 532950, -97.5206293727873827, 35.4719888060368547);
INSERT INTO cities VALUES (226, 3, 1, 'Pierre', 'Пирр', '1880', 'USA', 'South Dakota', 13879, -100.350552003769224, 44.3683370148423322);
INSERT INTO cities VALUES (227, 3, 2, 'San Antonio', 'Сан-Антонио', '1718', 'USA', 'Texas', 1256810, -98.509251198963284, 29.4892790485259297);
INSERT INTO cities VALUES (228, 3, 1, 'Jackson', 'Джэксон', '1822', 'USA', 'Mississippi', 176696, -90.1849967872571625, 32.2988153269684517);
INSERT INTO cities VALUES (229, 3, 1, 'Raleigh', 'Роли', '1792-12-31', 'USA', 'North Carolina', 276093, -78.6446934424844812, 35.8187813507457236);
INSERT INTO cities VALUES (230, 3, 2, 'Cleveland', 'Кливленд', '1796-07-22', 'USA', 'Ohio', 449514, -81.6969440699896268, 41.4719326537173245);
INSERT INTO cities VALUES (231, 3, 2, 'Cincinnati', 'Цинциннати', '1788', 'USA', 'Ohio', 306382, -84.4588685084773232, 39.1638306436168548);
INSERT INTO cities VALUES (232, 3, 1, 'Nashville', 'Нашвилл', '1779', 'USA', 'Tennessee', 530852, -86.7819308457263219, 36.1719202432140605);
INSERT INTO cities VALUES (233, 3, 2, 'Memphis', 'Мемфис', '1819', 'USA', 'Tennessee', 650100, -90.0019410182651285, 35.1219326536918288);
INSERT INTO cities VALUES (234, 3, 2, 'Norfolk', 'Норфолк', '1682', 'USA', 'Virginia', 234403, -76.280005739024503, 36.8499587189139106);
INSERT INTO cities VALUES (235, 3, 2, 'Milwaukee', 'Милуоки', '1818', 'USA', 'Wisconsin', 579180, -87.9219129420849868, 43.0546009073041702);
INSERT INTO cities VALUES (236, 3, 2, 'Buffalo', 'Буффало', '1832', 'USA', 'New York', 279557, -78.881947935538264, 42.8819241088008241);
INSERT INTO cities VALUES (237, 3, 1, 'Juneau', 'Джуно', '1900', 'USA', 'Alaska', 30711, -134.419996990884584, 58.3141266063694275);
INSERT INTO cities VALUES (238, 3, 2, 'Tijuana', 'Тихуана', '1889-07-11', 'MEX', 'Baja California', 1376457, -117.081941832175559, 32.5019633747099306);
INSERT INTO cities VALUES (239, 3, 1, 'Chihuahua', 'Чиуауа', '1709-10-12', 'MEX', 'Chihuahua', 708267, -106.086928200946659, 28.6469273639523259);
INSERT INTO cities VALUES (240, 3, 2, 'Mazatlan', 'Масатлан', '1531', 'MEX', 'Sinaloa', 354717, -106.420000652882038, 23.2211006866328376);
INSERT INTO cities VALUES (241, 3, 2, 'Tampico', 'Тампико', '1554', 'MEX', 'Tamaulipas', 309003, -97.8700057391108516, 22.3000199574623252);
INSERT INTO cities VALUES (242, 3, 2, 'Acapulco', 'Акапулько', '1531', 'MEX', 'Guerrero', 652136, -99.9159790464107118, 16.8499908640162062);
INSERT INTO cities VALUES (243, 3, 2, 'Veracruz', 'Веракрус', '1519', 'MEX', 'Veracruz', 568313, -96.1599809181404908, 19.1773423451452345);
INSERT INTO cities VALUES (244, 3, 1, 'Tuxtla Gutierrez', 'Тустла-Гутьеррес', '1848-05-31', 'MEX', 'Chiapas', 481128, -93.1500096046518706, 16.7499969675312741);
INSERT INTO cities VALUES (245, 3, 2, 'Cancun', 'Канкун', '1970-04-20', 'MEX', 'Quintana Roo', 542043, -86.8300077735718929, 21.1699597361037455);
INSERT INTO cities VALUES (246, 3, 1, 'Merida', 'Мерида', '1542-01-06', 'MEX', 'Yucaton', 717175, -89.6185794053078979, 20.9685846718641642);
INSERT INTO cities VALUES (247, 3, 1, 'Winnipeg', 'Виннипег', '238', 'CAN', 'Manitoba', 632063, -97.1659918637824802, 49.8829874868696379);
INSERT INTO cities VALUES (248, 3, 1, 'Regina', 'Реджайна', '1882-06', 'CAN', 'Saskatchewan', 176183, -104.617009930218501, 50.4500329784083945);
INSERT INTO cities VALUES (249, 3, 2, 'Saskatoon', 'Саскатун', '1883', 'CAN', 'Saskatchewan', 198958, -106.669985394093871, 52.1700313508110298);
INSERT INTO cities VALUES (250, 3, 2, 'Calgary', 'Калгари', '1875', 'CAN', 'Alberta', 1019942, -114.081944070119306, 51.0849376179483627);
INSERT INTO cities VALUES (251, 3, 1, 'Victoria', 'Виктория', '1862', 'CAN', 'British Columbia', 289625, -123.3500008564002, 48.4332826935696517);
INSERT INTO cities VALUES (252, 3, 1, 'Yellowknife', 'Йеллоунайф', '1936', 'CAN', 'Northwest Territories', 15865, -114.396981447184714, 62.4420141796281314);
INSERT INTO cities VALUES (253, 3, 1, 'Whitehorse', 'Уайтхорс', '1898', 'CAN', 'Yukon', 23272, -135.049984376954853, 60.7167189729156576);
INSERT INTO cities VALUES (254, 3, 0, 'Ottawa', 'Оттава', '1855', 'CAN', 'Ontario', 812129, -75.7019611598094997, 45.4186426553604221);
INSERT INTO cities VALUES (255, 3, 1, 'Quebec', 'Квебек', '1608-07-03', 'CAN', 'Québec', 528595, -71.2456101905017363, 46.8399690949303817);
INSERT INTO cities VALUES (256, 3, 1, 'Halifax', 'Галифакс', '1749-07-21', 'CAN', 'Nova Scotia', 359111, -63.600004518270616, 44.6500252472653756);
INSERT INTO cities VALUES (257, 3, 1, 'St. John''s', 'Сент-Джонс', '1583-08-05', 'CAN', 'Newfoundland and Labrador', 99182, -52.681006918943126, 47.5849882192823159);
INSERT INTO cities VALUES (258, 3, 1, 'Charlottetown', 'Шарлоттаун', '1764', 'CAN', 'Prince Edward Island', 42402, -63.1313251155993953, 46.2492816356181038);
INSERT INTO cities VALUES (259, 2, 2, 'Minneapolis', 'Миннеаполис', '1867', 'USA', 'Minnesota', 367773, -93.2537321966635062, 44.9819251260618671);
INSERT INTO cities VALUES (260, 2, 1, 'Honolulu', 'Гонолулу', '1907-04-30', 'USA', 'Hawaii', 371657, -157.859943744773602, 21.3088223020739633);
INSERT INTO cities VALUES (261, 2, 2, 'Seattle', 'Сиэтл', '1869', 'USA', 'Washington', 569369, -122.34193084586849, 47.5719479125307245);
INSERT INTO cities VALUES (262, 2, 1, 'Phoenix', 'Финикс', '1868-05-01', 'USA', 'Arizona', 1321045, -112.071937559694689, 33.5419257363676024);
INSERT INTO cities VALUES (263, 2, 2, 'San Diego', 'Сан-Диего', '1769', 'USA', 'California', 1223400, -117.181935728660278, 32.8219696816773236);
INSERT INTO cities VALUES (264, 2, 2, 'St. Louis', 'Сент-Луис', '1763', 'USA', 'Missouri', 320916, -90.2419263698285903, 38.6369635781851457);
INSERT INTO cities VALUES (265, 2, 2, 'New Orleans', 'Новый Орлеан', '1718', 'USA', 'Louisiana', 484674, -90.0419127386428499, 29.9969483193614828);
INSERT INTO cities VALUES (266, 2, 2, 'Dallas', 'Даллас', '1841', 'USA', 'Texas', 1211704, -96.8419627874981472, 32.8219696816773236);
INSERT INTO cities VALUES (267, 2, 1, 'Boston', 'Бостон', '1630', 'USA', 'Massachusetts', 589141, -71.0719595321868383, 42.3319060017022863);
INSERT INTO cities VALUES (268, 2, 2, 'Tampa', 'Тампа', '1823', 'USA', 'Florida', 324465, -82.4605667099667698, 27.9489337929859403);
INSERT INTO cities VALUES (269, 2, 2, 'Philadelphia', 'Филадельфия', '1682', 'USA', 'Pennsylvania', 1517550, -75.1719418320079029, 40.0019190225264722);
INSERT INTO cities VALUES (270, 2, 2, 'Detroit', 'Детройт', '1701', 'USA', 'Michigan', 951270, -83.0820016464926994, 42.3319060017022863);
INSERT INTO cities VALUES (271, 2, 2, 'Anchorage', 'Анкоридж', '1914', 'USA', 'Alaska', 260283, -149.900214886454364, 61.2199699087900058);
INSERT INTO cities VALUES (272, 2, 1, 'Guadalajara', 'Гвадалахара', '1542', 'MEX', 'Jalisco', 1640589, -103.331980080818482, 20.671961950508944);
INSERT INTO cities VALUES (273, 2, 1, 'Puebla', 'Пуэбла', '1530', 'MEX', 'Puebla', 1392099, -98.2019831325557675, 19.0519057981587139);
INSERT INTO cities VALUES (274, 2, 1, 'Edmonton', 'Эдмонтон', '1795', 'CAN', 'Alberta', 712391, -113.5019277940752, 53.5519704955624363);
INSERT INTO cities VALUES (275, 2, 2, 'Montreal', 'Монреаль', '1642-05-17', 'CAN', 'Québec', 3268513, -73.5852428167021344, 45.5019450642150218);
INSERT INTO cities VALUES (276, 1, 2, 'San Francisco', 'Сан-Франциско', '1776', 'USA', 'California', 732072, -122.417168773552234, 37.7691956296874309);
INSERT INTO cities VALUES (277, 1, 2, 'Miami', 'Майами', '1896-07-28', 'USA', 'Florida', 382894, -80.2260519394500307, 25.7895565550215302);
INSERT INTO cities VALUES (278, 1, 1, 'Atlanta', 'Атланта', '1837', 'USA', 'Georgia', 422908, -84.4018952418756641, 33.8319597126058511);
INSERT INTO cities VALUES (279, 1, 2, 'Chicago', 'Чикаго', '1795', 'USA', 'Illinois', 2841952, -87.7520008327093137, 41.8319365192784218);
INSERT INTO cities VALUES (280, 1, 1, 'Monterrey', 'Монтеррей', '1596', 'MEX', 'Nuevo Leyn', 1122874, -100.331930642329965, 25.6719409951252828);
INSERT INTO cities VALUES (281, 1, 2, 'Vancouver', 'Ванкувер', '1886-04-06', 'CAN', 'British Columbia', 1837969, -123.123590076394265, 49.2753624427117529);
INSERT INTO cities VALUES (282, 1, 1, 'Toronto', 'Торонто', '1793', 'CAN', 'Ontario', 4612191, -79.4219666529884307, 43.7019257364084339);
INSERT INTO cities VALUES (283, 0, 2, 'Los Angeles', 'Лос-Анджелес', '1783-09-04', 'USA', 'California', 3694820, -118.181926369940413, 33.9919241087654314);
INSERT INTO cities VALUES (284, 0, 0, 'Washington, D.C.', 'Вашингтон', '1790', 'USA', 'District of Columbia', 552433, -77.0113644394371732, 38.9014952350870544);
INSERT INTO cities VALUES (285, 0, 2, 'New York', 'Нью-Йорк', '1624', 'USA', 'New York', 8008278, -73.9819627874068146, 40.7519249225946396);
INSERT INTO cities VALUES (286, 0, 0, 'Mexico City', 'Мехико', '1521', 'MEX', 'Distrito Federal', 11285654, -99.1329340602939055, 19.4443883014154721);
INSERT INTO cities VALUES (287, 8, 2, 'Newport', 'Ньюпорт', '1873', 'USA', 'Delaware', 1055, -75.6094439999999963, 39.7136110000000002);
INSERT INTO cities VALUES (288, 8, 2, 'Hardwick', 'Хардвик', '1739', 'USA', 'Massachusetts', 2990, -72.2000000000000028, 42.3500000000000014);
INSERT INTO cities VALUES (289, 8, 2, 'Bloomington', 'Блумингтон', '1820', 'USA', 'Indiana', 80405, -86.5291670000000011, 39.1622219999999999);
INSERT INTO cities VALUES (290, 8, 2, 'Chariton', 'Чаритон', '1850', 'USA', 'Iowa', 4254, -93.3075000000000045, 41.0161109999999951);
INSERT INTO cities VALUES (291, 8, 2, 'Princeton', 'Принстон', '1683', 'USA', 'New Jersey', 28572, -74.6701649999999972, 40.3571150000000003);
INSERT INTO cities VALUES (292, 8, 2, 'Beverly', 'Беверли', '1626', 'USA', 'Massachusetts', 39502, -70.8799999999999955, 42.5579999999999998);
INSERT INTO cities VALUES (293, 8, 2, 'St. George', 'Сейнт Джордж', '1803-02-07', 'USA', 'Maine', 2591, -69.1989339999999942, 44.0164710000000028);
INSERT INTO cities VALUES (294, 8, 2, 'Swampscott', 'Суомпскотт', '1629', 'USA', 'Massachusetts', 14722, -70.9180560000000071, 42.4708329999999989);
INSERT INTO cities VALUES (295, 8, 2, 'Danielsville', 'Дэниелсвилл', '1817', 'USA', 'Georgia', 560, -83.2163890000000066, 34.1241669999999999);
INSERT INTO cities VALUES (296, 8, 2, 'Morristown', 'Морристаун', '1715', 'USA', 'New Jersey', 18411, -74.477318000000011, 40.7965620000000015);
INSERT INTO cities VALUES (297, 8, 2, 'Athens', 'Атенс', '1801', 'USA', 'Georgia', 113398, -83.3833329999999933, 33.9500000000000028);
INSERT INTO cities VALUES (298, 8, 2, 'Martinsburg', 'Мартинсбург', '1803', 'USA', 'New York', 1433, -75.4697219999999902, 43.7374999999999972);
INSERT INTO cities VALUES (300, 8, 2, 'Ballston Spa', 'Балстон Спа', '1807', 'USA', 'New York', 5556, -73.8511110000000031, 43.0072219999999987);
INSERT INTO cities VALUES (301, 8, 2, 'Hartland', 'Хартленд', '1761', 'USA', 'Vermont', 3393, -72.4224999999999994, 43.5705559999999963);
INSERT INTO cities VALUES (302, 8, 2, 'Springfield', 'Спрингфилд', '1761', 'USA', 'Vermont', 9373, -72.4833330000000018, 43.2999999999999972);
INSERT INTO cities VALUES (303, 8, 2, 'Pawlet', 'Полет', '1761', 'USA', 'Vermont', 1394, -73.2019439999999975, 43.3744439999999969);
INSERT INTO cities VALUES (304, 8, 2, 'Norwich', 'Норвич', '1793', 'USA', 'New York', 7190, -75.5216670000000079, 42.5319440000000029);
INSERT INTO cities VALUES (305, 8, 2, 'Petersham', 'Питершэм', '1733', 'USA', 'Massachusetts', 1234, -72.1875, 42.4874999999999972);
INSERT INTO cities VALUES (306, 8, 2, 'Roxbury', 'Роксбери', '1812', 'USA', 'New Hampshire', 229, -72.2058329999999984, 42.9549999999999983);
INSERT INTO cities VALUES (307, 8, 2, 'Saugus', 'Согас', '1815', 'USA', 'Massachusetts', 26628, -71.0105560000000082, 42.4647219999999948);
INSERT INTO cities VALUES (308, 8, 2, 'West Union', 'Вест Юнион', '1848', 'USA', 'Iowa', 2486, -91.8100000000000023, 42.9619440000000026);
INSERT INTO cities VALUES (309, 8, 2, 'Orange', 'Оранж', '1806', 'USA', 'New Jersey', 30134, -74.2356920000000002, 40.7680399999999992);
INSERT INTO cities VALUES (310, 8, 2, 'DeLand', 'Деленд', '1876', 'USA', 'Florida', 27031, -81.2863889999999998, 29.0225000000000009);
INSERT INTO cities VALUES (311, 8, 2, 'Greenville', 'Гринвиль', '1803', 'USA', 'New York', 3793, -74.0186109999999928, 42.4066669999999988);
INSERT INTO cities VALUES (312, 8, 2, 'Pittsburgh', 'Питтсбург', '1758', 'USA', 'Pennsylvania', 304391, -79.9763889999999975, 40.4397219999999962);
INSERT INTO cities VALUES (313, 8, 2, 'Kent', 'Кент', '1805', 'USA', 'Ohio', 28904, -81.3599999999999994, 41.1499999999999986);
INSERT INTO cities VALUES (314, 8, 2, 'York', 'Йорк', '1652', 'USA', 'Maine', 12529, -70.6486110000000025, 43.1633330000000015);
INSERT INTO cities VALUES (315, 8, 2, 'Durham', 'Дарем', '1732', 'USA', 'New Hampshire', 14638, -70.9263890000000004, 43.1338890000000035);
INSERT INTO cities VALUES (316, 8, 2, 'Cambridge', 'Кембридж', '1636', 'USA', 'Massachusetts', 109694, -71.1105560000000025, 42.3736109999999968);
INSERT INTO cities VALUES (317, 8, 2, ' Middlefield', 'Мидлфилд', '1866', 'USA', 'Connecticut', 4203, -72.712221999999997, 41.5174999999999983);
INSERT INTO cities VALUES (318, 8, 2, 'Meriden', 'Мериден', '1806', 'USA', 'Connecticut', 60868, -72.794721999999993, 41.5366670000000013);
INSERT INTO cities VALUES (319, 8, 2, 'Schoharie', 'Скохэри', '1718', 'USA', 'New York', 3299, -74.3122219999999913, 42.6788889999999981);
INSERT INTO cities VALUES (320, 8, 2, 'Farmington', 'Фармингтон', '1794', 'USA', 'Maine', 7760, -70.1463779999999986, 44.6689919999999958);
INSERT INTO cities VALUES (321, 8, 2, 'Leesburg', 'Лизбург', '1755', 'USA', 'Virginia', 47673, -77.5499999999999972, 39.1166669999999996);
INSERT INTO cities VALUES (322, 8, 2, 'Liberty Township', 'Либерти', '1771', 'USA', 'Pennsylvania', 1476, -76.7163890000000066, 41.0166669999999982);
INSERT INTO cities VALUES (323, 8, 2, 'Kalamazoo', 'Каламазу', '1829', 'USA', 'Michigan', 74262, -85.5858329999999938, 42.2899999999999991);
INSERT INTO cities VALUES (324, 8, 2, 'Barnesville', 'Барнсвиль', '1808', 'USA', 'Ohio', 4193, -81.1755560000000003, 39.9880560000000003);
INSERT INTO cities VALUES (325, 8, 2, 'Newton', 'Ньютон', '1688', 'USA', 'Massachusetts', 85146, -71.2097219999999993, 42.3369440000000026);
INSERT INTO cities VALUES (326, 8, 2, 'Milan', 'Милан', '1817', 'USA', 'Ohio', 1367, -82.6013889999999975, 41.2933330000000041);
INSERT INTO cities VALUES (327, 8, 2, 'West Orange', 'Вест Оранж', '1863', 'USA', 'New Jersey', 46207, -74.2650599999999912, 40.7857529999999997);
INSERT INTO cities VALUES (328, 8, 2, 'Edison', 'Эдисон', '1870', 'USA', 'New Jersey', 99967, -74.3494110000000035, 40.5039909999999992);
INSERT INTO cities VALUES (329, 8, 2, 'Auburn', 'Оберн', '1848', 'USA', 'New York', 27687, -76.5666670000000096, 42.9333330000000046);
INSERT INTO cities VALUES (330, 8, 2, 'Lockport', 'Локпорт', '1865', 'USA', 'New York', 21165, -78.6911109999999923, 43.1697220000000002);
INSERT INTO cities VALUES (331, 8, 2, 'Vermilion', 'Вермилион', '1837', 'USA', 'Ohio', 10594, -82.317222000000001, 41.408056000000002);
INSERT INTO cities VALUES (332, 8, 2, 'Nevada City', 'Невада-Сити', '1856', 'USA', 'California', 3068, -121.018611000000007, 39.2613890000000012);
INSERT INTO cities VALUES (333, 8, 2, 'Waterville', 'Вотервиль', '1808', 'USA', 'New York', 1583, -75.3766669999999976, 42.9316669999999974);
INSERT INTO cities VALUES (334, 8, 2, 'Sangerville', 'Сангервилль', '1814', 'USA', 'Maine', 1343, -69.3563890000000072, 45.1647219999999976);
INSERT INTO cities VALUES (335, 8, 2, 'Fairhaven', 'Фэйрхевен', '1812', 'USA', 'Massachusetts', 15873, -70.9041670000000011, 41.6375000000000028);
INSERT INTO cities VALUES (336, 8, 2, 'Lebanon', 'Лебанон', '1802', 'USA', 'Ohio', 20033, -84.2125000000000057, 39.4266670000000019);
INSERT INTO cities VALUES (337, 8, 2, 'Milford', 'Милфорд', '1639', 'USA', 'Connecticut', 52759, -73.0597219999999936, 41.2241670000000013);
INSERT INTO cities VALUES (338, 8, 2, 'Penfield', 'Пенфилд', '1810', 'USA', 'New York', 36242, -77.446667000000005, 43.1611109999999982);
INSERT INTO cities VALUES (339, 8, 2, 'Peabody', 'Пибоди', '1855', 'USA', 'Massachusetts', 51251, -70.9291670000000067, 42.527778000000005);
INSERT INTO cities VALUES (340, 8, 2, 'Galesburg', 'Гейлсберг', '1837', 'USA', 'Illinois', 35750, -90.3686110000000014, 40.952221999999999);
INSERT INTO cities VALUES (341, 8, 2, 'Elyria', 'Элирия', '1817', 'USA', 'Ohio', 54533, -82.1016670000000062, 41.3733330000000024);
INSERT INTO cities VALUES (342, 8, 2, 'Muskegon', 'Маскигон', NULL, 'USA', 'Michigan', 38401, -86.2483330000000024, 43.2341669999999993);
INSERT INTO cities VALUES (343, 8, 2, 'Holyoke', 'Холиок', '1850', 'USA', 'Massachusetts', 40135, -72.6166670000000067, 42.2041669999999982);
INSERT INTO cities VALUES (344, 8, 2, 'Ogden', 'Огден', '1844', 'USA', 'Utah', 83793, -111.961111000000017, 41.2277780000000007);
INSERT INTO cities VALUES (345, 8, 2, 'Geneva', 'Женева', '1816', 'USA', 'Ohio', 6215, -80.9480560000000082, 41.8049999999999997);
INSERT INTO cities VALUES (346, 8, 2, 'Fond du Lac', 'Фон-дю-Лак', '1852', 'USA', 'Wisconsin', 43021, -88.4500000000000028, 43.7666669999999982);
INSERT INTO cities VALUES (347, 8, 2, 'Manakin-Sabot', 'Манакин-Сабо', NULL, 'USA', 'Virginia', NULL, -77.7077780000000047, 37.6380559999999988);
INSERT INTO cities VALUES (348, 8, 2, 'Montrose', 'Монтроуз', '1879', 'USA', 'Alabama', NULL, -87.8938890000000015, 30.5650000000000013);
INSERT INTO cities VALUES (349, 8, 2, 'Pleasantville', 'Плезантвиль', '1889', 'USA', 'New Jersey', 20249, -74.5142629999999997, 39.3888000000000034);
INSERT INTO cities VALUES (350, 8, 2, 'Angola', 'Ангола', '1855', 'USA', 'New York', 2127, -79.0308330000000012, 42.6391670000000005);
INSERT INTO cities VALUES (351, 8, 2, 'Millville', 'Миллвиль', '1855', 'USA', 'Indiana', NULL, -85.2519439999999946, 39.9247219999999956);
INSERT INTO cities VALUES (352, 8, 2, 'Kitty Hawk', 'Китти-Хок', NULL, 'USA', 'North Carolina', 3272, -75.7047220000000038, 36.0769439999999975);
INSERT INTO cities VALUES (353, 8, 2, 'Eutaw', 'Юто', '1841', 'USA', 'Alabama', 1934, -87.888889000000006, 32.8405559999999994);
INSERT INTO cities VALUES (354, 8, 2, 'Monteagle', 'Монтигл', '1870', 'USA', 'Tennessee', 1192, -85.8344439999999906, 35.240000000000002);
INSERT INTO cities VALUES (355, 8, 2, 'Fillmore', 'Филмор', '1851', 'USA', 'Utah', 2489, -112.330833000000013, 38.9677780000000027);
INSERT INTO cities VALUES (356, 8, 2, 'Loudonville', 'Лаудонвиль', '1820', 'USA', 'Ohio', 2641, -82.2330560000000048, 40.6358329999999981);
INSERT INTO cities VALUES (357, 8, 2, 'East Providence', 'Ист-Провиденс', '1862', 'USA', 'Rhode Island', 47037, -71.3700000000000045, 41.8136110000000016);
INSERT INTO cities VALUES (358, 8, 2, 'Shelburne ', 'Шелберн', '1784', 'CAN', 'Nova Scotia', 13966, -65.2999999999999972, 43.7999999999999972);
INSERT INTO cities VALUES (359, 8, 2, 'Fairfield', 'Фэрфилд', '1788', 'USA', 'Maine', 6735, -69.5986110000000053, 44.5883329999999987);
INSERT INTO cities VALUES (360, 8, 2, 'Montclair', 'Монтклэр', '1868', 'USA', 'New Jersey', 37669, -74.2123519999999957, 40.8244150000000019);
INSERT INTO cities VALUES (361, 8, 2, 'Pine Island', 'Пайн-Айлэнд', '1856', 'USA', 'Minnesota', 3318, -92.6463889999999992, 44.2013889999999989);
INSERT INTO cities VALUES (362, 8, 2, 'Lake City', 'Лейк-Сити', '1855', 'USA', 'Minnesota', 5063, -92.2705559999999991, 44.4455559999999963);
INSERT INTO cities VALUES (363, 8, 2, 'Grants Pass', 'Грантс-Пасс', '1887', 'USA', 'Oregon', 34533, -123.328333000000001, 42.4388890000000032);
INSERT INTO cities VALUES (364, 8, 2, 'Lancaster', 'Ланкастер', '1818', 'USA', 'Pennsylvania', 59322, -76.3044439999999895, 40.0397219999999976);
INSERT INTO cities VALUES (365, 8, 2, 'Ottumwa', 'Оттамва', NULL, 'USA', 'Iowa', 25023, -92.4147219999999976, 41.0130559999999988);
INSERT INTO cities VALUES (366, 8, 2, 'Beaver Falls', 'Бивер-Фоллс', '1868', 'USA', 'Pennsylvania', 8987, -80.3197219999999987, 40.7588890000000035);
INSERT INTO cities VALUES (367, 8, 2, 'Worthington', 'Ворсингтон', '1803', 'USA', 'Ohio', 13575, -83.0208329999999961, 40.0913889999999995);
INSERT INTO cities VALUES (368, 8, 2, 'Harvard', 'Гарвард', '1867', 'USA', 'Illinois', 9447, -88.6227779999999967, 42.4266670000000019);
INSERT INTO cities VALUES (369, 8, 2, 'Red Bank', 'Ред Банк', '1870', 'USA', 'New Jersey', 2162, -74.0664719999999903, 40.3486969999999943);
INSERT INTO cities VALUES (370, 8, 2, 'Holmdel Township', 'Холмдел', '1857', 'USA', 'New Jersey', 16773, -74.1738490000000041, 40.3749639999999985);
INSERT INTO cities VALUES (371, 8, 2, 'Overpeck', 'Оверпек', '1882', 'USA', 'Ohio', NULL, -84.5147219999999919, 39.4508330000000029);
INSERT INTO cities VALUES (372, 8, 2, 'Hudson', 'Хадсон', '1799', 'USA', 'Ohio', 22262, -81.4407839999999936, 41.2398400000000009);
INSERT INTO cities VALUES (373, 8, 2, 'York', 'Йорк', '1887', 'USA', 'Pennsylvania', 43550, -76.7280560000000094, 39.9627780000000001);
INSERT INTO cities VALUES (374, 8, 2, 'Hanover', 'Хановер', '1761', 'USA', 'New Hampshire', 11260, -72.2894439999999889, 43.702221999999999);
INSERT INTO cities VALUES (375, 8, 2, 'Argos', 'Аргос', '1869', 'USA', 'Indiana', 1691, -86.2461109999999991, 41.2377780000000058);
INSERT INTO cities VALUES (376, 8, 2, 'Waukesha', 'Вокиша', '1896', 'USA', 'Wisconsin', 70718, -88.2316670000000016, 43.0116669999999957);
INSERT INTO cities VALUES (377, 8, 2, 'Elizabeth', 'Элизабет', '1855-03-13', 'USA', 'New Jersey', 124969, -74.1935300000000097, 40.6662609999999987);
INSERT INTO cities VALUES (378, 8, 2, 'Howland', 'Хаулэнд', NULL, 'USA', 'Maine', 1241, -68.6636110000000031, 45.2386109999999988);
INSERT INTO cities VALUES (379, 8, 2, 'Hagerstown', 'Хагерстаун', '1832', 'USA', 'Indiana', 1787, -85.1605559999999997, 39.9113889999999998);
INSERT INTO cities VALUES (380, 8, 2, 'Stanford', 'Стэнфорд', NULL, 'USA', 'California', 13809, -122.165278000000001, 37.4224999999999994);
INSERT INTO cities VALUES (381, 8, 2, 'Wilkes-Barre', 'Уилкс-Барре', '1769', 'USA', 'Pennsylvania', 40780, -75.8780560000000008, 41.2444440000000014);
INSERT INTO cities VALUES (382, 8, 2, 'Mahanoy City', 'Маханой-Сити', '1859', 'USA', 'Pennsylvania', 4647, -76.1411109999999951, 40.8125);
INSERT INTO cities VALUES (383, 8, 2, 'Forest City', 'Форест-Сити', '1888', 'USA', 'Pennsylvania', 1911, -75.4680560000000042, 41.6508329999999987);
INSERT INTO cities VALUES (384, 8, 2, 'Greenville', 'Гринвиль', '1831', 'USA', 'South Carolina', 102345, -82.3855560000000082, 34.8444440000000029);
INSERT INTO cities VALUES (385, 8, 2, 'Lacey', 'Лэйси', '1966', 'USA', 'Washington', 42393, -122.807221999999996, 47.0263890000000018);
INSERT INTO cities VALUES (386, 8, 2, 'Passaic', 'Пассейк', '1873', 'USA', 'New Jersey', 69781, -74.1269400000000047, 40.8564130000000034);
INSERT INTO cities VALUES (387, 8, 2, 'Parachute', 'Парашют ', '1908-04-01', 'USA', 'Colorado', 1085, -108.051666999999995, 39.4516670000000005);
INSERT INTO cities VALUES (388, 8, 2, 'Eureka', 'Юрика', '1870', 'USA', 'Utah', 667, -112.116388999999984, 39.9549999999999983);
INSERT INTO cities VALUES (389, 8, 2, 'Paramount', 'Парамаунт', '1957-01-30', 'USA', 'California', 54098, -118.16666699999999, 33.8999999999999986);
INSERT INTO cities VALUES (390, 8, 2, 'Marina del Rey', 'Марина дель Рэй', '1901', 'USA', 'California', 8866, -118.452778000000009, 33.9794440000000009);
INSERT INTO cities VALUES (391, 8, 2, 'Richardson', 'Ричардсон', '1873', 'USA', 'Texas', 99223, -96.7158329999999893, 32.9655559999999994);
INSERT INTO cities VALUES (392, 8, 2, 'Newport', 'Ньюпорт', '1804', 'USA', 'Pennsylvania', 1506, -77.1338889999999964, 40.4783329999999992);
INSERT INTO cities VALUES (393, 8, 2, 'Atlantic City', 'Атлантик-Сити', '1854-05-01', 'USA', 'New Jersey', 39558, -74.4510819999999995, 39.3772969999999987);
INSERT INTO cities VALUES (394, 8, 2, 'Edgewater', 'Эджуотер', '1894-12-07', 'USA', 'New Jersey', 11513, -73.9742370000000022, 40.8237999999999985);
INSERT INTO cities VALUES (395, 8, 2, 'Media', 'Мидиа', '1681', 'USA', 'Pennsylvania', 5327, -75.388056000000006, 39.9188890000000001);
INSERT INTO cities VALUES (396, 8, 2, 'Schenectady', 'Скенектади', '1798', 'USA', 'New York', 66135, -73.9372219999999913, 42.8141669999999976);
INSERT INTO cities VALUES (397, 8, 2, 'Palo Alto', 'Пало-Алто', '1894-04-23', 'USA', 'California', 64403, -122.138056000000006, 37.4291669999999996);
INSERT INTO cities VALUES (398, 8, 2, 'Wilton', 'Уилтон', '1802', 'USA', 'Connecticut', 18062, -73.4333329999999904, 41.2000000000000028);
INSERT INTO cities VALUES (399, 8, 2, 'Newtown', 'Ньютаун', '1711', 'USA', 'Connecticut', 27560, -73.2833329999999989, 41.3999999999999986);
INSERT INTO cities VALUES (400, 8, 2, 'Denver', 'Денвер', '1858-11-17', 'USA', 'Colorado', 600158, -104.881105000000005, 39.7618500000000026);
INSERT INTO cities VALUES (401, 8, 2, 'Marlton', 'Марлтон', '1676', 'USA', 'New Jersey', 10133, -74.929276999999999, 39.901885);
INSERT INTO cities VALUES (402, 8, 2, 'Venice', 'Венис', NULL, 'USA', 'Florida', 21253, -82.4333329999999904, 27.1000000000000014);
INSERT INTO cities VALUES (403, 8, 2, 'Waynesboro', 'Уэйнсборо', '1801', 'USA', 'Virginia', 21006, -78.8944439999999929, 38.0700000000000003);
INSERT INTO cities VALUES (404, 8, 2, 'Cedar City', 'Сидар-Сити', '1851-11-11', 'USA', 'Utah', 29162, -113.074444, 37.6824999999999974);
INSERT INTO cities VALUES (405, 8, 2, 'St. George', 'Сент-Джордж', '1861', 'USA', 'Utah', 80202, -113.578056000000004, 37.0952780000000004);
INSERT INTO cities VALUES (406, 8, 2, 'Rochester', 'Рочестер', '1854', 'USA', 'Minnesota', 106769, -92.4629500000000064, 44.0234000000000023);
INSERT INTO cities VALUES (407, 8, 2, 'Jersey City', 'Джерси-Сити', '1838-02-22', 'USA', 'New Jersey', 247597, -74.070999999999998, 40.7139999999999986);
INSERT INTO cities VALUES (408, 8, 2, 'Haverford', 'Хэйверфорд', NULL, 'USA', 'Pennsylvania', 6652, -75.2944439999999986, 40.0130559999999988);
INSERT INTO cities VALUES (409, 8, 2, 'Murray Hill', 'Мюррей Хилл', NULL, 'USA', 'New Jersey', NULL, -74.4011110000000002, 40.6952780000000018);
INSERT INTO cities VALUES (410, 8, 2, 'Petoskey', 'Петоски', NULL, 'USA', 'Michigan', 5670, -84.955278000000007, 45.3733330000000024);
INSERT INTO cities VALUES (411, 8, 2, 'Medford', 'Медфорд', '1630', 'USA', 'Massachusetts', 56173, -71.1066670000000016, 42.4183330000000041);
INSERT INTO cities VALUES (412, 8, 2, 'Zeigler', 'Зиглер', NULL, 'USA', 'Illinois', 1801, -89.053332999999995, 37.899721999999997);
INSERT INTO cities VALUES (413, 8, 2, 'Atherton', 'Атертон', '1923-09-12 00:00:00', 'USA', 'California', 6914, -122.200000000000003, 37.4586109999999977);
INSERT INTO cities VALUES (414, 8, 2, 'Menlo Park', 'Менло-Парк', '1927', 'USA', 'California', 32026, -122.183333000000005, 37.4527780000000021);
INSERT INTO cities VALUES (415, 8, 2, 'Oak Park', 'Оук-Парк', '1830', 'USA', 'Illinois', 52287, -87.7999999999999972, 41.8833330000000004);
INSERT INTO cities VALUES (416, 8, 2, 'East St. Louis', 'Ист-Сент-Луис', '1820', 'USA', 'Illinois', 27006, -90.1333329999999933, 38.6166669999999996);
INSERT INTO cities VALUES (417, 8, 2, 'Urbana', 'Эрбана', '1833', 'USA', 'Illinois', 41250, -88.2042469999999952, 40.1096649999999997);
INSERT INTO cities VALUES (418, 8, 2, 'Asheville', 'Ашвилл', '1797', 'USA', 'North Carolina', 83393, -82.5558329999999927, 35.5799999999999983);
INSERT INTO cities VALUES (419, 8, 2, 'Plano', 'Плейно', '1873', 'USA', 'Texas', 269776, -96.6833329999999904, 33.0166669999999982);
INSERT INTO cities VALUES (420, 8, 2, 'New Kensington', 'Нью-Кенсингтон', '1891', 'USA', 'Pennsylvania', 13116, -79.7583329999999933, 40.5683330000000026);
INSERT INTO cities VALUES (421, 8, 2, 'Wilmington', 'Уилмингтон', '1731', 'USA', 'Delaware', 71948, -75.5466669999999993, 39.7458330000000046);
INSERT INTO cities VALUES (422, 8, 2, 'Bremerton', 'Бремертон', '1901', 'USA', 'Washington', 37729, -122.652500000000003, 47.5700000000000003);
INSERT INTO cities VALUES (423, 8, 2, 'Richland', 'Ричленд', '1910', 'USA', 'Washington', 48058, -119.28138899999999, 46.2797219999999996);
INSERT INTO cities VALUES (424, 8, 2, 'Terrell', 'Террелл', '1874', 'USA', 'Texas', 15816, -96.2824999999999989, 32.7374999999999972);
INSERT INTO cities VALUES (425, 8, 2, 'Westchester', 'Уэстчестер (округ)', '1683', 'USA', 'New York', 976396, -73.7666669999999982, 41.1499999999999986);
INSERT INTO cities VALUES (426, 8, 2, 'Hastings', 'Хейстингс', '1872', 'USA', 'Nebraska', 24907, -98.3916669999999982, 40.5891669999999962);
INSERT INTO cities VALUES (427, 8, 2, 'Mountain View', 'Маунтин-Вью', '1902', 'USA', 'California', 74066, -122.083849999999998, 37.3860499999999973);
INSERT INTO cities VALUES (428, 8, 2, 'Amsterdam', 'Амстердам', '1885', 'USA', 'New York', 18620, -74.1833329999999904, 42.9500000000000028);
INSERT INTO cities VALUES (429, 8, 2, 'Lincoln', 'Линкольн', '1754', 'USA', 'Massachusetts', 6362, -71.3044439999999895, 42.4258330000000043);
INSERT INTO cities VALUES (430, 8, 2, 'Nashua', 'Нашуа', '1853', 'USA', 'New Hampshire', 86494, -71.4644440000000003, 42.7575000000000003);
INSERT INTO cities VALUES (431, 8, 2, 'Schaumburg', 'Шаумбург', '1956', 'USA', 'Illinois', 74227, -88.0838889999999992, 42.0302780000000027);
INSERT INTO cities VALUES (432, 8, 2, 'Maplewood', 'Мейплвуд', '1957', 'USA', 'Minnesota', 38018, -92.995277999999999, 44.9530559999999966);
INSERT INTO cities VALUES (433, 8, 2, 'West Bend', 'Вест-Бенд', '1885', 'USA', 'Wisconsin', 31078, -88.1800000000000068, 43.4200000000000017);
INSERT INTO cities VALUES (434, 8, 2, 'Evanston', 'Эванстоун', '1872', 'USA', 'Illinois', 75430, -87.6947219999999987, 42.0463890000000049);
INSERT INTO cities VALUES (435, 8, 2, 'Newport News', 'Ньюпорт-Ньюс', '1896', 'USA', 'Virginia', 183412, -76.4844439999999963, 37.0708330000000004);
INSERT INTO cities VALUES (436, 8, 2, 'Irvine', 'Ирвин', '1971', 'USA', 'California', 258386, -117.823056000000008, 33.6694439999999986);
INSERT INTO cities VALUES (437, 8, 2, 'Baker', 'Бейкер', '1890', 'USA', 'Nevada', 68, -114.122769999999988, 39.0132800000000017);
INSERT INTO cities VALUES (438, 8, 2, 'Santa Monica', 'Санта-Моника', '1886', 'USA', 'California', 89736, -118.481388999999993, 34.0219439999999977);
INSERT INTO cities VALUES (439, 8, 2, 'Simsbury', 'Симсбери', '1670', 'USA', 'Connecticut', 23511, -72.8252779999999973, 41.8705560000000006);
INSERT INTO cities VALUES (440, 8, 2, 'Boulder', 'Боулдер', '1871-11-04', 'USA', 'Colorado', 97385, -105.251944999999992, 40.027434999999997);
INSERT INTO cities VALUES (441, 8, 2, 'Uxbridge', 'Аксбридж', '1850', 'CAN', 'Ontario', 20623, -79.1333329999999933, 44.1166669999999996);
INSERT INTO cities VALUES (442, 8, 2, 'Yorkton', 'Йорктон', '1900', 'CAN', 'Saskatchewan', 16343, -102.462778, 51.2138890000000018);
INSERT INTO cities VALUES (443, 8, 2, 'Cambridge', 'Кеймбридж', '1973', 'CAN', 'Ontario', 129920, -80.3166670000000096, 43.3666669999999996);
INSERT INTO cities VALUES (444, 8, 2, 'South Dundas', 'Саут-Дандас', '1792', 'CAN', 'Ontario', 10794, -75.2666669999999982, 44.9166669999999968);
INSERT INTO cities VALUES (445, 8, 2, 'Bedford', 'Бедфорд', '1866-11-21', 'CAN', 'Quebec', 2684, -72.9833330000000018, 45.1166669999999996);
INSERT INTO cities VALUES (446, 8, 2, 'St. Catharines', 'Сент-Катаринс', '1876', 'CAN', 'Ontario', 133113, -79.2333330000000018, 43.1833330000000046);
INSERT INTO cities VALUES (447, 8, 2, 'Sables-Spanish Rivers', 'Сэйблз-Спэниш-Риверс', '1998', 'CAN', 'Ontario', 3214, -82, 46.2333330000000018);
INSERT INTO cities VALUES (448, 8, 2, 'Mapleton', 'Мэйплтон', '1999', 'CAN', 'Ontario', 9989, -80.6667000000000058, 43.75);
INSERT INTO cities VALUES (449, 8, 2, 'Guelph', 'Гуэлф', '1827', 'CAN', 'Ontario', 131794, -80.25, 43.5499999999999972);
INSERT INTO cities VALUES (450, 8, 2, 'Burnaby', 'Бернаби', '1892', 'CAN', 'British Columbia', 223218, -122.966666999999987, 49.2666669999999982);
INSERT INTO cities VALUES (451, 8, 2, 'Sun City', 'Сан-Сити', '1960', 'USA', 'Arizona', 37499, -112.281943999999996, 33.6141670000000019);
INSERT INTO cities VALUES (452, 8, 2, 'East Bolton', 'Ист-Болтон', '1876', 'CAN', 'Quebec', 910, -72.3499999999999943, 45.2000000000000028);
INSERT INTO cities VALUES (453, 8, 2, 'Ayr', 'Эир', '1824', 'CAN', 'Ontario', 4171, -80.4500000000000028, 43.2855559999999997);
INSERT INTO cities VALUES (454, 8, 2, 'Parrsboro', 'Паррсборо', '1670', 'CAN', 'Nova Scotia', 1205, -64.3258329999999887, 45.4058330000000012);
INSERT INTO cities VALUES (455, 8, 2, 'Moncton', 'Монктон', '1766', 'CAN', 'New Brunswick', 71889, -64.7713889999999992, 46.1327780000000018);
INSERT INTO cities VALUES (456, 8, 2, 'Saint John', 'Сент-Джон', '1785', 'CAN', 'New Brunswick', 67575, -66.0761109999999974, 45.2805559999999971);
INSERT INTO cities VALUES (457, 8, 2, 'Valcourt ', 'Валкур', '1929', 'CAN', 'Quebec', 2349, -72.3166670000000096, 45.5);
INSERT INTO cities VALUES (458, 8, 2, 'Milton', 'Милтон', '1818-05-17', 'CAN', 'Ontario', 110128, -79.8833329999999933, 43.5083330000000004);
INSERT INTO cities VALUES (459, 8, 2, 'Hamilton', 'Гамильтон', '1846', 'CAN', 'Ontario', 536917, -79.8666670000000067, 43.25);
INSERT INTO cities VALUES (460, 8, 2, 'Orangeville', 'Оранжвилль', '1873', 'CAN', 'Ontario', 27975, -80.1166670000000067, 43.9166669999999968);
INSERT INTO cities VALUES (461, 8, 2, 'Weston', 'Уэстон', '1914', 'CAN', 'Ontario', 16470, -79.5197000000000003, 43.7009889999999999);
INSERT INTO cities VALUES (462, 8, 2, 'Carbonear', 'Карбонир', '1948', 'CAN', 'Newfoundland and Labrador', 4739, -53.2294439999999938, 47.7374999999999972);
INSERT INTO cities VALUES (463, 8, 2, 'Mississippi Mills', 'Миссисипи-Миллс', '1810', 'CAN', 'Ontario', 12385, -76.2000000000000028, 45.2166670000000011);
INSERT INTO cities VALUES (464, 8, 2, 'Lawrence', 'Лоренс', '1854', 'USA', 'Kansas', 87643, -95.2352780000000081, 38.9716669999999965);
INSERT INTO cities VALUES (465, 8, 2, 'Notre-Dame-du-Mont-Carmel', 'Нотр-Дам-дю-Мон-Кармель', '1858', 'CAN', 'Quebec', 5467, -72.6500000000000057, 46.4833330000000018);
INSERT INTO cities VALUES (466, 8, 2, 'Welland', 'Велланд', '1917', 'CAN', 'Ontario', 52293, -79.2333330000000018, 42.9833330000000018);
INSERT INTO cities VALUES (467, 8, 2, 'New Tecumseth', 'Нью-Текамсет', '1991', 'CAN', 'Ontario', 34242, -79.75, 44.0833330000000032);
INSERT INTO cities VALUES (468, 8, 2, 'Musgrave Harbour', 'Масгрейв Харбор', '1834', 'CAN', 'Newfoundland and Labrador', 1053, -53.9644439999999932, 49.4166669999999968);
INSERT INTO cities VALUES (469, 8, 2, 'Pembroke', 'Пемброук', '1832', 'USA', 'Maine', 840, -67.1619439999999912, 44.9536109999999951);
INSERT INTO cities VALUES (470, 8, 2, 'Belleville', 'Белвилл', '1878', 'CAN', 'Ontario', 49454, -77.3833329999999933, 44.1666669999999968);
INSERT INTO cities VALUES (471, 8, 2, 'Brantford', 'Брантфорд', '1877', 'CAN', 'Ontario', 37496, -80.25, 43.1666669999999968);
INSERT INTO cities VALUES (472, 8, 2, 'Midland', 'Мидлэнд', '1887', 'USA', 'Michigan', 41863, -84.2472219999999936, 43.615555999999998);
INSERT INTO cities VALUES (473, 8, 2, 'West Lafayette', 'Уэст-Лафейетт', '1888', 'USA', 'Indiana', 29596, -86.9124999999999943, 40.4419439999999994);
INSERT INTO cities VALUES (474, 8, 2, 'Kawartha Lakes', 'Каворта-Лейкс', '2001', 'CAN', 'Ontario', 73214, -78.75, 44.3500000000000014);
INSERT INTO cities VALUES (475, 8, 2, 'Parma', 'Парма', '1924', 'USA', 'Ohio', 81601, -81.7286110000000008, 41.3919440000000023);
INSERT INTO cities VALUES (476, 8, 2, 'Sackville', 'Саквилл', '1762', 'CAN', 'New Brunswick', 5558, -64.3666670000000067, 45.8999999999999986);
INSERT INTO cities VALUES (477, 8, 2, 'Ixtlahuaca de Rayón', 'Истлауака-де-Район', '1816', 'MEX', 'Mexico', 126505, -99.7669439999999952, 19.5688890000000022);
INSERT INTO cities VALUES (478, 8, 2, 'Ahualulco', 'Ауалулько', '1542', 'MEX', 'San Luis Potosi', 4492, -101.167000000000002, 22.3999999999999986);
INSERT INTO cities VALUES (479, 8, 2, 'Puebla City', 'Пуэбла', '1531', 'MEX', 'Puebla', 2499519, -98.1833329999999904, 19.0333329999999989);
INSERT INTO cities VALUES (480, 8, 2, 'Ixhuatlán de Madero', 'Исуатлан-де-Мадеро', NULL, 'MEX', 'Veracruz', 48609, -98.0166669999999982, 20.6833329999999975);
INSERT INTO cities VALUES (481, 8, 2, 'Shadwell', 'Шадвелл', '1741', 'USA', 'Virginia', 3668, -78.4177779999999984, 38.0123829999999998);
INSERT INTO cities VALUES (482, 8, 2, 'Charlottesville', 'Шарлотсвилл', '1762', 'USA', 'Virginia', 49071, -78.4789999999999992, 38.0298999999999978);
INSERT INTO cities VALUES (483, 8, 2, 'Westborough', 'Вестборо', '1717', 'USA', 'Massachusetts', 18272, -71.6166670000000067, 42.269444);
INSERT INTO cities VALUES (484, 8, 2, 'Uniontown', 'Юнионтаун', '1776', 'USA', 'Pennsylvania', 10372, -79.7244439999999912, 39.8999999999999986);
INSERT INTO cities VALUES (485, 8, 2, 'Woburn', 'Вуберн', '1642', 'USA', 'Massachusetts', 38120, -71.1527779999999979, 42.4791669999999968);
INSERT INTO cities VALUES (486, 8, 2, 'Berlin', 'Берлин', '1785', 'USA', 'Connecticut', 19866, -72.7724999999999937, 41.6138890000000004);
INSERT INTO cities VALUES (487, 8, 2, 'Middletown', 'Мидлтаун', '1651', 'USA', 'Connecticut', 47648, -72.6508329999999916, 41.5622219999999984);
INSERT INTO cities VALUES (488, 8, 2, 'Sutton', 'Саттон', '1714', 'USA', 'Massachusetts', 8963, -71.7633329999999887, 42.1499999999999986);
INSERT INTO cities VALUES (489, 8, 2, 'Suffield', 'Саффилд', '1749', 'USA', 'Connecticut', 15735, -72.6833329999999904, 41.9833330000000018);
INSERT INTO cities VALUES (490, 8, 2, 'Northampton', 'Нортгемптон', '1883', 'USA', 'Massachusetts', 28592, -72.6500000000000057, 42.3333330000000032);
INSERT INTO cities VALUES (491, 8, 2, 'Pelham', 'Пелэм', '1743', 'USA', 'Massachusetts', 1321, -72.4041670000000011, 42.3930560000000014);
INSERT INTO cities VALUES (492, 8, 2, 'Salem', 'Сейлем', '1836', 'USA', 'Massachusetts', 42869, -70.8985030000000052, 42.3930560000000014);
INSERT INTO cities VALUES (493, 8, 2, 'Brocton', 'Броктон', '1894', 'USA', 'New York', 1486, -79.4447219999999987, 42.3922219999999967);
INSERT INTO cities VALUES (494, 8, 2, 'Taunton', 'Тонтон', '1864', 'USA', 'Massachusetts', 55874, -71.0902779999999979, 41.8999999999999986);
INSERT INTO cities VALUES (495, 8, 2, 'Somerville', 'Сомервилл', '1842', 'USA', 'Massachusetts', 78901, -71.0999999999999943, 42.3875000000000028);
INSERT INTO cities VALUES (496, 8, 2, 'East Hampton', 'Ист-Хемптон', '1767', 'USA', 'Connecticut', 12959, -72.5, 41.5666669999999954);
INSERT INTO cities VALUES (497, 8, 2, 'Madison', 'Мэдисон', '1807', 'USA', 'New York', 3008, -75.5152780000000092, 42.9008329999999987);
INSERT INTO cities VALUES (498, 8, 2, 'Shelbyville', 'Шелбивилл', '1827', 'USA', 'Illinois', 4700, -88.7997220000000027, 39.408056000000002);
INSERT INTO cities VALUES (499, 8, 2, 'Vineland', 'Вайнлэнд', '1952', 'USA', 'New Jersey', 60724, -74.997115000000008, 39.4650069999999999);
INSERT INTO cities VALUES (500, 8, 2, 'Manlius', 'Мэнлиус', '1813', 'USA', 'New York', 32370, -75.9827779999999962, 43.0480560000000025);
INSERT INTO cities VALUES (501, 8, 2, 'North Dansville', 'Норт-Дэнсвилл', '1846', 'USA', 'New York', 5538, -77.6955560000000105, 42.5600000000000023);
INSERT INTO cities VALUES (502, 8, 2, 'Plainfield', 'Плейнфилд', '1799', 'USA', 'New York', 915, -75.1972219999999965, 42.8202780000000018);
INSERT INTO cities VALUES (503, 8, 2, 'Westerly', 'Вестерли', '1669', 'USA', 'Rhode Island', 18296, -71.8272219999999919, 41.3774999999999977);
INSERT INTO cities VALUES (504, 8, 2, 'New Britain', 'Нью-Бритен', '1870', 'USA', 'Connecticut', 74284, -72.7872219999999999, 41.6749999999999972);
INSERT INTO cities VALUES (505, 8, 2, 'Spring Grove', 'Спринг-Гров', '1902', 'USA', 'Illinois', 5778, -88.2425000000000068, 42.4511109999999974);
INSERT INTO cities VALUES (506, 8, 2, 'Newport', 'Ньюпорт', '1784', 'USA', 'Rhode Island', 24672, -71.3126219999999904, 41.4880020000000016);
INSERT INTO cities VALUES (507, 8, 2, 'Kingfield', 'Кингфилд', '1816', 'USA', 'Maine', 997, -70.1538890000000066, 44.9591670000000008);
INSERT INTO cities VALUES (508, 8, 2, 'Wenham', 'Венэм', '1643', 'USA', 'Massachusetts', 4875, -70.8868280000000084, 42.6042079999999999);
INSERT INTO cities VALUES (509, 8, 2, 'Aiken', 'Эйкен', '1835', 'USA', 'South Carolina', 29494, -81.720556000000002, 33.5494440000000012);
INSERT INTO cities VALUES (510, 8, 2, 'Leicester', 'Лестер', '1786', 'USA', 'Vermont', 1100, -73.0988889999999998, 43.8697219999999959);
INSERT INTO cities VALUES (511, 8, 2, 'Whitewater', 'Уайтуотер', NULL, 'USA', 'Wisconsin', 14390, -88.736110999999994, 42.8350000000000009);
INSERT INTO cities VALUES (512, 8, 2, 'Beloit', 'Белоит', '1856', 'USA', 'Wisconsin', 36966, -89.0316669999999988, 42.5083330000000004);
INSERT INTO cities VALUES (513, 8, 2, 'Weymouth', 'Уэймаут', '1635', 'USA', 'Massachusetts', 55643, -70.9402780000000064, 42.2208329999999989);
INSERT INTO cities VALUES (514, 8, 2, 'Highland Park', 'Хайлэнд-Парк', '1869', 'USA', 'Illinois', 29763, -87.8069440000000014, 42.1824999999999974);
INSERT INTO cities VALUES (515, 8, 2, 'Lyons', 'Лайонс', '1811', 'USA', 'New York', 5682, -76.9925000000000068, 43.0597220000000007);
INSERT INTO cities VALUES (516, 8, 2, 'Columbus', 'Колумбус', '1864', 'USA', 'Indiana', 44061, -85.9110560000000021, 39.2139979999999966);
INSERT INTO cities VALUES (517, 8, 2, 'Phelps', 'Фелпс', '1796', 'USA', 'New York', 7072, -77.0580729999999932, 42.9575530000000043);
INSERT INTO cities VALUES (518, 8, 2, 'Elkhart', 'Элкарт', '1839', 'USA', 'Indiana', 50949, -85.9688890000000043, 41.6830560000000006);
INSERT INTO cities VALUES (519, 8, 2, 'Palm Beach', 'Палм-Бич', '1911', 'USA', 'Florida', 10468, -80.0394439999999889, 26.7149999999999999);
INSERT INTO cities VALUES (520, 8, 2, 'Ohotsk', 'Охотск', '1647', 'RUS', 'Khabarovsk', 3488, 143.409999999999997, 59.3733000000000004);
INSERT INTO cities VALUES (521, 8, 2, 'Shinhidaka', 'Синхидака', NULL, 'JPN', 'Hokkaido', 24391, 140.009999999999991, 41.8290000000000006);
INSERT INTO cities VALUES (522, 8, 2, 'Anadyr', 'Анадырь', '1889', 'RUS', 'Chukchi Autonomous Okrug', 15468, 177.474996299999987, 64.7369903799999946);
INSERT INTO cities VALUES (523, 8, 2, 'Bolsheretsk', 'Большерецк', '1703', 'RUS', 'Kamchtka', NULL, 156.584399999999988, 52.9005999999999972);
INSERT INTO cities VALUES (524, 8, 2, 'Sendai', 'Сэндай', '1600', 'JPN', 'Miyagi', 1052147, 140.924399999999991, 38.2603999999999971);
INSERT INTO cities VALUES (525, 8, 2, 'Akkeshi', 'Аккэси', NULL, 'JPN', 'Hokkaido', 9741, 144.849999999999994, 43.0499999999999972);
INSERT INTO cities VALUES (526, 8, 2, 'Ozerskoe', 'Озёрское', '1785', 'RUS', 'Sakhalin', 1326, 143.169000000000011, 46.601700000000001);
INSERT INTO cities VALUES (527, 8, 2, 'Zyryanskoe', 'Зырянское', '1785', 'RUS', 'Sakhalin', NULL, 142.001000000000005, 46.8900000000000006);
INSERT INTO cities VALUES (528, 8, 2, 'Il''inskoe', 'Ильинское', '1853-08-30', 'RUS', 'Sakhalin', 649, 142.256499999999988, 47.9853999999999985);
INSERT INTO cities VALUES (529, 8, 2, 'Nemuro', 'Нэмуро', '1790', 'JPN', 'Hokkaido', 27109, 145.582999999999998, 43.3299999999999983);
INSERT INTO cities VALUES (530, 8, 2, 'Hakodate', 'Хакодате', '1454', 'JPN', 'Hokkaido', 272648, 140.781200000000013, 41.7661000000000016);
INSERT INTO cities VALUES (531, 8, 2, 'Matsumae', 'Мацумаэ', '1606', 'JPN', 'Hokkaido', NULL, 140.163199999999989, 41.4224999999999994);


--
-- TOC entry 2231 (class 0 OID 0)
-- Dependencies: 203
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('cities_id_seq', 531, true);


--
-- TOC entry 2106 (class 2606 OID 16851)
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


-- Completed on 2017-09-11 15:06:46 UTC

--
-- PostgreSQL database dump complete
--

