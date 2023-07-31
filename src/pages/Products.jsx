import React, { useEffect, useState } from 'react'
import { Product } from './Product'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/style.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Axios } from '../util/utils';
import { useSelector } from 'react-redux';
export const Products = () => {
    let [data,setData] = useState([])
    let {show} = useSelector((state) => state.cart)
    useEffect(() => {
        let Func = async () => {
            let res = await Axios.get('/product');
            setData(res.data.data)
        }
        Func()
    },[])
  return (
    <div className={`${show ? 'xl:w-8/12 lg:w-7/12' : 'xl:w-11/12'} ${show ? 'sm:mx-0 sm:ml-5 xs:mx-auto' : 'mx-auto'}`}>
        <div className={`w-full grid ${show ? 'xl:grid-cols-3 lg:grid-cols-2 xs:grid-cols-1' : 'xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2'} md:gap-3 sm:gap-1 pt-10`}>
            {
                data?.map((item) => (
                    <Product key={item._id} data={item} />
                ))
            }
        </div>
    </div>
  )
}