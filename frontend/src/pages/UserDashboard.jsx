import React from 'react'
import { useState, useEffect } from 'react';
import { fetchUserDashboard } from '../services/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { MoreHorizontal, RotateCcw, TrendingUp, Eye, MessageCircle, Heart, Users } from 'lucide-react';

const COLORS = ["#6366f1", "#7c3aed", "#f59e0b", "#10b981", "#ef4444"];

function UserDashboard() {
  const [data, setData] = useState({});
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        
        const res = await fetchUserDashboard();
        
        setData(res.data);
        console.log("Dashboard Data:", res.data);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    loadDashboard();
  }, []);

  useEffect(() => {
    if (data) {
      console.log("Dashboard Data (after state update):", data);
    }
  }, [data]);

  return (
    <>
       <div className="flex items-start justify-between mb-6">
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Blog Analytics Dashboard</h1>
      <p className="text-gray-600">Track your blog performance and engagement metrics</p>
    </div>
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
      <TrendingUp className="w-6 h-6 text-white" />
    </div>
  </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 card">
            <div className="text-sm text-gray-500">Total Posts</div>
            <div className="text-2xl font-bold">{data.totalPosts}</div>
          </div>
          <div className="p-4 card">
            <div className="text-sm text-gray-500">Total Views</div>
            <div className="text-2xl font-bold">{data.totalViews}</div>
          </div>
          <div className="p-4 card">
            <div className="text-sm text-gray-500">Comments</div>
            <div className="text-2xl font-bold">{data.totalComments}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 card">
            <h3 className="font-semibold mb-2">Views over time</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data.viewsData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="p-4 card">
            <h3 className="font-semibold mb-2">Top posts</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={(data.topPosts || []).slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#7c3aed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 card">
          <h3 className="font-semibold mb-2">Views by Device</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart><Pie data={data.deviceData || []} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
  {(data.deviceData || []).map((entry, index) => (
    <Cell key={index} fill={COLORS[index % COLORS.length]} />
  ))}
</Pie>
</PieChart>
</ResponsiveContainer>
</div>
        <div className="p-4 card"><h3 className="font-semibold mb-2">Top Posts</h3><ul className="space-y-2 text-gray-700"><li>Scenery — 120 views</li><li>Mountain Lake — 780 views</li><li>UX Tips — 340 views</li></ul></div>
      </div>
    </>
  )
}

export default UserDashboard