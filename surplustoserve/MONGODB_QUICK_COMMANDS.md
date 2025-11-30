# ⚡ MongoDB Quick Commands

## 🚀 Starting/Stopping MongoDB

### Windows
```cmd
# Start
net start MongoDB

# Stop
net stop MongoDB

# Check status
sc query MongoDB
```

### Mac
```bash
# Start
brew services start mongodb-community

# Stop
brew services stop mongodb-community

# Restart
brew services restart mongodb-community

# Check status
brew services list | grep mongodb
```

### Linux
```bash
# Start
sudo systemctl start mongod

# Stop
sudo systemctl stop mongod

# Restart
sudo systemctl restart mongod

# Check status
sudo systemctl status mongod

# Enable on boot
sudo systemctl enable mongod
```

## 🔍 MongoDB Shell Commands

### Connect to MongoDB
```bash
mongosh
```

### Basic Commands
```javascript
// Show all databases
show dbs

// Use database
use surplus_food_db

// Show collections
show collections

// Show current database
db

// Exit
exit
```

### Query Commands
```javascript
// Find all documents
db.donors.find()

// Find with pretty print
db.donors.find().pretty()

// Find one document
db.donors.findOne()

// Find with filter
db.donors.find({ email: "test@test.com" })

// Count documents
db.donors.countDocuments()

// Find recent documents
db.foods.find().sort({ createdAt: -1 }).limit(5)
```

### Insert Commands
```javascript
// Insert one
db.donors.insertOne({
  name: "Test User",
  email: "test@test.com",
  phone: "1234567890"
})

// Insert many
db.donors.insertMany([
  { name: "User 1", email: "user1@test.com" },
  { name: "User 2", email: "user2@test.com" }
])
```

### Update Commands
```javascript
// Update one
db.foods.updateOne(
  { _id: ObjectId("...") },
  { $set: { status: "claimed" } }
)

// Update many
db.foods.updateMany(
  { status: "available" },
  { $set: { featured: true } }
)
```

### Delete Commands
```javascript
// Delete one
db.donors.deleteOne({ email: "test@test.com" })

// Delete many
db.foods.deleteMany({ status: "claimed" })

// Delete all
db.donors.deleteMany({})
```

### Useful Queries
```javascript
// Find available foods
db.foods.find({ status: "available" })

// Find foods by donor
db.foods.find({ donor_id: ObjectId("...") })

// Find upcoming events
db.events.find({ event_date: { $gte: new Date() } })

// Find recent history
db.foodhistories.find().sort({ claimed_at: -1 }).limit(10)
```

## 🗄️ Database Management

### Backup Database
```bash
# Backup entire database
mongodump --db surplus_food_db --out ./backup

# Backup specific collection
mongodump --db surplus_food_db --collection donors --out ./backup
```

### Restore Database
```bash
# Restore entire database
mongorestore --db surplus_food_db ./backup/surplus_food_db

# Restore specific collection
mongorestore --db surplus_food_db --collection donors ./backup/surplus_food_db/donors.bson
```

### Drop Database
```javascript
// In mongosh
use surplus_food_db
db.dropDatabase()
```

### Drop Collection
```javascript
// In mongosh
db.donors.drop()
```

## 📊 Monitoring

### Check Database Size
```javascript
db.stats()
```

### Check Collection Size
```javascript
db.donors.stats()
```

### List Indexes
```javascript
db.donors.getIndexes()
```

### Current Operations
```javascript
db.currentOp()
```

## 🔧 Application Commands

### Backend
```bash
# Install dependencies
cd backend
npm install

# Start development server
npm run dev

# Start production server
npm start
```

### Frontend
```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐛 Debugging

### Check MongoDB Connection
```bash
mongosh --eval "db.adminCommand('ping')"
```

### View MongoDB Logs

**Windows:**
```
C:\Program Files\MongoDB\Server\7.0\log\mongod.log
```

**Mac:**
```bash
tail -f /usr/local/var/log/mongodb/mongo.log
```

**Linux:**
```bash
sudo tail -f /var/log/mongodb/mongod.log
```

### Test Backend Connection
```bash
curl http://localhost:5000/api/health
```

### Check Ports
```bash
# Check if MongoDB is running on 27017
netstat -an | grep 27017

# Check if backend is running on 5000
netstat -an | grep 5000

# Check if frontend is running on 3000
netstat -an | grep 3000
```

## 🔍 MongoDB Compass (GUI)

### Connect
```
mongodb://localhost:27017
```

### Features
- Visual query builder
- Schema analysis
- Index management
- Import/Export data
- Performance monitoring

## 📝 Common Patterns

### Find with Population (Mongoose)
```javascript
// In your code
const foods = await Food.find()
  .populate('donor_id', 'name phone')
  .sort({ createdAt: -1 });
```

### Aggregation
```javascript
// Count foods by status
db.foods.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
])

// Get donor with most donations
db.foods.aggregate([
  { $group: { _id: "$donor_id", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])
```

## 🎯 Quick Troubleshooting

### Problem: Can't connect to MongoDB
```bash
# Check if running
mongosh

# If not, start it
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Problem: Port already in use
```bash
# Find process using port 27017
# Windows: netstat -ano | findstr :27017
# Mac/Linux: lsof -i :27017

# Kill the process
# Windows: taskkill /PID <pid> /F
# Mac/Linux: kill -9 <pid>
```

### Problem: Database not found
```javascript
// MongoDB creates databases automatically
// Just use it and insert data
use surplus_food_db
db.donors.insertOne({ name: "Test" })
```

## 📚 Useful Links

- MongoDB Docs: https://docs.mongodb.com/
- Mongoose Docs: https://mongoosejs.com/
- MongoDB Compass: https://www.mongodb.com/products/compass
- MongoDB University: https://university.mongodb.com/

## 💡 Pro Tips

1. **Use MongoDB Compass** for visual database management
2. **Always use `.pretty()`** for readable output in shell
3. **Index frequently queried fields** for better performance
4. **Use `.explain()`** to analyze query performance
5. **Backup regularly** with mongodump
6. **Use projections** to limit returned fields
7. **Learn aggregation** for complex queries

## 🎓 Learning Path

1. **Basic CRUD** - Create, Read, Update, Delete
2. **Queries** - Filters, sorting, limiting
3. **Indexes** - Speed up queries
4. **Aggregation** - Complex data analysis
5. **Mongoose** - ODM for Node.js
6. **Performance** - Optimization techniques

---

**Keep this handy for quick reference! 📌**
