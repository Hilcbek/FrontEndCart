import React from 'react'
import { Products } from './Products'
import { CartSide } from './CartSide'
export const Home = () => {
  return (
    <div className='relative'>
        <Products />
        <CartSide />
    </div>
  )
}
