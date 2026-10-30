import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "./loader";

export default function ProductDeleteButton(props) {

  const productId = props.productId;
  const reload = props.reload;

  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {

    setIsDeleting(true);

    const token = localStorage.getItem("token");

    axios
      .delete(
        import.meta.env.VITE_BACKEND_URL + "/products/" + productId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {

        toast.success("Product deleted successfully");
        setIsDeleting(false);
        setIsMessageOpen(false);
        reload();

      })
      .catch((error) => {

        toast.error("Failed to delete product");
        setIsDeleting(false);

      });
  }

  return (
    <>
      <button
        onClick={() => {
          setIsMessageOpen(true);
        }}
        className="px-4 py-1 text-xs rounded-lg bg-red-100 text-red-600 cursor-pointer hover:bg-red-200 transition"
      >
        Delete
      </button>

      {isMessageOpen && (
        <div className="w-[100vw] h-screen fixed top-0 left-0 bg-black/55 flex justify-center items-center">

          <div className="w-[600px] h-[300px] bg-white rounded-2xl relative flex flex-col justify-center items-center">

            <button
              onClick={() => {
                setIsMessageOpen(false);
              }}
              className="w-[40px] h-[40px] bg-red-600 text-white rounded-full text-xl font-bold cursor-pointer hover:bg-red-800 absolute right-[-32px] top-[-32px]"
            >
              X
            </button>

            <h1 className="text-2xl mb-6 text-center font-bold">
              Are you sure you want to delete this product - {productId} ?
            </h1>

            <div className="flex justify-center gap-10 w-full">

              <button
                disabled={isDeleting}
                onClick={handleDelete}
                className="px-5 py-2 text-xl rounded-lg bg-red-500 text-white cursor-pointer hover:bg-red-600 transition"
              >
                Delete
              </button>

              <button
                onClick={() => {
                  setIsMessageOpen(false);
                }}
                className="px-5 py-2 text-xl rounded-lg bg-accent/35 text-white cursor-pointer hover:bg-accent/75 transition"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}
