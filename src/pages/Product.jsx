import React, { useReducer, useRef, useState } from 'react'
import { AiFillEye, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { BsArrowLeft, BsArrowRight, BsShuffle } from 'react-icons/bs';
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { AddToCart, setFetcher } from '../Redux/Cart.Reducer';
import { BiMinus, BiPlus } from 'react-icons/bi';
import rn from 'random-number'
import { Axios } from '../util/utils';
export const Product = ({data}) => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    let [counter,setCounter] = useState(0)
    let [quantity,setQuantity] = useState(1)
    const ratingChanged = (newRating) => {
        // console.log(newRating);
    };
    var gen = rn.generator({
          min:  -1000000
        , max:  10000000
        , integer: true,
        })
    let dispatch = useDispatch();
    let Sign = (sign) => {
      if(sign === '+'){
        setCounter(counter < data?.images?.length - 1 ? counter + 1 : 0)
      }else{
        setCounter(counter > data?.images?.length - 1 ? counter - 1 : data?.images?.length - 1)
      }
    }
    let AddToCartFunction = async () => {
        dispatch(setFetcher({active : true}))
        dispatch(AddToCart(true))
        let res = await Axios.post(`/cart/addtocart/${data._id}`);
        setQuantity(1)
        res.data && dispatch(setFetcher({active : false}))
    }
    let QuantityCart = (sign) => {
        if(sign === '+') {
            setQuantity(quantity+1)
        }else{
            setQuantity(quantity-1)
        }
    }
  return (
    <div className='relative cursor-pointer sm:mx-1 group transition_cubic flex overflow-hidden items-center justify-center flex-col shadow-md shadow-zinc-400 xs:w-11/12 xs:mx-auto sm:w-[315px] h-[400px] p-2 rounded-md'>
        <li className='list-none flex items-center justify-end cursor-pointer w-full px-[2px]'><li className='w-5 h-5 flex items-center justify-center rounded-full hover:bg-black hover:text-white'><AiOutlineHeart /></li></li>
        
            <div className='h-full z-[999] group flex items-center justify-start overflow-hidden'>
              <li onClick={() => Sign('-')} className='group-hover:left-2 transition_cubic z-[999] list-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 absolute top-[205px] -left-12 cursor-pointer'><BsArrowLeft className='text-xl' /></li>
              {
                data?.images?.map((img) => 
                  <img className='flex items-center justify-center transition_cubic object-contain' style={{transform : `translateX(${counter * -300}px)`}} src={img ? img : <ClipLoader color={color} loading={loading} size={21} aria-label="Loading Spinner" data-testid="loader" />} alt="" />
                )
              }
              <li onClick={() => Sign('+')} className='group-hover:right-2 transition_cubic z-[999] list-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 absolute top-[205px] -right-12 cursor-pointer'><BsArrowRight className='text-xl' /></li>
            </div>
        <div className='w-11/12 mx-auto'>
            <p className='text-red-700 text-xs my-1'>{!data?.type ? <ClipLoader color={color} loading={loading} size={21} aria-label="Loading Spinner" data-testid="loader" /> : data?.type}</p>
            <h1 className='font-Poppins text-xs font-light tracking-wider'>&nbsp;&nbsp;&nbsp;&nbsp;{(!data?.Pname ? <ClipLoader color={color} loading={loading} size={21} aria-label="Loading Spinner" data-testid="loader" /> : data?.Pname).substring(0,60).concat('...')}</h1>
             <div className='flex items-center justify-center my-2'><ReactStars count={5} onChange={ratingChanged} size={20} isHalf={true} emptyIcon={<i className="far fa-star"></i>} halfIcon={<i className="fa fa-star-half-alt"></i>} fullIcon={<i className="fa fa-star"></i>} activeColor="#ffd700" /></div>
             <div className='z-[999] absolute top-7 transition_cubic -right-[100px] group-hover:right-[10px]'>
                <li className='z-[999] cursor-pointer hover:scale-105 scale-100 w-5 h-5 list-none bg-black text-white my-2 text-xs flex items-center justify-center rounded-full'><BsShuffle /></li>
                <li className='z-[999] cursor-pointer hover:scale-105 scale-100 w-5 h-5 list-none bg-black text-white my-2 text-xs flex items-center justify-center rounded-full'><AiFillEye /></li>
                <li onClick={() => AddToCartFunction()} className='z-[999] cursor-pointer hover:scale-105 scale-100 w-5 h-5 list-none bg-black text-white my-2 text-xs flex items-center justify-center rounded-full'><AiOutlineShoppingCart /></li>
                <li onClick={() => QuantityCart('+')} className='z-[999] cursor-pointer hover:scale-105 scale-100 w-5 h-5 list-none bg-black text-white my-2 text-xs flex items-center justify-center rounded-full'><BiPlus /></li>
                <li onClick={() => AddToCartFunction()} className='z-[999] cursor-pointer hover:scale-105 scale-100 w-5 h-5 list-none my-2 text-xs border-solid border-black border-[1px] flex items-center justify-center'>{quantity}</li>
                <li onClick={() => QuantityCart('-')} className='z-[999] cursor-pointer hover:scale-105 scale-100 w-5 h-5 list-none bg-black text-white my-2 text-xs flex items-center justify-center rounded-full'><BiMinus /></li>
             </div>
             <p className='my-2 text-red-500'>${data?.price}</p>
        </div>
    </div>
  )
}
/** */