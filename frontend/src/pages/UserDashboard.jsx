import React, { useState, useEffect } from 'react';
import { fetchUserDashboard } from '../services/api';
import { FileText, Eye, MessageCircle, Heart, TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";


const COLORS = ["#6366f1", "#7c3aed", "#f59e0b", "#10b981", "#ef4444"];
const CARD_GRADIENTS = [
  "from-indigo-500 to-purple-500",
  "from-pink-500 to-red-500",
  "from-yellow-400 to-orange-400",
  "from-green-400 to-teal-400",
  "from-blue-400 to-cyan-400"
];

function UserDashboard() {
  const [data, setData] = useState({});
  const [showPie, setShowPie] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await fetchUserDashboard();
        setData(res.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    loadDashboard();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Blog Analytics Dashboard</h1>
          <p className="text-gray-500">Track your blog performance and engagement metrics</p>
        </div>
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg">
          <TrendingUp className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Stats Cards with different gradients */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
  {[
    { label: "Total Posts", value: data.totalPosts, icon: <FileText className="w-6 h-6 text-white" /> },
    { label: "Total Views", value: data.totalViews, icon: <Eye className="w-6 h-6 text-white" /> },
    { label: "Comments", value: data.totalComments, icon: <MessageCircle className="w-6 h-6 text-white" /> },
    { label: "Total Likes", value: data.totalLikes, icon: <Heart className="w-6 h-6 text-white" /> },
    { label: "Engagement Rate", value: data.engagementRate, icon: <TrendingUp className="w-6 h-6 text-white" /> },
  ].map((stat, index) => (
    <div
      key={stat.label}
      className={`p-4 rounded-xl shadow text-white bg-gradient-to-r ${CARD_GRADIENTS[index]} hover:scale-105 transform transition duration-300 flex items-center justify-between`}
    >
      <div>
        <div className="text-sm">{stat.label}</div>
        <div className="text-2xl font-bold mt-1">{stat.value || 0}</div>
      </div>
      <div className="p-2 bg-white/20 rounded-full">{stat.icon}</div>
    </div>
  ))}
</div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Area Chart */}
        <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition duration-300">
          <h3 className="font-semibold mb-3 text-gray-700">Views over time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data.viewsData || []} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="_id" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
              <Tooltip />
              <Area type="monotone" dataKey="views" stroke="#6366f1" fill="url(#colorViews)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Posts Bar Chart */}
        <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition duration-300">
          <h3 className="font-semibold mb-3 text-gray-700">Top posts</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={(data.topPosts || []).slice(0, 5)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
              <XAxis dataKey="title" stroke="#9ca3af"/>
              <YAxis stroke="#9ca3af"/>
              <Tooltip />
              <Bar dataKey="views" fill="#7c3aed" radius={[5,5,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row: Device Pie + Top Posts List */}
      <div className="grid md:grid-cols-2 gap-4">
     
<div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition duration-300">
  <h3 className="font-semibold mb-3 text-gray-700">Views by Device</h3>
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie
        data={data.deviceData || []}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label={({ name, value }) => `${name}: ${value}`}
      >
        {(data.deviceData || []).map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
</div>



        {/* Top Posts List */}
        <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition duration-300">
          <h3 className="font-semibold mb-3 text-gray-700">Top Posts</h3>
          <ul className="space-y-2 text-gray-700">
            {(data.topPosts || []).slice(0, 5).map((post) => (
              <li key={post._id} className="hover:bg-gray-100 rounded p-2 transition cursor-pointer">
                {post.title} — <span className="font-semibold">{post.views} views</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard;
