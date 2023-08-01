import React, { useState, useEffect, useRef } from 'react';
import './Editing.css'; 

const Editing = ({ note, onSave }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const titleInputRef = useRef(null);

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSave({ ...note, title, content });
    }
  };

  return (
    <div className='editing'>
      <div className='editing-header'>
        <label htmlFor='title-input'>Title:</label>
        <input
          ref={titleInputRef}
          type='text'
          id='title-input'
          value={title}
          onChange={handleTitleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className='editing-content'>
        <label htmlFor='content-input'>Content:</label>
        <textarea
          id='content-input'
          value={content}
          onChange={handleContentChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default Editing;
