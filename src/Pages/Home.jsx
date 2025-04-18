import React, { useState, useEffect } from 'react'
import NoteCard from '../Components/NoteCard'
import { getDecryptedNotes, encryptData } from '../utils/crypto'
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    
    const decryptedNotes = getDecryptedNotes();
    setNotes(decryptedNotes);
  }, []);

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    const encryptedNotes = updatedNotes.map(note => encryptData(note));
    localStorage.setItem("encryptedNotes", JSON.stringify(encryptedNotes));
    setNotes(updatedNotes); 
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-center my-8 text-[#FDA90D]">My Notes</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full max-w-md px-3 py-2 rounded-full text-black placeholder:text-gray-700 bg-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-300 shadow-md focus:ring-opacity-50"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg shadow-lg">
      {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} />
        ))}
      </div>
    </div>
  )
}

export default Home
