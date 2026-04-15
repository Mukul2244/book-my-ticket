# Movie Ticket Booking Backend

A scalable backend system for a movie ticket booking platform built using Node.js, Express, and PostgreSQL. The application supports user authentication, secure session management, and concurrent-safe seat booking.

## Overview

This project is inspired by real-world ticket booking systems. It allows users to register, log in, view available movies, check seat availability, and book seats. The system is designed with a modular architecture and focuses on handling real-world challenges such as preventing double booking.

## Features

* User registration and login
* JWT-based authentication (access and refresh tokens)
* Secure session handling using HTTP-only cookies
* DTO-based request validation using Joi
* Modular architecture (controller, service, routes)
* Movie listing and seat availability APIs
* Transaction-based seat booking
* Concurrency handling using row-level locking

## Tech Stack

* Backend: Node.js, Express
* Database: PostgreSQL
* Authentication: JSON Web Tokens (JWT)
* Validation: Joi
* Environment: Docker (PostgreSQL)

## Project Structure

```
src/
  modules/
    auth/
    movie/
    booking/
  common/
    config/
    dto/
    middleware/
    utils/
```

## Database Schema (Simplified)

* users
* refresh_tokens
* movies
* seats

Seats are directly associated with movies for simplicity in this version.

## API Endpoints

### Auth

POST /auth/register
POST /auth/login

### Movies

GET /movies

### Seats

GET /booking/seats/:movieId

### Booking

POST /booking/book
(Protected route, requires access token)

## Booking Flow

1. User logs in and receives an access token
2. User selects a movie and available seats
3. Booking request is sent with seat IDs
4. Backend uses a database transaction and row-level locking to:

   * Ensure seats are not already booked
   * Prevent concurrent booking conflicts
5. Seats are marked as booked if available

## Concurrency Handling

The system uses PostgreSQL transactions with `FOR UPDATE` to lock rows during booking. This prevents multiple users from booking the same seat simultaneously.

## Setup Instructions

### 1. Clone the repository

```
git clone <your-repo-url>
cd <project-folder>
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```
PORT=5000
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

### 4. Start PostgreSQL using Docker

```
docker-compose up -d
```

### 5. Run the server

```
npm run dev
```


## Author

Mukul Sharma
