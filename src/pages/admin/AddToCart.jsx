import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getallorderapi, deleteProductApi } from "../../apis/Api";
import { FaTrashAlt } from 'react-icons/fa';

const Cart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [errors, setErrors] = useState({});
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData);

    getallorderapi(storedUserData._id)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          const uniqueCartItems = res.data.order.reduce((acc, item) => {
            const existingItem = acc.find(i => i.productId._id === item.productId._id);
            if (existingItem) {
              existingItem.quantity += item.quantity;
            } else {
              acc.push(item);
            }
            return acc;
          }, []);
          setCart(uniqueCartItems);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  }, [id]);

  const addToCart = (product) => {
    const updatedCart = cart.map((item) =>
      item.productId._id === product.productId._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.map((item) =>
      item.productId._id === product.productId._id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  const deleteFromCart = (product) => {
    deleteProductApi(product._id)
      .then((res) => {
        if (res.data.success) {
          setCart(cart.filter((item) => item.productId._id !== product.productId._id));
          toast.success("Item removed from cart.");
        } else {
          toast.error("Failed to remove item from cart.");
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  const getTotalPrice = () => {
    return cart
      .reduce(
        (total, item) => total + item.productId.productPrice * item.quantity,
        0
      )
      .toFixed(2);
  };

  const validate = () => {
    const errors = {};
    if (!paymentMethod) {
      errors.paymentMethod = 'Payment method is required';
    }
    if (paymentMethod === 'Credit Card') {
      if (!cardNumber) {
        errors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(cardNumber)) {
        errors.cardNumber = 'Card number must be 16 digits';
      }
      if (!cardExpiry) {
        errors.cardExpiry = 'Card expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        errors.cardExpiry = 'Expiry date must be in MM/YY format';
      }
      if (!cardCVC) {
        errors.cardCVC = 'Card CVC is required';
      } else if (!/^\d{3}$/.test(cardCVC)) {
        errors.cardCVC = 'CVC must be 3 digits';
      }
    }
    return errors;
  };

  const handlePayment = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    // Perform payment processing logic here
    toast.success("Payment successful!");
    setCart([]);
    navigate('/success');
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const CartItem = ({ item, quantity, increase, decrease, remove }) => {
    return (
      <div style={styles.cartItem}>
        <img
          src={item.productId.productImageUrl}
          alt={item.productId.productName}
          style={styles.cartItemImage}
        />
        <div style={styles.cartItemInfo}>
          <h3 style={styles.cartItemName}>{item.productId.productName}</h3>
          <p style={styles.cartItemPrice}>Price: ${item.productId.productPrice}</p>
          <p style={styles.cartItemDetails}>Size: {item.size}</p>
          <p style={styles.cartItemDetails}>Color: {item.color}</p>
          <div style={styles.quantityControls}>
            <button style={styles.quantityButton} onClick={() => decrease(item)}>-</button>
            <span style={styles.quantity}>{quantity}</span>
            <button style={styles.quantityButton} onClick={() => increase(item)}>+</button>
          </div>
        </div>
        <button style={styles.removeButton} onClick={() => remove(item)}>
          <FaTrashAlt />
        </button>
      </div>
    );
  };

  if (cart.length === 0) {
    return <div style={styles.emptyCart}>Your cart is empty.</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Cart</h1>
      <div style={styles.cartItems}>
        {cart.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            quantity={item.quantity}
            increase={addToCart}
            decrease={removeFromCart}
            remove={deleteFromCart}
          />
        ))}
      </div>
      <div style={styles.cartSummary}>
        <h3>Total: ${getTotalPrice()}</h3>
      </div>

      <form onSubmit={handlePayment} style={styles.form}>
        <h3 style={styles.subHeading}>Select Payment Method</h3>
        <div style={styles.radioGroup}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="Credit Card"
              checked={paymentMethod === 'Credit Card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={styles.radioInput}
            />
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Credit Card" style={styles.paymentImage} />
            Credit Card
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={styles.radioInput}
            />
            <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal" style={styles.paymentImage} />
            PayPal
          </label>
        </div>
        {errors.paymentMethod && <div style={styles.errorText}>{errors.paymentMethod}</div>}

        {paymentMethod === 'Credit Card' && (
          <div style={styles.creditCardDetails}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Card Number:</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={styles.input}
                required
              />
              {errors.cardNumber && <div style={styles.errorText}>{errors.cardNumber}</div>}
            </div>
            <div style={styles.inputGroupRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Expiry Date:</label>
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  style={styles.input}
                  placeholder="MM/YY"
                  required
                />
                {errors.cardExpiry && <div style={styles.errorText}>{errors.cardExpiry}</div>}
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>CVC:</label>
                <input
                  type="text"
                  value={cardCVC}
                  onChange={(e) => setCardCVC(e.target.value)}
                  style={styles.input}
                  required
                />
                {errors.cardCVC && <div style={styles.errorText}>{errors.cardCVC}</div>}
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'PayPal' && (
          <div style={styles.paypalInfo}>
            <p>You will be redirected to PayPal to complete your purchase.</p>
          </div>
        )}

        <div style={styles.buttonContainer}>
          <button
            type="submit"
            style={{ ...styles.payButton, ...(isHovering ? styles.payButtonHover : {}) }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "30px",
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
  },
  heading: {
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px"
  },
  cartItems: {
    marginBottom: "30px"
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)"
  },
  cartItemImage: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "10px"
  },
  cartItemInfo: {
    flex: 1,
    paddingLeft: "20px"
  },
  cartItemName: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#333"
  },
  cartItemPrice: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "5px"
  },
  cartItemDetails: {
    fontSize: "14px",
    color: "#999"
  },
  quantityControls: {
    display: "flex",
    alignItems: "center"
  },
  quantityButton: {
    padding: "5px 10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
    margin: "0 5px"
  },
  quantity: {
    fontSize: "14px",
    color: "#333",
    margin: "0 10px"
  },
  removeButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#ff0000",
    fontSize: "20px"
  },
  cartSummary: {
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "18px",
    color: "#333"
  },
  form: {
    marginTop: "20px",
    textAlign: "center"
  },
  subHeading: {
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "20px"
  },
  radioGroup: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px"
  },
  radioLabel: {
    marginRight: "20px",
    fontSize: "16px",
    color: "#333",
    display: "flex",
    alignItems: "center"
  },
  radioInput: {
    marginRight: "5px"
  },
  paymentImage: {
    marginRight: "10px"
  },
  creditCardDetails: {
    marginBottom: "20px"
  },
  inputGroup: {
    marginBottom: "20px"
  },
  inputGroupRow: {
    display: "flex",
    gap: "20px"
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "16px",
    color: "#333"
  },
  input: {
    width: "100%",
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },
  paypalInfo: {
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "16px",
    color: "#333"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center"
  },
  payButton: {
    padding: "15px 30px",
    backgroundColor: "lightblue",
    color: "#0000FF",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s"
  },
  payButtonHover: {
    backgroundColor: "#87CEFA"
  },
  errorText: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px"
  },
  emptyCart: {
    fontFamily: "Arial, sans-serif",
    padding: "30px",
    textAlign: "center",
    color: "#ff0000",
    fontWeight: "bold"
  }
};

export default Cart;
