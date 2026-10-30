import { useState } from "react";
import Modal from "react-modal";

const STATUS_CONFIG = {
  Pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  Processing: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  Completed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  Canceled: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
};

export default function ViewOrderInfoCustomer({ order }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!order) return null;

  const statusCfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.Pending;

  return (
    <>
      {/* Button */}
      <button
        className="bg-accent/70 hover:bg-accent px-3 py-2 rounded-lg text-white"
        onClick={() => setIsModalOpen(true)}
      >
        View Info
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="outline-none w-full max-w-2xl mx-auto"
        overlayClassName="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        ariaHideApp={false}
      >
        <div className="bg-white rounded-2xl shadow-xl w-full max-h-[90vh] flex flex-col overflow-hidden">

          {/* Header */}
          <div className="bg-[#1B211A] px-6 py-5 text-white">
            <h2 className="text-xl font-bold">Order #{order.orderId}</h2>
            <p className="text-xs opacity-70">
              {new Date(order.date).toLocaleDateString()}
            </p>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6">

            {/* Customer Info */}
            <section>
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">
                Customer Info
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <InfoCard label="Name" value={order.name} />
                <InfoCard label="Phone" value={order.phone || "-"} />
                <InfoCard label="Email" value={order.email} className="col-span-2" />
                <InfoCard label="Address" value={order.address} className="col-span-2" />
              </div>
            </section>

            {/* Items */}
            <section>
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">
                Ordered Items
              </h3>

              <div className="space-y-2">
                {order.items?.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                  >
                    <img
                      src={item.image}
                      className="w-14 h-14 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        LKR {item.price} × {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold">
                      LKR {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4 font-bold text-lg">
                <span>Total</span>
                <span>LKR {order.totalAmount?.toFixed(2)}</span>
              </div>
            </section>

            {/* Status */}
            <section>
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">
                Order Status
              </h3>

              <span
                className={`px-3 py-2 rounded-lg border text-sm font-semibold ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}
              >
                {order.status}
              </span>
            </section>

          </div>

          {/* Footer */}
          <div className="border-t p-4 flex justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Close
            </button>
          </div>

        </div>
      </Modal>
    </>
  );
}

function InfoCard({ label, value, className = "" }) {
  return (
    <div className={`bg-gray-50 p-3 rounded-lg ${className}`}>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}