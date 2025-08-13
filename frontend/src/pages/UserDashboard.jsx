import React from 'react'

function UserDashboard() {
  return (
    <>
      <header className="bg-white p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={()=>setView('dashboard')} className="text-sm text-gray-600">Home</button>
        <button onClick={()=>setView('posts')} className="text-sm text-gray-600">Posts</button>
      </div>
      <div className="flex items-center gap-3">
        <input placeholder="Search..." className="border rounded px-3 py-1" />
        <img src="https://via.placeholder.com/36" className="w-9 h-9 rounded-full" alt="profile" />
      </div>
    </header>

    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 card">
          <div className="text-sm text-gray-500">Total Posts</div>
          <div className="text-2xl font-bold">{posts.length}</div>
        </div>
        <div className="p-4 card">
          <div className="text-sm text-gray-500">Total Views</div>
          <div className="text-2xl font-bold">{posts.reduce((s,p)=>s+p.views,0)}</div>
        </div>
        <div className="p-4 card">
          <div className="text-sm text-gray-500">Comments</div>
          <div className="text-2xl font-bold">{posts.reduce((s,p)=>s+p.comments,0)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-4 card">
          <h3 className="font-semibold mb-2">Views over time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={viewsData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Line type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={3} /></LineChart>
          </ResponsiveContainer>
        </div>
        <div className="p-4 card">
          <h3 className="font-semibold mb-2">Top posts</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={posts.slice(0,5)}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="title" /><YAxis /><Tooltip /><Bar dataKey="views" fill="#7c3aed" /></BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="p-4 card"><h3 className="font-semibold mb-2">Views by Device</h3><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>{data.map((entry, index)=><Cell key={index} fill={COLORS[index % COLORS.length]} />)}</Pie></PieChart></ResponsiveContainer></div>
      <div className="p-4 card"><h3 className="font-semibold mb-2">Top Posts</h3><ul className="space-y-2 text-gray-700"><li>Scenery — 120 views</li><li>Mountain Lake — 780 views</li><li>UX Tips — 340 views</li></ul></div>
    </div>
    </>
  )
}

export default UserDashboard