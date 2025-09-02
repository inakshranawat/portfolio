import React, { useState } from 'react'
import ProjectDetails from './ProjectDetails'

const Project = ({title, description ,setPreview, subDescription , href , image , tags} ) => {
  const [isHidden, setIsHidden] = useState(false)

  return (
  
    <>
    <div onMouseEnter={()=>setPreview(image)} onMouseLeave={()=>setPreview(null)} className='flex-wrap items-center sm:flex justify-between  py-10 space-y-14  sm:space-y-0 '>
      <div>

       <p className='text-2xl'>{title}</p>
       <div className='flex gap-5 mt-5 text-sand '>
        {tags.map((tag)=>(<span key={tag.id}>{tag.name}</span>))}
      </div>
       </div>
       <button onClick={()=> setIsHidden(true)} className='flex mt-5 items-center cursor-pointer hover-animation gap-1 '>
        Read More 
         <img src="assets/arrow-right.svg" alt="" className='w-5' />
       </button>
    </div>
    <div className='bg-gradient-to-r from-tranparent via-neutral-700 to-transparent h-[1px] w-full '/>
    {isHidden && 
    <ProjectDetails title={title} closeModal={()=>setIsHidden(false)} image={image} tags={tags} href={href}  description={description} subDescription={subDescription} />}
    </>
  )
}

export default Project