import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Modal.scss';

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
};

const contentVariants = {
  hidden:  { opacity: 0, scale: 0.88, y: 20 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { type: 'spring', damping: 22, stiffness: 280 } },
  exit:    { opacity: 0, scale: 0.92, y: 10, transition: { duration: 0.18 } },
};

function Modal({ isOpen, onClose, children }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
