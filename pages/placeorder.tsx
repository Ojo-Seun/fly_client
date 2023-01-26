import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Store from "../utils/Store";
import styles from "../styles/PlaceOrder.module.css";
import dynamic from "next/dynamic";
import Image from "next/image";
import axios from "axios";
import LoadingIndicator from "../components/LoadingIndicator";
import PaymentSummary from "../components/PaymentSummary";
import { baseUrl } from "../utils/url";

function PlaceOrder() {
  const [status, setStatus] = useState({ loading: false, error: "" });
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    loginInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 200 ? 30 : 0;
  const taxPrice = itemsPrice * 0.3;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const handleClick = () => {
    setStatus({ loading: true, error: "" });
    const orderItems = cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      image: item.image[0],
      qty: item.qty,
      _id: item._id,
    }));

    axios
      .post(
        `${baseUrl}/api/orders/create-order`,
        {
          orderItems,
          shippingAddress,
          paymentMethod,
          shippingPrice,
          taxPrice,
          totalPrice,
          itemsPrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${loginInfo.Token}`,
          },
        }
      )
      .then((res) => {
        setStatus({ loading: false, error: "" });

        router.replace(`/order/${res.data._id}`);
      })
      .catch((err) => {
        const error = err.response ? err.response.data.message : err.message;
        setStatus({ loading: false, error: error });
      });
  };

  useEffect(() => {
    if (!paymentMethod) {
      router.replace("/payment");
    }

    if (cartItems.length === 0) {
      router.replace("/");
    }
  }, [paymentMethod, router, cartItems]);
  return (
    <Layout title="Place Order" description="Place Order Page">
      <div className={styles.placeOrderPage}>
        <h2>Place Order</h2>
        <div>{status.loading && <LoadingIndicator />}</div>
        <div style={{ textAlign: "center" }}>
          {status.error && <span style={{ color: "red" }}>{status.error}</span>}
        </div>
        <div className={styles.grid}>
          <div className={styles.shoppingCart}>
            <div className={styles.shippingAddress}>
              <strong>Shipping Address</strong>
              <p>{`${shippingAddress.address} ${shippingAddress.country}`}</p>
            </div>
            <div className={styles.paymentMethod}>
              <strong>Payment Method</strong>
              <p>{paymentMethod}</p>
            </div>
            <div className={styles.orderItemsListWrapper}>
              {cartItems.map((item, index) => {
                return (
                  <div key={index} className={styles.cartItem}>
                    <div className={styles.cartItemImage}>
                      <Image
                        src={item.image[0]}
                        alt={item.name}
                        width={100}
                        height={100}
                      />
                    </div>
                    <h5>Name: {item.name}</h5>
                    <h5>
                      Price:{" "}
                      <span style={{ color: "red" }}>{`$${item.price}`}</span>
                    </h5>
                    <h5>Quantity: {item.qty}</h5>
                    <h5>
                      Total Price:{" "}
                      <span style={{ color: "red" }}>{`$${
                        item.price * item.qty
                      }`}</span>
                    </h5>
                  </div>
                );
              })}
            </div>
          </div>

          <div></div>
          <PaymentSummary
            text="PLACE ORDER"
            handleClick={handleClick}
            itemsPrice={itemsPrice}
            shippingPrice={shippingPrice}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(PlaceOrder), {
  ssr: false,
  loading: () => <LoadingIndicator />,
});
