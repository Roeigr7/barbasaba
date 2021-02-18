import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const MessageModal = ({ setMessage }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={backdrop}
        animate='visible'
        initial='hidden'
        className='backdrop'
      >
        <div className='modal-container'>
          <h1>זכשיחקת כבר </h1>{' '}
          <button onClick={() => setMessage(false)}>buttonEXIT</button>
          <div>wowowowowwowo</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
export default MessageModal;
