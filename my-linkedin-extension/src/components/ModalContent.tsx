import React, { useState } from 'react';

interface ModalProps {
  onClose: () => void;
}

export const ModalContent: React.FC<ModalProps> = ({ onClose }) => {
  const [response, setResponse] = useState('');

  const handleGenerate = () => {
    setResponse("Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.");
  };

  const handleInsert = () => {
    const messageField = document.querySelector('.msg-form__contenteditable');
    if (messageField) {
      messageField.innerHTML = response;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Enter your command"
          className="input-field"
        />
        <button className="generate-btn" onClick={handleGenerate}>Generate</button>
        <button className="regenerate-btn" disabled>Regenerate</button>
        <button className="insert-btn" onClick={handleInsert}>Insert</button>
      </div>
    </div>
  );
};
