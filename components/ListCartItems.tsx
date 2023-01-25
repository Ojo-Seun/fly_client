import React, { useContext, useEffect, useState } from 'react'
import { cartItem, cartItemType } from '../typeScriptTypes'
import styles from '../styles/Cart.module.css'
import Image from 'next/image'
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import Store from '../utils/Store';
import RatingIcons from './RatingIcons';


type qtyProps = {
  operator: '-' | '+',
  updatedItem: cartItem,
  currentQty:number
}


function ListCartItems({ cartItems }: cartItemType) {
  const { state, dispatch } = useContext(Store)


  const changeQuantity = ({ operator, updatedItem, currentQty }:qtyProps) => {
    if (operator === '-' && currentQty > 1) {
        dispatch({type:"REDUCE_ITEM_QTY", payload:updatedItem})
      
      return
    }
    if (operator === '+' && updatedItem.countInStock !== currentQty) {
      dispatch({type:"INCREASE_ITEM_QTY",payload:updatedItem})
      return
    }
    

  }




  const handleClick = (e: any) => {
    const isExist = cartItems.find(item => item.slug === e.target.id)
    if (isExist?.slug) {
      dispatch({ type: "REMOVE_ITEM", payload: isExist })
      
    }
}


      
    
    



  return (
      <div className={styles.cartListWrapper}>
              {
        cartItems.map((item, index) => {
          return (<div className={styles.cartItem} key={index}>
                    <div className={styles.cartItemColumn1}>
              
                      <div className={styles.cartItemImage}><Image src={item.image[0]} alt={item.name} width={100} height={100} /></div>
                      <div className={styles.cartItemDetails}>
                        <h5>{item.name}</h5>
                        <h5 style={{ color: "red" }}>{`$${item.price}`}</h5>
                        <RatingIcons value={item.rating} />
                        <div>Qty: {item.qty}</div>
                        <h5 style={{ color: "red" }}>{`$${item.price * item.qty}`}</h5>
                      </div>
                    </div>

                    <div>
                            {
                                item.qty < item.countInStock? <strong style={{ color: "green" }}>{item.countInStock} Pieces In Stock</strong> :<strong style={{ color: "red" }}>Out Of Stock(Only {item.countInStock} Left)</strong>
                            }
                   </div>
            


                      <div className={styles.cartItemActions}>
                        <div className={styles.deleteBtnWrapper}>
                          <button className={styles.deleteItemBtn}  type="button"><span  id={item.slug}  onClick={(e)=>handleClick(e)} style={{color:"red", cursor:"pointer"}}>Delete</span><RestoreFromTrashOutlinedIcon  color='info'/></button>
                        </div>
                        <div className={styles.qtyBtn}>
                              <button type='button' id={item.slug} onClick={(e) => changeQuantity({operator: '-',updatedItem: item,currentQty: item.qty })}>-</button>
                              <span className='quantity'>{item.qty}</span>
                              <button type='button' id={item.slug} onClick={(e)=>changeQuantity({operator: '+',updatedItem: item,currentQty: item.qty })}>+</button>
                        </div>
                      </div>
                    </div>)
                  })
              }
    </div>
  )
}

export default ListCartItems