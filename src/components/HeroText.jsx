import React from 'react'
import { FlipWords } from './FlipWords'
import {motion} from 'framer-motion'

const HeroText = () => {
    const variants = {
        hidden:{opacity: 0, x: -50},
        visible:{opacity: 1, x: 0}
    }
  return (
    <div className='z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text '>
        <div className='flex-col hidden md:flex c-space '>
            <motion.h1 className='text-4xl font-medium '
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{delay: 1}}
            >Hi I'm Naksh Ranawat </motion.h1>
            <div className='flex flex-col items-start '>
                <motion.p className='text-5xl font-medium text-neutral-300'
                variants={variants}
                 initial="hidden"
                 animate="visible"
                 transition={{delay: 1.2}}
                
                >A Developer<br/> Dedicated to Crafting </motion.p>
                <motion.div 
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{delay: 1.5}}
                >
                    
                    <FlipWords   words={["secure", "Modern", "Scalable"]} className='font-black text-white text-8xl ' />
                </motion.div> 
                <motion.p className='text-4xl font-medium text-neutral-300 '
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{delay: 1.8}}
                >
                    web Solutions
                </motion.p>

            </div>
        </div>
        <div className='flex flex-col space-y-6 md:hidden '>
            <motion.p className='text-4xl font-medium'
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{delay: 1}}
            >Hi I'm Naksh Ranawat </motion.p>
            <div>
                <motion.p className='text-5xl text-neutral-300  font-medium'
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{delay: 1.2}}
                >Building</motion.p>
                <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{delay: 1.5}}
                ><FlipWords className="text-7xl font-bold text-white" words={["Secure","Modern","Scalable"]} /></motion.div>
                <motion.p className='text-4xl text-neutral-300 font-black '
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{delay: 1.8}}
                >Web applications </motion.p>
            </div>
            

        </div>

    </div>
  )
}

export default HeroText