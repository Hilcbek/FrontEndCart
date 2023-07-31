import React, { useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import {FaRegEyeSlash} from 'react-icons/fa'
import { Axios, UploadProfile } from '../util/utils'
import { ClipLoader } from 'react-spinners'
import {BiSolidError} from 'react-icons/bi'
export const Register = () => {
    let [show,setShow] = useState(false)
    let [username,setUsername] = useState('')
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')
    let [error,setError] = useState('')
    let [profile,setProfile] = useState('')
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    let navigate = useNavigate()
    let handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
                if(profile){
                    let response = await Axios.post('/auth/register',{
                            username : username,
                            email : email,
                            password : password,
                        })
                    if(response.data.data){
                        let res = await UploadProfile(profile);
                            if(res){
                                    let Updated = await Axios.put(`/auth/register/${response.data.data._id}`,{
                                        profile : res
                                    })
                                    Updated.data && setLoading(false)
                                    ResetterInput()
                                    navigate('/login')
                            }else{
                                setError('Error while upload your profile!')
                                ErrorResetter()
                            }
                    }
                }else{
                    setError('please select your profile!')
                    ErrorResetter()
                }
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
    let ResetterInput =  () => {
        setUsername('')
        setEmail('')
        setPassword('')
        setProfile('')
    }
  return (
    <div className='w-full h-screen bg-[#858500] pt-32'>
        <div className='bg-white/20 w-[300px] rounded-lg p-3 shadow-lg shadow-zinc-400 mx-auto'>
            {error && <h1 className='my-2 text-red-800 underline text-xs flex items-center justify-start'><BiSolidError className='mr-2' />{error}</h1>}
            <h1 className='text-4xl'>Sign Up</h1>
            <label htmlFor='image' className='w-16 h-16 mb-4 mx-auto border-solid border-white border-[1px] block my-3 rounded-full'>
                <img className='rounded-full w-full h-full object-cover' src={profile ? URL.createObjectURL(profile) : 'https://img.freepik.com/free-icon/user_318-159711.jpg'} alt="" />
                <input onChange={(e) => setProfile(e.target.files[0])} type="file" name="image" id="image" className='hidden' />
            </label>
            <form action="" onSubmit={handleRegister}>
                <div className='my-1 flex items-start w-full justify-start flex-col'>
                    <label htmlFor="username" className='mb-2 ml-2 tracking-wider'>Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} className='p-2 bg-[#78784b] w-full border-solid border-black text-black border-b-[2px] outline-none' type="text" id='username' placeholder='John' />
                </div>
                <div className='my-1 flex items-start w-full justify-start flex-col'>
                    <label htmlFor="email" className='mb-2 ml-2 tracking-wider'>Email Address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 bg-[#78784b] w-full border-solid border-black text-black border-b-[2px] outline-none' type="email" name="email" id="email" placeholder='example@gamil.com' />
                </div>
                <div className='my-1 relative flex items-start w-full justify-start flex-col'>
                    <label htmlFor="passsword" className='mb-2 ml-2 tracking-wider'>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 bg-[#78784b] w-full border-solid border-black text-black border-b-[2px] outline-none' type={show ? 'text': 'password'} name="password" id="password" placeholder='Ssda@)asd/' />
                    <li onClick={() => setShow(!show)} className='absolute list-none top-8 right-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 p-1 cursor-pointer'>{show ? <FaRegEyeSlash /> : <AiOutlineEye />}</li>
                </div>
                <button disabled={loading} className='p-3 mx-auto block bg-[#858500] hover:tracking-wider transition-cubic text-white my-2 rounded-3xl w-9/12'>{loading ? <ClipLoader color={color} loading={loading} size={21} aria-label="Loading Spinner" data-testid="loader" />  : 'Sign Up'}</button>
                <h1 className='text-center text-sm my-2'>Already have an Account ? <Link className='ml-2 hover:text-white italic' to={'/login'}>Login</Link></h1>
            </form>
        </div>
    </div>
  )
}
