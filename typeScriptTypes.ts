

export type productsType = {
    products: {
    
        id: number,
        name: string,
        slug: string,
        price: number,
        brand: string,
        maxPayload: string,
        endurace: string,
        speed: string,
        usage: string,
        dimention: {
          height: string,
          width: string,
        },
        totalWeigth: string,
        countInStock: number,
        rating: number,
        sellerName: string,
        image: string[],
        _id:string
        category: string,
}[]
}

export type productType = {
    product: {
        id: number,
        name: string,
        slug: string,
        price: number,
        brand: string,
        maxPayload: string,
        endurace: string,
        speed: string,
        usage: string,
        dimention: {
          height: string,
          width: string,
        },
        totalWeigth: string,
        countInStock: number,
        rating: number,
        sellerName: string,
        image: string[],
        category: string,
    }
}


export const productInitialValues = [{

        id: 0,
        name: "",
        slug: "",
        price: 0,
        brand: "",
        maxPayload: "",
        endurace: "",
        speed: "",
        usage: "",
        dimention: {
          height: "",
          width: '',
        },
        totalWeigth: '',
        countInStock: 0,
        rating: 0,
        sellerName: "",
        image: [''],
        category: "",
        qty: 0,
        _id:""
}]

export const initialProduct = {
        id: 0,
        name: "",
        slug: "",
        price: 0,
        brand: "",
        maxPayload: "",
        endurace: "",
        speed: "",
        usage: "",
        dimention: {
          height: "",
          width: '',
        },
        totalWeigth: '',
        countInStock: 0,
        rating: 0,
        sellerName: "",
        image: [''],
        category: "",
        qty: 0,
        _id:""

}

export type stateType = {
  cart: {
    cartItems: {
      id: number,
        name: string,
        slug: string,
        price: number,
        brand: string,
        maxPayload: string,
        endurace: string,
        speed: string,
        usage: string,
        dimention: {
          height: string,
          width: string,
        },
        totalWeigth: string,
        countInStock: number,
        rating: number,
        sellerName: string,
        image: string[],
        qty: number,
        _id:string,
        category: string,
    }[],

    shippingAddress: {
      name: string,
      city: string,
      country: string,
      phoneNo: string,
      postalCode: string,
      address:string
    }

    paymentMethod:string

  },

  loginInfo: {
    name: string,
    _id: string,
    isAdmin: boolean,
    Token:string
  }
}




export type cartItemType = {

  cartItems: {
    id: number,
    name: string,
    slug: string,
    price: number,
    brand: string,
    maxPayload: string,
    endurace: string,
    speed: string,
    usage: string,
    dimention: {
      height: string,
      width: string,
    },
    totalWeigth: string,
    countInStock: number,
    rating: number,
    sellerName: string,
    image: string[],
    qty: number,
    _id:string,
    category: string,
  }[]
}


export type cartItem = {

        id: number,
        name: string,
        slug: string,
        price: number,
        brand: string,
        maxPayload: string,
        endurace: string,
        speed: string,
        usage: string,
        dimention: {
          height: string,
          width: string,
        },
        totalWeigth: string,
        countInStock: number,
        rating: number,
        sellerName: string,
        image: string[],
        qty: number,
        _id:string,
        category: string,

}