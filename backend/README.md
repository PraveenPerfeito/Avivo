# Node.js Users API (DummyJSON-style)

Production-ready REST API using Node.js, Express, and MySQL with a normalized schema.  
The `GET /users` endpoint returns users in the same nested object style as `https://dummyjson.com/users`, with data fetched from MySQL (no hardcoded JSON).

## Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv
- Helmet
- CORS

## Project Structure

```text
project-root/
|
|-- src/
|   |-- config/
|   |   |-- database.js
|   |   |-- env.js
|   |   `-- logger.js
|   |-- controllers/
|   |   `-- usersController.js
|   |-- routes/
|   |   |-- healthRoutes.js
|   |   `-- usersRoutes.js
|   |-- models/
|   |   `-- usersModel.js
|   |-- middleware/
|   |   |-- asyncHandler.js
|   |   |-- errorHandler.js
|   |   `-- notFound.js
|   |-- utils/
|   |   `-- responseValidator.js
|   |-- app.js
|   `-- server.js
|
|-- schema.sql
|-- .env.example
|-- package.json
`-- README.md
```

## MySQL Setup

### Option A: Docker (Recommended)

1. From `backend/` run:
   ```bash
   docker compose up -d
   ```
2. This automatically initializes schema + seed data using `schema.sql`.

### Option B: Local MySQL

1. Ensure MySQL is running.
2. From `backend/` run:
   ```bash
   mysql -u root -p < schema.sql
   ```

## Environment Variables

Copy `.env.example` to `.env` and update values:

```env
PORT=4000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root123
DB_NAME=user_directory
```

## Install and Run

From `backend/`:

```bash
npm install
npm run dev
```

Production mode:

```bash
npm start
```

## API Endpoints

### GET /health

Checks DB connectivity.

Success:

```json
{ "status": "ok" }
```

### GET /users

Returns users from MySQL in DummyJSON-like nested structure.

Example response:

```json
{
  "users": [
    {
      "id": 1,
      "firstName": "Emily",
      "lastName": "Johnson",
      "maidenName": "Smith",
      "age": 29,
      "gender": "female",
      "email": "emily.johnson@x.dummyjson.com",
      "phone": "+81 965-431-3024",
      "username": "emilys",
      "password": "emilyspass",
      "birthDate": "1996-5-30",
      "image": "https://dummyjson.com/icon/emilys/128",
      "bloodGroup": "O-",
      "height": 193.24,
      "weight": 63.16,
      "eyeColor": "Green",
      "hair": {
        "color": "Brown",
        "type": "Curly"
      },
      "ip": "42.48.100.32",
      "address": {
        "address": "626 Main Street",
        "city": "Phoenix",
        "state": "Mississippi",
        "stateCode": "MS",
        "postalCode": "29112",
        "coordinates": {
          "lat": -77.16213,
          "lng": -92.084824
        },
        "country": "United States"
      },
      "macAddress": "47:fa:41:18:ec:eb",
      "university": "University of Wisconsin--Madison",
      "bank": {
        "cardExpire": "05/28",
        "cardNumber": "3693233511855044",
        "cardType": "Diners Club International",
        "currency": "GBP",
        "iban": "GB74MH2UZLR9TRPHYNU8F8"
      },
      "company": {
        "department": "Engineering",
        "name": "Dooley, Kozey and Cronin",
        "title": "Sales Manager",
        "address": {
          "address": "263 Tenth Street",
          "city": "San Francisco",
          "state": "Wisconsin",
          "stateCode": "WI",
          "postalCode": "37657",
          "coordinates": {
            "lat": 71.814525,
            "lng": -161.150263
          },
          "country": "United States"
        }
      },
      "ein": "977-175",
      "ssn": "900-590-289",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
      "crypto": {
        "coin": "Bitcoin",
        "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
        "network": "Ethereum (ERC20)"
      },
      "role": "admin"
    }
  ],
  "total": 5
}
```

## Postman Testing

1. Method: `GET`
2. URL: `http://localhost:4000/users`
3. Click Send.
4. Verify:
   - HTTP 200 status
   - `users` array present
   - `total` equals number of users returned
   - Nested objects exist: `hair`, `address`, `bank`, `company`, `crypto`

Also test health:

- `GET http://localhost:4000/health`

## Production Notes

- Uses connection pooling (`mysql2/promise` createPool).
- Uses Helmet + CORS middleware.
- Uses async/await throughout.
- Uses centralized error handler middleware.
- Handles DB startup failure gracefully (API boots and logs DB status).
- Uses static SQL query and parameterized execute pathway to avoid SQL injection risk.
- Includes response schema validation before sending payload.
