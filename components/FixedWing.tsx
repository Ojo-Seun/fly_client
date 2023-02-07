import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import axios from "axios"
import { baseUrl } from "../utils/url"
import LoadingIndicator from "./LoadingIndicator"

interface Props {
  products: {
    image: string
    name: string
    price: number
    slug: string
    id: number
  }[]
  loading: boolean
}

function FixedWing() {
  const [data, setData] = useState<Props>({ products: [], loading: true })
  const router = useRouter()

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/products`)
      .then((res) => {
        setData({ products: res.data, loading: false })
      })
      .catch((err) => {
        setData({ products: [], loading: false })
      })
  }, [])

  if (data.loading) {
    return <LoadingIndicator />
  }
  return (
    <section className="section">
      {data.products.length > 0 && (
        <>
          <h2 style={{ textAlign: "center" }}>Fixed Wing Drones</h2>
          <div className="fixed_wing cardWrapper">
            {data.products.map((product, index) => {
              return (
                <div
                  className="card"
                  key={product.id}
                  onClick={() => router.push(`/product/${product.slug}`)}
                  title="Add To Cart"
                >
                  <div className="cardDetails">
                    <strong className="productName">{product.name}</strong>
                    <strong className="price">{`$${product.price}`}</strong>
                  </div>
                  <Image
                    src={product.image[0]}
                    layout="responsive"
                    height={350}
                    width={350}
                    alt={data.products[0].name}
                  />
                </div>
              )
            })}
          </div>
        </>
      )}
    </section>
  )
}

export default FixedWing
