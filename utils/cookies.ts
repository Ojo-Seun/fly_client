import Cookies from 'js-cookie'
  
class Cookie{

readonly date: Date
   static expire:number
  
  constructor() {
    this.date = new Date()
    Cookie.expire = this.date.getDate() + 7
  }
  

  static  setItems = (name: string, value: any) => {
       Cookies.set(name,JSON.stringify(value),{expires:this.expire})
    
  }
  
   static  getItems = (name: string, defaultValue: any) => {
     const cartItems = Cookies.get(name) ? JSON.parse(Cookies.get(name)!) : defaultValue
    
    return cartItems
  }

  static removeKey = (keyName: string) => {
    Cookies.remove(keyName)
  }
  }
    


 




export default Cookie