import Header from "../components/header";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cartPage";
import CheckOutPage from "./checkOutPage";
import OrdersPage from "./ordersPage";
import Home from "./homeContent";
import Footer from "../components/footer";
import AboutPage from "./aboutPage";
import ContactUsPage from "./contactUsPage";
export default function HomePage(props){
    return(
        <>
                <div className="w-full h-full overflow-y-auto">
                    <Header />
                    <div className="w-full min-h-[calc(100%-100px)]">
                        <Routes>
                            <Route path="/" element={<Home/>} />
                            <Route path="/products" element={<ProductPage/>} />
                            <Route path="/contact" element={<ContactUsPage/>} />
                            <Route path="/about" element={<AboutPage/>} />
                            <Route path="/overview/:productId" element={<ProductOverview/>} />
                            <Route path="/cart" element ={<CartPage/>}/>
                            <Route path="/checkout" element={<CheckOutPage />}/>
                            <Route path="/orders" element={<OrdersPage/>}/>   
                            <Route path="/about" element = {<AboutPage/>}/>                        
                            <Route path="/*" element={<h1>Page Not Found</h1>} />
                        </Routes>
                       
                    </div>
            <Footer />
        </div>
         
        </>
        
    )
}

