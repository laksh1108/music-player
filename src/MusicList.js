import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";



const WelcomeMessage = () => {
  const text = "Search Above . . .".split(" ");
  return (
    <div className="big-white-text  center-column ">
       <h1 className='text'>Welcome To The Music World</h1>
       {text.map((el, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 5,
            delay: i / 10,
          }}
          key={i}
        >
          {el}{" "}
        </motion.span>
      ))}
    </div>
  );
};

export default WelcomeMessage;
