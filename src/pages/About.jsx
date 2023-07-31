import React from 'react'
import { Link } from 'react-router-dom'

export const About = () => {
  return (
    <div className='w-10/12 py-10 mx-auto font-Poppins font-light'>
        <h1 className='text-4xl mb-4'>About the developer!</h1>
        <p>
            Hi, there i am Vamnis ya, i know it is not my ID name but for some reasons i use this name <br />
            so if you have any work that you want me to engage please contact me at <Link to={'mailto:https://mail.google.com/mail/u/0/#inbox'} className='italic text-red-600'>balemayehu07@gmail.com</Link>
            <p className='my-3 font-bold'>In the next version i will release revised one</p>
        </p>
    </div>
  )
}
