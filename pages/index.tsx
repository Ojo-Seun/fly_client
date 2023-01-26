import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import Layout from "../components/Layout";
import { productsType } from "../typeScriptTypes";
import ProductModel from "../models/products.schema";
import db from "../utils/db";

import dynamic from "next/dynamic";
import LoadingIndicator from "../components/LoadingIndicator";
import ProductList from "../components/ProductList";

const Home: NextPage<productsType> = ({ products }: productsType) => {
  const router = useRouter();
  useEffect(() => {
    const card2 = document.getElementsByClassName("reveal")[0];

    const reveal = () => {
      const revealPoint = 100;
      const winHeight = window.innerHeight;
      if (revealPoint < winHeight - card2.getBoundingClientRect().top) {
        card2.classList.add("active");
      } else {
        card2.classList.remove("active");
      }
    };

    window.addEventListener("scroll", reveal);
  }, []);

  return (
    <Layout title="Home" description="Drones Sales Website">
      <div className="homePage">
        {products.length === 0 ? (
          <div>Error In Connection Please Try To Refresh</div>
        ) : (
          <Fragment>
            <ProductList products={products} />
          </Fragment>
        )}
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
  loading: () => <LoadingIndicator />,
});

export const getServerSideProps: GetServerSideProps = async (cx) => {
  db.connect();

  try {
    const res = await ProductModel.find({}).lean();
    const products = res.map((doc) => db.convertDocToObj(doc));

    return {
      props: {
        products,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
