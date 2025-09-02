import React, { useState } from 'react'
import emailjs from "@emailjs/browser"


const Contact = () => {
    
    const [formData, setFormData] = useState({name: "" , email: "" , message: ""})
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e)=>{
        setFormData({...formData , [e.target.name]: e.target.value , })


    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log(formData)
        setIsLoading(true)

        try {
            console.log("From submitted:",formData)
            await  emailjs.send("service_qicqsn6", "template_qvwypme ",{
                from_name:formData.name,
                to_name: "Naksh",
                from_email:formData.email,
                to_email: "nakshranawat1@gmail.com",
                message:formData.message
            },"0QZOlaxJ29tiSHcIP")
            setIsLoading(false)
            alert("success")

            
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            alert("failed")
            
        }
     
       

    }
  return (
     <section className='relative items-center c-space section-spacing '>
        <div className='flex flex-col items-center justify-center border mx-auto p-5 max-w-md border-white/10 rounded-2xl bg-primary '>
           <div className='flex flex-col w-full gap-5 mt-10 items-start '>
             <h2 className='text-heading'>Let's Talk</h2>
             <p className='font-noraml text-neutral-400 '>whether you are looking to build a new website or improve the existing platform , or bring a unique project to a life ,I m here to help</p>
           </div>
           <form onSubmit={handleSubmit} className='w-full' >
               <div className='mb-5'>
                <label className='field-label' htmlFor="name">Full Name</label>
                <input onChange={handleChange} value={formData.name} className='field-input field-input-focus' id='name' name='name' type="text" placeholder='John doe' autoComplete='name'/>
               </div>
               <div className='mb-5'>
                <label className='field-label' htmlFor="email">Email</label>
                <input onChange={handleChange} value={formData.email} className='field-input field-input-focus' id='email' name='email' type="email" placeholder='johndoe@gmail.com' autoComplete='email'/>
               </div>
               <div className='mb-5'>
                <label className='field-label' htmlFor="message">Message</label>
                <textarea onChange={handleChange} value={formData.message} rows="4"  className='field-input field-input-focus' id='message' name='message' type="text" placeholder='Share your thoughts ' autoComplete='message' />
               </div>
               <button type='submit' className='w-full px-1 py-3 items-center text-lg hover-animation  cursor-pointer rounded-mg bg-radial from-lavender to-royal'>
                 {!isLoading ?"Send": "sending..." }
               </button>
             
           </form>
        </div>

     </section>
  )
}

export default Contact