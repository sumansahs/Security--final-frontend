import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productName, productPrice, productImageUrl, size, color } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [errors, setErrors] = useState({});

  if (!productName || !productPrice || !productImageUrl || !size || !color) {
    return <div style={styles.missingDetails}>Missing product details. Please go back and select a product.</div>;
  }

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
    navigate('/success');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Payment Page</h2>
      <div style={styles.productDetails}>
        <img
          src={productImageUrl}
          alt={productName}
          style={styles.productImage}
        />
        <div style={styles.productInfo}>
          <h2 style={styles.productName}>{productName}</h2>
          <p style={styles.productText}>Size: {size}</p>
          <p style={styles.productText}>Color: {color}</p>
          <p style={styles.productPrice}>Price: ${productPrice}</p>
        </div>
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
          <button type="submit" style={styles.payButton}>Pay Now</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "30px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
  },
  heading: {
    color: "lightblue",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px"
  },
  productDetails: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    borderRadius: "10px",
    overflow: "hidden"
  },
  productImage: {
    width: "40%",
    objectFit: "cover"
  },
  productInfo: {
    width: "55%",
    paddingLeft: "20px"
  },
  productName: {
    color: "lightblue",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  productText: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "5px"
  },
  productPrice: {
    fontSize: "20px",
    color: "#333",
    fontWeight: "bold"
  },
  form: {
    marginTop: "20px"
  },
  subHeading: {
    color: "#333",
    textAlign: "center",
    marginBottom: "20px"
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
  missingDetails: {
    fontFamily: "Arial, sans-serif",
    padding: "30px",
    textAlign: "center",
    color: "#ff0000",
    fontWeight: "bold"
  }
};

export default Payment;
