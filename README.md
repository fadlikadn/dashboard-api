# Patient Dashboard API

This is the backend API for the Patient Dashboard application. It provides endpoints for managing patients, diagnoses, medications, allergies, appointments, and user authentication.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Seed Data](#seed-data)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)

## Features

- User authentication (login and registration)
- Role-based access control (RBAC)
- GET operations for patients, diagnoses, medications, allergies, and appointments
- WebSocket support for real-time updates
- Swagger API documentation

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/patient-dashboard-api.git
   cd patient-dashboard-api
   ```
2. Install the dependencies:

   ```sh
   npm install
   ```
3. Setup the database. Ensure that you have PostgreSQL installed and running. Create a new database and update the `DATABASE_URL` environment variable in the `.env` file with the connection string.
4. Modify the environment variables in the `.env` file as needed.
5. Run in development mode:

   ```sh
   npm run dev
   ```
6. Run seed data. This will populate the database with sample data users, roles, patients, diagnoses, medications, allergies, and appointments.

   ```sh
   npm run data:seed
   ```

## API Documentation
The API documentation is generated using Swagger. You can access the documentation by visiting the `/docs` route. In development mode, the documentation is available at `http://localhost:3001/docs`.

## Database Schema
The database schema is defined using TypeORM entities. You can find the schema in the `src/entities` directory. These the following entities are defined:
- User
- Role
- Patient
- Diagnosis
- Medication
- Allergy
- Appointment

## Scipts
- `npm run dev`: Start the server in development mode

## Environment Variables
- `DB_HOST`: The host of the database
- `DB_PORT`: The port on which the server will run
- `DB_USERNAME`: The username of the database
- `DB_PASSWORD`: The password of the database
- `DB_DATABASE`: The name of the database
- `JWT_SECRET`: The secret key for generating JWT tokens

## TODO:
- Unit tests
- Integration tests
- Deployment scripts
- Docker configuration
- CI/CD pipeline
- Migration scripts