
# Bookstore API

This project is a RESTful API for managing a bookstore, built with **NestJS** and **Supabase** as the database. The API allows you to manage books and authors, with filtering, sorting, and pagination capabilities, as well as authentication.

## Project Structure

- **Supabase**: Used for database storage and authentication.
- **NestJS**: Used for building a RESTful API.
- **TypeScript**: For type safety and readability.

## Features

1. **Database Management**:
   - `Authors` and `Books` tables with foreign key relationships.
   
2. **RESTful API Endpoints**:
   - Retrieve books with optional filters, sorting, and pagination.
   - Add new books to the store.

3. **Authentication**:
   - Secured endpoints with Supabase authentication.

---

## Prerequisites

- **Node.js** (v14 or higher)
- **Supabase Account**: [Sign up here](https://supabase.io/)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/skyredmilad/sogimoto-bookstore-test-nestjs-supabase.git
   cd bookstore-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the project root and add the following variables:
     ```dotenv
     SUPABASE_URL=<YOUR_SUPABASE_URL>
     SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
     SUPABASE_SERVICE_ROLE_KEY=<YOUR_SUPABASE_SERVICE_ROLE_KEY>
     ```

## Database Setup

1. Go to the **Supabase dashboard** and create a new project.

2. In the SQL Editor, create the `Authors` table:
   ```sql
   CREATE TABLE Authors (
       author_id SERIAL PRIMARY KEY,
       name TEXT NOT NULL,
       phone TEXT NOT NULL
       country TEXT NOT NULL
   );
   ```

3. Then, create the `Books` table:
   ```sql
   CREATE TABLE Books (
       book_id SERIAL PRIMARY KEY,
       title TEXT NOT NULL,
       author_id INTEGER REFERENCES Authors(author_id) ON DELETE CASCADE,
       price DECIMAL NOT NULL,
       publish_date DATE NOT NULL
   );
   ```

4. Add sample data in each table to test the functionality.

---

## Running the Project

To start the development server, run:
```bash
npm run start:dev
```

The server will be running at `http://localhost:3000`.

---

## API Endpoints

### 1. Get Books

- **Endpoint**: `GET /books`
- **Description**: Retrieve a list of books with optional filters for `author_id` and `year`, sorted by `publish_date`, and with pagination.
- **Query Parameters**:
  - `author_id` (optional): Filter books by author.
  - `year` (optional): Filter books by publication year.
  - `page` (optional): Page number (default is 1).
  - `limit` (optional): Number of results per page (default is 10).

**Example Request**:
```bash
curl "http://localhost:3000/books?author_id=1&page=1&limit=5"
```

### 2. Create a Book

- **Endpoint**: `POST /books`
- **Description**: Add a new book to the database.
- **Body Parameters**:
  - `title`: Book title.
  - `author_id`: ID of the author (must exist in the Authors table).
  - `price`: Book price.
  - `publish_date`: Date of publication (in `YYYY-MM-DD` format).

**Example Request**:
```bash
curl -X POST "http://localhost:3000/books"      -H "Content-Type: application/json"      -d '{"title": "New Book", "author_id": 1, "price": 15.99, "publish_date": "2023-10-20"}'
```

---

## Error Handling

The API includes basic error handling and returns relevant HTTP status codes for different situations (e.g., `400` for bad requests, `401` for unauthorized, and `500` for server errors).

---

## Security

The API is configured to only allow authenticated requests using Supabase Auth. Ensure users are authenticated before they can access or modify the data.
