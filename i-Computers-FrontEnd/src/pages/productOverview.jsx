import { useState ,useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../components/loader";
import axios from "axios";
import ImageSlider from "../components/imageSlider";
import { CgChevronRight } from "react-icons/cg";
import { addToCart } from "../utils/cart";
import AuthModal from "../components/authModal"; // Import the new modal

export default function ProductOverview(){
    const navigate = useNavigate();
    const params=useParams();
    const [product,setProduct]=useState(null);
    const [status,setStatus] = useState("loading");

    // NEW STATE FOR MODAL
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(()=>{
        if(status=="loading"){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productId).then(
                (response)=>{
                    setProduct(response.data);
                    setStatus("success");
                }
            ).catch(
                ()=>{
                    toast.error("Product Not Found")
                    setStatus("error");
                }
            )
        }
    },[])

     // HELPER: Check if logged in
    const checkLoginAndProceed = (action) => {
        const token = localStorage.getItem("token");
        if (token) {
            action(); // If logged in, do the work
        } else {
            setShowAuthModal(true); // If not, show popup
        }
    };


    return(
        <>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        { status=="loading" && <Loader/> }

        { status=="error" && 
            <h1 className="text-center mt-10 text-2xl">
                Error Loading Product
            </h1>
        }

        { status=="success" &&
            <div className="w-full min-h-[calc(100vh-100px)] flex lg:flex-row flex-col">

                <h1 className="text-4xl text-center sticky bg-white top-0 lg:hidden block font-semibold">
                    {product.name}
                </h1>

                {/* LEFT SIDE */}
                <div className="lg:w-1/2 w-full  lg:h-full lg:mt-3 flex">
                    <ImageSlider images={product.images}/>
                </div>

                {/* RIGHT SIDE */}
                <div className="lg:w-1/2 w-full  lg:h-full p-10 flex flex-col gap-6">

                    <h1 className="text-4xl hidden lg:block font-semibold">
                        {product.name}
                    </h1>

                    <h2 className="text-lg text-slate-600">
                        PRODUCT ID : {product.productId}
                    </h2>

                    <h2 className="text-lg font-semibold text-accent flex items-center">
                        <CgChevronRight/>
                        {product.category}
                    </h2>
                    {/*alternative names*/ }
                    <p className="text-lg font-semibold text-accent flex items-center">
                        {product.altNames && product.altNames.length>0&&(
                            <h3 className="text-md text-secondary/80">
                                {product.altNames.join(" | ")}
                            </h3>
                        )}
                    </p>
                    <p className="text-md text-justify p-3 text-secondary/90  overflow-y-auto">
                        {product.description}
                    </p>

                    <div className="w-full">
                        {product.labledPrice>product.price &&(
                            <h2 className="text-secondary/80 line-through decoration-amber-400 decoration-2 mr-2">
                                LKR. {product.labledPrice.toFixed(2)}
                            </h2>
                        )}

                        <h2 className="text-accent font-semibold text-3xl">
                            LKR. {product.price.toFixed(2)}
                        </h2>
                    </div>

                    <div className="w-full flex justify-center lg:justify-start   flex-row gap-4 mt-4">

                        <button
                            onClick={()=>{
                                 checkLoginAndProceed(() => {
                                    addToCart(product, 1);
                                });
                                // addToCart(product,1)
                            }}
                            className="bg-accent text-white px-6 py-3 cursor-pointer rounded hover:bg-accent/90 transition"
                        >
                            Add to Cart
                        </button>

                       <button
                            onClick={() => {
                                // WRAP IN LOGIN CHECK
                                checkLoginAndProceed(() => {
                                    navigate("/checkout", { state: [{
                                        productId: product.productId,
                                        name: product.name,
                                        price: product.price,
                                        labledPrice: product.labledPrice,
                                        image: product.images[0],
                                        quantity: 1
                                    }]});
                                });
                            }}
                            className="border-2 border-accent text-accent px-6 py-3 rounded hover:bg-accent cursor-pointer hover:text-white transition"
                        >
                            Buy Now
                        </button>

                    </div>
                </div>

            </div>
        }
        </>
    )
}