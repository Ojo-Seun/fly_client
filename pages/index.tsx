import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { productsType } from "../typeScriptTypes";
import ProductModel from "../models/products.schema";
import db from "../utils/db";

import dynamic from "next/dynamic";
import LoadingIndicator from "../components/LoadingIndicator";
import QuadcopterList from "../components/QuadcopterList";
import FixedWing from "../components/FixedWing";

const Home: NextPage<productsType> = ({ products }: productsType) => {
  const [rederFixedWingDrones, setRederFixedWingDrones] = useState(false);
  const router = useRouter();

  useEffect(() => {
    
    const render = () => {
      if (window.scrollY > 200) {
        setRederFixedWingDrones(true)
      }
    }

    window.addEventListener("scroll", render)
    return () => {
      window.removeEventListener("scroll", render)
    }
  }, []);

  return (
    <Layout title="Home" description="Drones Sales Website">
      <div className="homePage">
        {products.length === 0 ? (
          <div>Error In Connection Please Try To Refresh</div>
        ) : (
          <>
            <QuadcopterList products={products} />
            {rederFixedWingDrones && <FixedWing />}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home

export const getServerSideProps: GetServerSideProps = async (cx) => {
  db.connect();

  try {
    const res = await ProductModel.find({category:"quadcopter"}).lean();
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
