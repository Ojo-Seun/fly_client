import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { productsType } from '../typeScriptTypes'

function QuadcopterList({ products }: productsType) {
  const router = useRouter()
  
    return (
      <section className="section" >
        <h2 style={{ textAlign: "center" }}>Quadcopter Drones</h2>
        <div className='quadcopters cardWrapper'>

          {
            products.map((product, index) => {
              return (
          <div className="card" key={product.id} onClick={()=>router.push(`/product/${product.slug}`)} title="Add To Cart">
            <div className="cardDetails">
              <strong className='productName'>{product.name}</strong>
              <strong className="price">{`$${product.price}`}</strong>
            </div>
            <Image src={product.image[0]} layout="responsive" height={350} width={350} alt={products[0].name} />
          </div>

              )
            })
          }
        </div>
            

          
        </section>

)
 
}

export default React.memo(QuadcopterList)