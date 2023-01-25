import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React,{useEffect,useContext,useState} from 'react'
import Layout from '../../components/Layout'
import LoadingIndicator from '../../components/LoadingIndicator'
import Store from '../../utils/Store'
import styles from '../../styles/PlaceOrder.module.css'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import PaymentSummary from '../../components/PaymentSummary'
import { baseUrl } from '../../utils/url'




const orderItemsInitialValues = {

  orderItems:[{name: '',price: 0,image: '',qty: 0,_id: ''}],
    shippingAddress:{address:'',country:''},
    paymentMethod:'',
    shippingPrice:0,
    taxPrice:0,
    totalPrice:0,
    itemsPrice: 0,
    isPaid: false,
    isDelivered:false
    
}


function Order({ params }: any) {
  const [data,setData] = useState({loading:true,error:"",orderDetails:orderItemsInitialValues})
  const router = useRouter()
  const { _id } = params
  const {state:{loginInfo,cart},dispatch} = useContext(Store)
  
  const handleClick = () => {
  
}

  
  

  useEffect(() => {

    if (!loginInfo.Token) {
      router.push('/login')
    }
    

    axios.get(`${baseUrl}/api/orders/${_id}`, {
      headers: {
      
        "Content-Type": "application/json",
        "authorization":`Bearer ${loginInfo.Token}`
      }
    })
      .then(res => {
        console.log(res.data)
      setData({loading:false,error:"",orderDetails:res.data})
    })
      .catch(err => {
        const error = err.response ? err.response.data.message : err.message
        setData(prev=>({...prev,loading:false,error:error}))
    })


    dispatch({type:"DELETE_KEY", payload:"cartItemsDrones"})

  }, [dispatch, loginInfo, router, _id])
  
  const {orderItems,shippingAddress,paymentMethod,itemsPrice,totalPrice,shippingPrice,isDelivered,isPaid} = data.orderDetails
  return (
    <Layout title='Order' description='Order Details'>
      <div className={styles.placeOrderPage}>
        <h2>Place Order</h2>
        <div>{data.loading && <LoadingIndicator />}</div>
        <div style={{textAlign:"center"}}>{data.error && <span style={{ color: "red" }}>{data.error}</span>}</div>
            <div className={styles.grid}>
                    <div className={styles.shoppingCart}>
                      
            <div className={styles.shippingAddress}><strong>Shipping Address</strong><p>{`${shippingAddress.address} ${shippingAddress.country}`}</p><p>{isDelivered?"Delevered":"Not Delivered"}</p></div>
            <div className={styles.paymentMethod}><strong>Payment Method</strong><p>{paymentMethod}</p><p>{isPaid?"Paid":"Not Paid"}</p></div>
                      <div className={styles.orderItemsListWrapper}>
                        {
                orderItems.map((item,index) => {
                  return <div key={index} className={styles.cartItem}>
                              
                      <div className={styles.cartItemImage}><Image src={item.image} alt={item.name} width={100} height={100} /></div>
                        <h5>Name: {item.name}</h5>
                        <h5>Price: <span style={{ color: "red" }}>{`$${item.price}`}</span></h5>
                        <h5>Quantity: {item.qty}</h5>
                        <h5>Total Price: <span style={{ color: "red" }}>{`$${item.price * item.qty}`}</span></h5>
                    

                            </div>
                          })
                        }

                      </div>
            </div>
              
            <div></div>
          <PaymentSummary  text="MAKE PAYMENT" handleClick={handleClick}
            itemsPrice={itemsPrice} shippingPrice={shippingPrice} totalPrice={totalPrice} />
                        
          </div>
                
        
        </div>
    </Layout>
  )
}

export default Order

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  
  return{props:{params}}
}