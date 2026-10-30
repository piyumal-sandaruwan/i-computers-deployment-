import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer";

export default function OrdersPage() {

  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
        setLoaded(true);
      })
      .catch((err) => console.error(err));

  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center p-10">

      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="px-8 py-6 bg-accent text-primary">
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>

        <div className="overflow-x-auto">

          {loaded ? (

            <table className="w-full text-sm text-left">

              <thead className="bg-gray-100 text-accent text-xs uppercase">
                <tr>
                  <th className="px-5 py-4">Order ID</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (

                  <tr key={index} className="border-b hover:bg-gray-50">

                    <td className="px-5 py-4 font-semibold">
                      {order.orderId}
                    </td>

                    <td className="px-5 py-4">
                      {order.email}
                    </td>

                    <td className="px-5 py-4">
                      {order.name}
                    </td>

                    <td className="px-5 py-4">
                      {new Date(order.date).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      {order.status}
                    </td>

                    <td className="px-5 py-4">
                      LKR {order.totalAmount.toFixed(2)}
                    </td>

                    <td className="px-5 py-4">
                      <ViewOrderInfoCustomer order={order} />
                    </td>

                  </tr>

                ))}
              </tbody>

            </table>

          ) : (
            <Loader />
          )}

        </div>

      </div>

    </div>
  );
}