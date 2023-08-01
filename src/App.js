import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import Header from './components/Header';
import FormBody from './components/FormBody';
import Note from './components/Note';
import Popup from './components/Popup';
import Editing from './components/Editing';

const apiURL='https://note-keeper-api-1z0e.onrender.com/api/notes';
const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const App = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedNotes, setSortedNotes] = useState([]);

  const notesPerPage = 6;

  const addNote = async (newNote) => {
    try {
      const response = await axios.post(apiURL, {
        ...newNote,
        id: generateUniqueId(),
        pinned: false,
      });
      setNotes((prevValue) => [...prevValue, response.data]);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const updateNote = async (updatedNote) => {
    try {
      const response = await axios.put(`${apiURL}/${updatedNote._id}`, updatedNote);
      setNotes((prevValue) =>
        prevValue.map((note) => (note._id === updatedNote._id ? response.data : note))
      );
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${apiURL}/${id}`);
      setNotes((prevValue) => prevValue.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setButtonPopup(true);
  };

  const handleSaveEdit = async (editedNote) => {
    try {
      await updateNote(editedNote);
      setButtonPopup(false);
      setEditingNote(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };


  const handlePinNote = async (id) => {
    const noteToPin = notes.find((note) => note._id === id);
    if (!noteToPin) return;

    const updatedNote = { ...noteToPin, pinned: !noteToPin.pinned };
    updateNote(updatedNote);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(apiURL);
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    const sortedNotes = [...notes].sort((a, b) => (a.pinned ? -1 : 1));
    const totalPages = Math.ceil(sortedNotes.length / notesPerPage);
    setCurrentPage((prevPage) => Math.min(prevPage, totalPages || 1)); 
    setSortedNotes(sortedNotes);
  }, [notes, notesPerPage]);
  

  const getPinnedNotes = (page) => {
    const startIdx = (page - 1) * notesPerPage;
    const endIdx = startIdx + notesPerPage;
    return sortedNotes.slice(startIdx, endIdx).filter((note) => note.pinned);
  };

  const getUnpinnedNotes = (page) => {
    const startIdx = (page - 1) * notesPerPage;
    const endIdx = startIdx + notesPerPage;
    return sortedNotes.slice(startIdx, endIdx).filter((note) => !note.pinned);
  };

  const getTotalPages = () => {
    return Math.ceil(sortedNotes.length / notesPerPage);
  };

  return (
    <div>
      <Header />
      <FormBody onAdd={addNote} />
      <div className='pagination'>
        {Array.from({ length: getTotalPages() }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className='notes-container'>
        {currentPage === 1 &&
          getPinnedNotes(currentPage).map((note) => (
            <Note
              key={note._id}
              title={note.title}
              content={note.content}
              pinned={note.pinned}
              onPin={() => handlePinNote(note._id)}
              onDelete={() => deleteNote(note._id)}
              onEdit={handleEditNote}
              id={note._id}
              popupTrig={setButtonPopup}
            />
          ))}
        {currentPage !== 1 &&
          getPinnedNotes(currentPage).map((note) => (
            <Note
              key={note._id}
              title={note.title}
              content={note.content}
              pinned={note.pinned}
              onPin={() => handlePinNote(note._id)}
              onDelete={() => deleteNote(note._id)}
              onEdit={() => handleEditNote(note)}
              id={note._id}
              popupTrig={setButtonPopup}
            />
          ))}

        {getUnpinnedNotes(currentPage).map((note) => (
          <Note
            key={note._id}
            title={note.title}
            content={note.content}
            pinned={note.pinned}
            onPin={() => handlePinNote(note._id)}
            onDelete={() => deleteNote(note._id)}
            onEdit={() => handleEditNote(note)}
            id={note._id}
            popupTrig={setButtonPopup}
          />
        ))}
      </div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        {editingNote && (
          <Editing
            note={editingNote}
            onSave={handleSaveEdit}
            onCancel={() => setEditingNote(null)}
          />
        )}
      </Popup>
    </div>
  );
};

export default App;


