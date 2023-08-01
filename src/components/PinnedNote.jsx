import React from 'react';
import Note from './Note';

const PinnedNote = ({ notes, onPin, onDelete, onEdit, popupTrig }) => {
  const pinnedNotes = notes.filter((note) => note.pinned);
  const otherNotes = notes.filter((note) => !note.pinned);

  return (
    <div>
      {pinnedNotes.map((note) => (
        <Note
          key={note.id}
          title={note.title}
          content={note.content}
          onDelete={() => onDelete(note.id)}
          onEdit={() => onEdit(note)}
          popupTrig={popupTrig}
          pinned={note.pinned}
          onPin={() => onPin(note.id)}
        />
      ))}
      {otherNotes.map((note) => (
        <Note
          key={note.id}
          title={note.title}
          content={note.content}
          onDelete={() => onDelete(note.id)}
          onEdit={() => onEdit(note)}
          popupTrig={popupTrig}
          pinned={note.pinned}
          onPin={() => onPin(note.id)}
        />
      ))}
    </div>
  );
};

export default PinnedNote;
