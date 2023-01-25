import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Store from '../utils/Store'
import styles from '../styles/Shipping.module.css'
import validateInput from '../utils/validateInputs'
function ShippingScreen() {
  const [inputs,setInputs] = useState({name:"", country:'',city:'',phoneNo:'',postalCode:"",address:""})
  const { state, dispatch } = useContext(Store)
  const router = useRouter()




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorTag = document.getElementById("error") as HTMLPreElement
        const name = e.target.name
        const value = e.target.value
        const parent = e.target.parentElement
        const pre = parent?.querySelector("pre")!
        const text = pre.textContent

        
        const valid = validateInput(name, value)

        setInputs(values => ({ ...values, [name]: value }))
        if (!valid) {
            e.target.style.border = "1px solid red"
            errorTag.textContent = text
            return
        } 
            
            e.target.style.border = "2px solid blue"
            errorTag.textContent = ""
  
}


  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const errorTag = document.getElementById("error") as HTMLPreElement
    e.preventDefault()

    // TypeScript Index Signature
    const shippingAddress: { [index: string]: string } = { ...inputs }
    //Check If All Inputs Are Valid
    for (const input in shippingAddress) {
      const valid = validateInput(input, shippingAddress[input])
      if (!valid) {

        errorTag.textContent = "You Must Fill All The Fieds"
        return
      }
      errorTag.textContent = ""
    }

    dispatch({ type: "SAVE_ADDRESS", payload: inputs })
    
    router.push('/payment')

  }



  useEffect(() => {
  const {loginInfo,cart} = state
    if (!loginInfo.Token) {
      router.replace('/login')
      return
    }

    if (cart.cartItems.length < 1) {
      router.replace('/')
      return
    }

    if (cart.shippingAddress.name) {
      setInputs(cart.shippingAddress)
    }

},[state,router])




  return (
    <Layout title='Shipping Address' description='Shipping Address Form'>
      <div className={styles.shippingPage}>
        <div className={styles.formWrapper}>
          <h4 style={{padding:"2rem"}}><p>Shipping Address</p></h4>
          <pre style={{ color: "red", textAlign: "center", fontWeight: "bold" }} id="error"></pre>
          <form className={styles.form} onSubmit={handleSubmit}>
              <div>
                  <label htmlFor='name'>Full Name</label>
                  <input type="text"  placeholder='Arya Stark' name="name" id="name" required onChange={(e)=>handleChange(e)} value={inputs.name} />
                  <pre>Enter Valid Full Name</pre>
              </div>
              
              <div>
                  <label htmlFor='country'>Country</label>
                  <input type="text"  placeholder='Nigeria' name="country" id="country" required onChange={(e)=>handleChange(e)} value={inputs.country} />
                  <pre>Enter Valid Country Name</pre>
              </div>
              
              <div>
                  <label htmlFor='city'>City</label>
                  <input type="text"  placeholder='Lagos' name="city" id="city" required onChange={(e)=>handleChange(e)} value={inputs.city} />
                  <pre>Enter Valid City Name</pre>
              </div>
              
              <div>
                  <label htmlFor='phoneNo'>Phone No</label>
                  <input type="tel"  placeholder='+23480563456' name="phoneNo" id="phoneNo" required onChange={(e)=>handleChange(e)} value={inputs.phoneNo} />
                  <pre>Enter Valid Phone Nunber</pre>
            </div>
            
            <div>
                  <label htmlFor='postalCode'>Postal Code</label>
                  <input type="tel"  placeholder='100100' name="postalCode" id="postalCode" required onChange={(e)=>handleChange(e)} value={inputs.postalCode} />
                  <pre>Enter Valid Postal Code</pre>
            </div>
            
            <div>
                  <label htmlFor='address'>Address</label>
                  <input type="tel"  placeholder='No 4 Will Street' name="address" id="address" required onChange={(e)=>handleChange(e)} value={inputs.address} />
                  <pre>Enter Your Phone House Address</pre>
             </div>

            <div className={styles.submitBtn}><button type='submit'>CONTINUE</button></div>

          </form>
        </div>
      </div>
    </Layout>
  )
}

export default ShippingScreen