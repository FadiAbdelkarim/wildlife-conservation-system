-- =========================================
-- QUERY 1
-- Display all animals
-- =========================================

SELECT *
FROM "Animals";

-- =========================================
-- QUERY 2
-- Animals with population greater than 10000
-- =========================================

SELECT species, population_estimate
FROM "Animals"
WHERE population_estimate > 10000;

-- =========================================
-- QUERY 3
-- Join Animals and Sightings
-- =========================================

SELECT
    A.species,
    S.animal_count,
    S.date
FROM "Animals" A
JOIN "Sightings" S
ON A.animal_id = S.animal_id;

-- =========================================
-- QUERY 4
-- Count total sightings per animal
-- =========================================

SELECT
    A.species,
    COUNT(S.sighting_id) AS total_sightings
FROM "Animals" A
LEFT JOIN "Sightings" S
ON A.animal_id = S.animal_id
GROUP BY A.species;

-- =========================================
-- QUERY 5
-- Display rangers and their protected areas
-- =========================================

SELECT
    R.ranger_name,
    P.area_name
FROM "Rangers" R
JOIN "ProtectedAreas" P
ON R.area_id = P.area_id;

-- =========================================
-- QUERY 6
-- Average population estimate
-- =========================================

SELECT
    AVG(population_estimate) AS average_population
FROM "Animals";

-- =========================================
-- QUERY 7
-- Protected areas ordered by size
-- =========================================

SELECT *
FROM "ProtectedAreas"
ORDER BY size DESC;