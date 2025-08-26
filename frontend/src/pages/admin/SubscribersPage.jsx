import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Mail, Calendar, Search, X } from "lucide-react";

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get(
          "https://byteblog-wfa2.onrender.com/api/admin/get-subscribers",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSubscribers(data || []); // data itself is an array
      } catch (err) {
        console.error("Error fetching subscribers:", err);
        setSubscribers([]);
      }
    };
    fetchSubs();
  }, []);

  const filteredSubs = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Users size={28} className="text-indigo-600" /> Subscribers
        </h1>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
          />
          {search && (
            <X
              size={16}
              className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
              onClick={() => setSearch("")}
            />
          )}
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="overflow-x-auto bg-white shadow rounded-2xl">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-indigo-100">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Email
        </th>
        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Subscribed At
        </th>
      </tr>
    </thead>

    <tbody className="bg-white divide-y divide-gray-200">
      {filteredSubs.length > 0 ? (
        filteredSubs.map((sub) => (
          <tr
            key={sub._id}
            className="hover:bg-indigo-50 transition-colors duration-200"
          >
            <td className="px-6 py-4 text-gray-800 font-medium">
              {sub.email}
            </td>
            <td className="px-6 py-4 text-gray-600">
              {new Date(sub.subscribedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="2"
            className="px-6 py-8 text-center text-gray-500 italic"
          >
            No subscribers found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </div>
  );
}
