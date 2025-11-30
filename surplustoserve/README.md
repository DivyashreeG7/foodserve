# Surplus Food Management System

A full-stack web application connecting food donors with NGOs to reduce food waste and fight hunger. NGOs can also post community events.

## 🎯 Features

### For Donors
- Register and login
- Post surplus food with details (name, quantity, location, contact)
- Capture GPS location using browser geolocation
- View posted foods and their status (available/claimed)

### For NGOs
- Register with secret key verification
- Login with two-step authentication (password + secret key)
- Browse available food donations
- View detailed food information with donor contacts
- Claim food donations
- View donation history
- Post community events

### Public Features
- View upcoming community events
- Browse event details

## 🧱 Tech Stack

### Frontend
- React 18 (functional components with hooks)
- React Router for navigation
- Plain CSS (no frameworks)
- Vite as build tool

### Backend
- Node.js
- Express.js
- MongoDB database (with Mongoose)
- JWT authentication
- bcrypt for password hashing

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6.0 or higher)
- npm or yarn

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd surplus-food-management
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Configure MongoDB:
- Make sure MongoDB is running
- Update `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/surplus_food_db
JWT_SECRET=your_secure_jwt_secret_key
```

**No database setup needed!** MongoDB creates everything automatically.

Start the backend server:

```bash
npm run dev
```

You should see:
```
MongoDB connected successfully
Server running on port 5000
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Configure the API URL in `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
surplus-food-management/
├── backend/
│   ├── config/
│   │   ├── db.js              # Database connection
│   │   └── schema.sql         # Database schema
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── routes/
│   │   ├── donors.js          # Donor routes
│   │   ├── ngos.js            # NGO routes
│   │   ├── foods.js           # Food routes
│   │   ├── events.js          # Event routes
│   │   └── history.js         # History routes
│   ├── .env                   # Environment variables
│   ├── server.js              # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx     # Navigation component
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── DonorRegister.jsx
    │   │   ├── DonorLogin.jsx
    │   │   ├── DonorDashboard.jsx
    │   │   ├── NGORegister.jsx
    │   │   ├── NGOLogin.jsx
    │   │   ├── NGOVerifySecret.jsx
    │   │   ├── FoodList.jsx
    │   │   ├── FoodDetails.jsx
    │   │   ├── History.jsx
    │   │   ├── Events.jsx
    │   │   └── AddEvent.jsx
    │   ├── App.jsx             # Main app component
    │   ├── main.jsx            # Entry point
    │   └── index.css           # Global styles
    ├── .env                    # Environment variables
    ├── index.html
    └── package.json
```

## 🗄️ Database Schema

### Collections (MongoDB)

1. **donors** - Donor user accounts
2. **ngos** - NGO user accounts with secret keys
3. **foods** - Food donations (available/claimed)
4. **foodhistories** - Record of claimed donations
5. **events** - Community events posted by NGOs

MongoDB creates these collections automatically when you add data.

## 🔐 API Endpoints

### Authentication

**Donor**
- `POST /api/donors/register` - Register donor
- `POST /api/donors/login` - Login donor

**NGO**
- `POST /api/ngos/register` - Register NGO
- `POST /api/ngos/login` - Login NGO
- `POST /api/ngos/validate-secret` - Validate secret key

### Foods

- `POST /api/foods` - Add food (donor only)
- `GET /api/foods/available` - Get available foods
- `GET /api/foods/my` - Get donor's foods (donor only)
- `GET /api/foods/:id` - Get food details
- `POST /api/foods/:id/claim` - Claim food (NGO only)

### Events

- `GET /api/events` - Get all events (public)
- `GET /api/events/:id` - Get event details (public)
- `POST /api/events` - Add event (NGO only)
- `PUT /api/events/:id` - Update event (NGO only)
- `DELETE /api/events/:id` - Delete event (NGO only)

### History

- `GET /api/history` - Get food donation history

## 🎨 Features Walkthrough

### Donor Flow
1. Register/Login
2. Access dashboard
3. Add food with location capture
4. View posted foods and their status

### NGO Flow
1. Register with secret key
2. Login with email/password
3. Verify secret key
4. Browse available foods
5. View food details and donor contact
6. Claim food donations
7. View history
8. Post community events

## 🔒 Security

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Secret key verification for NGOs
- Protected routes with middleware
- CORS enabled for frontend-backend communication

## 🐛 Troubleshooting

**Cannot connect to MongoDB:**
- Check if MongoDB is running: `mongosh`
- Start MongoDB: 
  - Windows: `net start MongoDB`
  - Mac: `brew services start mongodb-community`
  - Linux: `sudo systemctl start mongod`

**Port already in use:**
- Change PORT in backend `.env`
- Change port in frontend `vite.config.js`

**CORS errors:**
- Verify backend URL in frontend `.env`
- Check CORS configuration in `backend/server.js`

**Location not working:**
- Enable location services in browser
- Use HTTPS in production (required for geolocation)

## 📝 License

MIT License

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.
