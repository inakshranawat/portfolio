import React from 'react'
import { mySocials } from '../constants'

const Footer = () => {
  return (
    <section className='flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400  c-space '>
      <div className='bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-4 h-[1px] w-full '/>
      <div className='flex gap-2'>
        <p>Terms & Conditions </p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>
      <div className='flex gap-3'>
        {mySocials.map((social,index)=>(
            <a href={social.href} key={index} >
                <img className='h-5 w-5' src={social.icon} alt={social.name} />
            </a>
        ))}

      </div>
      <p>&copy; 2025 Naksh. All rights reserved.</p>

    </section>
  )
}

export default Footer