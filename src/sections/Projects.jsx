import { useMotionValue  , motion, useSpring} from 'framer-motion'
import Project from '../components/Project'
import { myProjects } from '../constants'
import { useState } from 'react'

const Projects = () => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x,{damping:10 , stiffness: 50})
  const springY= useSpring(y,{damping:10 , stiffness: 50})
  const handleMouseMove = (e)=>{
    x.set(e.clientX + 20)
    y.set(e.clientY + 20)
  }
  const [preview, setPreview] = useState(null)
  return (
    <section onMouseMove={handleMouseMove} className='relative section-spacing c-space  '>
        <h2 className='text-heading  '>My Selected Projects</h2>
        <div className='bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 w-full h-[1px]'/>
        {myProjects.map((project)=>(
            <Project key={project.id} {...project} setPreview={setPreview} />
        ))}
        {preview && 
        <motion.img style={{x:springX, y:springY}} className='fixed top-0 left-0 z-50 rounded-lg object-cover pointer-events-none h-56 w-80 shadow-lg ' src={preview} alt="" />}
    </section>
  )
}

export default Projects