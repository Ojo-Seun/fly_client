import React, {useContext, useEffect, useState} from 'react'
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import Layout from '../components/Layout';
import styles from '../styles/Register.module.css'
import NextLink from 'next/link'
import Link from 'next/link'
import validateInput from '../utils/validateInputs';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator';
import Store from '../utils/Store';
import { useRouter } from 'next/router';
import { baseUrl } from '../utils/url';

function RegisterScreen() {
    const [inputs, setInputs] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    const [visibility, setVisibility] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
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
        const UserIfo: { [index: string]: string } = { ...inputs }
        //Check If All Inputs Are Valid
        for (const input in UserIfo) {
            const valid = validateInput(input, UserIfo[input])
            if (!valid) {

                errorTag.textContent = "You Must Fill All The Fieds"
                return
            }
            errorTag.textContent = ""
        }

        if (inputs.password !== inputs.confirmPassword) {
            errorTag.textContent = "The Passwords Are Not Equal"
            return
        }


         setIsLoading(true)
        const  {confirmPassword,...userInfo} = inputs

        axios.post(`${baseUrl}/api/users/register`, userInfo)
            .then(res => {
                setIsLoading(false)
                errorTag.textContent = res.data.message

                // CHECK IF DATA IS AN OBJECT OR STRING
                if (res.data.Token) {
                    const { message, ...loginInfo } = res.data
                    dispatch({ type: "SET_LOGIN_INFO", payload: loginInfo })
                    router.push('/')

                }

            }).catch(err => {
                setIsLoading(false)
                errorTag.textContent = err.response ? err.response.data.message : err.message
        })

        
    }

        // Toggle Password
    const isVisible = () => {
        const passwordTag = document.getElementsByClassName('password')
        if (!visibility) {
            setVisibility(state => {
                passwordTag[0].setAttribute("type", "password")
                passwordTag[1].setAttribute("type", "password")
                return true
            })
            
            
        } else {
            passwordTag[0].setAttribute("type", "text")
            passwordTag[1].setAttribute("type", "text")
            setVisibility(false)
            

        }
    }

    useEffect(() => {
        const isLogin = state.loginInfo
        if (isLogin.name) {
            router.replace('/shipping')
        }
        
    },[state,router])

  return (
      <Layout title='Register' description='Register'>
          <div className={styles.registerPage}>
              
              <div className={styles.formWrapper}>
                  <div className={styles.registerIcon}><HowToRegOutlinedIcon color='info' fontSize='large'/></div>
                  <h4 className={styles.registerLinks}>
                      <NextLink href="/register"><a className={styles.active}>Register</a></NextLink>
                      <NextLink href="/login"><a>Login</a></NextLink>
                  </h4>
                  <>{isLoading && <LoadingIndicator/>}</>
                  <pre style={{ color: "red", textAlign: "center", fontWeight: "bold" }} id="error"></pre>
                  <form onSubmit={handleSubmit} className={styles.form}>
                      <div>
                          <label htmlFor='nameame'>Name</label>
                          <input type="text"  name="name" placeholder='Enter Your Full Name e.g Arya Stark' id="name" required onChange={(e)=>handleChange(e)} value={inputs.name} />
                          <pre>Enter Your Full Name In Correct Format</pre>
                      </div>

                      <div>
                          <label htmlFor='email'>Email</label>
                          <input type="email"  placeholder='Enter Your Email' name="email" id="email" required onChange={(e)=>handleChange(e)} value={inputs.email} />
                          <pre>Enter Valid Email</pre>
                      </div>

                      <div>
                          <label htmlFor='password'>Password</label>
                             <input className='password' type="password"  placeholder='Enter Your Password' name="password" id="password" required onChange={(e)=>handleChange(e)} value={inputs.password} />
                          <span className={styles.visibility} onClick={isVisible}>
                              {
                                  !visibility? <VisibilityOffIcon color="info" />: <VisibilityIcon color='warning'/>
                              }

                          </span>
                          
                          <pre>Atleast 8 Characters, Can Not Contain: {`()\\'"<>.` }</pre>
                      </div>

                      <div>
                          <label htmlFor='confirmPassword'>Confirm Password</label>
                              <input className='password'  type="password"  placeholder='Enter Your Password' name="confirmPassword" id="confirmPassword" required onChange={(e) => handleChange(e)} value={inputs.confirmPassword} />
                              <span className={styles.visibility} onClick={isVisible}>
                              {
                                  !visibility? <VisibilityOffIcon color='info'/> : <VisibilityIcon color='warning'/>
                              }

                          </span>
                          
                          <pre>Passwords Is Not Equal</pre>
                      </div>

                      <p>Already Have An Account? <Link href="/login"><a style={{color:"blue",fontWeight:"bold"}}>Login</a></Link></p>
                      <div className={styles.submitBtn}><button type='submit'>Register</button></div>
                      
                  </form>
              </div>
              
          </div>
    </Layout>
  )
}

export default RegisterScreen