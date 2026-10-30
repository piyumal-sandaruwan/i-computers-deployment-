import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;

  return (
    /* 1. Added "group" class to the main parent container */
    <Link to = {"/overview/"+product.productId}  className="w-[300px] h-[400px] shadow-2xl m-4 cursor-pointer relative group">
      
      <div className="w-full  h-[250px] relative">
        {/* 2. Secondary Image (Background) - Removed hover effects so it stays visible */}
        <img 
          src={product.images[1]} 
          alt={product.name}
          className="w-full h-full absolute bg-white object-cover" 
        /> 
        
        {/* 3. Primary Image (Foreground) - Uses group-hover:opacity-0 to fade out and reveal the image behind it */}
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full absolute bg-white transition-opacity duration-500 object-cover group-hover:opacity-0 primary-image" 
        /> 
      </div>

      <div className="w-full h-[150px] p-2 flex flex-col justify-between">
        <h1 className="text-accent/90 font-bold text-center text-xl">{product.name}</h1>
        <div className="w-full flex flex-col items-center">
          {
            product.labledPrice > product.price && (
              <h2 className="text-secondary/80 line-through decoration-amber-600 decoration-2 mr-2">
                LKR.{product.labledPrice.toFixed(2)}
              </h2>
            )
          }
          {/* Typo fixed: changed "test-accent" to "text-accent" and "labledPrice" to "price" */}
          <h2 className="text-accent font-semibold text-2xl">
            LKR.{product.price.toFixed(2)}
          </h2>
        </div>
      </div>

      {/* 4. Bottom Overlay Div - Uses group-hover:opacity-100 to show up when the card is hovered */}
      <div className="w-full h-[150px] bg-white bottom-0 absolute flex flex-row justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <button 

          to={"/overview/"+ product.productId}  
          className="px-4 py-2 cursor-pointer bg-accent text-white rounded-md hover:bg-accent/70 transition-colors duration-150 h-[50px] w-[150px]  text-center flex justify-center items-center"
        >
          View Details
        </button>
      </div>
      
    </Link>
  );
}