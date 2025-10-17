FoodExpress - Food Delivery Application
A full-stack food delivery web application similar to Swiggy/Zomato, built with modern technologies for demonstration purposes.

Tech Stack
Frontend
Vite - Fast build tool and dev server

React - UI library

Tailwind CSS - Utility-first CSS framework

Lucide React - Beautiful icons

Backend
Node.js - Runtime environment

Express.js - Web framework

Multer - File upload handling

CORS - Cross-origin resource sharing

UUID - Unique identifier generation

Project Structure
text
food-delivery-app/
├── backend/
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── uploads/           # Image storage directory
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Tailwind styles
│   ├── package.json       # Frontend dependencies
│   └── tailwind.config.js # Tailwind configuration
└── admin-dashboard/
    └── index.html         # Admin panel
Features
Customer Facing
Restaurant Listing - Browse all available restaurants

Search & Filter - Find restaurants by name or cuisine

Restaurant Details - View menu and restaurant information

Shopping Cart - Add/remove items from cart

Order Placement - Place orders with real-time calculation

Responsive Design - Mobile-friendly interface

Admin Panel
Dashboard - View business statistics

Restaurant Management - Add new restaurants

Menu Management - Add dishes to restaurants

Image Upload - Upload restaurant and dish images

Order Overview - Monitor order statistics

Installation & Setup
Prerequisites
Node.js (v14 or higher)

npm or yarn

Step 1: Clone and Setup Backend
bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create uploads directory for images
mkdir uploads

# Start the backend server
npm run dev
Backend will run on: http://localhost:5000

Step 2: Setup Frontend
bash
# Open new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
Frontend will run on: http://localhost:5173

Step 3: Access Admin Dashboard
Open admin-dashboard/index.html directly in your browser or serve it using a local server.

API Endpoints
Restaurants
GET /api/restaurants - Get all restaurants

GET /api/restaurants/:id - Get specific restaurant with menu

Orders
POST /api/orders - Create new order

GET /api/orders/:id - Get order details

Admin
GET /api/admin/stats - Get dashboard statistics

POST /api/admin/restaurants - Add new restaurant

POST /api/admin/restaurants/:id/dishes - Add dish to restaurant

Usage Guide
For Customers:
Browse Restaurants: Visit the homepage to see all available restaurants

Search: Use the search bar to find specific restaurants or cuisines

View Menu: Click on any restaurant to see its menu

Add to Cart: Click "Add +" on any dish to add it to your cart

Place Order: Review your cart and click "Place Order" to complete purchase

For Admins:
Access Dashboard: Open the admin panel

View Stats: Check total orders, revenue, and restaurant count

Add Restaurant: Use the form to add new restaurants with images

Manage Menu: Select a restaurant and add new dishes to its menu

Sample Data
The application comes with pre-loaded sample data:

Restaurants: Burger King (Fast Food)

Dishes: Whopper Burger with description and pricing

Admin Stats: Demo statistics for dashboard

Configuration
Backend Configuration
Port: 5000

File uploads: stored in backend/uploads/

CORS: enabled for all origins (development)

Frontend Configuration
Development server: 5173

API base URL: http://localhost:5000/api
