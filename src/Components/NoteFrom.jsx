import React from 'react'
import { useState } from 'react'
import { encryptData } from "../utils/crypto";
import { v4 as uuidv4 } from 'uuid';


const NoteFrom = () => {
  const [Data, setData] = useState({
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    Title: "",
    Content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const note = {
      id: uuidv4(),
      title: Data.Title,
      content: Data.Content,
      createdAt: new Date().toISOString(),
    };
    const encryptedNote = encryptData(note);
    const existing = JSON.parse(localStorage.getItem("encryptedNotes")) || [];
    existing.push(encryptedNote);
    localStorage.setItem("encryptedNotes", JSON.stringify(existing));

    console.log("Encrypted note stored successfully in localStorage.");

    setData({
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      Title: "",
      Content: "",
    });
  };


  return (
    <div className='flex h-screen bg-black'>
      
      <div className='lg:w-1/2 hidden lg:block bg-[url("https://png.pngtree.com/png-clipart/20220628/original/pngtree-torn-notebook-paper-white-coil-png-image_8243304.png")] bg-cover bg-center'></div>
      
    {/* form */}
      <div className='lg:w-1/2 flex flex-col justify-center items-center p-8 bg-[#0F172A] text-white'>
        <h1 className='text-6xl font-bold mb-8 text-[#FDA90D]'>Create Note</h1>           
        <form onSubmit={handleSubmit}  className='flex flex-col gap-4 w-full max-w-md' >
          <textarea 
            name="Title" 
            id="title" 
            cols="30" 
            rows="3" 
            required
            onChange={handleChange}
            value={Data.Title}
            placeholder="Title....." 
            className='bg-gray-200 text-black p-4 rounded-2xl shadow-lime-300 shadow-md placeholder:text-gray-700'
          ></textarea> 
          <textarea 
            name="Content" 
            onChange={handleChange}
            id="content" 
            cols="30" 
            required
            value={Data.Content}
            rows="10" 
            placeholder="Content....."
            className='bg-gray-200 text-black p-4 rounded-2xl shadow-lime-300 shadow-md placeholder:text-gray-700'
          ></textarea>
          <button 
            type="submit" 
            className='bg-lime-500 text-white py-3 px-6 rounded-xl hover:bg-lime-600 transition-colors shadow-md'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default NoteFrom
