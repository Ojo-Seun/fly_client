import { useRouter } from 'next/router'
import React from 'react'
import styles from '../styles/LogInOutBtn.module.css'
import Store from '../utils/Store'





function LoginButton() {
const router = useRouter()

    const handleClick = () => {
        router.push('/login')
    }

  return (
    <button type='button' onClick={handleClick} className={styles.logInOutBtn}>Login</button>
  )
}

export default LoginButton