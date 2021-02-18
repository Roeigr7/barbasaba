import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const PrizeModal = ({ prize, setPrize }) => {
  console.log(prize);
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={backdrop}
        animate='visible'
        initial='hidden'
        className='backdrop'
      >
        <div className='modal-container'>
          <button onClick={() => setPrize(false)}>button</button>
          <h1>זכית ב{prize.name}</h1>
          <div>wowowowowwowo</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
export default PrizeModal;
