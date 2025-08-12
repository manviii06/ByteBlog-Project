import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { subscribeUser } from '../services/api'; 
const LandingPage = () => {

  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      console.log("📤 Sending to backend:", { email })
      const res = await subscribeUser({ email }); // API call
      setStatusMessage("✅ Subscription successful!");
      setEmail("");
    } catch (err) {
      console.error("Subscription error:", err.message);
      setStatusMessage("❌ Failed to subscribe. Try again.");
    }
  };


  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Publish Your Voice. <br /> Inspire the World.
            </h1>
            <p className="text-lg mb-6">
              Blogify lets you write, publish, and grow your personal brand with a powerful, distraction-free editor and built-in community.
            </p>
            <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-100">
              Start Writing for Free
            </button>
          </div>
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src={assets.blog_pic_1}
              alt="Blogging"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Why Bloggers Love Blogify</h2>
    <p className="text-gray-500 text-lg mb-12">
      Everything you need to build, grow, and monetize your blog — all in one place.
    </p>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          title: 'Powerful Editor',
          desc: 'Distraction-free writing with Markdown and AI-assisted content generation.',
          icon: '📝',
        },
        {
          title: 'Built-in SEO',
          desc: 'Automatically optimized for Google so your content gets discovered fast.',
          icon: '🚀',
        },
        {
          title: 'Monetization Tools',
          desc: 'Earn through memberships, paid articles, and reader donations.',
          icon: '💰',
        },
        {
          title: 'Custom Domains',
          desc: 'Use your own domain for a professional online presence.',
          icon: '🌐',
        },
        {
          title: 'Analytics',
          desc: 'Track performance, traffic, engagement, and revenue in real-time.',
          icon: '📊',
        },
        {
          title: 'Community & Comments',
          desc: 'Connect with readers through comments and email newsletters.',
          icon: '💬',
        },
      ].map((item, i) => (
        <div
          key={i}
          className="p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white hover:shadow-xl hover:shadow-blue-900 hover:scale-[1.02] transition-all duration-300 text-left"
        >
          <div className="text-4xl mb-4">{item.icon}</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{item.title}</h3>
          <p className="text-gray-600 text-base">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-purple-600 to-white py-20">
  <div className="max-w-5xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-12">What Our Writers Say</h2>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          name: 'Aarav M.',
          quote: 'Blogify gave me a voice. I’ve grown from 0 to 10k monthly readers in 3 months.',
        },
        {
          name: 'Priya S.',
          quote: 'I love the clean UI and SEO tools. It feels like blogging with superpowers.',
        },
        {
          name: 'Rohit K.',
          quote: 'Thanks to Blogify, I now make a full-time income from writing!',
        },
      ].map((t, i) => (
        <div
          key={i}
          className="relative bg-white/90 backdrop-blur-md border border-indigo-100 rounded-xl p-6 shadow-lg hover:shadow-purple-950 hover:scale-[1.02] transition-all duration-300"
        >
          {/* Decorative quote icon */}
          <div className="absolute -top-6 left-6 text-indigo-500 text-5xl">“</div>

          <p className="text-gray-700 italic text-lg mb-6 mt-6">"{t.quote}"</p>

          {/* Decorative divider */}
          <div className="h-[1px] bg-indigo-100 mb-4"></div>

          <h4 className="font-semibold text-indigo-700 text-md">{t.name}</h4>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Blog Preview Section */}
    <section id="features-section" className=" bg-white py-16 scroll-mt-24">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-10">Featured Blogs</h2>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          img: assets.blog_pic_1,
          title: 'How I Built My Audience From Scratch',
          author: 'Jane Doe',
          date: 'Aug 2025',
        },
        {
          img: assets.blog_pic_2,
          title: 'The Secret to Writing Viral Articles',
          author: 'Alex Roy',
          date: 'Jul 2025',
        },
        {
          img: assets.blog_pic_3,
          title: 'Making Money from Your Blog in 30 Days',
          author: 'Meera Shah',
          date: 'Jun 2025',
              },
        {
          img: assets.blog_pic_4,
          title: 'The New Way of Study',
          author: 'Roger binny',
          date: 'Apr 2025',
        },
        {
          img: assets.blog_pic_5,
          title: 'Importance of Tourism in Modern Economy',
          author: 'Alex',
          date: 'Jan 2025',
        },
        {
          img: assets.blog_pic_6,
          title: 'The Rise of Artificial Intelligence in Modern Technology',
          author: 'Madan Shah',
          date: 'Jun 2025',
        },
      ].map((blog, i) => (
        <div
          key={i}
          className="rounded-lg shadow-md hover:shadow-black hover:shadow-xl transition overflow-hidden"
        >
          <img
            src={blog.img}
            alt={blog.title}
            className="w-full h-56 object-cover"
          />
          <div className="p-4 text-left">
            <h4 className="text-lg font-semibold mb-1">{blog.title}</h4>
            <p className="text-sm text-gray-600">By {blog.author} · {blog.date}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  {/* email section  */}
     <div className="flex flex-col items-center justify-center text-center space-y-2 my-32 ">
  <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog!</h1>
  <p className="md:text-lg text-gray-900/70 pb-8">
    Subscribe to get the latest blog, new tech, and exclusive news.
  </p>

  <form onSubmit={handleSubscribe} className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
    <input
      className="border border-gray-500 h-full outline-none w-full rounded-l-md rounded-r-none px-3 text-gray-600"
      placeholder="Enter your email id"
      required
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <button
      type="submit"
      className="md:px-12 px-8 h-full text-white bg-indigo-600 hover:bg-indigo-700 transition-all cursor-pointer rounded-r-md rounded-l-none"
    >
      Subscribe
    </button>
        </form>
        {statusMessage && <p className="mt-2 text-sm text-green-600">{statusMessage}</p>}
</div>
      
    </div>
  );
};

export default LandingPage;
