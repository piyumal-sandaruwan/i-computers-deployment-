import { useState, useEffect } from "react"
import toast from "react-hot-toast";
import { BsChevronUp } from "react-icons/bs"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";

export default function checkOutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [name,setName]=useState("");
    const[address,setAddress]=useState("");
    const[phone,setPhone] = useState("")
    
    // Initialize state with location state or empty array
    const [cart, setCart] = useState(location.state || [])

    // Calculate Grand Total from state
    const grandTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Secure the page: Redirect if no state exists
    useEffect(() => {
        if (location.state == null) {
            navigate("/products")
        }
    }, [location.state, navigate])

    if (!location.state) return null;

    function getCartTotal(){
        let total=0;
        cart.forEach((item)=>{
            total+=item.price*item.quantity
        })
        return total
    }
    async function submitOrder(){

        const token= localStorage.getItem("token")
        
        if(token==null){
            toast.error("you must log in to plac an order");
            navigate("/login")
            return;
        }

        const  orderItems=[]
        cart.forEach((item)=>{
            orderItems.push({
                productId:item.productId,
                quantity:item.quantity
            })
        });
        axios.post(import.meta.env.VITE_BACKEND_URL+"/orders",{
            name:name,
            address:address,
            phone:phone,
            items:orderItems
        },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }

    ).then(()=>{
        toast.success("Order Placed Successfully")
        navigate("/orders");
    }).catch(()=>{
        toast.error("Error Placing Order");
    })

    }

    return (
        <div className="w-full  min-h-screen bg-gray-50 flex flex-col items-center p-4 lg:p-6 gap-4">
            <h1 className="text-3xl font-bold self-start max-w-4xl mx-auto w-full lg:w-[60%] mb-4">
                Checkout Summary
            </h1>
            
            {cart.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="lg:w-[60%] bg-white w-full max-w-4xl relative rounded-2xl border border-slate-100 shadow-lg hover:shadow-md lg:h-[150px] transition-shadow flex items-center p-2 lg:p-0 lg:overflow-hidden"
                >
                        {/* Mobile Title - Pinned to top left */}
                    <h1 className="absolute top-[-10px] w-auto py-[2px] px-[8px] rounded-lg shadow-sm bg-white left-0 lg:hidden font-bold text-xs text-slate-600 truncate ">
                        {item.name}
                    </h1>

                        {/* Image & Mobile Unit Price Section */}
                    <div className="flex flex-col items-center lg:h-full">
                        <div className="aspect-square h-[80px] lg:h-full overflow-hidden rounded-lg lg:rounded-none">
                            <img 
                                src={item.image} 
                                alt={item.name}
                                className="h-full w-full object-cover bg-gray-100" 
                            />
                        </div>
                        {/* Mobile-only Unit Prices */}
                        <div className="lg:hidden mt-1 text-center">
                            {item.labledPrice > item.price && (
                                <p className="text-[9px] text-slate-400 line-through">
                                    LKR {item.labledPrice.toFixed(2)}
                                </p>
                            )}
                            <p className="text-[10px] font-bold text-blue-800">
                                LKR {item.price.toFixed(2)}
                            </p>
                        </div>
                    </div>

                        {/* Desktop Product Info Section (Hidden on Mobile) */}
                    <div className="hidden lg:flex flex-1 flex-col justify-center pl-6">
                        <div className="relative group">
                            <h1 className="text-xl font-bold text-slate-800">
                                {item.name.length > 25 ? item.name.substring(0, 25) + "..." : item.name}
                            </h1>
                            <span className="absolute left-0 -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs py-1 px-2 rounded z-10 whitespace-nowrap">
                                    {item.name}
                                </span>
                        </div>
                        <p className="text-xs font-mono text-slate-400 mt-1 uppercase">
                            ID: {item.productId}
                        </p>
                        <div className="flex lg:flex-col items-center lg:items-start gap-2 mt-3">
                            {item.labledPrice > item.price && (
                                <h2 className="text-sm text-slate-400 line-through decoration-amber-500/50">
                                    LKR {item.labledPrice.toFixed(2)}
                                </h2>
                            )}
                            <h2 className="text-lg font-bold text-slate-900">
                                LKR {item.price.toFixed(2)}
                            </h2>
                        </div>
                    </div>

                        {/* Controls & Subtotal Section */}
                        <div className="flex flex-1 items-center justify-between lg:justify-end lg:gap-12 px-4">
                            {/* Quantity Controls */}
                            <div className="w-12 h-24   flex flex-col justify-between items-center py-2  bg-white">
                                <button className="p-1 hover:text-accent transition-colors">
                                    <BsChevronUp
                                        className="text-lg cursor-pointer"
                                        onClick={() => {
                                            const copiedCart = [...cart]
                                            copiedCart[index].quantity += 1
                                            setCart(copiedCart)
                                        }}
                                    />
                                </button>
                                <span className="text-lg font-bold w-8 text-center">{item.quantity}</span>
                                <button className="p-1 hover:text-accent transition-colors">
                                    <BsChevronUp
                                        className="rotate-180 cursor-pointer text-lg"
                                        onClick={() => {
                                            const copiedCart = [...cart]
                                            copiedCart[index].quantity-=1
                                            if (copiedCart[index].quantity < 1) {
                                                copiedCart.splice(index,1)
                                            }
                                            setCart(copiedCart)
                                        }}
                                    />
                                </button>
                            </div>

                            {/* Total Price for Item */}
                            <div className="p-2 rounded-md text-right min-w-[100px] lg:min-w-[140px]">
                                <p className="text-[10px] lg:text-xs text-slate-500 uppercase font-bold leading-none">Total</p>
                                <div className="flex flex-col">
                                <span className="text-xs lg:text-sm font-black text-slate-600">LKR</span>
                                 <span className="text-lg lg:text-2xl font-black text-slate-900 break-all leading-tight">
                                    {(item.price * item.quantity).toFixed(2)}
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            
            
            {/* user inputs */}
            
            {/* User Inputs Form - Styled to match product cards */}
                    <div className="w-full lg:w-[60%] max-w-4xl bg-white rounded-2xl border border-slate-100 shadow-lg p-8 mt-4">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">Delivery Details</h2>
                        
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-slate-600">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Enter your full name"
                                    onChange={e => setName(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-800 transition-all bg-gray-50"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-slate-600">Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    placeholder="Enter delivery address"
                                    onChange={e => setAddress(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-800 transition-all bg-gray-50"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-slate-600">Phone Number</label>
                                <input
                                    type="text"
                                    value={phone}
                                    placeholder="Enter phone number"
                                    onChange={e => setPhone(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-800 transition-all bg-gray-50"
                                />
                            </div>
                        </div>
                    </div>

                    
                {/* total and order now */}
                    {cart.length > 0 && (
                <div className="w-full lg:w-[60%] max-w-4xl bg-white rounded-2xl border border-slate-100 shadow-xl flex flex-col sm:flex-row items-center justify-between p-6 lg:px-10 mt-4 mb-10 sticky bottom-4 z-20 gap-4">
                    <div>
                        <p className="text-sm text-slate-400 uppercase font-semibold">Grand Total</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-slate-500">LKR</span>
                            <span className="text-3xl lg:text-4xl font-black text-slate-900">
                                {getCartTotal().toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <button className="w-full cursor-pointer sm:w-auto bg-slate-900 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all text-center active:scale-95" 
                    onClick={submitOrder}

                    

                    

                    >
                        Order Now
                    </button>
                </div>
            )}
        
                
                       

                    
            
            {cart.length === 0 && (
                <div className="mt-20 text-slate-400 text-center">
                    <p className="text-xl">Your cart is empty</p>
                    <button 
                        onClick={() => navigate("/products")}
                        className="mt-4 text-slate-800 underline font-semibold cursor-pointer hover:text-slate-600"
                    >
                        Go back to shopping
                    </button>
                </div>
            )}
        </div>
    )
}