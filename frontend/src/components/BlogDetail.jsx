









import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  FaTrash,
  FaEdit,
  FaThumbsUp,
  FaThumbsDown,
  FaCommentDots,
  FaShare,
  FaReply,
  FaSmile,
} from "react-icons/fa";
import { deleteBlog } from "./blogsSlice";
import BlogEditor from "./BlogEditor"; 


const emojiReactions = [
  { label: "😊", value: "happy" },
  { label: "😂", value: "laugh" },
  { label: "😍", value: "love" },
  { label: "😢", value: "sad" },
  { label: "😡", value: "angry" },
  { label: "👍", value: "like" },
  { label: "🎉", value: "celebrate" },
];

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [replyToId, setReplyToId] = useState(null);
  const [activeEmojiPicker, setActiveEmojiPicker] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const [showEditor, setShowEditor] = useState(false);

  const storageKey = `comments_${id}`;

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(storageKey));
    if (storedComments) setComments(storedComments);
  }, [id]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(comments));
  }, [comments, storageKey]);

  if (!blog) {
    return (
      <div className="text-center text-gray-500">
        Blog not found. <Link to="/">Go back</Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newComment = {
      id: uuidv4(),
      name,
      text,
      date: new Date().toISOString(),
      likes: 0,
      emoji: null,
      replies: [],
    };

    if (editingId) {
      setComments((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, text, name } : c))
      );
    } else if (replyToId) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === replyToId
            ? { ...c, replies: [...c.replies, newComment] }
            : c
        )
      );
    } else {
      setComments((prev) => [...prev, newComment]);
    }

    setName("");
    setText("");
    setEditingId(null);
    setReplyToId(null);
  };

  const handleDeleteBlog = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
      navigate("/");
    }
  };

  const renderReplies = (replies) =>
    replies?.map((r) => (
      <div key={r.id} className="ml-6 mt-2 p-2 border rounded bg-gray-50">
        <p className="font-semibold">{r.name}</p>
        <p>{r.text}</p>
        <p className="text-gray-400 text-xs">
          {new Date(r.date).toLocaleString()}
        </p>
        {r.emoji && <p className="text-xl">{r.emoji}</p>}
      </div>
    ));

  return (
    <div>
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to All Posts
      </Link>

      <h1 className="text-3xl font-bold mb-4 truncate">
        {blog.title.length > 100 ? blog.title.slice(0, 100) + "..." : blog.title}
      </h1>

      <img
        src={blog.image || "https://via.placeholder.com/600"}
        alt={blog.title}
        className="w-full h-80 object-cover rounded mb-3"
      />

    
      <div className="flex justify-end gap-6 text-gray-700 mb-6 pr-4">
        <button
          onClick={() => setLikes((prev) => prev + 1)}
          className="flex flex-col items-center text-xs hover:text-blue-600"
        >
          <FaThumbsUp size={18} />
          <span>Like ({likes})</span>
        </button>
        <button
          onClick={() => setDislikes((prev) => prev + 1)}
          className="flex flex-col items-center text-xs hover:text-red-600"
        >
          <FaThumbsDown size={18} />
          <span>Dislike ({dislikes})</span>
        </button>
        <a
          href="#comment-section"
          className="flex flex-col items-center text-xs hover:text-green-600"
        >
          <FaCommentDots size={18} />
          <span>Comment</span>
        </a>
        <button
          onClick={() => alert("Share functionality here")}
          className="flex flex-col items-center text-xs hover:text-purple-600"
        >
          <FaShare size={18} />
          <span>Share</span>
        </button>

        <button
          onClick={() => setShowEditor(true)}
          className="flex flex-col items-center text-xs hover:text-yellow-600"
        >
          <FaEdit size={18} />
          <span>Edit</span>
        </button>

        <button
          onClick={handleDeleteBlog}
          className="flex flex-col items-center text-xs hover:text-red-600"
        >
          <FaTrash size={18} />
          <span>Delete</span>
        </button>
      </div>

      <div
        className="text-gray-700 text-lg mb-6"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />


      <h2 className="text-xl font-bold mb-4" id="comment-section">
        Comments ({comments.length})
      </h2>

      <div className="space-y-4 mb-6">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="border p-3 rounded bg-gray-50 relative">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p>{c.text}</p>
                  <p className="text-gray-400 text-xs">
                    {new Date(c.date).toLocaleString()}
                  </p>
                  {c.emoji && <p className="text-xl">{c.emoji}</p>}
                  {renderReplies(c.replies)}
                </div>
                <div className="flex space-x-2">
                  <button title="Reply" onClick={() => setReplyToId(c.id)}>
                    <FaReply />
                  </button>
                  <button title="Edit" onClick={() => {
                    setEditingId(c.id);
                    setName(c.name);
                    setText(c.text);
                  }}>
                    <FaEdit />
                  </button>
                  <button
                    title="Delete"
                    onClick={() =>
                      setComments((prev) => prev.filter((cm) => cm.id !== c.id))
                    }
                  >
                    <FaTrash />
                  </button>
                  <button
                    title="Emoji"
                    onClick={() =>
                      setActiveEmojiPicker((prev) =>
                        prev === c.id ? null : c.id
                      )
                    }
                  >
                    <FaSmile />
                  </button>
                </div>
              </div>
              {activeEmojiPicker === c.id && (
                <div className="mt-2 flex gap-2 flex-wrap bg-white border p-2 rounded shadow-md absolute top-full left-0 z-10">
                  {emojiReactions.map((emoji) => (
                    <button
                      key={emoji.value}
                      onClick={() =>
                        setComments((prev) =>
                          prev.map((cm) =>
                            cm.id === c.id ? { ...cm, emoji: emoji.label } : cm
                          )
                        )
                      }
                      className="text-xl hover:scale-125 transition-transform"
                    >
                      {emoji.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {replyToId && (
          <p className="text-sm text-gray-600">
            Replying...
            <button
              type="button"
              className="text-red-500 underline"
              onClick={() => setReplyToId(null)}
            >
              Cancel
            </button>
          </p>
        )}
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <textarea
          placeholder={
            editingId
              ? "Update your comment..."
              : replyToId
              ? "Write your reply..."
              : "Write your comment..."
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 w-full rounded"
          rows="3"
        />
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            {editingId ? "Update" : replyToId ? "Reply" : "Submit"}
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveEmojiPicker((prev) => (prev === "new" ? null : "new"))
            }
            title="Add Emoji"
          >
            <FaSmile className="text-2xl text-purple-600" />
          </button>
        </div>
        {activeEmojiPicker === "new" && (
          <div className="mt-2 flex gap-2 flex-wrap border p-2 rounded shadow-md">
            {emojiReactions.map((emoji) => (
              <button
                key={emoji.value}
                type="button"
                onClick={() => setText((prev) => prev + " " + emoji.label)}
                className="text-xl hover:scale-125 transition-transform"
              >
                {emoji.label}
              </button>
            ))}
          </div>
        )}
      </form>


      {showEditor && (
        <BlogEditor
          onClose={() => setShowEditor(false)}
          editBlog={blog}
        />
      )}
    </div>
  );
}
