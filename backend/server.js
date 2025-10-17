import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// In-memory data storage (replace with database in production)
let restaurants = [
    {
        id: '1',
        name: 'Burger King',
        cuisine: 'Fast Food',
        rating: 4.2,
        deliveryTime: '30-40 mins',
        price: '₹200 for one',
        image: '/api/placeholder/300/200',
        dishes: [
            {
                id: '101',
                name: 'Whopper Burger',
                price: 199,
                description: 'Flame-grilled beef patty with fresh vegetables',
                image: '/api/placeholder/150/150',
                category: 'Burgers'
            }
        ]
    }
];

let orders = [];
let adminData = {
    totalOrders: 150,
    totalRevenue: 50000,
    activeRestaurants: 25
};

// Routes
app.get('/api/restaurants', (req, res) => {
    res.json(restaurants);
});

app.get('/api/restaurants/:id', (req, res) => {
    const restaurant = restaurants.find(r => r.id === req.params.id);
    if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(restaurant);
});

app.post('/api/orders', (req, res) => {
    const order = {
        id: uuidv4(),
        ...req.body,
        status: 'placed',
        orderTime: new Date().toISOString()
    };
    orders.push(order);
    res.json(order);
});

app.get('/api/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
});

// Admin routes
app.get('/api/admin/stats', (req, res) => {
    res.json(adminData);
});

app.post('/api/admin/restaurants', upload.single('image'), (req, res) => {
    const { name, cuisine, deliveryTime, price } = req.body;
    const newRestaurant = {
        id: uuidv4(),
        name,
        cuisine,
        rating: 0,
        deliveryTime,
        price,
        image: req.file ? `/uploads/${req.file.filename}` : '/api/placeholder/300/200',
        dishes: []
    };

    restaurants.push(newRestaurant);
    res.json(newRestaurant);
});

app.post('/api/admin/restaurants/:id/dishes', upload.single('image'), (req, res) => {
    const restaurant = restaurants.find(r => r.id === req.params.id);
    if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
    }

    const { name, price, description, category } = req.body;
    const newDish = {
        id: uuidv4(),
        name,
        price: parseInt(price),
        description,
        category,
        image: req.file ? `/uploads/${req.file.filename}` : '/api/placeholder/150/150'
    };

    restaurant.dishes.push(newDish);
    res.json(newDish);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});