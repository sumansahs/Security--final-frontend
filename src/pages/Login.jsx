import React, { useState } from "react";
import { loginApi } from "../apis/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginApi({ email, password });

      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        toast.success("Logged in successfully!");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.userData));

        navigate(res.data.userData.isAdmin ? "/admin/dashboard" : "/home");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server Error!");
    }
  };

  // Inline styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: 'url("https://png.pngtree.com/thumb_back/fw800/background/20230930/pngtree-vibrant-sports-unisex-sneakers-blue-and-green-canvas-elevated-soles-3d-image_13530310.png")', // Replace with your actual URL
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 className="text-center mb-4">Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={changeEmail}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={changePassword}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { loginApi } from "../apis/Api";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const changeEmail = (e) => setEmail(e.target.value);
//   const changePassword = (e) => setPassword(e.target.value);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = {
//       email,
//       password,
//     };

//     loginApi(data)
//       .then((res) => {
//         if (res.data.success === false) {
//           toast.error(res.data.message);
//         } else {
//           toast.success(res.data.message);
//           localStorage.setItem("token", res.data.token);
//           localStorage.setItem("user", JSON.stringify(res.data.userData));
//           if (res.data.userData.isAdmin) {
//             navigate("/admin/dashboard");
//           } else {
//             navigate("/home");
//           }
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error("Server Error!");
//       });
//   };

//   return (
//     <div className="container-fluid vh-100">
//       <div className="row h-100">
//         <div className="col-md-6 d-none d-md-block" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/still-life-with-indoor-plants_23-2151024954.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
//           {/* Background image div */}
//         </div>
//         <div className="col-md-6 d-flex justify-content-center align-items-center">
//           <div className="col-md-8 col-lg-6">
//             <div className="card p-4" style={{ backgroundColor: '#FFF', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', border: '1px solid black' }}>
//               <div className="card-header" style={{ backgroundColor: '#FFF', borderRadius: '10px 10px 0 0', padding: '10px' }}>
//                 <h3 className="text-center" style={{ color: '#008000', margin: '10px 0', fontWeight: 'bold' }}>Plant Shop</h3>
//               </div>
//               <div className="card-body">
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-3">
//                     <label htmlFor="email" className="form-label" style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#6D6875', fontWeight: 'bold' }}>Email Address</label>
//                     <input 
//                       id="email" 
//                       onChange={changeEmail} 
//                       className="form-control" 
//                       type="email" 
//                       placeholder="Enter your email" 
//                       required 
//                       value={email} // Controlled input
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="password" className="form-label" style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#6D6875', fontWeight: 'bold' }}>Password</label>
//                     <div className="input-group">
//                       <input 
//                         id="password" 
//                         onChange={changePassword} 
//                         className="form-control" 
//                         type={showPassword ? "text" : "password"} 
//                         placeholder="Enter your password" 
//                         required 
//                         value={password} // Controlled input
//                       />
//                       <button
//                         className="btn btn-outline-secondary"
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
//                       </button>
//                     </div>
//                   </div>
//                   <div className="d-grid">
//                     <button className="btn btn-primary" type="submit" style={{ backgroundColor: '#6D6875', border: 'none' }}>Login</button>
//                   </div>
//                   <a href="/register" className="text-dark text-decoration-dark fw-bold" style={{ display: 'block', textAlign: 'center', marginTop: '10px', color: '#333' }}>
//                     Don't have an account? SignUp
//                   </a>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;