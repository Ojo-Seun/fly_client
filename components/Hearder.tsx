import React, {useContext,useState,useEffect} from 'react'
import styles from '../styles/Layout.module.css'
import NextLink from 'next/link'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Store from '../utils/Store';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

function Hearder() {
  const { state } = useContext(Store)
  const { cartItems } = state.cart

  return (
    <div className={styles.headerContainer}>
          <h2 className={styles.title}><NextLink href='/'>Flyhigh</NextLink></h2>
      <div className={styles.input}>
            <input type="text" placeholder='Search Product' autoFocus={true} />
            <i className={styles.search}><SearchOutlinedIcon /></i>
      </div>
      
      <div className={styles.lastColumn}>
      <div>
        {
          state.loginInfo.Token ? <LogoutButton/> : <LoginButton/>
        }
      </div>
        
      <div className={styles.countContainer} title="Cart">
        <Link href='/shopping-cart'>
          <a>
        <ShoppingCartOutlinedIcon color='info' fontSize='large' />
        
            <span className={styles.count}>{cartItems.reduce((a,c,)=> a + c.qty,0)}</span>
            </a>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default dynamic(()=>Promise.resolve(Hearder),{ssr:false})