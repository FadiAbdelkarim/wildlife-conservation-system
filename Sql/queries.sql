

SELECT *
FROM "Animals";



SELECT species, population_estimate
FROM "Animals"
WHERE population_estimate > 10000;



SELECT
    A.species,
    S.animal_count,
    S.date
FROM "Animals" A
JOIN "Sightings" S
ON A.animal_id = S.animal_id;


SELECT
    A.species,
    COUNT(S.sighting_id) AS total_sightings
FROM "Animals" A
LEFT JOIN "Sightings" S
ON A.animal_id = S.animal_id
GROUP BY A.species;



SELECT
    R.ranger_name,
    P.area_name
FROM "Rangers" R
JOIN "ProtectedAreas" P
ON R.area_id = P.area_id;


SELECT
    AVG(population_estimate) AS average_population
FROM "Animals";



SELECT *
FROM "ProtectedAreas"
ORDER BY size DESC;
