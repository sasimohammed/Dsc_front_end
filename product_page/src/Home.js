import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Nav from "./Nav";
function Home() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortOption, setSortOption] = useState("");

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setFiltered(data);
                const uniqueCategories = [...new Set(data.map(p => p.category))];
                setCategories(uniqueCategories);
            });
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            setFiltered(products);
        }
    }, [products]);

    const handleFilter = (category) => {
        setSelectedCategory(category);
        applyFilters(category, minPrice, maxPrice, sortOption);
    };

    const applyFilters = (category, min, max, sort) => {
        let result = [...products];

        if (category) {
            result = result.filter(p => p.category === category);
        }




        const minVal = parseFloat(min);
        const maxVal = parseFloat(max);
        if (!isNaN(minVal) ){
            result = result.filter(p => p.price >= minVal);
        }
        if (!isNaN(maxVal)) {
            result = result.filter(p => p.price <= maxVal);
        }


        if (sort) {
            const [field, order] = sort.split('-');
            result.sort((a, b) => {
                if (field === 'price') {
                    return order === 'asc' ? a.price - b.price : b.price - a.price;
                } else {
                    return order === 'asc'
                        ? a.title.localeCompare(b.title)
                        : b.title.localeCompare(a.title);
                }
            });
        }

        setFiltered(result);
    };

    useEffect(() => {
        if (products.length === 0) return;

        const timeout = setTimeout(() => {
            applyFilters(selectedCategory, minPrice, maxPrice, sortOption);
        }, 500);

        return () => clearTimeout(timeout);
    }, [minPrice, maxPrice, sortOption, products]);



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
<Nav/>


            <section className="relative overflow-hidden h-[500px] bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D')] bg-cover bg-center mix-blend-overlay opacity-30"></div>

                <div className="relative h-full max-w-7xl mx-auto flex items-center px-6">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
                            Summer Collection <span className="text-blue-200">2025</span>
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-lg">
                            Discover our new arrivals with up to 30% off on fashion favorites. Explore now and grab exclusive deals!
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="px-8 py-3 rounded-full bg-white text-blue-600 font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                                Shop Now
                            </button>
                            <button className="px-8 py-3 rounded-full border-2 border-white text-white font-medium hover:bg-white/10 transition-all transform hover:scale-105">
                                View Lookbook
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">

                    <aside className="lg:w-1/4 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]">
                        <div className="bg-white rounded-xl shadow-md p-6 overflow-y-auto">

                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4">Categories</h2>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleFilter("")}
                                        className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                                            selectedCategory === ""
                                                ? "bg-blue-600 text-white shadow-md"
                                                : "bg-gray-50 hover:bg-gray-100"
                                        }`}
                                    >
                                        All Categories
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => handleFilter(cat)}
                                            className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                                                selectedCategory === cat
                                                    ? "bg-blue-600 text-white shadow-md"
                                                    : "bg-gray-50 hover:bg-gray-100"
                                            }`}
                                        >
                                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>


                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4">Price Range</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Min</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                                            <input
                                                type="number"
                                                placeholder="0"
                                                value={minPrice}
                                                onChange={(e) => setMinPrice(e.target.value)}
                                                className="w-full pl-8 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Max</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                                            <input
                                                type="number"
                                                placeholder="1000"
                                                value={maxPrice}
                                                onChange={(e) => setMaxPrice(e.target.value)}
                                                className="w-full pl-8 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div>
                                <h2 className="text-xl font-bold mb-4">Sort By</h2>
                                <div className="space-y-3">
                                    {[
                                        { value: "title-asc", label: "A – Z" },
                                        { value: "title-desc", label: "Z – A" },
                                        { value: "price-asc", label: "Price: Low to High" },
                                        { value: "price-desc", label: "Price: High to Low" }
                                    ].map((option) => (
                                        <label key={option.value} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
                                            <input
                                                type="radio"
                                                name="sort"
                                                value={option.value}
                                                checked={sortOption === option.value}
                                                onChange={() => setSortOption(option.value)}
                                                className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-gray-700">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>


                    <main className="lg:w-3/4">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
                            <div className="text-sm text-gray-500">
                                Showing {filtered.length} {filtered.length === 1 ? "item" : "items"}
                            </div>
                        </div>




                        {filtered.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-md p-8 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                                <p className="mt-1 text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory("");
                                        setMinPrice("");
                                        setMaxPrice("");
                                        setSortOption("");
                                    }}
                                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col"
                                    >

                                        <div className="relative h-60 bg-gray-100 flex items-center justify-center p-4">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="h-full object-contain transition-transform duration-500 hover:scale-110"
                                            />

                                        </div>


                                        <div className="p-5 flex flex-col flex-grow justify-between">
                                            <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[48px]">{product.title}</h3>

                                            <div className="flex flex-col gap-4 mt-4">
                                                <p className="text-green-800 font-bold text-lg">${product.price}</p>

                                                <div className="space-y-2 w-full">

                                                    <div
                                                        className="flex items-center justify-between w-[60%] mx-auto gap-2 mb-4">
                                                        <div className="border-2 border-gray-300 rounded-md px-4 py-2">
                                                            <button className="text-xl font-bold text-gray-600">−
                                                            </button>
                                                        </div>
                                                        <span
                                                            className="text-blue-700 font-semibold text-lg border-2 border-gray-300 rounded-md px-4 py-2">1</span>
                                                        <div className="border-2 border-gray-300 rounded-md px-4 py-2">
                                                            <button className="text-xl font-bold text-gray-600">+
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <button
                                                        className="bg-blue-500 text-white w-full py-2 rounded-xl font-semibold hover:bg-blue-600 transition">
                                                        Add to Cart
                                                    </button>
                                                </div>



                                                <Link
                                                    to={`/products/${product.id}`}
                                                    className="border-2 border-blue-500 w-full text-blue-500 rounded-xl px-4 py-2 text-center hover:bg-blue-50 transition-colors"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        )}
                    </main>
                </div>


            </div>









        </div>



    );


}

export default Home;