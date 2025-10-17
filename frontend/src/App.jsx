import React, { useState, useEffect } from "react";
import { Search, Star, Clock, IndianRupee, MapPin } from "lucide-react";

const API_BASE = "http://localhost:5000/api";

function App() {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await fetch(`${API_BASE}/restaurants`);
            const data = await response.json();
            setRestaurants(data);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    };

    const filteredRestaurants = restaurants.filter(
        (restaurant) =>
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToCart = (dish) => {
        setCart([...cart, { ...dish, cartId: Date.now() }]);
    };

    const removeFromCart = (cartId) => {
        setCart(cart.filter((item) => item.cartId !== cartId));
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    const placeOrder = async () => {
        if (cart.length === 0) return;

        try {
            const order = {
                restaurantId: selectedRestaurant.id,
                restaurantName: selectedRestaurant.name,
                items: cart,
                total: getTotalPrice(),
                deliveryAddress: "123 Main Street, City",
            };

            const response = await fetch(`${API_BASE}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });

            if (response.ok) {
                alert("Order placed successfully!");
                setCart([]);
                setSelectedRestaurant(null);
            }
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    if (selectedRestaurant) {
        return (
            <RestaurantDetail
                restaurant={selectedRestaurant}
                cart={cart}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
                onPlaceOrder={placeOrder}
                onBack={() => setSelectedRestaurant(null)}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                FoodExpress
                            </h1>
                        </div>

                        <div className="flex-1 max-w-2xl mx-8">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search for restaurants and food..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-6">
                            <button className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 cursor-pointer">
                                <MapPin className="w-5 h-5" />
                                <span>Location</span>
                            </button>
                            <button className="text-gray-700 hover:text-orange-500 cursor-pointer">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-400 to-orange-500 text-white py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        Craving something delicious?
                    </h2>
                    <p className="text-xl mb-8">
                        Order food from the best restaurants near you
                    </p>
                    <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200 cursor-pointer">
                        Order Now
                    </button>
                </div>
            </section>

            {/* Restaurants Grid */}
            <section className="max-w-6xl mx-auto px-4 py-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Top Restaurants
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRestaurants.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200 cursor-pointer"
                            onClick={() => setSelectedRestaurant(restaurant)}
                        >
                            <img
                                src={restaurant.image}
                                alt={restaurant.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-lg text-gray-800">
                                        {restaurant.name}
                                    </h4>
                                    <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded">
                                        <Star className="w-4 h-4 text-green-600 fill-current" />
                                        <span className="text-sm font-medium text-green-600">
                                            {restaurant.rating}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">
                                    {restaurant.cuisine}
                                </p>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{restaurant.deliveryTime}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <IndianRupee className="w-4 h-4" />
                                        <span>{restaurant.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function RestaurantDetail({
    restaurant,
    cart,
    onAddToCart,
    onRemoveFromCart,
    onPlaceOrder,
    onBack,
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Restaurant Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <button
                        onClick={onBack}
                        className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 mb-4"
                    >
                        <span>← Back to restaurants</span>
                    </button>

                    <div className="flex items-start space-x-6">
                        <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="w-32 h-32 object-cover rounded-lg"
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                {restaurant.name}
                            </h1>
                            <p className="text-gray-600 mb-3">
                                {restaurant.cuisine}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-green-600 fill-current" />
                                    <span>{restaurant.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{restaurant.deliveryTime}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <IndianRupee className="w-4 h-4" />
                                    <span>{restaurant.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Menu Items */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Menu
                        </h2>
                        <div className="space-y-6">
                            {restaurant.dishes.map((dish) => (
                                <div
                                    key={dish.id}
                                    className="bg-white rounded-lg shadow-sm border p-4 flex items-center justify-between"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">
                                            {dish.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm mt-1">
                                            {dish.description}
                                        </p>
                                        <div className="flex items-center space-x-4 mt-2">
                                            <span className="font-semibold text-gray-800">
                                                ₹{dish.price}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={dish.image}
                                            alt={dish.name}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <button
                                            onClick={() => onAddToCart(dish)}
                                            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-200 cursor-pointer"
                                        >
                                            Add +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border sticky top-4">
                            <div className="p-4 border-b">
                                <h3 className="font-semibold text-lg text-gray-800">
                                    Your Order
                                </h3>
                            </div>

                            <div className="p-4 max-h-96 overflow-y-auto">
                                {cart.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">
                                        Your cart is empty
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {cart.map((item) => (
                                            <div
                                                key={item.cartId}
                                                className="flex justify-between items-center border-b pb-3"
                                            >
                                                <div>
                                                    <p className="font-medium text-sm">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-gray-600 text-sm">
                                                        ₹{item.price}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        onRemoveFromCart(
                                                            item.cartId
                                                        )
                                                    }
                                                    className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="p-4 border-t">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="font-semibold">
                                            Total:
                                        </span>
                                        <span className="font-bold text-lg">
                                            ₹
                                            {cart.reduce(
                                                (total, item) =>
                                                    total + item.price,
                                                0
                                            )}
                                        </span>
                                    </div>
                                    <button
                                        onClick={onPlaceOrder}
                                        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200 cursor-pointer"
                                    >
                                        Place Order
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
