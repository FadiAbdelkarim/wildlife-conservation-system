-- =========================================
-- 1. USER ROLES TABLE
-- =========================================

CREATE TABLE "UserRoles" (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- =========================================
-- 2. USERS TABLE
-- =========================================

CREATE TABLE "Users" (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    role_id INT,

    CONSTRAINT fk_role
        FOREIGN KEY(role_id)
        REFERENCES "UserRoles"(role_id)
        ON DELETE SET NULL
);

-- =========================================
-- 3. PROTECTED AREAS TABLE
-- =========================================

CREATE TABLE "ProtectedAreas" (
    area_id SERIAL PRIMARY KEY,
    area_name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    size DECIMAL(10,2)
);

-- =========================================
-- 4. RANGERS TABLE
-- =========================================

CREATE TABLE "Rangers" (
    ranger_id SERIAL PRIMARY KEY,
    ranger_name VARCHAR(100) NOT NULL,
    area_id INT,

    CONSTRAINT fk_area_ranger
        FOREIGN KEY(area_id)
        REFERENCES "ProtectedAreas"(area_id)
        ON DELETE SET NULL
);

-- =========================================
-- 5. ANIMALS TABLE
-- =========================================

CREATE TABLE "Animals" (
    animal_id SERIAL PRIMARY KEY,
    species VARCHAR(100) NOT NULL,
    status VARCHAR(50),
    population_estimate INT DEFAULT 0
);

-- =========================================
-- 6. SIGHTINGS TABLE
-- =========================================

CREATE TABLE "Sightings" (
    sighting_id SERIAL PRIMARY KEY,
    animal_id INT,
    ranger_id INT,
    area_id INT,
    date DATE,
    animal_count INT,

    CONSTRAINT fk_animal
        FOREIGN KEY(animal_id)
        REFERENCES "Animals"(animal_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_ranger
        FOREIGN KEY(ranger_id)
        REFERENCES "Rangers"(ranger_id)
        ON DELETE SET NULL,

    CONSTRAINT fk_area
        FOREIGN KEY(area_id)
        REFERENCES "ProtectedAreas"(area_id)
        ON DELETE SET NULL
);

-- =========================================
-- 7. CONSERVATION PROJECTS TABLE
-- =========================================

CREATE TABLE "ConservationProjects" (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(150) NOT NULL,
    start_date DATE,
    end_date DATE,
    area_id INT,

    CONSTRAINT fk_project_area
        FOREIGN KEY(area_id)
        REFERENCES "ProtectedAreas"(area_id)
        ON DELETE SET NULL
);
