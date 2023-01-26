import Head from "next/head";
import Image from "next/image";
import React, { Fragment, useEffect } from "react";
import styles from "../styles/Layout.module.css";
import NextLink from "next/link";
import Banner from "./Banner";
import Hearder from "./Hearder";

type layoutPropsType = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function Layout({ title, description, children }: layoutPropsType) {
  useEffect(() => {
    if (title === "Home") {
      const banner = document.getElementById("banner") as HTMLDivElement;
      banner.style.height = "50vh";
    }
  }, [title]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
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
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by <span className={styles.logo}></span>
          </a>
        </footer>
      </div>
    </>
  );
}

export default Layout;
