import React from 'react'
import {cartItemType} from '../typeScriptTypes'
import Button from './Button'
import styles from "../styles/PaymentSummary.module.css"



type propsType = {
    text: string,
    handleClick: () => void,
    itemsPrice: number,
    shippingPrice: number,
    totalPrice:number
}



function PaymentSummary({text,handleClick,itemsPrice,totalPrice,shippingPrice}:propsType) {


  
  return (
    <div className={styles.cartSummary}>
        <h3 style={{textAlign:"center",color:"darkturquoise"}}>Summary</h3>
        <div className={styles.summaryDetails}>
            <div><h5>SubTotal:{' '}</h5><h5 style={{ color: "red" }}>${itemsPrice.toFixed(2)}</h5></div>
            <div><h5>Shipping:{' '}</h5><h5 style={{ color: "red" }}>${shippingPrice}</h5></div><hr />
            <div><h4>Total:{' '}</h4><h4 style={{ color: "red" }}>${totalPrice.toFixed(2)}</h4></div><hr />
            <div className={styles.purchaseBtn}><Button text={text} length='fw' handleClick={handleClick}/></div>
        </div>
    </div>
  )
}

export default PaymentSummary
