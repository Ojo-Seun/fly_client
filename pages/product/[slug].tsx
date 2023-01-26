import { useRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Product.module.css";
import axios from "axios";
import { productType } from "../.././typeScriptTypes";
import Image from "next/image";
import { GetServerSideProps } from "next";
import RatingIcons from "../../components/RatingIcons";
import Button from "../../components/Button";
import Store from "../../utils/Store";
import ProductModel from "../../models/products.schema";
import db from "../../utils/db";
import LoadingIndicator from "../../components/LoadingIndicator";
import dynamic from "next/dynamic";

function ProductScreen({ product }: productType) {
  const [loading, setLoading] = useState(true);
  const [productImage, setProductImage] = useState("");
  const [updatedItem, setUpdatedItem] = useState({ qty: 0 });
  const [qtyValue, setQtyValue] = useState(1);
  const router = useRouter();
  const { slug } = router.query;
  const { state, dispatch } = useContext(Store);
  const { cartItems } = state.cart;
  console.log(product);

  const handleMouseOver = (e: any) => {
    const target = e.target;
    setProductImage(target.classList[0]);
  };

  const changeQuantity = (operation: "-" | "+") => {
    if (operation === "-") {
      setQtyValue((prev) => prev - 1);
      dispatch({ type: "REDUCE_ITEM_QTY", payload: updatedItem });

      return;
    }
    setQtyValue((prev) => prev + 1);
    dispatch({ type: "INCREASE_ITEM_QTY", payload: updatedItem });
  };

  const getDeliveryDate = () => {
    let date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toLocaleDateString();
  };

  const handleClick = () => {
    const item =
      updatedItem.qty > 0 ? updatedItem : { ...product, qty: qtyValue };
    dispatch({ type: "ADD_ITEM", payload: item });
    router.push("/shopping-cart");
  };

  useEffect(() => {
    if (product.name) {
      setLoading(false);
    }
  }, [product]);

  useEffect(() => {
    //UPDATE INITIAL ITEM AND QUANTITY AT FIRST RENDER
    const item = cartItems.find((x) => x.slug === slug);
    if (item) {
      setUpdatedItem(item);
      setQtyValue(item.qty);
    }
  }, [cartItems, slug]);

  if (loading) {
    return (
      <div>
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <Layout title="Product" description="Product Details">
      <div style={{ color: "white" }} className={styles.productPage}>
        <div className={styles.grid}>
          <div className={styles.item1}>
            <div className={styles.productImage}>
              <Image
                id="productImage"
                src={productImage || product.image[0]}
                alt={product.name}
                width={300}
                height={300}
                layout="intrinsic"
              />
            </div>
            <div className={styles.smallImageContainer}>
              <div className={styles.smallImages}>
                {product.image.map((x, index) => (
                  <div key={index} className={styles.img}>
                    <Image
                      className={x}
                      layout="responsive"
                      onMouseOver={(e) => handleMouseOver(e)}
                      src={x}
                      alt={product.name}
                      width={100}
                      height={100}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.item2}>
            <div>
              <h3 className={styles.productName}>{product.name}</h3>
              <div className={styles.rating}>
                <RatingIcons value={product.rating} />
                <h3>{product.rating}</h3>
              </div>
            </div>
            <h3>${product.price}</h3>
            <div>
              <div className={styles.qtyBtn}>
                <button
                  type="button"
                  onClick={(e) => changeQuantity("-")}
                  disabled={qtyValue === 1}
                >
                  -
                </button>
                <span>{qtyValue}</span>
                <button
                  type="button"
                  onClick={(e) => changeQuantity("+")}
                  disabled={qtyValue === product.countInStock}
                >
                  +
                </button>
              </div>
            </div>

            <div style={{ color: "black" }}>
              <span>Shipping: ${(product.price / 90).toFixed()}</span> <br />
              <span>Delivery Date: {getDeliveryDate()}</span>
            </div>
          </div>

          <div className={styles.item3}>
            <h3 style={{ color: "black", textAlign: "center" }}>Summary</h3>
            <div>
              <div className={styles.productPrice}>
                <strong>Price</strong>
                <span>${product.price}</span>
              </div>
              <div className={styles.productQty}>
                <strong>Quantity</strong>
                <span>{qtyValue}</span>
              </div>
              <div className={styles.subTotal}>
                <strong>Sub-Total</strong>
                <span>${product.price * qtyValue}</span>
              </div>
              <div className={styles.shipping}>
                <strong>Shipping</strong>
                <span>${(product.price / 90).toFixed()}</span>
              </div>

              <hr style={{ border: "1px solid black" }} />
              <div className={styles.productTotal}>
                <strong>Total</strong>
                <span>
                  ${(product.price * qtyValue + product.price / 90).toFixed()}
                </span>
              </div>
            </div>

            <div style={{ textAlign: "start" }}>
              {qtyValue < product.countInStock ? (
                <strong style={{ color: "green" }}>In Stock</strong>
              ) : (
                <strong style={{ color: "red" }}>Out Of Stock</strong>
              )}
            </div>

            <div style={{ textAlign: "center" }}>
              <Button
                id={product.slug}
                text="ADD TO CART"
                length="fw"
                handleClick={handleClick}
              />
            </div>
          </div>

          <div className={styles.item4}>
            <h2 style={{ textAlign: "center" }}>Specifications</h2>
            <ul className={styles.specs}>
              <li>Brand: {product.brand}</li>
              <li>
                Dimensions: {product.dimention.height} X{" "}
                {product.dimention.width}
              </li>
              <li>Total Weight: {product.totalWeigth}</li>
              <li>Max Payload: {product.maxPayload}</li>
              <li>Speed: {product.speed}</li>
              <li>Endurance: {product.endurace}</li>
              <li>Usage: {product.usage}</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default dynamic(() => Promise.resolve(ProductScreen), {
  ssr: false,
  loading: () => <LoadingIndicator />,
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  const product = await ProductModel.findOne({ slug: slug }).lean();

  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
};
