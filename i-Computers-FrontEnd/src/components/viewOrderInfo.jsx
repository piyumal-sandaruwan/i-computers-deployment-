import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import toast from "react-hot-toast";

const STATUS_CONFIG = {
  Pending:    { emoji: "🕐", bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",  dot: "bg-amber-400"   },
  Processing: { emoji: "⚙️", bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",   dot: "bg-blue-400"    },
  Completed:  { emoji: "✅", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-400" },
  Canceled:   { emoji: "✕",  bg: "bg-red-50",     text: "text-red-700",     border: "border-red-200",    dot: "bg-red-400"     },
};

export default function ViewOrderInfo(props) {
  // Extract data from props
  const { order, onSaveChanges } = props;

  // State initialization
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(order?.status || "Pending");
  const [notes, setNotes] = useState(order?.notes || "");
  const [loading, setLoading] = useState(false);

  // Safety check to prevent crash if order prop is missing
  if (!order) return null;

  const hasChanged =
    selectedStatus !== (order.status || "Pending") ||
    notes !== (order.notes || "");

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/orders/" + order.orderId,
        { 
          status: selectedStatus, 
          notes: notes 
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success("Order updated successfully");
      
      if (onSaveChanges) onSaveChanges(); 
      setIsModalOpen(false);
      
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error.response?.data?.message || "Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  const statusCfg = STATUS_CONFIG[selectedStatus] || STATUS_CONFIG["Pending"];

  return (
    <>
      {/* ── Trigger Button ── */}
      <button
        className="bg-accent/70 hover:bg-accent p-2 rounded-lg cursor-pointer text-white transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        View Info
      </button>

      {/* ── Modal ── */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="outline-none w-full max-w-2xl mx-auto"
        overlayClassName="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        ariaHideApp={false}
      >
        <div
          style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
          className="bg-white rounded-2xl shadow-2xl w-full max-h-[92vh] flex flex-col overflow-hidden"
        >

          {/* ───── HEADER ───── */}
          <div className="bg-[#1B211A] px-7 py-6 flex-shrink-0 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -bottom-12 -right-4 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-white/40 text-[10px] font-semibold uppercase tracking-[0.2em] mb-1">
                  Order Receipt
                </p>
                <h2 className="text-white text-2xl font-bold tracking-tight">
                  #{order.orderId}
                </h2>
                <p className="text-white/50 text-xs mt-1">
                  {new Date(order.date).toLocaleDateString("en-US", {
                    weekday: "long", year: "numeric", month: "long", day: "numeric",
                  })}
                </p>
              </div>

              <span
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusCfg.bg} ${statusCfg.text} border ${statusCfg.border}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                {selectedStatus}
              </span>
            </div>
          </div>

          {/* ───── SCROLLABLE BODY ───── */}
          <div className="overflow-y-auto flex-1 px-7 py-6 space-y-6">

            {/* ── Customer Info ── */}
            <section>
              <SectionTitle>Customer Information</SectionTitle>
              <div className="grid grid-cols-2 gap-2.5">
                <InfoCard label="Full Name"    value={order.name} />
                <InfoCard label="Phone"        value={order.phone || "—"} />
                <InfoCard label="Email"        value={order.email} className="col-span-2 truncate" />
                <InfoCard label="Delivery Address" value={order.address} className="col-span-2" />
              </div>
            </section>

            {/* ── Order Items ── */}
            <section>
              <SectionTitle>Items Ordered</SectionTitle>
              <div className="space-y-2">
                {order.items?.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover bg-gray-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        LKR {item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-[#1B211A] flex-shrink-0">
                      LKR {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total Amount Container */}
              <div className="mt-3 flex items-center justify-between bg-[#1B211A]/5 border border-[#1B211A]/10 rounded-xl px-4 py-3">
                <span className="text-sm font-medium text-gray-600">Order Total</span>
                <span className="text-xl font-extrabold text-[#1B211A]">
                  LKR {order.totalAmount?.toFixed(2)}
                </span>
              </div>
            </section>

            {/* ── Status Change ── */}
            <section>
              <SectionTitle>Update Status</SectionTitle>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(STATUS_CONFIG).map(([status, cfg]) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`rounded-xl border-2 py-3 text-center transition-all cursor-pointer
                      ${selectedStatus === status
                        ? `${cfg.bg} ${cfg.border} ${cfg.text} shadow-sm scale-[1.03]`
                        : "bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100"
                      }`}
                  >
                    <div className="text-lg mb-1">{cfg.emoji}</div>
                    <div className="text-[11px] font-semibold leading-tight">{status}</div>
                  </button>
                ))}
              </div>
            </section>

            {/* ── Additional Notes ── */}
            <section>
              <SectionTitle>Additional Notes</SectionTitle>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add internal notes about this order…"
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl px-4 py-3
                  focus:outline-none focus:ring-2 focus:ring-[#1B211A]/20 focus:border-[#1B211A]
                  resize-none placeholder-gray-300 transition-all"
              />
            </section>

          </div>

          {/* ───── FOOTER ───── */}
          <div className="flex-shrink-0 px-7 py-4 border-t border-gray-100 bg-gray-50/60 flex items-center justify-end gap-3 rounded-b-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600
                bg-white border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            {hasChanged && (
              <button
                onClick={handleSave}
                disabled={loading}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all
                  ${loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-[#1B211A] hover:bg-[#2e3a2d] active:scale-95 shadow-sm cursor-pointer"
                  }`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            )}
          </div>

        </div>
      </Modal>
    </>
  );
}

/* ── Helper sub-components ── */

function SectionTitle({ children }) {
  return (
    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.18em] mb-3">
      {children}
    </h3>
  );
}

function InfoCard({ label, value, className = "" }) {
  return (
    <div className={`bg-gray-50 rounded-xl p-3 ${className}`}>
      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-1">{label}</p>
      <p className="text-sm font-semibold text-gray-800 break-words">{value}</p>
    </div>
  );
}