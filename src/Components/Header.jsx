import React, { useState } from 'react'
import {BsChevronCompactDown, BsHandbag} from 'react-icons/bs'
import {BiUserPlus} from 'react-icons/bi'
import {AiOutlineHeart, AiOutlineMenu} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import {IoClose, IoLogIn, IoLogOut} from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT } from '../Redux/User.Reducer'
import { setClose } from '../Redux/Cart.Reducer'
export const Header = () => {
    let { name, profile, isAdmin } = useSelector((state) => state.user )
    let cartShower = useSelector((state) => state.cart.show)
    let dispatcher = useDispatch();
    let [show,setShow] = useState(false)
    let [filters,setFilters] = useState(false)
    let buttons = document.querySelectorAll('.buttons li')
    let [drop,setDrop] = useState(false)
    let [scroll,setScroll] = useState(0)
    buttons.forEach(button => {
        button.addEventListener('click',() => {setFilters(false); setShow(false)})
    })
    let Logout = () => {
        dispatcher(LOGOUT({}))
        window.location.replace('/login')
    }
    let MakeVisible = () => {
        setDrop(false)
        dispatcher(setClose({show : true}))
    }
    let CloseDrop = () => {

    }
    window.addEventListener('scroll',() => {
        setScroll(window.scrollY)
    })
  return (
    <nav className={`${scroll ? 'fixed py-1' : 'static py-0'} z-[99999] w-full bg-[#858500] font-Poppins font-extralight`}>
        <div className={`${name ?  'w-11/12' : 'w-10/12'} mx-auto xs:py-1 relative lg:py-3 flex items-center justify-between`}>
            <ul className={`${name ? 'w-2/12' : 'w-3/12'} `}>
                <Link to={'/'} className='w-16 xs:text-xl xl:text-5xl'>
                    AMAZONIA
                </Link>
            </ul>
            <ul className={`${name ? `${isAdmin ? 'w-6/12' : 'w-7/12'}` : 'w-9/12'} relative mx-5 xs:hidden lg:flex items-center justify-start h-10`}>
                <input type="text" placeholder='Search Products ...' className='transition-none tracking-wider bg-[#78784b] text-white placeholder:text-white font-Kreon w-full border-solid border-b-black border-t-white border-0 focus:border-t-[2px] focus:border-b-[2px] p-3 outline-none font-semibold' />
                <button onClick={() => setFilters(!filters)} className='transition-none px-2 mx-2 flex items-center text-white bg-[#78784b] justify-start py-3 border-solid border-black border-0  focus:border-b-[2px] border-l-0'>Filter <BsChevronCompactDown className={`transition-none ml-2 ${filters ? 'rotate-0' : 'rotate-180'}`} /></button>
                <ul className={`${filters ? 'scale-100' : 'scale-0'} z-[999] bg-white buttons origin-top transition_cubic flex items-start justify-start flex-col absolute top-14 w-40 right-10 p-2 rounded-md shadow-md shadow-zinc-500`}>
                    <li className='w-full my-1 border-solid p-1 border-[#858500] border-b-[1px] tracking-wide cursor-pointer'>Home</li>
                    <li className='w-full my-1 border-solid p-1 border-[#858500] border-b-[1px] tracking-wide cursor-pointer'>About</li>
                    <li className='w-full my-1 border-solid p-1 border-[#858500] border-b-[1px] tracking-wide cursor-pointer'>Services</li>
                    <li className='w-full my-1 border-solid p-1 border-[#858500] border-b-[1px] tracking-wide cursor-pointer'>Blog</li>
                    <li className='w-full my-1 border-solid p-1 border-[#858500] border-b-[1px] tracking-wide cursor-pointer'>Contact</li>
                </ul>
                <button className='p-3 bg-black text-white rounded-[5px] tracking-widest'>Search</button>
            </ul>
            <ul className={`${name ? ' w-11/12' : 'w-4/12' } xs:hidden lg:flex items-center justify-end`}>
                <li className='relative before:absolute before:left-0 before:-bottom-1 before:content-[""] before:w-0 hover:before:w-full before:bg-black before:transition-all before:ease-linear before:duration-700 before:h-1 before:rounded-lg flex items-center justify-start mx-2'>
                    <Link to={'/'}>
                        Home
                    </Link>
                </li>
                 <li className='my-3 mx-auto relative before:absolute before:left-0 before:-bottom-1 before:content-[""] before:w-0 hover:before:w-full before:bg-black before:transition-all before:ease-linear before:duration-700 before:h-1 before:rounded-lg flex items-center justify-center'>
                    <Link to={'/about'}>
                        About
                    </Link>
                </li>
                {isAdmin && <li className='relative before:absolute before:left-0 before:-bottom-1 before:content-[""] before:w-0 hover:before:w-full before:bg-black before:transition-all before:ease-linear before:duration-700 before:h-1 before:rounded-lg flex items-center justify-start mx-2'>
                    <Link to={'/addProduct'}>
                        Add Product
                    </Link>
                </li>}
                <li onClick={() => MakeVisible()} className='relative flex items-center justify-start mx-2 lg:hover:tracking-wider'>
                    <p className='absolute -top-3 -left-0 text-xs bg-black text-white w-5 h-5 flex items-center justify-center font-bold rounded-full'>0</p>
                    <button>
                        <BsHandbag className='text-xl' />
                    </button>
                </li>
                <li className='relative flex items-center justify-start mx-2 lg:hover:tracking-wider'>
                    <p className='absolute -top-3 -left-0 text-xs bg-black text-white w-5 h-5 flex items-center justify-center font-bold rounded-full'>0</p>
                    <Link to={'/liked'}>
                        <AiOutlineHeart className='text-xl' />
                    </Link>
                </li>
                {
                    name ? 
                    <div className='flex items-center justify-center ml-3'>
                        <li onClick={() => Logout()} className='ml-1 relative before:absolute before:left-0 before:-bottom-1 before:content-[""] before:w-0 hover:before:w-full before:bg-black before:transition-all before:ease-linear before:duration-700 before:h-1 before:rounded-lg flex items-center justify-start mx-2'>
                            <IoLogOut className='text-xl' />
                            <button className='ml-2'>
                                Logout
                            </button>
                        </li>
                        <abbr title={name}>
                            <li className='w-11 h-11 rounded-full mr-1 border-solid border-white border-[1px]'>
                                <img className='w-full h-full rounded-full object-cover' src={profile} alt="" />
                            </li>
                        </abbr>
                    </div> : 
                    <li className='flex items-center justify-end mx-2 relative'>
                        <BiUserPlus onClick={() => setShow(!show)} className='mr-3 cursor-pointer text-xl' />
                        <ul className={`${show ? 'scale-100' : 'scale-0'} z-[999] buttons transition_cubic origin-top items-center justify-end absolute top-8 w-40 bg-white shadow-xl p-2 rounded-md shadow-zinc-500 flex-col`}>
                            <li className='my-1 border-solid p-1 border-[#858500] border-b-[1px] tracking-wide cursor-pointer'>
                                <Link to={'/login'} className='mx-2 p-1 rounded-md transition-all duration-700 ease-linear w-full my-1 flex items-center justify-start'>
                                    <IoLogIn className='mr-2'/>
                                    Sing In
                                </Link>
                            </li>
                            <li className='my-1 border-solid p-1 border-[#858500] border-b-[1px] tracking-wide cursor-pointer'>
                                <Link to={'/register'} className='mx-2 p-1 rounded-md transition-all duration-700 ease-linear w-full my-1 flex items-center justify-start'>
                                    <BiUserPlus  className='mr-2'/>
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                </li>
                }
            </ul>
            {/* mobile */}
            <ul className={`${drop ? 'right-0' :  '-right-[110%]'} fixed z-[9999] origin-right transition_cubic top-0 w-full lg:hidden xs:flex items-center justify-start flex-col h-full bg-white`}>
                <ul className='w-full py-5 mt-5'>
                    <Link to={'/'} className='w-16 text-3xl ml-28 text-center'>
                        AMAZONIA
                    </Link>
                </ul>
                <input type="text" placeholder='Search Products ...' className='transition-none tracking-wider bg-[#78784b] text-white placeholder:text-white font-Kreon w-11/12 mx-auto border-solid border-b-black border-t-white border-0 focus:border-t-[2px] focus:border-b-[2px] p-3 outline-none font-semibold' />
                <button onClick={() => setFilters(!filters)} className='transition-none px-2 mx-2 text-white bg-[#78784b] py-3 border-solid border-black border-0 w-11/12 my-2 flex items-center justify-center  focus:border-b-[2px] border-l-0'>Filter <BsChevronCompactDown className={`transition-none ml-2 ${filters ? 'rotate-0' : 'rotate-180'}`} /></button>
                <ul className={`${filters ? 'scale-100' : 'scale-0'} bg-white buttons origin-top transition_cubic flex items-start justify-start flex-col absolute top-44 z-[999] w-11/12 right-4 p-2 rounded-md shadow-md shadow-zinc-500`}>
                    <li className='w-full my-1 border-solid p-1 border-[#858500] border-b-[1px] tracking-wide cursor-pointer'>Home</li>
                    <li className='w-full my-1 border-solid p-1 border-[#858500] border-b-[1px] tracking-wide cursor-pointer'>About</li>
                    <li className='w-full my-1 border-solid p-1 border-[#858500] border-b-[1px] tracking-wide cursor-pointer'>Services</li>
                    <li className='w-full my-1 border-solid p-1 border-[#858500] border-b-[1px] tracking-wide cursor-pointer'>Blog</li>
                    <li className='w-full my-1 border-solid p-1 border-[#858500] border-b-[1px] tracking-wide cursor-pointer'>Contact</li>
                </ul>
                <button className='p-3 bg-black text-white rounded-[5px] tracking-widest w-11/12 mx-auto'>Search</button>
                <li className='my-3 w-11/12 mx-auto relative before:absolute before:left-0 before:-bottom-1 before:content-[""] before:w-0 hover:before:w-full before:bg-black before:transition-all before:ease-linear before:duration-700 before:h-1 before:rounded-lg flex items-center justify-center'>
                    <Link to={'/'}>
                        Home
                    </Link>
                </li>
                <li className='my-3 w-11/12 mx-auto relative before:absolute before:left-0 before:-bottom-1 before:content-[""] before:w-0 hover:before:w-full before:bg-black before:transition-all before:ease-linear before:duration-700 before:h-1 before:rounded-lg flex items-center justify-center'>
                    <Link to={'/about'}>
                        About
                    </Link>
                </li>
                {isAdmin && <li className='my-3 w-11/12 mx-auto relative before:absolute before:left-0 before:-bottom-1 before:content-[""] before:w-0 hover:before:w-full before:bg-black before:transition-all before:ease-linear before:duration-700 before:h-1 before:rounded-lg flex items-center justify-center'>
                    <Link to={'/addProduct'}>
                        Add Product
                    </Link>
                </li>}
                <li onClick={() => MakeVisible()} className='my-3 cursor-pointer relative flex items-center justify-start mx-2 lg:hover:tracking-wider'>
                    <p className='absolute -top-3 -left-0 text-xs bg-black text-white w-5 h-5 flex items-center justify-center font-bold rounded-full'>0</p>
                    <button>
                        <BsHandbag className='text-xl' />
                    </button>
                </li>
                <li className='my-3 relative flex items-center justify-start cursor-pointer mx-2 lg:hover:tracking-wider'>
                    <p className='absolute -top-3 -left-0 text-xs bg-black text-white w-5 h-5 flex items-center justify-center font-bold rounded-full'>0</p>
                    <Link to={'/liked'}>
                        <AiOutlineHeart className='text-xl' />
                    </Link>
                </li>
                {
                    name ? 
                    <div className='flex items-center justify-center flex-col ml-3'>
                        <li onClick={() => Logout()} className='relative my-2 before:absolute before:left-0 before:-bottom-1 before:content-[""] before:w-0 hover:before:w-full before:bg-black before:transition-all before:ease-linear before:duration-700 before:h-1 before:rounded-lg flex items-center justify-start mx-2'>
                            <IoLogOut className='text-xl' />
                            <button className='ml-2'>
                                Logout
                            </button>
                        </li>
                        <abbr title={name}>
                            <li className='w-11 h-11 rounded-full mr-1 border-solid border-white border-[1px]'>
                                <img className='w-full h-full rounded-full object-cover' src={profile} alt="" />
                            </li>
                        </abbr>
                    </div> : 
                    <li className='flex items-center justify-center relative w-11/12'>
                        <BiUserPlus onClick={() => setShow(!show)} className='cursor-pointer text-xl' />
                        <ul className={`${show ? 'scale-100' : 'scale-0'} z-[999] buttons transition_cubic origin-top items-center justify-end absolute top-8 w-11/12 bg-white shadow-xl p-2 rounded-md shadow-zinc-500 flex-col`}>
                            <li onClick={() => CloseDrop()} className='my-1 border-solid p-1 border-[#858500] border-b-[1px] tracking-wide cursor-pointer'>
                                <Link to={'/login'} className='mx-2 p-1 rounded-md transition-all duration-700 ease-linear w-full my-1 flex items-center justify-start'>
                                    <IoLogIn className='mr-2'/>
                                    Sing In
                                </Link>
                            </li>
                            <li onClick={() => CloseDrop()} className='my-1 border-solid p-1 border-[#858500] border-b-[1px] tracking-wide cursor-pointer'>
                                <Link to={'/register'} className='mx-2 p-1 rounded-md transition-all duration-700 ease-linear w-full my-1 flex items-center justify-start'>
                                    <BiUserPlus  className='mr-2'/>
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                </li>
                }
            </ul>
            <li onClick={() => setDrop(!drop)} className={`${cartShower ? 'z-[-1]' : 'z-[99999]'} w-9 h-9 rounded-full xs:flex lg:hidden items-center justify-center hover:bg-black/40 group cursor-pointer`}>{drop ? <IoClose className='text-xl group-hover:text-white' /> : <AiOutlineMenu className='text-xl group-hover:text-white' />}</li>
        </div>
    </nav>
  )
}
