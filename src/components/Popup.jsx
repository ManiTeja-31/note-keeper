import React from 'react';
import {IoMdClose} from 'react-icons/io'
import './Popup.css';

const Popup = ({ trigger, setTrigger, children }) => {
  return trigger ? (
    <div className='popup'>
      <div className='popup-inner'>
        <button className='close-btn' onClick={() => setTrigger(false)}>
          <IoMdClose/>
        </button>
        {children}
      </div>
    </div>
  ) : null;
};

export default Popup;
