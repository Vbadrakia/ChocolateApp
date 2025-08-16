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
