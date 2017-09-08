-- for course_trace table

SELECT MAX(id) FROM course_trace;

SELECT nextval('course_trace_id_seq');

SELECT setval('course_trace_id_seq', (SELECT MAX(id) FROM course_trace));
  
SELECT setval('course_trace_id_seq', COALESCE((SELECT MAX(id)+1 FROM course_trace), 1), false);


-- for course_timeline table

SELECT MAX(id) FROM course_timeline;

SELECT nextval('course_timeline_id_seq');

SELECT setval('course_timeline_id_seq', (SELECT MAX(id) FROM course_timeline));
  
SELECT setval('course_timeline_id_seq', COALESCE((SELECT MAX(id)+1 FROM course_timeline), 1), false);


-- for course_event table

SELECT MAX(id) FROM course_event;

SELECT nextval('course_event_id_seq');

SELECT setval('course_event_id_seq', (SELECT MAX(id) FROM course_event));
  
SELECT setval('course_event_id_seq', COALESCE((SELECT MAX(id)+1 FROM course_event), 1), false);

-- for course table 

SELECT MAX(id) FROM course;

SELECT nextval('course_id_seq');

SELECT setval('course_id_seq', (SELECT MAX(id) FROM course));
  
SELECT setval('course_id_seq', COALESCE((SELECT MAX(id)+1 FROM course), 1), false);

-- for geo_events table

SELECT MAX(id) FROM geo_events;

SELECT nextval('geo_events_id_seq');

SELECT setval('geo_events_id_seq', (SELECT MAX(id) FROM geo_events));
  
SELECT setval('geo_events_id_seq', COALESCE((SELECT MAX(id)+1 FROM geo_events), 1), false);

-- for cities table

SELECT MAX(id) FROM cities;

SELECT nextval('cities_id_seq');

SELECT setval('cities_id_seq', (SELECT MAX(id) FROM cities));
  
SELECT setval('cities_id_seq', COALESCE((SELECT MAX(id)+1 FROM cities), 1), false);

-- for persons table

SELECT MAX(id) FROM persons;

SELECT nextval('persons_id_seq');

SELECT setval('persons_id_seq', (SELECT MAX(id) FROM persons));

SELECT setval('persons_id_seq', COALESCE((SELECT MAX(id)+1 FROM persons), 1), false);


-- for inventions table

SELECT MAX(id) FROM inventions;

SELECT nextval('inventions_id_seq');

SELECT setval('inventions_id_seq', (SELECT MAX(id) FROM inventions));

SELECT setval('inventions_id_seq', COALESCE((SELECT MAX(id)+1 FROM inventions), 1), false);

-- for contour TABLE

SELECT MAX(id) FROM contour;

SELECT nextval('contour_id_seq');

SELECT setval('contour_id_seq', (SELECT MAX(id) FROM contour));
  
SELECT setval('contour_id_seq', COALESCE((SELECT MAX(id)+1 FROM contour), 1), false);

-- for borders table 

SELECT MAX(id) FROM borders;

SELECT nextval('borders_id_seq');

SELECT setval('borders_id_seq', (SELECT MAX(id) FROM borders));
  
SELECT setval('borders_id_seq', COALESCE((SELECT MAX(id)+1 FROM borders), 1), false);

-- for properties table 

SELECT MAX(id) FROM properties;

SELECT nextval('properties_id_seq');

SELECT setval('properties_id_seq', (SELECT MAX(id) FROM properties));
  
SELECT setval('properties_id_seq', COALESCE((SELECT MAX(id)+1 FROM properties), 1), false);

-- for geometry table

SELECT MAX(id) FROM geometry;

SELECT nextval('geometry_id_seq');

SELECT setval('geometry_id_seq', (SELECT MAX(id) FROM geometry));
  
SELECT setval('geometry_id_seq', COALESCE((SELECT MAX(id)+1 FROM geometry), 1), false);

-- for type table

SELECT MAX(id) FROM type;

SELECT nextval('type_id_seq');

SELECT setval('type_id_seq', (SELECT MAX(id) FROM type));
  
SELECT setval('type_id_seq', COALESCE((SELECT MAX(id)+1 FROM type), 1), false);

-- for admin table

SELECT MAX(id) FROM admin;

SELECT nextval('admin_id_seq');

SELECT setval('admin_id_seq', (SELECT MAX(id) FROM admin));
  
SELECT setval('admin_id_seq', COALESCE((SELECT MAX(id)+1 FROM admin), 1), false);

