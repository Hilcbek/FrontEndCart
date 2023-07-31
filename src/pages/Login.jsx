import React, { useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { FaRegEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { Axios } from '../util/utils'
import { ClipLoader } from 'react-spinners'
import { BiSolidError } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { LOGIN } from '../Redux/User.Reducer'

export const Login = () => {
    let [show,setShow] = useState(false)
    let [useEmail,setUseEmail] = useState('')
    let [password,setPassword] = useState('')
    let [error,setError] = useState('')
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    let navigate = useNavigate()
    let dispatcher = useDispatch();
    let handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let res = await Axios.post('/auth/login',{
                useEmail : useEmail,
                password : password
            })
            dispatcher(LOGIN({ username : res.data.data[0].username, profile : res.data.data[0].profile, isAdmin : res.data.data[0].isAdmin }))
            ResetterInput()
            res.data && setLoading(false)
            window.location.replace('/')
        } catch (error) {
            setError(error.response.data.error)
            ErrorResetter()
        }
    }
    let ErrorResetter = () => {
        setTimeout(() => {
            setError('')
            setLoading(false)
        },3000)
    }
    let ResetterInput = () => {
        setUseEmail('')
        setPassword('')
    }
  return (
    <div className='w-full h-screen bg-[#858500] pt-32'>
        <div className='bg-white/20 w-[300px] rounded-lg p-3 shadow-lg shadow-zinc-400 mx-auto'>
            {error && <h1 className='my-2 text-red-800 underline text-xs flex items-center justify-start'><BiSolidError className='mr-2' />{error}</h1>}
            <h1 className='text-4xl mb-4'>Sign In</h1>
            <form action="" onSubmit={handleLogin}>
                <div className='my-1 flex items-start w-full justify-start flex-col'>
                    <label htmlFor="email" className='mb-2 ml-2 tracking-wider'>Email Address or username</label>
                    <input value={useEmail} onChange={(e) => setUseEmail(e.target.value)} className='p-2 bg-[#78784b] w-full border-solid border-black text-black border-b-[2px] outline-none' type="text" name="email" id="email" placeholder='example@gamil.com' />
                </div>
                <div className='my-1 relative flex items-start w-full justify-start flex-col'>
                    <label htmlFor="passsword" className='mb-2 ml-2 tracking-wider'>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 bg-[#78784b] w-full border-solid border-black text-black border-b-[2px] outline-none' type={show ? 'text' : 'password'} name="password" id="password" placeholder='Ssda@)asd/' />
                    <li onClick={() => setShow(!show)} className='absolute list-none top-8 right-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 p-1 cursor-pointer'>{show ? <FaRegEyeSlash /> : <AiOutlineEye />}</li>
                </div>
                <button disabled={loading} className='p-3 mx-auto block bg-[#858500] hover:tracking-wider transition-cubic text-white my-2 rounded-3xl w-9/12'>{loading ? <ClipLoader color={color} loading={loading} size={21} aria-label="Loading Spinner" data-testid="loader" />  : 'Sign In'}</button>
                <h1 className='text-center text-sm my-2'>Don't have an Account ? <Link className='ml-2 hover:text-white italic' to={'/register'}>Register</Link></h1>
            </form>
        </div>
    </div>
  )
}
