import React, { useEffect, useState } from "react";
import "./NotesPage.css";
import { useDisclosure } from "@heroui/react";
import NoteModel from "./NoteModel";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function NotesPage() {
  const [userId, setUserId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.username || {};
  const [notes, setNotes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setUserId(user);
  }, []);

  useEffect(() => {
    if (userId != null) {
      fetchNotes();
    }
  }, [userId]);

  const fetchNotes = () => {
    axios
      .get(`http://localhost:8080/${userId}/shownotes`)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  };

  const handleSaveNote = (note) => {
    if (isEditMode && selectedNoteIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[selectedNoteIndex] = note;
      setNotes(updatedNotes);
      setSelectedNote(note);

      // Update note on backend
      axios
        .put(`http://localhost:8080/${userId}/notes/${selectedNoteIndex}`, {
          username: userId,
          title: note.title,
          content: note.content,
        })
        .then((response) => {
          console.log("Note updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating note:", error);
        });
      
      setIsEditMode(false);
    } else {
      // Add new note
      setNotes([...notes, note]);
      console.log(note);

      axios
        .post(`http://localhost:8080/${userId}/notes`, {
          username: userId,
          title: note.title,
          content: note.content,
        })
        .then((response) => {
          console.log("Note saved successfully:", response.data);
          fetchNotes(); // Refresh notes to get updated data
        })
        .catch((error) => {
          console.error("Error saving note:", error);
        });
    }
  };

  const clickNote = (e) => {
    const noteId = e.currentTarget.id;
    const noteIndex = parseInt(noteId.split("-")[1], 10);
    setSelectedNote(notes[noteIndex]);
    setSelectedNoteIndex(noteIndex);
  };

  const handleEditNote = () => {
    if (selectedNote && selectedNoteIndex !== null) {
      setIsEditMode(true);
      onOpen();
    }
  };

  const handleDeleteNote = () => {
    if (selectedNote && selectedNoteIndex !== null) {
      if (window.confirm("Are you sure you want to delete this note?")) {
        const updatedNotes = notes.filter((_, index) => index !== selectedNoteIndex);
        setNotes(updatedNotes);
        setSelectedNote(null);
        setSelectedNoteIndex(null);

        // Delete note from backend
        axios
          .delete(`http://localhost:8080/${userId}/notes/${selectedNoteIndex}`)
          .then((response) => {
            console.log("Note deleted successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error deleting note:", error);
          });
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear any stored user data
      setUserId(null);
      setNotes([]);
      setSelectedNote(null);
      // Navigate to login page
      navigate("/");
    }
  };

  const handleAddNewNote = () => {
    setIsEditMode(false);
    setSelectedNote(null);
    setSelectedNoteIndex(null);
    onOpen();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`w-full h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-slate-100 text-black'
    }`}>
      {/* Header with User Profile */}
      <div className={`w-full shadow-md border-b-2 px-6 py-4 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {userId ? userId.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
            <div>
              <h2 className={`text-xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Welcome, {userId || "User"}
              </h2>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Notes Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                // Sun icon for light mode
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                // Moon icon for dark mode
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            <button
              onClick={handleAddNewNote}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
            >
              + New Note
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-row p-4 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Sidebar */}
        <div className={`w-1/3 flex flex-col shadow-lg border-2 rounded-2xl p-4 mr-4 transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-600' 
            : 'bg-gray-50 border-gray-300'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h1 className={`text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              My Notes
            </h1>
            <span className={`text-sm px-2 py-1 rounded-full transition-colors duration-300 ${
              isDarkMode 
                ? 'text-gray-300 bg-gray-700' 
                : 'text-gray-600 bg-gray-200'
            }`}>
              {notes.length} notes
            </span>
          </div>

          {/* Scrollable Notes List */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {notes.length === 0 ? (
              <div className={`text-center mt-8 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <p className="text-lg">No notes yet</p>
                <p className="text-sm">Click "New Note" to get started</p>
              </div>
            ) : (
              notes.map((note, index) => (
                <div
                  key={index}
                  id={`note-${index}`}
                  className={`p-4 rounded-xl shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedNoteIndex === index 
                      ? isDarkMode 
                        ? "border-blue-400 bg-blue-900/30" 
                        : "border-blue-500 bg-blue-50"
                      : isDarkMode
                        ? "bg-gray-700 border-gray-600 hover:border-gray-500"
                        : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={clickNote}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg truncate transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {note.title}
                      </h3>
                      <p className={`text-sm mt-1 line-clamp-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {note.content.substring(0, 80)}...
                      </p>
                    </div>
                    <span className={`text-xs ml-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      #{index + 1}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Notes Display */}
        <div className={`flex-1 flex flex-col border-2 rounded-2xl transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-600' 
            : 'bg-gray-50 border-gray-300'
        }`}>
          {selectedNote ? (
            <>
              {/* Note Header */}
              <div className={`flex justify-between items-center p-6 border-b transition-colors duration-300 ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`}>
                <h1 className={`text-3xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {selectedNote.title}
                </h1>
                <div className="flex space-x-3">
                  <button
                    onClick={handleEditNote}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteNote}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Note Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className={`p-6 rounded-xl shadow-sm border h-full transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-white border-gray-200'
                }`}>
                  <p className={`text-lg whitespace-pre-wrap leading-relaxed transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-700'
                  }`}>
                    {selectedNote.content}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className={`text-center transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <svg 
                    className={`w-12 h-12 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-2">Select a note to view</h2>
                <p className="text-lg">Choose a note from the sidebar to read its content</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <NoteModel 
        isOpen={isOpen} 
        onClose={() => {
          onClose();
          setIsEditMode(false);
        }} 
        onSave={handleSaveNote}
        initialNote={isEditMode ? selectedNote : null}
        isEditMode={isEditMode}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}