import React, { useEffect, useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import {IoMdClose} from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveProduct, setClose, setFetcher } from '../Redux/Cart.Reducer'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { Axios } from '../util/utils'
import { ClipLoader } from 'react-spinners'
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom'
let KEY = 'pk_test_51Mx5oOAdg8lcCCd4YNH531krGXEGRpUFLOBcBP7aljeRe6kWgRlX36rPmcG5Ch4yLfHXgHkoHuYpGIhsq1hCgT7800XPWBh2zz'
export const CartSide = () => {
    let {name} = useSelector((state) => state.user)
    let { product,total } = useSelector((state) => state.cart)
    let {show} = useSelector((state) => state.cart);
    let [error,setError] = useState('')
    let [item,setItem] = useState([])
    let dispatcher = useDispatch()
    let {Fetcher} = useSelector((state) => state.cart)
    let [loading,setLoading] = useState(false)
    let [stripeToken,setStripeToken] = useState(null)
    let Close = () => {
        dispatcher(setClose({show : false}))
    }
    let DeleteProduct = async (index) => {
        dispatcher(setFetcher({active : true}))
        let res = await Axios.delete(`/cart/removecart/${index}`)
        res.data && dispatcher(setFetcher({active : false}))
        Refreshner()
    }
    let Refreshner = async () => {
            setLoading(true)
            let data = await Axios.get('/cart/loggedusercart');
            setItem(data.data)
            setLoading(false)
        }
    useEffect(() => {
        let Response = async () => {
           try {
             let res = await Axios.post('/stripe/payment',{
                    tokenId : stripeToken.id,
                    amount : item[0]?.Total * 100
                })
                return res.data
           } catch (error) {
                console.log(error.response.data)
           }
        }
        stripeToken && Response()
        Refreshner()
        stripeToken && DeleteAllItems()
    },[Fetcher,stripeToken])
    let onToken = (token) => {
        setStripeToken(token)
    }
    let DeleteAllItems = async () => {
        try {
            let res = await Axios.delete('/cart');
            res.data &&  Refreshner()
        } catch (error) {
            console.error(error.response.data)
        }
    }
    let Reset = () => {
        let response = prompt('Are your sure you want to clear your cart ? Y/N')
        if(String(response).toLocaleUpperCase() === 'Y') DeleteAllItems()
        else if(String(response).toLocaleLowerCase() === "N") return;
    }
  return (
    <div className={`${show ? 'right-0' : '-right-[110%]'} z-[99999999] fixed font-Poppins bg-white shadow-xl shadow-zinc-400 p-5 sm:w-[400px] xs:w-full top-0 h-full`}>
        <div className='flex items-center justify-between'>
            <h1 className='my-3 text-xl font-light'>Products in your cart</h1>
            <li onClick={() => Close()} className='w-10 h-10 rounded-full flex cursor-pointer transition_cubic items-center justify-center bg-black'>
                <IoMdClose className='text-xl text-white' />
            </li>
        </div>
        <div className='flex items-center w-full justify-center flex-col'>
            {
                item.length ? (
                    !loading ? Array.from(item)?.map((data) => (
                        Array.from(data.cartProduct).map((i) => (
                            <div key={i?._id} className='flex items-center justify-between w-full my-1'>
                                <div className='w-20 h-20 border-solid border-black/90 border-[1px]'>
                                    <img className='w-full h-full object-cover' src={i?.images[0]} alt="" />
                                </div>
                                <div className='w-[70%] mx-2'>
                                    <h1 className='font-semibold'>{i?.Pname}</h1>
                                    <p className='text-xs font-light my-1 w-full'>{String(i?.desc).substring(0,100).concat('...')}</p>
                                    <p className='text-xs font-bold text-[#04aedd]'>{i?.itemAmount} x ${i?.price}</p>
                                </div>
                                <li onClick={() => DeleteProduct(Array.from(data.cartProduct).indexOf(i))} className='w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-600 list-none cursor-pointer text-red-500 hover:text-white'><MdDelete /></li>
                            </div>
                        ))
                    )) : <ClipLoader color={'#000'} loading={loading} size={51} className='mt-20' aria-label="Loading Spinner" data-testid="loader" />
                ) : (
                    <h1 className='my-3 text-xl font-extralight flex items-center justify-start ml-5'><AiOutlineShoppingCart className={'mr-3'} />Empty Cart!</h1>
                )
            }
            <div className='flex items-center mt-2 font-light justify-between w-full'>
                <h1 className='tracking-wide font-semibold text-sm'>SUBTOTAL</h1>
                <p className='font-semibold'>${item ? item[0]?.Total : <ClipLoader color={'#000'} loading={loading} size={21} className='mt-20' aria-label="Loading Spinner" data-testid="loader" />}</p>
            </div>
            <StripeCheckout
                name={name}
                description={`hello, ${name} your total is  $${item[0]?.Total}`}
                image='https://img.freepik.com/premium-vector/letter-b-logo-power-red_42564-7.jpg?w=2000'
                currency='USD'
                stripeKey={KEY}
                billingAddress
                shippingAddress
                amount={item[0]?.Total * 100}
                token={onToken}
            >
                <button className='my-4 p-3 w-full bg-[#2c87ea] text-xs text-white'>PROCCED TO CHECKOUT</button>
            </StripeCheckout>
            <button onClick={() => Reset()} className='text-xs text-red-600 mt-5 cursor-pointer hover:text-red-700'>RESET CART</button>
        </div>
    </div>
  )
}
