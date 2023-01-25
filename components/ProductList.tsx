import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { productsType } from '../typeScriptTypes'

function ProductList({products}:productsType) {
    const router = useRouter()
    return (
        <>
            <h2 style={{textAlign:"center"}}>Quadcopter Drones</h2>
          <section className="cards1">
            
          <div className="card" onClick={()=>router.push(`/product/${products[0].slug}`)} title="Add To Cart">
            <div className="cardDetails">
              <strong className='productName'>{products[0].name}</strong>
              <strong className="price">{`$${products[0].price}`}</strong>
            </div>
            <Image src={products[0].image[0]} layout="responsive" height={350} width={350} alt={products[0].name} />
          </div>

          <div className="card centerCard" onClick={()=>router.push(`/product/${products[1].slug}`)} title='Add To Cart'>
            <div className="cardDetails">
              <strong className='productName'>{products[1].name}</strong>
              <strong className="price">{`$${products[1].price}`}</strong>
            </div>
            <Image src={products[1].image[0]} layout="responsive" placeholder="blur" blurDataURL='/quadcopter/djifpv1.jpg' height={350} width={350} alt={products[1].name} />
          </div>

          <div className="card" onClick={()=>router.push(`/product/${products[2].slug}`)} title='Add To Cart'>
            <div className="cardDetails">
              <strong className='productName'>{products[2].name}</strong>
              <strong className="price">{`$${products[2].price}`}</strong>
            </div>
            <Image src={products[2].image[0]} layout="responsive" height={350} width={350} alt={products[2].name} />
          </div>
        </section>

          <h2 className="card2Title">Fixed Wing Drones</h2>
        <section className="cards2 reveal">
          <div className="card" title='Add To Cart' onClick={()=>router.push(`/product/${products[3].slug}`)} >
            <div className="cardDetails">
              <strong className='productName'>{products[3].name}</strong>
              <strong className="price">{`$${products[3].price}`}</strong>
            </div>
            <Image src={products[3].image[0]} layout="responsive" height={350} width={350} alt={products[3].name} />
          </div>

          <div className="card centerCard" onClick={()=>router.push(`/product/${products[4].slug}`)} title='Add To Cart'>
            <div className="cardDetails">
              <strong className='productName'>{products[4].name}</strong>
              <strong className="price">{`$${products[4].price}`}</strong>
            </div>
            <Image src={products[4].image[0]} layout="responsive" placeholder="blur" blurDataURL='/quadcopter/djifpv1.jpg' height={350} width={350} alt={products[4].name} />
          </div>

          <div className="card" onClick={()=>router.push(`/product/${products[5].slug}`)} title='Add To Cart'>
            <div className="cardDetails">
              <strong className='productName'>{products[5].name}</strong>
              <strong className="price">{`$${products[5].price}`}</strong>
            </div>
            <Image src={products[5].image[0]} height={350} width={350} alt={products[5].name}  layout="responsive"/>
          </div>
        </section>
        </>
  )
}

export default ProductList