import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import ListCartItems from '../components/ListCartItems'
import { cartItemType, productInitialValues } from '../typeScriptTypes'
import Store from '../utils/Store'
import styles from '../styles/Cart.module.css'
import ShowError from '../components/ShowError'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import PaymentSummary from '../components/PaymentSummary'


function CartScreen() {
    const { state, dispatch } = useContext(Store)
    const { cartItems } = state.cart
    const router = useRouter()
    
    const itemsPrice = (cartItems.reduce((a, c) => a + c.price * c.qty, 0))
    const shippingPrice = itemsPrice > 200 ? 30 : 0
    const taxPrice = itemsPrice * 0.3
    const totalPrice = itemsPrice + shippingPrice + taxPrice
  

    const handleClick = () => {
        router.replace('/shipping')
    }

    return (
        <Layout title='Shopping Cart' description='Shopping Cart Page'>
            
            <div className={styles.cartPage}>
                {
                    cartItems.length > 0 ? <div className={styles.cart}>
                        <div className={styles.shoppingCart}>
                            <h3>Shopping Cart</h3>
                            <ListCartItems cartItems={cartItems}/>
                        </div>
                        <div></div>
                        <PaymentSummary  text="CHECK OUT" handleClick={handleClick} itemsPrice={itemsPrice} shippingPrice={shippingPrice} totalPrice={totalPrice}/>
                    </div>: <ShowError><span>Your Cart Is Empty, <Link href='/'><a style={{color:"blue"}}>Go Shopping...</a></Link> </span></ShowError>
                }
            </div>
      </Layout>
  )
}

export default dynamic(()=>Promise.resolve(CartScreen),{ssr:false})