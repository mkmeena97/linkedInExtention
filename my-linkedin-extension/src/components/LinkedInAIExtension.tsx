import React, { useState, useEffect } from 'react';
import {ModalContent} from './ModalContent'

export const LinkedInAIExtension: React.FC = () => {
  const [showIcon, setShowIcon] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const inputField = document.querySelector('.msg-form__contenteditable');

    const handleFocus = () => setShowIcon(true);
    const handleBlur = () => setShowIcon(false);

    if (inputField) {
      inputField.addEventListener('focus', handleFocus);
      inputField.addEventListener('blur', handleBlur);
    }

    return () => {
      if (inputField) {
        inputField.removeEventListener('focus', handleFocus);
        inputField.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  return (
    <div>
      {showIcon && (
        <img src="public/icons/ai-icon.svg" alt="AI Icon" className="fixed-icon" onClick={() => setShowModal(true)} />
      )}
      {showModal && <ModalContent onClose={() => setShowModal(false)} />}
    </div>
  );
};
