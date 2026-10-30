import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import toast from "react-hot-toast";
import { GoVerified } from "react-icons/go";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setUsers(response.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setLoaded(true);
      });
  };

  const baseImgUrl = import.meta.env.VITE_BACKEND_URL.replace("/api", "");

  return (
    <div className="w-full p-10 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="px-8 py-6 bg-accent text-white font-bold text-xl">
          User Management
        </div>
        
        {!loaded ? (
          <div className="p-20">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Table Headers */}
              <thead className="bg-gray-50 uppercase text-xs text-accent tracking-wider">
                <tr>
                  <th className="p-5">Image</th>
                  <th className="p-5">Email</th>
                  <th className="p-5">First Name</th>
                  <th className="p-5">Last Name</th>
                  <th className="p-5">Role</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {users.map((u, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition duration-200">
                    
                    {/* Image Column */}
                    <td className="p-5">
                      <img 
                        src={baseImgUrl + u.image} 
                        alt="user" 
                        className="w-12 h-12 rounded-lg shadow object-cover border border-gray-200"
                        onError={(e) => e.target.src = '/default.png'} 
                      />
                    </td>

                    {/* Email Column */}
                    <td className="p-5 font-bold flex flex-row text-accent">
                      {u.email}{u.isEmailVerified?  <GoVerified className="text-lg flex flex-row ml-[10px] text-blue-400"/> :"" }
                    </td>

                    {/* Name Columns */}
                    <td className="p-5">{u.firstName}</td>
                    <td className="p-5">{u.lastName}</td>

                    {/* Role Column */}
                    <td className="p-5 capitalize font-medium">{u.role}</td>
                    
                    {/* Status Column */}
                    <td className="p-5">
                      {u.isBlocked ? (
                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                          Blocked
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                          Active
                        </span>
                      )}
                    </td>

                    {/* Action Column */}
                    <td className="p-5">
                        <button 
                          className={`px-4 py-2 rounded-lg text-white text-xs font-bold transition duration-200 ${u.isBlocked ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
                          onClick={async () => {
                              try {
                                // CHANGED TO .put TO MATCH BACKEND ROUTE
                                await axios.put(import.meta.env.VITE_BACKEND_URL + `/users/toggle-block/${u.email}`, 
                                { isBlocked: !u.isBlocked },
                                {
                                  headers : { Authorization : `Bearer ${localStorage.getItem("token")}` }
                                });
                                
                                toast.success("User status updated");
                                setLoaded(false);
                                fetchUsers(); 
                              } catch (err) {
                                // Show specific error message from backend (e.g., "Admin cannot block themselves")
                                toast.error(err.response?.data?.message || "Failed to update user");
                              }
                          }}
                        >
                          {u.isBlocked ? "Unblock" : "Block"}
                        </button>
                     </td>     
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}