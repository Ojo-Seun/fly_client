import { useRouter } from 'next/router'
import React,{useContext} from 'react'
import styles from '../styles/LogInOutBtn.module.css'
import Store from '../utils/Store'

function LogoutButton() {
    const router = useRouter()
    const { state, dispatch } = useContext(Store)
    

    const handleClick = () => {
      dispatch({ type: "LOGOUT" })
      router.replace('/')
}

  return (
    <button type='button' onClick={handleClick} className={styles.logInOutBtn}>Logout</button>
  )
}

export default LogoutButton