-- =========================================
-- PL/pgSQL BLOCK 1
-- Function to count animals
-- =========================================

CREATE OR REPLACE FUNCTION get_total_animals()
RETURNS INTEGER AS
$$
DECLARE
    total INTEGER;
BEGIN

    SELECT COUNT(*)
    INTO total
    FROM "Animals";

    RETURN total;

END;
$$ LANGUAGE plpgsql;

-- =========================================
-- PL/pgSQL BLOCK 2
-- Function to get total sightings
-- =========================================

CREATE OR REPLACE FUNCTION get_total_sightings()
RETURNS INTEGER AS
$$
DECLARE
    total INTEGER;
BEGIN

    SELECT COUNT(*)
    INTO total
    FROM "Sightings";

    RETURN total;

END;
$$ LANGUAGE plpgsql;

-- =========================================
-- PL/pgSQL BLOCK 3
-- Procedure to add animal
-- =========================================

CREATE OR REPLACE PROCEDURE add_new_animal(
    p_species VARCHAR,
    p_status VARCHAR,
    p_population INTEGER
)
LANGUAGE plpgsql
AS
$$
BEGIN

    INSERT INTO "Animals"
    (species, status, population_estimate)

    VALUES
    (p_species, p_status, p_population);

END;
$$;

-- =========================================
-- PL/pgSQL BLOCK 4
-- Trigger Function
-- =========================================

CREATE OR REPLACE FUNCTION animal_insert_message()
RETURNS TRIGGER AS
$$
BEGIN

    RAISE NOTICE 'New animal inserted successfully';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;

-- =========================================
-- PL/pgSQL BLOCK 5
-- Trigger
-- =========================================

CREATE TRIGGER animal_insert_trigger

AFTER INSERT
ON "Animals"

FOR EACH ROW

EXECUTE FUNCTION animal_insert_message();