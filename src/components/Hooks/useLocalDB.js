import  { useEffect, useState } from 'react';

const useLocalDB = () => {
  const [totalAmount, setTotalAmount] = useState(0)

  const cartFromLocalStorage =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("cart"))) ||
    [];

  const [cartItems, setCartItems] = useState(cartFromLocalStorage);



  const addToCart = async (product) => {
 const exist = cartItems.find((x) => x._id === product._id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    setInterval(() => {
      window.location.reload()
    }, 1000)
  
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // This just shows if the user is loggedIn
     localStorage.setItem("cart", JSON.stringify(cartItems));

    }
  }, [cartItems]);

  useEffect(() => {
    localStorage.getItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

 
  useEffect(() => {
    const getTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

    setTotalAmount(getTotal)
  }, [cartItems])

  const tax = (totalAmount / 10).toFixed(1)
  const grandTotal = (totalAmount + Number(tax))
  const fullAmount = (grandTotal + Number(50))



  const removeFromCart = (productToRemove) => {
    setCartItems(cartItems.filter(product => product !== productToRemove))
  }


  const handleDecrement = (cartId) => {
    setCartItems(cart =>
      cart.map((item) =>
        cartId === item._id ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0)  } : item
      )
    )
  }
  
  const handleIncrement = (cartId) => {
    setCartItems(cart =>
      cart.map((item) =>
        cartId === item._id ? { ...item, quantity: item.quantity + 1  } : item
      )
    )
  }

  return {
    cartItems,
    setCartItems,
    addToCart,
    totalAmount,
    tax,
    grandTotal,
    fullAmount,
    removeFromCart,
    handleDecrement,
    handleIncrement
  }
};

export default useLocalDB;