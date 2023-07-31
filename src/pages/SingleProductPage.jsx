import React from 'react'
import { AiOutlineMinus,AiOutlineShoppingCart } from 'react-icons/ai';
import {TbJewishStarFilled} from 'react-icons/tb'
import { BiPlus } from 'react-icons/bi';
import {BsShuffle} from 'react-icons/bs'
// import ReactImageMagnify from 'react-image-magnify'
import ReactStars from 'react-rating-stars-component'
export const SingleProductPage = () => {
        const ratingChanged = (newRating) => {
        console.log(newRating);
    };
  return (
    <div className='bg-[#858500] h-screen'>
        <div className='w-10/12 mx-auto flex bg-white/10 py-5 items-center justify-between'>
            <div className='w-full'>
                <img src="https://resource.logitech.com/content/dam/logitech/en/products/headsets/logitech-zone-learn/gallery/zone-learn-over-ear-headset-gallery-1.png" alt="" />
            </div>
            <div className='w-full ml-3'>
                <h1>Kids Headphones Bulk 10 Packs Multi For Students</h1>
                <p>$100</p>
                 <ReactStars className={'bg-white'} count={5} onChange={ratingChanged} size={20} isHalf={true} emptyIcon={<i className="far fa-star"></i>} halfIcon={<i className="fa fa-star-half-alt"></i>} fullIcon={<i className="fa fa-star"></i>} activeColor="#ffd700" />
                <p>Headsets</p>
                <p className='flex items-center justify-start text-2xl my-3'>Brands <span className='ml-2 text-sm'>American</span></p>
                <ul className='flex items-center justify-start'>
                    <h1 className='mr-4'>Colors</h1>
                    <li className='w-8 h-8 rounded-full cursor-pointer hover:scale-105 scale-100 transition_cubic bg-red-500 relative mx-2 before:absolute before:-left-1 before:-top-1 before:content-[""] before:border-solid before:border-red-500 before:border-[2px] before:w-10 before:h-10 before:rounded-full'></li>
                    <li className='w-8 h-8 rounded-full cursor-pointer hover:scale-105 scale-100 transition_cubic bg-red-500 relative mx-2 before:absolute before:-left-1 before:-top-1 before:content-[""] before:border-solid before:border-red-500 before:border-[2px] before:w-10 before:h-10 before:rounded-full'></li>
                    <li className='w-8 h-8 rounded-full cursor-pointer hover:scale-105 scale-100 transition_cubic bg-red-500 relative mx-2 before:absolute before:-left-1 before:-top-1 before:content-[""] before:border-solid before:border-red-500 before:border-[2px] before:w-10 before:h-10 before:rounded-full'></li>
                </ul>
                <div className='flex items-center justify-start my-4'>
                    <div className='flex items-center justify-start'>
                        <p className='border-solid border-[#515102] border-[1px] flex items-center justify-center rounded-md rounded-r-none border-r-0 w-14 h-14'>0</p>
                        <div className='flex items-center justify-center flex-col'>
                            <li className='w-7 h-7 flex items-center justify-center border-[#515102] border-[1px] cursor-pointer group rounded-md rounded-l-none'><BiPlus className='group-hover:scale-105 transition_cubic' /></li>
                            <li className='w-7 h-7 flex items-center justify-center border-[#515102] border-[1px] cursor-pointer group rounded-md rounded-l-none'><AiOutlineMinus className='group-hover:scale-105 transition_cubic' /></li>
                        </div>
                    </div>
                    <button className='mx-3 p-2 flex items-center justify-start rounded-3xl bg-[#858500] tracking-wider border-solid border-transparent border-[1px] hover:border-[#515102]'><AiOutlineShoppingCart className={'mr-1'} /> Add to Cart</button>
                    <button className='mx-3 p-2 flex items-center justify-start rounded-3xl bg-[#858500] tracking-wider border-solid border-transparent border-[1px] hover:border-[#515102]'><TbJewishStarFilled className={'mr-1'} />Add to WishList</button>
                    <button className='mx-3 p-2 flex items-center justify-start rounded-3xl bg-[#858500] tracking-wider border-solid border-transparent border-[1px] hover:border-[#515102]'><BsShuffle className={'mr-1'} />Add to Compare</button>
                </div>
            </div>
        </div>
    </div>
  )
}
