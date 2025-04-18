import React from 'react';
import { Trash2, FilePenLine } from 'lucide-react';
import { Link } from 'react-router-dom';

const NoteCard = ({ note, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
//only show 5 lines of content
  const truncateContent = (content) => {
    const lines = content.split('\n');
    if (lines.length > 5) {
      return lines.slice(0, 5).join('\n') + '...';
    }
    return content;
  };

  return (
    <div className="bg-[#c2b097] p-6 rounded-lg shadow-md hover:shadow-black transition-shadow m-4 overflow-hidden">
      <Link to={`/notes/${note.id}`}>
        <h2 className="text-3xl font-bold mb-2 text-[#46372d] hover:text-[#2a1f1a] cursor-pointer">
          {note.title}
        </h2>
      </Link>
      <p className="text-[#206a57] font-semibold mb-4">{truncateContent(note.content)}</p>
      <div className="text-sm flex text-gray-500 font-black items-center gap-2">
        Created on {formatDate(note.createdAt)}
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={() => onDelete(note.id)}>
          <Trash2 className="text-2xl text-[#bd3ac7] hover:text-red-600 transition-colors" />
        </button>
        <button className="ml-4">
          <FilePenLine className="text-2xl text-[#bd3ac7] hover:text-blue-600 transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
