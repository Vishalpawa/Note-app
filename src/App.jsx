import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import NoteFrom from './Components/NoteFrom'
import Note from './Pages/Notes'
import { Routes , Route } from "react-router"
const App = () => {
  return (
    <div>
    <Navbar/>
        
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/Create' element={<NoteFrom />}></Route>
            <Route path="/notes/:id" element={<Note />} />
            </Routes>
       
    </div>
  )
}

export default App
