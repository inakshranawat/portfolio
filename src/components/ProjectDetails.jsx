
import {motion} from 'framer-motion'

const ProjectDetails = ({title, description , subDescription , href , image ,closeModal, tags}) => {
  return (
    <div className='fixed flex items-ceter justify-center z-50 inset-0 w-full h-full overflow-hidden backdrop-blur-sm '>
        <motion.div className='relative border rounded-2xl shadow-sm bg-gradient-to-l from-midnight to-navy max-w-2xl border-white/10 'a
        initial={{opacity: 0 , scale:0.5}}
        aniamte={{opacity: 1 , scale:1}}
        >
           <button onClick={closeModal} className='absolute p-2 rounded-sm top-5 right-5 bg-midnight hover:bg-gray-500 '>
              <img className='w-6 h-6 ' src="assets/close.svg" alt="" />
           </button>
           <img src={image} alt={title} className='w-full rounded-t-2xl ' />
           <div className='p-5 '>
            <h5 className='mb-2 text-2xl font-bold text-white '>{title}</h5>
            <p className='mb-3 font-normal text-neutral-400 '>{description}</p>
            {subDescription.map((subDesc,index)=>(<p className='mb-3 font-normal text-neutral-400'>{subDesc}</p>))}
            <div className='flex items-center justify-between mt-4 '>
                <div className='flex gap-3 '>

                {tags.map((tag)=>(
                    <img className='rounded-lg size-10 hover-animation' key={tag.id} src={tag.path} alt="" />
                ))}
                </div>
                <a className='inline-flex items-center gap-1 font-medium hover-animation cursor-pointer ' >view project <img className='size-4' href={href} src="assets/arrow-up.svg" alt="" /></a>
            </div>
           </div>
        </motion.div>
    </div>
  )
}

export default ProjectDetails