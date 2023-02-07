import Head from "next/head"
import Image from "next/image"
import React, { Fragment, useEffect } from "react"
import styles from "../styles/Layout.module.css"
import NextLink from "next/link"
import Banner from "./Banner"
import Hearder from "./Hearder"

type layoutPropsType = {
  title: string
  description: string
  children: React.ReactNode
}

function Layout({ title, description, children }: layoutPropsType) {
  useEffect(() => {
    if (title === "Home") {
      const banner = document.getElementById("banner") as HTMLDivElement
      banner.style.height = "50vh"
    }
  }, [title])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
        />
        <link rel="icon" href="/LOGO2.svg" />
      </Head>
      <div className={styles.container}>
        <Fragment>
          {title === "Home" ? (
            <div id="banner" className={styles.banner}>
              <Banner />
            </div>
          ) : (
            <Hearder />
          )}
        </Fragment>

        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
          <span>All Right Reserved By Code Base &#64;2023</span>
        </footer>
      </div>
    </>
  )
}

export default Layout
