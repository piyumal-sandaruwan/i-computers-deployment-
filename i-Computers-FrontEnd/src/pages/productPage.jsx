import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";

export default function ProductPage(){
    
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if(!loaded){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/products")
            .then((response) => {
                setProducts(response.data);
                // console.log(response.data);
                setLoaded(true);
            });
        }
    }, [loaded]);

    return(
        <div className="w-full min-h-[calc(100vh-100px)] pb-16">
            {
                !loaded ? <Loader/> :
                <div className="w-full flex justify-center flex-row flex-wrap ">

                    {/* Search Bar */}
                    <div className="w-full h-[100px] sticky top-0 bg-white flex justify-center items-center mb-4 shadow-md z-1">
                        <input 
                            type="text"
                            placeholder="Search Products ..."
                            className="w-1/2 px-4 py-2 border border-secondary/30 rounded-lg"
                            value={query}

                            onChange={async (e)=>{

                                setQuery(e.target.value);

                                if(e.target.value == ""){
                                    setLoaded(false);

                                    await axios
                                    .get(import.meta.env.VITE_BACKEND_URL + "/products") 
                                    .then((response)=>{
                                        console.log(response.data);
                                        setProducts(response.data);
                                    });

                                    setLoaded(true)

                                }else{

                                    await axios
                                    .get(import.meta.env.VITE_BACKEND_URL + "/products/search/" + encodeURIComponent(e.target.value)) 
                                    .then((response)=>{
                                        console.log(response.data);
                                        setProducts(response.data);
                                        setLoaded(true);
                                    });

                                }

                            }}
                        />
                    </div>

                    {/* Product List */}
                    {
                        products.map((item)=>{
                            return(
                                <ProductCard 
                                    key={item.productID} 
                                    product={item}
                                />
                            )
                        })
                    }

                </div>
            }
        </div>
    );
}