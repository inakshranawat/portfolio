import React, { useState } from 'react'
import {AnimatePresence, motion} from 'framer-motion'

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false)
  const email = "nakshranawat1@gmail.com"

  const copyToClipboard = ()=>{
    navigator.clipboard.writeText(email)
    setCopied(true)

    setTimeout(() => {
      setCopied(false) 
      
    },2000);
  }
  return (
    <motion.button onClick={copyToClipboard} className='relative cursor-pointer overflow-hidden px-1 py-4 text-sm text-center rounded-full font-extralight bg-primary w-[12rem]'
    whileHover={{y:-5}}
    whileTap={{scale:1.05}}
  

    >
      <AnimatePresence mode='wait' >
        


      {copied ?
      <motion.p className='flex itmes-center justify-center gap-2 '
      initial={{opacity: 0 , y: -10}}
      key="copied"
      animate={{opacity: 1 , y:0}}
      exit={{opacity: 0 , y: -10}}
      transition={{duration: 1, ease:"easeInOut"}}
      
      
      >
        <img className='w-5 ' src="assets/copy-done.svg" alt="" />
        Email has copied </motion.p>:
      <motion.p className='flex items-center justify-center  gap-2  '
      key="copy"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0 }}
      transition={{duration: 1}}
      
      >
        <img  className='w-5'  src="assets/copy.svg" alt="" />
         copy email address</motion.p>}
        </AnimatePresence>
    </motion.button>
  )
}

export default CopyEmailButton