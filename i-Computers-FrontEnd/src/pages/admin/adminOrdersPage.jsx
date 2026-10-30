import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ViewOrderInfo from "../../components/viewOrderInfo";

export default function AdminOrdersPage() {

  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const token = localStorage.getItem("token");

      axios.get(import.meta.env.VITE_BACKEND_URL + "/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setOrders(response.data);
          setLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [loaded]);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center p-10">
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl overflow-hidden relative">

        {/* Header */}
        <div className="px-8 py-6 bg-accent text-primary">
          <h1 className="text-2xl font-bold tracking-wide">
            Order Management
          </h1>
        </div>

        <div className="overflow-x-auto">

          {loaded ? (
            <table className="w-full text-sm text-left border-collapse">

              <thead className="bg-gray-100 text-accent uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-5 py-4">Order ID</th>
                  <th className="px-5 py-4">Customer Email</th>
                  <th className="px-5 py-4">Customer Name</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Total Amount</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >

                    <td className="px-5 py-4 font-semibold text-accent">
                      {order.orderId}
                    </td>

                    <td className="px-5 py-4 font-semibold text-accent">
                      {order.email}
                    </td>

                    <td className="px-5 py-4 font-semibold text-accent">
                      {order.name}
                    </td>

                    <td className="px-5 py-4 font-semibold text-accent">
                      {new Date(order.date).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4 font-semibold text-accent">
                      {order.status}
                    </td>

                    <td className="px-5 py-4 font-semibold text-accent">
                      LKR. {order.totalAmount.toFixed(2)}
                    </td>

                    <td className="px-5 py-4 font-semibold text-accent">
                      <ViewOrderInfo
                        order={order}
                        onSaveChanges={() => setLoaded(false)}
                      />
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