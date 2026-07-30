# Wildlife Conservation System

A web-based dashboard for managing wildlife conservation data — species, protected areas, ranger assignments, sightings, and conservation projects.

## Overview

The Wildlife Conservation System is a full-stack dashboard that helps conservation teams keep track of endangered species, the protected areas they inhabit, the rangers responsible for monitoring them, and field sightings logged over time. It provides a simple, centralized interface for adding, updating, and reviewing conservation data instead of relying on scattered spreadsheets.

## Features

- **Animals** — add, update, delete, and view species records, including conservation status and population estimates
- **Protected Areas** — add, delete, and view area records (name, location, size)
- **Rangers** — add, delete, and view ranger assignments to protected areas
- **Sightings** — add, update, delete, and view sighting records linking animals, rangers, areas, dates, and counts
- **Role-based users** — Admin, Researcher, and Ranger roles managed via a `UserRoles` table

## Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** Supabase (PostgreSQL)

## Database Schema

The schema includes seven tables: `Users`, `UserRoles`, `ProtectedAreas`, `Rangers`, `Animals`, `Sightings`, and `ConservationProjects`, connected through foreign key relationships (e.g. a ranger belongs to a protected area, a sighting links an animal, ranger, and area).

Beyond the core tables, the database includes:
- PL/pgSQL functions for aggregate stats (e.g. total animal count, total sighting count)
- A stored procedure for inserting new animal records
- A trigger that fires on animal insert

An ER diagram of the full schema is available in [`docs/`](./docs).

## Project Structure

```
.
├── server.js           # Express server entry point
├── public/              # Frontend static files
│   ├── index.html       # Landing page
│   ├── animals.html      # Animals management page
│   ├── rangers.html      # Rangers management page
│   ├── areas.html        # Protected areas management page
│   ├── sightings.html    # Sightings management page
│   ├── app.js            # Frontend logic (Supabase client calls)
│   └── style.css         # Styling
├── sql/
│   ├── ddl.sql           # Table definitions
│   ├── dml.sql           # Seed data
│   ├── plsql.sql         # Functions, procedure, trigger
│   └── queries.sql       # Example queries
├── docs/
│   └── er-diagram.png    # Entity-relationship diagram
└── package.json
```

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wildlife-conservation-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Supabase**
   - Create a Supabase project and run `sql/ddl.sql`, `sql/dml.sql`, and `sql/plsql.sql` against it to set up the schema, seed data, and database logic.
   - Update the Supabase URL and API key in `public/app.js` (or move these into environment variables — see note below).

4. **Run the server locally**
   ```bash
   node server.js
   ```
   The app will be available at `http://localhost:3000`.

## License

This project is licensed under the MIT License.
