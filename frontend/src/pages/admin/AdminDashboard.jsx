import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";
import {
  Users,
  FileText,
  MessageCircle,
  ThumbsUp,
  Flame,
  MessagesSquare,
  UserCheck
} from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"];

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await axios.get("https://byteblog-wfa2.onrender.com/api/admin/insights", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.error("Error fetching insights", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  if (!data) return <p className="text-center text-red-500 mt-10">No data available</p>;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800">📊 Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<Users />} label="Total Users" value={data.totalUsers} color="bg-indigo-500" />
        <StatCard icon={<FileText />} label="Total Blogs" value={data.totalBlogs} color="bg-pink-500" />
        <StatCard icon={<MessageCircle />} label="Total Comments" value={data.totalComments} color="bg-yellow-500" />
        <StatCard icon={<ThumbsUp />} label="Total Likes" value={data.totalLikes} color="bg-green-500" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Blogs per Day (Bar Chart) */}
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-3">Blogs Per Day (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.blogsPerDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown (Pie Chart) */}
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-3">Blog Categories</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.categoryBreakdown}
                dataKey="count"
                nameKey="_id"
                outerRadius={100}
                label
              >
                {data.categoryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Registrations (Line Chart) */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-3">Users Registered (Last 6 Months)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.usersPerMonth.reverse()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Most Liked Blogs */}
        <Table
          icon={<Flame className="w-5 h-5 text-red-500" />}
          title="Most Liked Blogs"
          data={data.mostLikedBlogs}
          columns={["title", "likes"]}
        />

        {/* Most Commented Blogs */}
        <Table
          icon={<MessagesSquare className="w-5 h-5 text-blue-500" />}
          title="Most Commented Blogs"
          data={data.mostCommentedBlogs}
          columns={["title", "commentsCount"]}
        />
      </div>

      {/* Active Users */}
      <Table
        icon={<UserCheck className="w-5 h-5 text-green-500" />}
        title="Most Active Users"
        data={data.activeUsers}
        columns={["username", "email", "blogCount"]}
      />
    </div>
  );
}

/* ------------------ Helper Components ------------------ */

const StatCard = ({ icon, label, value, color }) => (
  <div className={`p-5 rounded-2xl shadow text-white flex items-center space-x-4 ${color}`}>
    <div className="text-3xl">{icon}</div>
    <div>
      <p className="text-sm opacity-80">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

const Table = ({ icon, title, data, columns }) => (
  <div className="bg-white shadow rounded-2xl p-4 overflow-x-auto">
    <div className="flex items-center space-x-2 mb-3">
      {icon}
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b">
          {columns.map((col) => (
            <th key={col} className="p-2 capitalize">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 ? (
          data.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col} className="p-2">
                  {Array.isArray(row[col]) ? row[col].length : row[col]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="p-2 text-gray-500 text-center">No Data</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
