# 🚀 MongoDB Setup Guide

The backend has been converted to use MongoDB instead of MySQL. Much easier!

## Step 1: Install MongoDB

### Windows:
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Install as a Windows Service (check the box)
5. Install MongoDB Compass (optional GUI tool)

### Mac:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu/Debian):
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Step 2: Verify MongoDB is Running

```bash
# Check if MongoDB is running
mongosh

# You should see MongoDB shell
# Type 'exit' to quit
```

## Step 3: Configure Backend

Your `backend/.env` is already configured:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/surplus_food_db
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

**Just change the JWT_SECRET to something random!**

## Step 4: Install Dependencies

```bash
cd backend
npm install
```

This will install mongoose (MongoDB driver) instead of mysql2.

## Step 5: Start the Backend

```bash
cd backend
npm run dev
```

You should see:
```
MongoDB connected successfully
Server running on port 5000
```

**That's it! No database setup needed - MongoDB creates it automatically!**

## Step 6: Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

## 🎉 Done!

Open http://localhost:3000 and start using the app!

MongoDB will automatically:
- Create the database on first use
- Create collections (tables) when you add data
- Handle all relationships

## 🔍 View Your Data (Optional)

### Using MongoDB Compass (GUI):
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Browse the `surplus_food_db` database

### Using Command Line:
```bash
mongosh

use surplus_food_db
show collections
db.donors.find()
db.foods.find()
exit
```

## 📊 Collections (Tables)

MongoDB will create these collections automatically:
- `donors` - Donor accounts
- `ngos` - NGO accounts
- `foods` - Food donations
- `foodhistories` - Claimed donations
- `events` - Community events

## ⚠️ Troubleshooting

### MongoDB not starting?

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

### Can't connect to MongoDB?

Check if it's running:
```bash
mongosh
```

If it fails, MongoDB isn't running. Start it using commands above.

### Port 27017 in use?

Change the port in `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27018/surplus_food_db
```

Then start MongoDB on that port.

## 🎯 Quick Test

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Open: http://localhost:3000
4. Register as donor
5. Add food
6. Register as NGO
7. Claim food

Everything should work!

## 💡 Why MongoDB is Easier

✅ No manual database creation  
✅ No schema setup needed  
✅ Automatic collection creation  
✅ Easier to install  
✅ No password configuration  
✅ Works out of the box  

---

**You're all set! Much simpler than MySQL! 🎉**
