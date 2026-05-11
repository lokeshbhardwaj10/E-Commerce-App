#!/bin/bash

# Start E-Commerce Application on Mac/Linux

echo ""
echo "=========================================="
echo "  E-Commerce MERN Application Starter"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js found: $(node --version)"
echo ""

# Check if backend and frontend directories exist
if [ ! -d "backend" ]; then
    echo "ERROR: 'backend' directory not found!"
    echo "Please run this script from the project root directory"
    exit 1
fi

if [ ! -d "frontend" ]; then
    echo "ERROR: 'frontend' directory not found!"
    echo "Please run this script from the project root directory"
    exit 1
fi

echo ""
echo "Installing dependencies..."
echo ""

# Install backend dependencies
echo "[1/4] Installing backend dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install backend dependencies"
        cd ..
        exit 1
    fi
fi
cd ..

echo "[2/4] Backend dependencies installed successfully!"
echo ""

# Install frontend dependencies
echo "[3/4] Installing frontend dependencies..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install frontend dependencies"
        cd ..
        exit 1
    fi
fi
cd ..

echo "[4/4] Frontend dependencies installed successfully!"
echo ""

echo "=========================================="
echo "  Starting Application"
echo "=========================================="
echo ""

# Function to handle cleanup on exit
cleanup() {
    echo ""
    echo "Stopping all processes..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    wait $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "Application stopped."
}

# Set trap to cleanup on exit
trap cleanup EXIT INT TERM

# Start backend
echo "Starting backend server (port 5000)..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

sleep 3

echo ""
echo "Starting frontend development server (port 3000)..."
echo ""

# Start frontend
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "=========================================="
echo "  Application Started Successfully!"
echo "=========================================="
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Demo Credentials:"
echo "  Admin:  admin@test.com / password123"
echo "  User:   user@test.com / password123"
echo ""
echo "Press Ctrl+C to stop the application"
echo ""
echo "=========================================="
echo ""

# Wait for both processes
wait
