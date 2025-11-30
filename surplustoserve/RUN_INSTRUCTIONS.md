# 🏃 How to Run - Complete Instructions

## ⚡ Quick Version (5 Minutes)

```bash
# 1. Install MongoDB (if not installed)
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community && brew services start mongodb-community
# Linux: sudo apt install mongodb && sudo systemctl start mongodb

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Start backend (Terminal 1)
cd backend
npm run dev

# 4. Start frontend (Terminal 2)
cd frontend
npm run dev

# 5. Open browser
# Go to: http://localhost:3000
```

## 📖 Detailed Version

### Prerequisites

1. **Node.js** (v18+)
   - Check: `node --version`
   - Download: https://nodejs.org/

2. **MongoDB** (v6.0+)
   - Check: `mongosh`
   - Download: https://www.mongodb.com/try/download/community

### Step-by-Step

#### 1. Install MongoDB

**Windows:**
1. Download MongoDB Community Server
2. Run the installer
3. Choose "Complete" installation
4. Install as Windows Service
5. MongoDB starts automatically

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### 2. Verify MongoDB

```bash
mongosh
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017
```

Type `exit` to quit.

#### 3. Configure Environment

Check `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/surplus_food_db
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

**Change JWT_SECRET to something random!**

#### 4. Install Backend Dependencies

```bash
cd backend
npm install
```

Wait for installation to complete (~1-2 minutes).

#### 5. Install Frontend Dependencies

```bash
cd frontend
npm install
```

Wait for installation to complete (~1-2 minutes).

#### 6. Start Backend Server

Open a terminal:

```bash
cd backend
npm run dev
```

**Expected output:**
```
MongoDB connected successfully
Server running on port 5000
```

✅ **Leave this terminal open!**

#### 7. Start Frontend Server

Open a **NEW** terminal:

```bash
cd frontend
npm run dev
```

**Expected output:**
```
VITE v5.4.19  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

✅ **Leave this terminal open too!**

#### 8. Open Application

Open your browser and go to:
```
http://localhost:3000
```

You should see the home page with "Share Surplus, Save Lives"

## 🎯 Testing the Application

### Test 1: Register as Donor

1. Click "I Want to Donate Food"
2. Fill in the form:
   - Name: Test Donor
   - Email: donor@test.com
   - Password: test123
   - Phone: 1234567890
3. Click "Register"
4. You should be redirected to Donor Dashboard

### Test 2: Add Food

1. Fill in the food form:
   - Food Name: Rice and Curry
   - Quantity: 50 plates
   - Distance: Downtown
   - Phone: 1234567890
   - Notes: Fresh food
2. Click "Capture My Location" (allow location access)
3. Click "Add Food"
4. Food should appear in "My Posted Foods" table

### Test 3: Register as NGO

1. Open a **new incognito/private window**
2. Go to http://localhost:3000
3. Click "I'm an NGO"
4. Fill in the form:
   - NGO Name: Test NGO
   - Email: ngo@test.com
   - Password: test123
   - Phone: 9876543210
   - Address: 123 Main Street
   - Secret Key: secret123
5. Click "Register"
6. Enter secret key: secret123
7. Click "Verify"
8. You should see the food list

### Test 4: Claim Food

1. Click "View Details & Confirm" on the food
2. Review the details
3. Click "Confirm Pickup"
4. Confirm the alert
5. Food should be claimed and removed from list

### Test 5: View History

1. Click "History" in navbar
2. You should see the claimed food with donor and NGO details

### Test 6: Add Event

1. As NGO, click "Add Event"
2. Fill in the form:
   - Title: Food Drive
   - Description: Community food distribution
   - Date: Select future date
   - Time: 10:00
   - Venue: Community Center
3. Click "Add Event"
4. Event should appear in Events page

## 🔍 Checking the Database

### Using MongoDB Shell

```bash
mongosh

use surplus_food_db
show collections

# View donors
db.donors.find().pretty()

# View foods
db.foods.find().pretty()

# View events
db.events.find().pretty()

# View history
db.foodhistories.find().pretty()

exit
```

### Using MongoDB Compass (GUI)

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Select `surplus_food_db` database
4. Browse collections

## 🛑 Stopping the Application

### Stop Frontend
In the frontend terminal, press: `Ctrl + C`

### Stop Backend
In the backend terminal, press: `Ctrl + C`

### Stop MongoDB (Optional)

**Windows:**
```cmd
net stop MongoDB
```

**Mac:**
```bash
brew services stop mongodb-community
```

**Linux:**
```bash
sudo systemctl stop mongodb
```

## 🔄 Restarting

To restart everything:

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

MongoDB should already be running (it starts automatically).

## ⚠️ Common Issues

### Issue: "Cannot connect to MongoDB"

**Solution:**
```bash
# Check if MongoDB is running
mongosh

# If not, start it:
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongodb
```

### Issue: "Port 5000 already in use"

**Solution:**
1. Change PORT in `backend/.env` to 5001
2. Update `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```
3. Restart backend

### Issue: "Module not found"

**Solution:**
```bash
# Reinstall dependencies
cd backend
rm -rf node_modules
npm install

cd ../frontend
rm -rf node_modules
npm install
```

### Issue: Frontend shows blank page

**Solution:**
1. Check browser console (F12)
2. Verify backend is running
3. Check `frontend/.env` has correct API URL
4. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Issue: Location not working

**Solution:**
1. Click "Allow" when browser asks for location
2. Check browser location settings
3. Try a different browser
4. Note: HTTPS required in production

## 📊 System Status Checklist

Before reporting issues, verify:

- [ ] Node.js installed (`node --version`)
- [ ] MongoDB installed (`mongosh`)
- [ ] MongoDB is running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] No errors in backend terminal
- [ ] No errors in frontend terminal
- [ ] Can access http://localhost:3000
- [ ] Browser console shows no errors

## 🎓 Understanding the Setup

### What's Running?

1. **MongoDB** (Port 27017)
   - Database server
   - Stores all data
   - Runs in background

2. **Backend** (Port 5000)
   - Express.js server
   - REST API
   - Connects to MongoDB
   - Handles authentication

3. **Frontend** (Port 3000)
   - React application
   - User interface
   - Calls backend API
   - Runs in browser

### Data Flow

```
Browser (Port 3000)
    ↓ HTTP Requests
Backend (Port 5000)
    ↓ MongoDB Queries
MongoDB (Port 27017)
```

## 📚 Additional Resources

- **START_HERE_MONGODB.md** - Quick start guide
- **MONGODB_SETUP.md** - Detailed MongoDB setup
- **TESTING_GUIDE.md** - Complete testing checklist
- **QUICK_REFERENCE.md** - Common commands
- **README.md** - Full documentation

## 🎉 Success!

If you can:
- ✅ See the home page
- ✅ Register as donor
- ✅ Add food
- ✅ Register as NGO
- ✅ Claim food
- ✅ View history
- ✅ Add events

**You're all set! The application is working perfectly!** 🚀

---

**Need help? Check the troubleshooting section or read the documentation files.**
