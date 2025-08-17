let cartItems = [];

export const Cart = {
  addItem: (product) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({ product, quantity: 1 });
    }
  },
  getItems: () => {
    return cartItems;
  },
  getTotal: () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },
  clearCart: () => {
    cartItems = [];
  },
};
export const CartUtils = {
  isEmpty: () => {
    return cartItems.length === 0;
  },
  removeItem: (productId) => {
    cartItems = cartItems.filter(item => item.product.id !== productId);
  },
  updateQuantity: (productId, quantity) => {
    const item = cartItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        CartUtils.removeItem(productId);
      }
    }
  }
};

