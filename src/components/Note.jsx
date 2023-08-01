import React from 'react';
import { Tooltip } from 'react-tooltip';
import { MdDelete, MdEdit } from 'react-icons/md';
import { BsPin, BsFillPinFill } from 'react-icons/bs';

const Note = ({ title, content, pinned, onPin, onDelete, onEdit, id, popupTrig }) => {
  const handleDelete = () => {
    onDelete(id);
    popupTrig(false);
  };

  const handleEdit = () => {
    onEdit({ _id: id, title, content, pinned });
    popupTrig(true);
  };

  const handlePin = () => {
    onPin(id);
  };

  return (
    <div className={`note grow ${pinned ? 'pinned' : ''}`}>
      <h1>
        {pinned ? (
          <BsFillPinFill data-tooltip-id={`star-tooltip-${id}`} size={15} onClick={handlePin} />
        ) : (
          <BsPin data-tooltip-id={`star-tooltip-${id}`} size={15} onClick={handlePin} />
        )}
        {title}
      </h1>
      <p>{content}</p>
      <button data-tooltip-id={`delete-tooltip-${id}`} onClick={handleDelete}>
        <MdDelete size={25} />
      </button>
      <button data-tooltip-id={`edit-tooltip-${id}`} onClick={handleEdit}>
        <MdEdit size={25} />
      </button>
      <Tooltip id={`delete-tooltip-${id}`} place='bottom' content='Delete' opacity={1} />
      <Tooltip id={`edit-tooltip-${id}`} place='bottom' content='Edit' opacity={1} />
      <Tooltip id={`star-tooltip-${id}`} place='bottom' content='Pin' opacity={1} />
    </div>
  );
};

export default Note;
