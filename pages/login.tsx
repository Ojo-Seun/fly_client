import React, {useContext, useEffect, useState} from 'react'
import Layout from '../components/Layout';
import NextLink from 'next/link'
import Link from 'next/link'
import validateInput from '../utils/validateInputs';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator';
import Store from '../utils/Store';
import { useRouter } from 'next/router';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import styles from '../styles/Login.module.css'
import { baseUrl } from '../utils/url';

function LoginScreen() {
  const [inputs, setInputs] = useState({email: "", password: "" })
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

        


         setIsLoading(true)

        axios.post(`${baseUrl}/api/users/login`, inputs)
            .then(res => {
                setIsLoading(false)
                errorTag.textContent = res.data.message

                // CHECK IF DATA IS AN OBJECT OR STRING
                if (res.data.Token) {
                    const { message, ...loginInfo } = res.data
                    dispatch({ type: "SET_LOGIN_INFO", payload: loginInfo })
                    router.replace('/')

                }

            }).catch(err => {
                setIsLoading(false)
                errorTag.textContent = err.response? err.response.data.message: err.message
        })

        
    }

        // Toggle Password
    const isVisible = () => {
        const passwordTag = document.getElementsByClassName('password')[0]
        if (!visibility) {
            setVisibility(state => {
                passwordTag.setAttribute("type", "password")
                return true
            })
            
            
        } else {
            passwordTag.setAttribute("type", "text")
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
    <Layout title='Login' description='Login'>
          <div className={styles.loginPage}>
              
              <div className={styles.formWrapper}>
                  <div className={styles.loginIcon}><LockOpenOutlinedIcon color='info' fontSize='large'/></div>
                  <h4 className={styles.loginLinks}>
                      <NextLink href="/register"><a >Register</a></NextLink>
                      <NextLink href="/login"><a className={styles.active}>Login</a></NextLink>
                  </h4>
                  <>{isLoading && <LoadingIndicator/>}</>
                  <pre style={{ color: "red", textAlign: "center", fontWeight: "bold" }} id="error"></pre>
                  <form onSubmit={handleSubmit} className={styles.form}>
                      

                      <div>
                          <label htmlFor='email'>Email</label>
                          <input type="email"  placeholder='Enter Your Email' name="email" id="email" required onChange={(e)=>handleChange(e)} value={inputs.email} />
                          <pre>Enter Valid Email</pre>
                      </div>

                      <div>
                          <label htmlFor='password'>Password</label>
                             <input className='password' type="password" minLength={8} placeholder='Enter Your Password' name="password" id="password" required onChange={(e)=>handleChange(e)} value={inputs.password} />
                          <span className={styles.visibility} onClick={isVisible}>
                              {
                                  !visibility? <VisibilityOffIcon color="info" />: <VisibilityIcon color='warning'/>
                              }

                          </span>
                          
                          <pre>Can Not Contain: {`()\\'"<>.` }</pre>
                      </div>

                      
                      <p>You Do not Have An Account? <Link href="/register"><a style={{color:"blue",fontWeight:"bold"}}>Register</a></Link></p>
                      <div className={styles.submitBtn}><button type='submit'>Login</button></div>
                      
                  </form>
              </div>
              
          </div>
    </Layout>
  )
}

export default LoginScreen
