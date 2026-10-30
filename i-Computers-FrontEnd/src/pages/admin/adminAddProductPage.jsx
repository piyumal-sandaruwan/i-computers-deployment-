import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import MediaUpload from '../../utils/mediaUpload.js';

export default function AdminAddProductPage(props) {

    const [productID, setProductID] = useState("");
    const [productName, setProductName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [labledPrice, setLabledPrice] = useState(0);
    const [files, setFiles] = useState([]);
    const [category, setCategory] = useState("laptops"); // Initialized with default value
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [stock, setStock] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const [loading, setLoading] = useState(false); // New state to track progress

    const navigate = useNavigate();

    async function addProduct() {
        // 1. VALIDATION FIRST (Stops the process immediately if fields are empty)
        if (!productID || !productName || !price || !category || !model) {
            toast.error("Please fill in all required fields (ID, Name, Price, Category, Model)");
            return;
        }

        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("You must be logged in to add a product.");
            navigate("/login");
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading("Uploading images and saving product...");

        try {
            // 2. IMAGE UPLOADING (Parallel)
            const imagePromises = [];
            for (let i = 0; i < files.length; i++) {
                const promise = MediaUpload(files[i]);
                imagePromises.push(promise);
            }

            const images = await Promise.all(imagePromises);

            // 3. PREPARE DATA
            const altNamesInArray = altNames.split(",").map(name => name.trim());

            // 4. BACKEND REQUEST
           await axios.post(import.meta.env.VITE_BACKEND_URL + "/products", {
                productId: productID,
                name: productName,
                altNames: altNamesInArray,
                description: description,
                price: parseFloat(price), // Ensure numbers are sent as numbers
                labledPrice: parseFloat(labledPrice) || 0,
                images: images,
                category: category,
                brand: brand,
                model: model,
                stock: parseInt(stock) || 0,
                isAvailable: isAvailable
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            toast.success("Product added successfully!", { id: loadingToast });
            navigate("/admin/products");

        } catch (err) {
            console.error("Error adding product:", err);
            // Better error message handling
            const errorMsg = err.response?.data?.message || "Error adding product.";
            toast.error(errorMsg, { id: loadingToast });
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="w-full h-full flex overflow-y-scroll items-start p-[50px] justify-center">
            <div className="w-[800px] bg-accent/90 p-[40px] rounded-2xl">
                <h1 className="text-xl text-primary mb-4">Add New Product</h1>
                
                <div className='w-full bg-primary p-[20px] flex flex-row flex-wrap rounded-xl justify-between '>
                    <div className='my-[10px] bg-primary w-[40%]'>
                        <label>Product ID</label>
                        <input type="text" value={productID} onChange={(e) => setProductID(e.target.value)} className='w-full p-[10px] h-[40px] border border-accent shadow-2xl rounded-xl focus:outline-none focus:ring-accent px-[20px] ' />
                        <p className='w-full text-gray-500 text-right text-sm italic '>Provide a unique product Id  </p>
                    </div>

                    <div className='my-[10px] w-[40%]'>
                        <label>Name</label>
                        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className='w-full p-[10px] h-[40px] border border-accent shadow-2xl rounded-xl focus:outline-none focus:ring-accent px-[20px] ' />
                    </div>

                    <div className='my-[10px] w-full'>
                        <label>Alternative Names</label>
                        <input type="text" value={altNames} onChange={(e) => setAltNames(e.target.value)} className='w-full p-[10px] h-[40px] border border-accent shadow-2xl rounded-xl focus:outline-none focus:ring-accent px-[20px] ' />
                        <p className='w-full text-gray-500 text-right text-sm italic '>Separate multiple names with commas  </p>
                    </div>

                    <div className='my-[10px] w-full'>
                        <label>Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='w-full p-[10px] h-[100px] border border-accent shadow-2xl rounded-xl focus:outline-none focus:ring-accent px-[20px] ' />
                    </div>

                    <div className='my-[10px] w-[40%]'>
                        <label>Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className='w-full p-[10px] h-[40px] border border-accent shadow-2xl rounded-xl focus:outline-none focus:ring-accent px-[20px] ' />
                    </div>

                    <div className='my-[10px] w-[40%]'>
                        <label>Labled Price</label>
                        <input type="number" value={labledPrice} onChange={(e) => setLabledPrice(e.target.value)} className='w-full p-[10px] h-[40px] border border-accent shadow-2xl rounded-xl focus:outline-none focus:ring-accent px-[20px] ' />
                    </div>

                    <div className='my-[10px] w-full'>
                        <label>Images</label>
                        <input type="file" multiple={true} onChange={(e) => setFiles(e.target.files)} className='w-full p-[10px] h-[40px] border border-accent shadow-2xl rounded-xl focus:outline-none focus:ring-accent px-[20px] ' />
                    </div>

                    <div className='my-[10px] flex flex-col w-[30%]'>
                        <label>Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full p-[10px] h-[40px] border border-accent shadow-2xl rounded-xl focus:outline-none focus:ring-accent px-[20px] '>
                            <option value="laptops">Laptops</option>
                            <option value="gaming-laptops">Gaming Laptops</option>
                            <option value="monitors">Monitors</option>
                            <option value="keyboards">Keyboards</option>
                            <option value="mice">Mice</option>
                            <option value="ssds">SSDs</option>
                            <option value="ram">RAM</option>
                            <option value="graphic-cards">Graphics Cards</option>
                            <option value="processors">Processors (CPU)</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div className='my-[10px] w-[30%]'>
                        <label>Brand</label>
                        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className='w-full p-[10px] h-[40px] border border-accent shadow-2xl rounded-xl focus:outline-none focus:ring-accent px-[20px] ' />
                    </div>

                    <div className='my-[10px] w-[30%]'>
                        <label>Model</label>
                        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className='w-full p-[10px] h-[40px] border border-accent shadow-2xl rounded-xl focus:outline-none focus:ring-accent px-[20px] ' />
                    </div>

                    <div className='my-[10px] w-[40%]'>
                        <label>Stock Quantity</label>
                        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className='w-full p-[10px] h-[40px] border border-accent shadow-2xl rounded-xl focus:outline-none focus:ring-accent px-[20px] ' />
                    </div>

                    <div className='my-[10px] flex flex-col w-[40%]'>
                        <label>Available</label>
                        <select value={isAvailable} onChange={(e) => setIsAvailable(e.target.value === "true")} className='w-full p-[10px] h-[40px] border border-accent shadow-2xl rounded-xl focus:outline-none focus:ring-accent px-[20px] '>
                            <option value="true">YES</option>
                            <option value="false">NO</option>
                        </select>
                    </div>

                    <Link to="/admin/products" className='w-[49%] h-[50px] hover:bg-red-600 bg-red-500 text-primary rounded-xl mt-4 transition-colors font-bold flex items-center justify-center '>
                        Cancel
                    </Link>

                    <button 
                        onClick={addProduct} 
                        disabled={loading}
                        className={`w-[49%] h-[50px] font-bold rounded-xl mt-4 transition-colors border text-primary ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent/90 hover:bg-accent'}`}
                    >
                        {loading ? "Adding Product..." : "Add Product"}
                    </button>
                </div>
            </div>
        </div>
    );
}