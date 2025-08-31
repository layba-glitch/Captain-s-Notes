// Sidebar.js
import React from "react";

export default function Sidebar({ notes, selectNote, deleteNote, isOpen }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: isOpen ? 0 : "-260px",
        width: "250px",
        height: "100%",
        backgroundColor: "#f5f0e6",
        borderRight: "1px solid #ddd",
        padding: "20px",
        transition: "transform 0.4s ease-in-out",
        overflowY: "auto",
        zIndex: 1000,
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>All Notes</h2>
      {notes.map((note) => (
        <div
          key={note._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "8px",
            backgroundColor: "#f4e4e1",
            cursor: "pointer",
            transition: "0.2s",
          }}
          onClick={() => selectNote(note)}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8e6e0")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f4e4e1")}
        >
          <span>{note.title}</span>
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent selecting note
              deleteNote(note._id);
            }}
            style={{
              border: "none",
              background: "transparent",
              color: "#d9534f",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ✖️
          </button>
        </div>
      ))}
    </div>
  );
}
