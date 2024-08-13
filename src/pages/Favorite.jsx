import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { create_order } from '../apis/Api';
import 'react-toastify/dist/ReactToastify.css';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get favorite products from local storage
    const favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
    setFavorites(favoriteProducts);
  }, []);

  const removeFromFavorites = (productId) => {
    const updatedFavorites = favorites.filter(product => product.id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteProducts', JSON.stringify(updatedFavorites));
    toast.success("Item removed from favorites!");
  };

  const addToCart = (product) => {
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    if (!storedUserData) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    const orderData = {
      userId: storedUserData._id,
      productId: product.id,
      orderId: product.id.toString(),
      quantity: 1,
    };

    create_order(orderData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success("Item added to cart!");
          navigate('/cart');
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Favorites</h1>
      {favorites.length === 0 ? (
        <p style={styles.noFavorites}>You have no favorite items.</p>
      ) : (
        <div style={styles.grid}>
          {favorites.map((product) => (
            <div key={product.id} style={styles.card}>
              <img src={product.productImageUrl} alt={product.name} style={styles.productImage} />
              <div style={styles.cardContent}>
                <h2 style={styles.productName}>{product.name}</h2>
                <p style={styles.productDescription}>{product.description}</p>
                <div style={styles.buttonGroup}>
                  <button 
                    style={styles.addToCartButton} 
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    style={styles.removeButton} 
                    onClick={() => removeFromFavorites(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center"
  },
  heading: {
    color: "#333",
    fontWeight: "bold",
    marginBottom: "20px",
    fontSize: "2rem"
  },
  noFavorites: {
    fontSize: "1.2rem",
    color: "#666"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    textAlign: "left",
    display: "flex",
    flexDirection: "column"
  },
  productImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover"
  },
  cardContent: {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  },
  productName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px"
  },
  productDescription: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "10px",
    flexGrow: 1
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px"
  },
  addToCartButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    fontSize: "1rem",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center"
  },
  removeButton: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    fontSize: "1rem",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center"
  }
};

export default Favorite;
