import React, { useState } from 'react'
import { Tooltip } from 'react-tooltip'
import {IoAddSharp} from 'react-icons/io5'

const FormBody = ({ onAdd }) => {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((preValue) => {
      return {
        ...preValue, [name]: value
      }
    })
  }

  const handleExpanded = () => {
    setExpanded(true);
  }

  const submitButton = (event) => {
    onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <form>
      {
        isExpanded &&
        <input
          type='text'
          placeholder='Title'
          name='title'
          value={note.title}
          onChange={handleChange}
        />
      }

      <p>
        <textarea
          name='content'
          placeholder='Take a note...'
          value={note.content}
          onChange={handleChange}
          onClick={handleExpanded}
          rows={isExpanded?3:1}
        >
        </textarea>
      </p>
      {
        isExpanded && <button data-tooltip-id='Add-Button'  onClick={submitButton} ><IoAddSharp /></button>
      }
      
      <Tooltip
        id="Add-Button"
        place="bottom"
        content="add"
        opacity={0.5}
      />
    </form>
  )
}

export default FormBody
