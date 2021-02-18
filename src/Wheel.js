import React, { useState, useContext } from 'react';
import './App.css';
import { AuthContext } from './authContext';
import PrizeModal from './modals/PrizeModal';
import MessageModal from './modals/MessageModal';
import { motion } from 'framer-motion';
import { prizes } from './prizesList';
import { Link } from 'react-router-dom';
import { handlePlayedField } from './firestoreService';
const getDegrees = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let num = Math.floor(Math.random() * (max - min) + min);
  return num;
};

const Wheel = () => {
  const { currentUser } = useContext(AuthContext);
  const [spin, setSpin] = useState(false);
  const [degrees, setDegrees] = useState(0);
  const [prize, setPrize] = useState(null);
  const [message, setMessage] = useState(false);
  const handleSpin = async () => {
    if (await handlePlayedField(currentUser)) {
      console.log(
        'cscscscscscs!!!!!!!!!!!!!!!!!!!!!!!!!אם שיחק',
        handlePlayedField(currentUser)
      );
      setMessage(true);
    } else {
      console.log('calback', handlePlayedField(currentUser));
      console.log('cocococococococcocococoococococococo');
      setSpin(true);
      const spinDeg = getDegrees(1800, 2160);
      setDegrees(spinDeg);
      const prizeIndex = prizes.findIndex(
        prizeItem => prizeItem.maxDeg > spinDeg
      );
      setPrize(prizes[prizeIndex]);
    }
  };

  console.log('cdcd', degrees, spin, prize, 'mesage', message);
  return (
    <div>
      <div className='arrow' />
      <motion.ul
        initial={{ rotate: '0deg' }}
        animate={
          spin
            ? {
                rotate: `-${degrees}deg`,
                transition: { duration: 3 },
              }
            : null
        }
        className='circle'
      >
        {prizes.map((item, i) => {
          return (
            <li key={i}>
              <div className='text-container'>
                <p className='text'>{item.name}</p>
              </div>
            </li>
          );
        })}
      </motion.ul>
      <button onClick={handleSpin} className='spin-button'>
        spin
      </button>
      {message && <MessageModal setMessage={setMessage} />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          spin
            ? {
                opacity: 1,
                transition: { delay: 3, duration: 0.4 },
              }
            : null
        }
      >
        {prize && !message && <PrizeModal prize={prize} setPrize={setPrize} />}
      </motion.div>
      <Link to='/register'>goto register</Link>
    </div>
  );
};
export default Wheel;
