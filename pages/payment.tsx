import Router, { useRouter } from 'next/router'
import React,{useEffect,useContext, useState} from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Payment.module.css'
import Store from '../utils/Store'

function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState("")
  const { state, dispatch } = useContext(Store)
  const router = useRouter()

  const handleClick = (e: any) => {
  setPaymentMethod(e.target.value)
}

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errorTag = document.getElementById("errorTag") as HTMLPreElement
    if (paymentMethod === "Paypal" || paymentMethod === "Skype" || paymentMethod === "Card" ) {
      dispatch({type:"SAVE_PAYMENT_METHOD",payload:paymentMethod})
      errorTag.textContent = ""
      router.push('/placeorder')
      return
    }

     
      errorTag.textContent = "You Must Select Payment Method"
  }
  
  
  useEffect(() => {
    const { shippingAddress,paymentMethod } = state.cart
    // SET DEFAULT PAYMENT METHOD
    if (!shippingAddress.name) {
      router.push('/shipping')
      return
    }

    const inputTags = document.getElementsByTagName("input")!
    for (let i = 0; i < inputTags.length; i++){
      const input = inputTags[i]
      if (paymentMethod === input.value) {
        input.setAttribute("checked","checked")
      } 
    }

    setPaymentMethod(paymentMethod)

},[state,router])

  return (
    <Layout title='Payment Method' description='Payment Page'>
      <div className={styles.paymentPage}>
        <div className={styles.formWrapper}>
          <h4 style={{ textAlign: "center" }}>Select Payment Method</h4>
          <pre id='errorTag' style={{color:"red",textAlign:"center"}}></pre>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <div className={styles.paymentMethod}>

            <div className={styles.paypal}>
              <input type="radio" name="paymentMethod"  onChange={(e)=>handleClick(e)} id="paypal" value="Paypal" />
              <label htmlFor="paypal">Paypal</label>
            </div>

            <div className={styles.skype}>
              <input type="radio" name="paymentMethod" onChange={(e)=>handleClick(e)} id="skype" value="Skype" />
              <label htmlFor="skype">Skype</label>
            </div>

            <div className={styles.card}>
              <input type="radio" name="paymentMethod" onChange={(e)=>handleClick(e)} id="card" value="Card" />
              <label htmlFor="card">Card</label>
            </div>
            </div>


            
            <div className={styles.submitBtn}><button type='submit'>CONTINUE</button></div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default PaymentScreen