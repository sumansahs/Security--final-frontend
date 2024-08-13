import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSingleProductApi, create_order } from '../apis/Api';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    getSingleProductApi(id)
      .then((res) => {
        const productData = res.data.product;
        setProduct(productData);

        // Initialize selected size and color if available
        if (productData.productSize && productData.productSize.length > 0) {
          setSelectedSize(productData.productSize[0]);
        } else {
          setSelectedSize('');
        }

        if (productData.productColor && productData.productColor.length > 0) {
          setSelectedColor(productData.productColor[0]);
        } else {
          setSelectedColor('');
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch product details.");
      });
  }, [id]);

  const handleOrderNow = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color.");
      return;
    }
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const orderData = {
      userId: storedUserData._id,
      productId: product._id,
      orderId: id.toString(),
      quantity: 1, // Default to 1 for simplicity
      size: selectedSize,
      color: selectedColor,
      productName: product.productName,
      productPrice: product.productPrice,
      productImageUrl: product.productImageUrl
    };

    navigate('/payment', { state: orderData });
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color.");
      return;
    }
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const orderData = {
      userId: storedUserData._id,
      productId: product._id,
      orderId: id.toString(),
      quantity: 1, // Default to 1 for simplicity
      size: selectedSize,
      color: selectedColor,
    };

    create_order(orderData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success("Product added to cart!");
        }
      })
      .catch((err) => {
        toast.error("Failed to add to cart.");
      });
  };

  const sizes = [24, 27, 29, 30, 31];
  const colors = [
    { name: 'green', url: 'https://www.color-hex.com/palettes/28997.png' },
    { name: 'red', url: 'https://htmlcolorcodes.com/assets/images/colors/red-color-solid-background-1920x1080.png' },
    { name: 'blue', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/5120x2880-dark-blue-solid-color-background.jpg' }
  ];

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <img
          src={product.productImageUrl}
          alt={product.productName}
          style={{ width: "50%", borderRadius: "10px" }}
        />
        <div style={{ width: "45%", paddingLeft: "20px" }}>
          <h2 style={{ color: "lightblue", fontWeight: "bold" }}>{product.productName}</h2>
          <p style={{ fontSize: "18px", color: "#333" }}>{product.productDescription}</p>
          <p style={{ fontSize: "20px", color: "#333", fontWeight: "bold" }}>Price: ${product.productPrice}</p>
          
          <div>
            <label style={{ fontSize: "18px", color: "#333" }}><strong>Size:</strong></label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', marginBottom: '20px' }}>
              {sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: '10px',
                    border: selectedSize === size ? '2px solid black' : '1px solid #ccc',
                    backgroundColor: selectedSize === size ? '#f0f0f0' : 'white',
                    cursor: 'pointer',
                    borderRadius: '5px'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "18px", color: "#333" }}><strong>Color:</strong></label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', marginBottom: '20px' }}>
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color.name)}
                  style={{
                    padding: '10px',
                    border: selectedColor === color.name ? '2px solid black' : '1px solid #ccc',
                    backgroundColor: selectedColor === color.name ? '#f0f0f0' : 'white',
                    cursor: 'pointer',
                    borderRadius: '5px'
                  }}
                >
                  <img src={color.url} alt={color.name} style={{ width: '50px', height: '50px', borderRadius: '5px' }} />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleOrderNow}
            style={{
              padding: "10px 20px",
              backgroundColor: "lightblue",
              color: "#0000FF",
              borderRadius: "5px",
              cursor: "pointer",
              border: "none",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "20px",
              marginRight: "10px"
            }}
          >
            Order Now
          </button>
          <button
            onClick={handleAddToCart}
            style={{
              padding: "10px 20px",
              backgroundColor: "#FFCC00",
              color: "#000",
              borderRadius: "5px",
              cursor: "pointer",
              border: "none",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "20px"
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
