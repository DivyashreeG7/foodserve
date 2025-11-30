#!/bin/bash

echo "========================================"
echo "Surplus Food Management - Installation"
echo "========================================"
echo ""

echo "Installing Backend Dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Backend installation failed!"
    exit 1
fi
cd ..

echo ""
echo "Installing Frontend Dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Frontend installation failed!"
    exit 1
fi
cd ..

echo ""
echo "========================================"
echo "Installation Complete!"
echo "========================================"
echo ""
echo "Next Steps:"
echo "1. Setup MySQL database (see SETUP_GUIDE.md)"
echo "2. Configure backend/.env with your MySQL credentials"
echo "3. Run ./start-backend.sh to start the backend"
echo "4. Run ./start-frontend.sh to start the frontend"
echo ""
