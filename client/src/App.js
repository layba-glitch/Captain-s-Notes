// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBars, FaTrash } from "react-icons/fa";
import Sidebar from "./components/Sidebar";

function App() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const API_URL = "/notes";

  // Fetch all notes
  const getNotes = async () => {
    try {
      const res = await axios.get(API_URL);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add a new note
  const addNote = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { title, text });
      setTitle("");
      setText("");
      getNotes();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`/notes/${id}`);
      if (selectedNote?._id === id) setSelectedNote(null);
      getNotes();
    } catch (err) {
      console.error(err);
    }
  };

  // Select note from sidebar
  const selectNote = (note) => {
    setSelectedNote(note);
    setSidebarOpen(false);
  };

  // Toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    getNotes();
  }, []);

  // Pastel colors
  const pastelBeige = "#f5f0e6";
  const rosyBeige = "#f4e4e1";
  const teaPink = "#f8e6e0";
  const buttonBeige = "#f2e6d9";
  const buttonHover = "#e6d9c8";

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: teaPink,
        color: "#333",
        minHeight: "100vh",
        display: "flex",
        overflowX: "hidden",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        notes={notes}
        selectNote={selectNote}
        deleteNote={deleteNote}
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      {/* Sidebar toggle button */}
      <button
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          top: "20px",
          left: sidebarOpen ? "250px" : "20px",
          zIndex: 2000,
          padding: "14px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: buttonBeige,
          cursor: "pointer",
          fontSize: "20px",
          transition: "0.3s",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHover)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = buttonBeige)}
      >
        <FaBars />
      </button>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "50px",
          width: "100%",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "25px" }}>
          Captain's Notes 🚀
        </h1>

        <form
          onSubmit={addNote}
          style={{
            width: "100%",
            maxWidth: "450px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            backgroundColor: pastelBeige,
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(82,80,80,0.05)",
            fontSize: "18px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "90%",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "18px",
            }}
            required
          />
          <textarea
            placeholder="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              width: "90%",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "18px",
              resize: "vertical",
            }}
            required
          />
          <button
            type="submit"
            style={{
              padding: "14px 25px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: rosyBeige,
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
              transition: "0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = teaPink)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = rosyBeige)}
          >
            Add Note
          </button>
        </form>

        {selectedNote && (
          <div
            style={{
              marginTop: "35px",
              padding: "22px",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "450px",
              backgroundColor: pastelBeige,
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              fontSize: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedNote(null)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                border: "none",
                background: "transparent",
                fontSize: "20px",
                cursor: "pointer",
                color: "#f79fa3",
              }}
            >
              ✕
            </button>

            <h3 style={{ fontSize: "22px" }}>{selectedNote.title}</h3>
            <p>{selectedNote.text}</p>
            <button
              onClick={() => deleteNote(selectedNote._id)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#f4c2c2",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f79fa3")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#f4c2c2")}
            >
              <FaTrash /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
