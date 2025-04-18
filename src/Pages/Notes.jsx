import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getDecryptedNotes } from '../utils/crypto';

const Notes = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const decryptedNotes = getDecryptedNotes();
    const selectedNote = decryptedNotes.find((n) => n.id === id);
    setNote(selectedNote);
    
    const storedComments = JSON.parse(localStorage.getItem(`comments-${id}`)) || [];
    setComments(storedComments);
  }, [id]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const updatedComments = [...comments, { text: newComment, date: new Date().toLocaleString() }];
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto p-8 mt-10">
      {note ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#c2b097] rounded-lg shadow-lg p-6"
        >
          <h1 className="text-4xl font-bold text-[#46372d] mb-4">{note.title}</h1>
          <p className="text-[#826f61] text-lg whitespace-pre-wrap mb-4">{note.content}</p>
          <p className="text-sm text-gray-600">Created on {formatDate(note.createdAt)}</p>

          {/* Comments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-[#46372d] mb-4">Comments</h2>

            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-[#e6ddd2] p-4 rounded-lg"
                  >
                    <p className="text-[#826f61]">{comment.text}</p>
                    <p className="text-xs text-gray-500 mt-2">{comment.date}</p>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
              )}
            </div>

            {/* Add Comment Form */}
            <div className="mt-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full border p-3 rounded-lg bg-[#e6ddd2] text-[#826f61] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#46372d]"
                rows="3"
              />
              <button
                onClick={handleAddComment}
                className="mt-2 w-full bg-[#46372d] text-white px-4 py-2 rounded-lg hover:bg-[#2a1f1a] transition-all duration-300"
              >
                Add Comment
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <p className="text-center text-gray-500">Note not found.</p>
      )}
    </div>
  );
};

export default Notes;
