import React from 'react';
import '../styles/auth.css';

const PopupNotification = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className={`popup-notification ${type}`}>
      <div className="popup-content">
        <span>{message}</span>
        <button onClick={onClose} className="popup-close">×</button>
      </div>
    </div>
  );
};

export default PopupNotification;
