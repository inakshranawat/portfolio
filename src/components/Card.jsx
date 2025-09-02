import { motion } from 'framer-motion'
import React from 'react'


const Card = ({style,text,image , containerRef}) => {
  return image && !text ? (
    <motion.img style={style} className='w-15 absolute cursor-grab'  src={image} alt=""
    whileHover={{scale:1.05}}
    drag
    dragConstraints={containerRef}
    dragElastic={1}
     />
):(
    <motion.div className='absolute px-1 py-4 font-extralight bg-storm w-[12rem] cursor-grab text-xl text-center rounded-full ring ring-gray-700 ' whileHover={{scale:1.05}} drag dragElastic={1} dragConstraints={containerRef}
    style={style} >{text}

    </motion.div>
  )
}

export default Card