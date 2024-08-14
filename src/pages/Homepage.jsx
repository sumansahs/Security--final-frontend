import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";  // Use useNavigate instead of useHistory
import { toast } from "react-toastify";
import { create_order, getAllProductsApi } from "../apis/Api";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchQueryUsers, setSearchQueryUsers] = useState("");
  const [cart, setCart] = useState([]);
  const [cartValue, setCartValue] = useState(1);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  useEffect(() => {
    getAllProductsApi().then((res) => {
      setProducts(res.data.products);
    });

    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData); // Set the user data on component mount
  }, []);

  const handleSearchUsers = (e) => {
    e.preventDefault();
    const filteredUsers = products.filter((product) => {
      const lowerCaseQuery = searchQueryUsers.toLowerCase();
      return product.productName.toLowerCase().includes(lowerCaseQuery);
    });
    setProducts(filteredUsers);
  };
  ///home page 

  const addToCart = (index) => {
    if (!userData) {
      // Redirect to login page if the user is not authenticated
      toast.info("Please log in to add items to your cart.");
      navigate("/login");  // Use navigate instead of history.push
      return;
    }

    const productToAdd = products[index]; 

    if (!cart.find((item) => item.id === productToAdd._id)) {
      const orderData = {
        userId: userData._id,
        productId: productToAdd._id,
        orderId: index.toString(),
        quantity: cartValue,
      };

      create_order(orderData)
        .then((res) => {
          if (res.data.success === false) {
            toast.error(res.data.message);
          } else {
            setCart([
              ...cart,
              {
                id: productToAdd._id,
                name: productToAdd.productName,
                price: productToAdd.productPrice,
                quantity: cartValue,
                orderId: res.data.order.orderId,
              },
            ]);
            toast.success("Item added to cart!");
          }
        })
        .catch((err) => {
          toast.error("Server Error");
          console.log(err.message);
        });
    } else {
      toast.error("Item is already in the cart!");
    }
  };

  const addToFavorites = (index) => {
    const productToAdd = products[index];
    const favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts")) || [];
    
    if (!favoriteProducts.find(item => item.id === productToAdd._id)) {
      favoriteProducts.push({
        id: productToAdd._id,
        name: productToAdd.productName,
        description: productToAdd.productDescription,
        productImageUrl: productToAdd.productImageUrl
      });
      localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
      toast.success(`${productToAdd.productName} added to favorites!`);
    } else {
      toast.error("Item is already in favorites!");
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "30px" }}>
      <h1 style={{ textAlign: "center", color: "lightblue", fontWeight: "bold" }}>
        Walk with Confidence, Stand Out
      </h1>

      <Slider {...sliderSettings}>
        <div>
          <img
            src="https://abrosshoes.com/cdn/shop/files/Desktop_Banners_0002_ASSG-1302_3200x1200-01-01-01.jpg?v=1711141356&width=2600"
            alt="Introduction"
            style={{ height: "500px", width: "100%", borderRadius: "10px" }}
          />
        </div>
        <div>
          <img
            src="https://abrosshoes.com/cdn/shop/files/Desktop_Banners_0001_Drift_3200x1200-01.jpg?v=1711141355&width=2600"
            alt="Second Slide"
            style={{ height: "500px", width: "100%", borderRadius: "10px" }}
          />
        </div>
      </Slider>

      <form className="d-flex me-2" onSubmit={handleSearchUsers}>
        <input
          className="form-control me-2"
          type="text"
          placeholder="Search Product..."
          aria-label="Search"
          value={searchQueryUsers}
          onChange={(e) => setSearchQueryUsers(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginTop: "10px",
          }}
        />
        <button
          className="btn btn-outline-success"
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "5px",
            color: "#808080",
            border: "1px solid #ccc",
            marginTop: "10px",
          }}
        >
          Search
        </button>
      </form>

      <h2
        style={{
          textAlign: "center",
          color: "lightblue",
          fontWeight: "bold",
          marginTop: "20px",
        }}
      >
        Best selling Performers
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        {products.map((product, index) => (
          <div
            key={product._id}
            style={{
              margin: "20px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              textAlign: "center",
              width: "300px"
            }}
          >
            <img
              src={product.productImageUrl}
              alt={product.productName}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <h3 style={{ marginTop: "10px", color: "#333" }}>
              {product.productName}
            </h3>
            <h3 style={{ marginTop: "10px", color: "#333" }}>
              {product.productPrice}
            </h3>
            <Link to={`/product/${product._id}`}>
              <button
                style={{
                  padding: "5px 10px",
                  background: "lightblue",
                  color: "#0000FF",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Order Now
              </button>
            </Link>
            <button
              onClick={() => addToCart(index)}
              style={{
                padding: "10px",
                background: "transparent",
                color: "#0000FF",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "10px",
                border: "none",
              }}
            >
              <FiShoppingCart size={25} />
            </button>
            <button
              onClick={() => addToFavorites(index)}
              style={{
                padding: "10px",
                background: "transparent",
                color: "#FF0000",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "10px",
                border: "none",
              }}
            >
              <FiHeart size={25} />
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            width: "300px",
            height: "400px",
            textAlign: "left",
            padding: "20px",
            backgroundColor: "lightblue",
            borderRadius: "0px",
          }}
        >
          <h3 style={{ fontWeight: "bold", color: "black" }}>Our Services</h3>
          <ul>
            <li>Buy Sneaker and Accessories</li>
            <li>Sneakers Consultation</li>
            <li>Sneaker Installation</li>
          </ul>
        </div>
        <div
          style={{
            textAlign: "left",
            padding: "20px",
            backgroundColor: "lightblue",
            borderRadius: "0px",
          }}
        >
          <h3 style={{ fontWeight: "bold", color: "black" }}>Location</h3>
          <ul>
            <li>Visit Office</li>
            <span>Nahar Marg, New Baneshwor</span>
            <span>Shanti Marga, Tinkune</span>
          </ul>
        </div>
        <div
          style={{
            textAlign: "left",
            padding: "20px",
            backgroundColor: "lightblue",
            borderRadius: "0px",
          }}
        >
          <h3 style={{ fontWeight: "bold", color: "black" }}>Contacts</h3>
          <ul>
            <li>Call any time</li>
            <span>9814835192</span>
            <li>Send Email</li>
            <span>sumansah@gmail.com</span>
          </ul>
        </div>
        <div
          style={{
            textAlign: "left",
            padding: "20px",
            backgroundColor: "lightblue",
            borderRadius: "0px",
          }}
        >
          <h3 style={{ fontWeight: "bold", color: "black" }}>About Us</h3>
          <ul>
            <li>Who We Are</li>
            <li>Our Story</li>
            <li>Working at Sneaker</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
