

INSERT INTO "UserRoles"(role_id, role_name)
VALUES
(1, 'Admin'),
(2, 'Researcher'),
(3, 'Ranger');


INSERT INTO "Users"(user_id, username, password, email, role_id)
VALUES
(1, 'admin1', 'admin123', 'admin@wildlife.com', 1),
(112, 'researcher1', 'research123', 'research@wildlife.com', 2),
(113, 'ranger1', 'ranger123', 'ranger@wildlife.com', 3);



INSERT INTO "ProtectedAreas"(area_id, area_name, location, size)
VALUES
(221, 'Serengeti National Park', 'Tanzania', 14750),
(222, 'Kruger National Park', 'South Africa', 19485),
(223, 'Masai Mara Reserve', 'Kenya', 1510);



INSERT INTO "Rangers"(ranger_id, ranger_name, area_id)
VALUES
(101, 'John Carter', 221),
(102, 'Sarah Johnson', 222),
(103, 'David Smith', 223);



INSERT INTO "Animals"(animal_id, species, status, population_estimate)
VALUES
(1001, 'African Elephant', 'Endangered', 415000),
(1002, 'Black Rhino', 'Critically Endangered', 5500),
(1003, 'Lion', 'Vulnerable', 20000),
(1004, 'Cheetah', 'Vulnerable', 7100);



INSERT INTO "Sightings"(sighting_id, animal_id, ranger_id, area_id, date, animal_count)
VALUES
(301, 1001, 101, 221, '2026-04-01', 15),
(302, 1002, 102, 222, '2026-04-03', 3),
(303, 1003, 103, 223, '2026-04-04', 8),
(304, 1004, 101, 221, '2026-04-06', 5),
(305, 1001, 102, 222, '2026-04-07', 12);



INSERT INTO "ConservationProjects"
(project_id, project_name, start_date, end_date, area_id)
VALUES
(501, 'Elephant Protection Initiative', '2025-01-01', '2027-12-31', 221),

(502, 'Rhino Recovery Program', '2025-06-01', '2028-06-01', 222),

(503, 'Lion Habitat Monitoring', '2026-01-01', '2027-01-01', 223);
