# Surplus Food Management - Backend

Node.js + Express + MySQL backend for the Surplus Food Management System.

## Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)

## Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Configure MySQL:
   - Make sure MySQL is running
   - Create a database (or let the schema.sql do it)
   - Update `.env` file with your MySQL credentials

3. Set up the database:
```bash
# Login to MySQL
mysql -u root -p

# Run the schema file
source config/schema.sql

# Or manually:
mysql -u root -p < config/schema.sql
```

4. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values:
     - `DB_HOST`: MySQL host (default: localhost)
     - `DB_USER`: MySQL username (default: root)
     - `DB_PASSWORD`: Your MySQL password
     - `DB_NAME`: Database name (default: surplus_food_db)
     - `JWT_SECRET`: A secure random string for JWT tokens

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

**Donor Registration**
- POST `/api/donors/register`
- Body: `{ name, email, password, phone }`

**Donor Login**
- POST `/api/donors/login`
- Body: `{ email, password }`

**NGO Registration**
- POST `/api/ngos/register`
- Body: `{ name, email, password, phone, address, secret_key }`

**NGO Login**
- POST `/api/ngos/login`
- Body: `{ email, password }`

**Validate Secret Key**
- POST `/api/ngos/validate-secret`
- Body: `{ ngoId, secretKey }`

### Foods

**Add Food** (Donor only)
- POST `/api/foods`
- Headers: `Authorization: Bearer <token>`
- Body: `{ food_name, quantity, distance_text, phone, notes, latitude, longitude }`

**Get Available Foods**
- GET `/api/foods/available`

**Get My Foods** (Donor only)
- GET `/api/foods/my`
- Headers: `Authorization: Bearer <token>`

**Get Food by ID**
- GET `/api/foods/:id`

**Claim Food** (NGO only)
- POST `/api/foods/:id/claim`
- Headers: `Authorization: Bearer <token>`

### Events

**Get All Events** (Public)
- GET `/api/events`

**Get Event by ID** (Public)
- GET `/api/events/:id`

**Add Event** (NGO only)
- POST `/api/events`
- Headers: `Authorization: Bearer <token>`
- Body: `{ title, description, event_date, event_time, venue }`

**Update Event** (NGO only)
- PUT `/api/events/:id`
- Headers: `Authorization: Bearer <token>`
- Body: `{ title, description, event_date, event_time, venue }`

**Delete Event** (NGO only)
- DELETE `/api/events/:id`
- Headers: `Authorization: Bearer <token>`

### History

**Get Food History**
- GET `/api/history`

## Database Schema

See `config/schema.sql` for the complete database structure.

## Security Notes

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Change the `JWT_SECRET` in production
- Use strong passwords for MySQL
- Enable HTTPS in production

## Troubleshooting

**Cannot connect to MySQL:**
- Check if MySQL is running: `mysql --version`
- Verify credentials in `.env`
- Make sure the database exists

**Port already in use:**
- Change the PORT in `.env`
- Or kill the process using port 5000

**JWT errors:**
- Make sure JWT_SECRET is set in `.env`
- Check if token is being sent in Authorization header
