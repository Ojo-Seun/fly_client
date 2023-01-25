import React, { ContextType, Dispatch, useContext, useReducer } from 'react'
import { cartItemType, stateType, } from '../typeScriptTypes'
import Cookie from './cookies'

const initialValue:stateType = {
  cart: {
    cartItems: Cookie.getItems("cartItemsDrones", []),
    shippingAddress: Cookie.getItems("shippingAddress", {}),
    paymentMethod:Cookie.getItems("paymentMethod", "")
  },

  loginInfo:Cookie.getItems("loginInfo",{})
    
}



type actionType = {
  type: "ADD_ITEM" | "REMOVE_ITEM" | "REDUCE_ITEM_QTY" | "INCREASE_ITEM_QTY" | "LOGOUT" | "SET_LOGIN_INFO" | "SAVE_ADDRESS" | "SAVE_PAYMENT_METHOD" | "DELETE_KEY",
  payload?:any
}


export const Store = React.createContext({state:initialValue, dispatch:{} as Dispatch<actionType>})


type childrenProps = {
  children:React.ReactNode
}







const reducer = (state:stateType, action:actionType) => {
  switch (action.type) {
    
    case "ADD_ITEM":
            const newItem = action.payload;
            const isExist = state.cart.cartItems.find(item => item._id === newItem._id);
            const newCartItemsAdd = isExist ? state.cart.cartItems : ([...state.cart.cartItems, newItem])
      Cookie.setItems("cartItemsDrones", newCartItemsAdd,)
      return { ...state, cart: {...state.cart, cartItems: newCartItemsAdd } }
    case "REMOVE_ITEM":
      const itemToDelete = action.payload
      const newCartItemsDelete = state.cart.cartItems.filter(item => item._id !== itemToDelete._id)
      Cookie.setItems("cartItemsDrones", newCartItemsDelete)
      return { ...state, cart: {...state.cart, cartItems: newCartItemsDelete } }
    case "REDUCE_ITEM_QTY":
      const itemToReduce = action.payload
      const itemToReduceExist = state.cart.cartItems.find(item => item._id === itemToReduce._id)
      const newCartItemsReduceqty = itemToReduceExist ? (state.cart.cartItems.map(item => item._id === itemToReduce._id ? { ...item, qty: item.qty - 1 } : item)) : state.cart.cartItems
      Cookie.setItems("cartItemsDrones", newCartItemsReduceqty)
      return { ...state, cart: {...state.cart, cartItems: newCartItemsReduceqty } }
    case "INCREASE_ITEM_QTY":
      const itemToIncrease = action.payload
      const itemToIncreaseExist = state.cart.cartItems.find(item => item._id === itemToIncrease._id)
      const newCartItemsIncreaseQty = itemToIncreaseExist ? (state.cart.cartItems.map(item => item._id === itemToIncrease._id ? { ...item, qty: item.qty + 1 } : item)) : state.cart.cartItems
      Cookie.setItems("cartItemsDrones", newCartItemsIncreaseQty)
      return { ...state, cart: {...state.cart, cartItems: newCartItemsIncreaseQty } }
    case "SET_LOGIN_INFO":
      Cookie.setItems("loginInfo", action.payload)
      return { ...state, loginInfo: action.payload }
    case "LOGOUT":
      Cookie.removeKey("loginInfo")
      Cookie.removeKey("cartItemsDrones")
      return { ...state, cart: { ...state.cart, cartItems: [] }, loginInfo: {} }
    case "SAVE_ADDRESS":
      Cookie.setItems("shippingAddress", action.payload)
      return { ...state, cart: { ...state.cart, shippingAddress: action.payload } }
    case "SAVE_PAYMENT_METHOD":
      Cookie.setItems("paymentMethod", action.payload)
      return {...state, cart:{...state.cart,paymentMethod:action.payload}}
    case "DELETE_KEY":
      Cookie.removeKey(action.payload)
      return {...state, cart:{...state.cart, cartItems:[]}}
    default:
      return state

  }
}




export function StoreProvider({children}:childrenProps) {
  const [ state, dispatch ] = useReducer(reducer, initialValue)
  const values = {state,dispatch}
  return (
    <Store.Provider value={values}>
      {children}
    </Store.Provider>
  )
}

export default Store