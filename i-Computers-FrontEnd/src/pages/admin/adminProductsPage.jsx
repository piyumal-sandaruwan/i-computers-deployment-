import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import ProductDeleteButton from "../../components/productDeleteButton";

export default function AdminProductsPage(props) {

  const [products, setProducts] = useState([]);
  const[loaded,setLoaded]=useState(false);

  useEffect(() => {
    if(!loaded){
    const token=localStorage.getItem("token");////
    axios.get(import.meta.env.VITE_BACKEND_URL + "/products",{
      headers: {
            Authorization: `Bearer ${token}`, 
          },
    })
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
        setLoaded(true);
      });
    }
  }, [loaded]);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center p-10">

      {/* Rounded Card Container */}
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl overflow-hidden relative">

        {/* Header */}
        <div className="px-8 py-6 bg-accent text-primary">
          <h1 className="text-2xl font-bold tracking-wide">
            Product Management
          </h1>
        </div>

        {/* Table Wrapper (Important for rounded corners) */}
        <div className="overflow-x-auto">

          {loaded?<table className="w-full text-sm text-left border-collapse">

            {/* Table Head */}
            <thead className="bg-gray-100 text-accent uppercase text-xs tracking-wider">
              <tr>
                <th className="px-5 py-4">Image</th>
                <th className="px-5 py-4">Product ID</th>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Labeled Price</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Brand</th>
                <th className="px-5 py-4">Model</th>
                <th className="px-5 py-4">Stock</th>
                <th className="px-5 py-4">Availability</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {products.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >

                    <td className="px-5 py-4">
                      <img
                        src={item.images[0]}
                        alt="product"
                        className="w-[55px] h-[55px] object-cover rounded-lg shadow"
                      />
                    </td>

                    <td className="px-5 py-4 font-semibold text-accent">
                      {item.productId}
                    </td>

                    <td className="px-5 py-4">
                      {item.name}
                    </td>

                    <td className="px-5 py-4 font-bold">
                      Rs. {item.price}
                    </td>

                    <td className="px-5 py-4 text-gray-400 line-through">
                      Rs. {item.labledPrice}
                    </td>

                    <td className="px-5 py-4">
                      {item.category}
                    </td>

                    <td className="px-5 py-4">
                      {item.brand}
                    </td>

                    <td className="px-5 py-4">
                      {item.model}
                    </td>

                    <td className="px-5 py-4">
                      <span className="px-3 py-1 bg-gray-200 rounded-full text-xs font-medium">
                        {item.stock}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold ${
                          item.isAvailable
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.isAvailable ? "Available" : "Out of Stock"}
                      </span>
                    </td>

                    {/* Action Column */}
                    <td className="px-5 py-4">
                    <div className="flex gap-3 justify-center">

                      
                      <Link to="/admin/update-product" className="px-5 py-2 text-s rounded-lg cursor-pointer bg-blue-100 text-blue-600 hover:bg-blue-200 transition " 
                      state={item}>  {/*pass item to update page*/}
                        Edit
                      </Link>
                      <ProductDeleteButton productId={item.productId} reload={()=>{setLoaded(false)}}/>

                    </div>
                  </td>

                  </tr>
                );
              })}
            </tbody>

          </table>:<Loader/>}
        </div>

        {/* Floating Add Button */}
        <Link
          to="/admin/add-product"
          className="w-[65px] h-[65px] rounded-full bg-accent text-primary 
          flex items-center justify-center text-3xl 
          shadow-xl hover:scale-110 hover:bg-black 
          transition duration-300 absolute bottom-8 right-8"
        >
          <BiPlus />
        </Link>

      </div>

    </div>
  );
}
