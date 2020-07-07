// const LOCAL_STORAGE_KEY = 'tensorplace';
// const CART_KEY = 'cart';
const ORDER = 'order';

class Session {
  constructor() {
    // if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
    //   this.token = localStorage.getItem(LOCAL_STORAGE_KEY);
    // }

    // if (localStorage.getItem(CART_KEY)) {
    //   this.cart = localStorage.getItem(CART_KEY);
    // }

    if (localStorage.getItem(ORDER)) {
      this.order = localStorage.getItem(ORDER);
    }
  }

  // isLoggedIn() {
  //   return !!this.token;
  // }

  // setToken(token) {
  //   this.token = token;
  //   localStorage.setItem(LOCAL_STORAGE_KEY, this.token);
  // }

  // removeToken() {
  //   this.token = null;
  //   localStorage.removeItem(LOCAL_STORAGE_KEY);
  // }

  // setCartData(product) {
  //     let productArr = [];

  //     if (this.cart) {
  //         productArr = JSON.parse(this.cart);
  //     }

  //     if (!productArr.find(item => item.uid === product.uid)) {
  //         productArr.push(product);
  //     }

  //     localStorage.setItem(CART_KEY, JSON.stringify(product));
  //     this.cart = localStorage.getItem(CART_KEY);

  //     return this.cart;
  // }

  // getCartData() {
  //     if (localStorage.getItem(CART_KEY)) {
  //         return JSON.parse(localStorage.getItem(CART_KEY));
  //     }
  // }

  // removeCartData() {
  //     localStorage.removeItem(CART_KEY);
  // }

  removeOrderData() {
    localStorage.removeItem(ORDER);
  }


  setOrder(order) {
    this.order = localStorage.setItem(ORDER, JSON.stringify(order));
  }

  getOrder() {
    if (localStorage.getItem(ORDER)) {
      return JSON.parse(localStorage.getItem(ORDER));
    }
  }

  // logout() {
  //   this.removeToken();
  // }
}

export const session = new Session();
