# 🎉 START HERE - MongoDB Version

Your Surplus Food Management System is now using **MongoDB** instead of MySQL!

## ✅ What Changed?

- ❌ No more MySQL
- ✅ Now using MongoDB (much easier!)
- ✅ No manual database setup needed
- ✅ MongoDB creates everything automatically
- ✅ All features work exactly the same

## 🚀 How to Run (Super Simple!)

### Step 1: Install MongoDB

**Windows:**
- Download from: https://www.mongodb.com/try/download/community
- Run installer
- Choose "Complete" installation
- Done!

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Step 2: Verify MongoDB is Running

```bash
mongosh
```

If you see the MongoDB shell, it's working! Type `exit` to quit.

### Step 3: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 4: Start Backend

Open a terminal:

```bash
cd backend
npm run dev
```

You should see:
```
MongoDB connected successfully
Server running on port 5000
```

✅ **Keep this terminal open!**

### Step 5: Start Frontend

Open **another** terminal:

```bash
cd frontend
npm run dev
```

You should see:
```
Local: http://localhost:3000
```

✅ **Keep this terminal open too!**

### Step 6: Open Browser

Go to: **http://localhost:3000**

🎉 **You're done!**

## 🎯 Quick Test

1. Click "I Want to Donate Food"
2. Register with any details
3. Add a food item
4. Open incognito window
5. Register as NGO (remember secret key!)
6. Browse and claim the food

## 📁 What's in the Backend?

```
backend/
├── models/           # MongoDB schemas
│   ├── Donor.js
│   ├── NGO.js
│   ├── Food.js
│   ├── FoodHistory.js
│   └── Event.js
├── routes/           # API endpoints
├── config/
│   └── db.js        # MongoDB connection
├── .env             # Configuration
└── server.js        # Main server
```

## 🔧 Configuration

Your `backend/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/surplus_food_db
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

**Important:** Change `JWT_SECRET` to something random!

## 📊 MongoDB Collections

MongoDB will automatically create these collections:
- `donors` - Donor accounts
- `ngos` - NGO accounts
- `foods` - Food donations
- `foodhistories` - Claimed donations
- `events` - Community events

**No setup needed!** They're created when you add data.

## 🔍 View Your Data (Optional)

### Using MongoDB Compass (GUI):
1. Download MongoDB Compass (comes with MongoDB)
2. Connect to: `mongodb://localhost:27017`
3. Browse `surplus_food_db` database

### Using Command Line:
```bash
mongosh

use surplus_food_db
show collections
db.donors.find().pretty()
db.foods.find().pretty()
exit
```

## ⚠️ Troubleshooting

### "Cannot connect to MongoDB"

**Check if MongoDB is running:**
```bash
mongosh
```

**If it fails, start MongoDB:**

**Windows:**
```cmd
net start MongoDB
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### "Port 5000 already in use"

Change PORT in `backend/.env`:
```env
PORT=5001
```

And update `frontend/.env`:
```env
VITE_API_URL=http://localhost:5001/api
```

### Backend shows errors

1. Check MongoDB is running: `mongosh`
2. Check `backend/.env` configuration
3. Make sure you ran `npm install` in backend folder

## 💡 Why MongoDB is Better

✅ **No manual setup** - Creates database automatically  
✅ **Easier to install** - One command on Mac/Linux  
✅ **No passwords** - Works out of the box  
✅ **Flexible schema** - Easy to modify  
✅ **JSON-like data** - Natural for JavaScript  

## 📚 Documentation

- **MONGODB_SETUP.md** - Detailed MongoDB setup
- **QUICK_START_MONGODB.md** - Ultra-quick guide
- **README.md** - Full documentation
- **QUICK_REFERENCE.md** - Common commands

## 🎓 What You Need to Know

### MongoDB vs MySQL

| Feature | MongoDB | MySQL |
|---------|---------|-------|
| Setup | Automatic | Manual |
| Schema | Flexible | Fixed |
| Data Format | JSON-like | Tables |
| Installation | Easy | Complex |
| Learning Curve | Gentle | Steep |

### MongoDB Basics

**Collections** = Tables  
**Documents** = Rows  
**Fields** = Columns  

Example document:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

## 🚀 Next Steps

1. ✅ Start MongoDB
2. ✅ Install dependencies
3. ✅ Start backend
4. ✅ Start frontend
5. ✅ Test the app
6. 📖 Read TESTING_GUIDE.md
7. 🎨 Customize as needed

## 🆘 Need Help?

1. Check if MongoDB is running: `mongosh`
2. Check both terminals for errors
3. Read MONGODB_SETUP.md
4. Check browser console (F12)
5. Verify .env files are correct

## ✨ Features

All features work exactly the same:
- ✅ Donor registration & login
- ✅ Add food with location
- ✅ NGO registration with secret key
- ✅ Browse and claim foods
- ✅ View history
- ✅ Add and view events
- ✅ Responsive design

## 🎉 You're All Set!

MongoDB is running, dependencies are installed, and you're ready to go!

Just run:
1. `cd backend && npm run dev` (Terminal 1)
2. `cd frontend && npm run dev` (Terminal 2)
3. Open http://localhost:3000

**Happy coding! 🚀**

---

**Total setup time: ~5 minutes**  
**Difficulty: Easy**  
**Prerequisites: Node.js + MongoDB**
