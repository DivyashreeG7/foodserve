# Quick Setup Guide

Follow these steps to get the Surplus Food Management System running on your machine.

## Step 1: Install Prerequisites

### Install Node.js
- Download from: https://nodejs.org/
- Recommended: v18 or higher
- Verify: `node --version` and `npm --version`

### Install MySQL
- Download from: https://dev.mysql.com/downloads/mysql/
- Recommended: v8.0 or higher
- Remember your root password during installation
- Verify: `mysql --version`

## Step 2: Setup MySQL Database

1. Start MySQL service (if not already running)

**Windows:**
```cmd
net start MySQL80
```

**Mac/Linux:**
```bash
sudo systemctl start mysql
# or
sudo service mysql start
```

2. Login to MySQL:
```bash
mysql -u root -p
```

3. Create the database and tables:
```sql
source backend/config/schema.sql
```

Or manually run:
```bash
mysql -u root -p < backend/config/schema.sql
```

4. Verify the database was created:
```sql
SHOW DATABASES;
USE surplus_food_db;
SHOW TABLES;
```

## Step 3: Configure Backend

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Open `backend/.env`
   - Update these values:
     ```env
     PORT=5000
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_mysql_password_here
     DB_NAME=surplus_food_db
     JWT_SECRET=change_this_to_a_random_secure_string
     ```

4. Start the backend server:
```bash
npm run dev
```

You should see: `Server running on port 5000`

## Step 4: Configure Frontend

1. Open a NEW terminal window

2. Navigate to frontend folder:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

4. Verify `.env` file exists with:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the frontend:
```bash
npm run dev
```

You should see: `Local: http://localhost:3000`

## Step 5: Test the Application

1. Open your browser and go to: `http://localhost:3000`

2. Test Donor Flow:
   - Click "I Want to Donate Food"
   - Register a donor account
   - Login and add a food item
   - Try capturing location

3. Test NGO Flow:
   - Open a new incognito/private window
   - Click "I'm an NGO"
   - Register an NGO (remember your secret key!)
   - Login and verify secret key
   - Browse available foods
   - Claim a food donation

4. Test Events:
   - As NGO, click "Add Event"
   - Create a community event
   - View events (public page)

## Common Issues

### MySQL Connection Error
**Error:** `ER_ACCESS_DENIED_ERROR` or `ECONNREFUSED`

**Solution:**
- Verify MySQL is running
- Check username/password in `backend/.env`
- Try: `mysql -u root -p` to test credentials

### Port Already in Use
**Error:** `EADDRINUSE: address already in use`

**Solution:**
- Change PORT in `backend/.env` to 5001 or another port
- Update `VITE_API_URL` in `frontend/.env` accordingly

### Cannot GET /
**Error:** Blank page or "Cannot GET /"

**Solution:**
- Make sure both backend AND frontend are running
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`
- Check browser console for errors

### Location Not Working
**Error:** "Unable to retrieve location"

**Solution:**
- Allow location access in browser
- Check browser settings/permissions
- Note: HTTPS required in production

### CORS Error
**Error:** "Access to fetch blocked by CORS policy"

**Solution:**
- Verify backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Restart both servers

## Production Deployment

### Backend
1. Set environment variables on your server
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js
   ```
3. Use a reverse proxy (nginx/Apache)
4. Enable HTTPS

### Frontend
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Serve the `dist` folder with nginx/Apache
3. Update `VITE_API_URL` to production backend URL

### Database
1. Create production MySQL database
2. Run schema.sql on production
3. Use strong passwords
4. Enable SSL connections
5. Regular backups

## Need Help?

- Check the main README.md for detailed documentation
- Review backend/README.md for API details
- Open an issue on GitHub
- Check browser console and server logs for errors

## Success Checklist

- [ ] MySQL installed and running
- [ ] Database created with tables
- [ ] Backend dependencies installed
- [ ] Backend .env configured
- [ ] Backend server running on port 5000
- [ ] Frontend dependencies installed
- [ ] Frontend .env configured
- [ ] Frontend running on port 3000
- [ ] Can register donor account
- [ ] Can register NGO account
- [ ] Can add food donation
- [ ] Can claim food as NGO
- [ ] Can view events
- [ ] Can add events as NGO

If all checkboxes are checked, you're good to go! 🎉
