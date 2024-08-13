import React, { useState } from 'react';
import { registerApi } from '../apis/Api';
import { toast } from 'react-toastify';
import zxcvbn from 'zxcvbn';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ strength: "None", color: "black", percent: 0 });
  const [errors, setErrors] = useState({});

  const changeFirstName = (e) => setFirstName(e.target.value);
  const changeLastName = (e) => setLastName(e.target.value);
  const changeEmail = (e) => setEmail(e.target.value);

  const changePassword = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Check password strength
    const result = zxcvbn(value);
    const score = result.score;

    const strengthData = {
      0: { strength: "Weak", color: "red", percent: 25 },
      1: { strength: "Weak", color: "red", percent: 50 },
      2: { strength: "Medium", color: "yellow", percent: 75 },
      3: { strength: "Strong", color: "blue", percent: 100 },
      4: { strength: "Very Strong", color: "green", percent: 100 }
    };

    setPasswordStrength(strengthData[score] || { strength: "None", color: "black", percent: 0 });

    if (value.length < 8 || value.length > 12) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be between 8 and 12 characters long',
      }));
    } else if (
      !/[A-Z]/.test(value) ||
      !/[a-z]/.test(value) ||
      !/\d/.test(value) ||
      !/[!@#$%^&*]/.test(value)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must include uppercase, lowercase, number, and special character',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  };

  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and confirmation password don't match");
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    registerApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Internal Server Error!');
      });
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const maxLength = 12;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength || password.length > maxLength) {
      toast.error(`Password must be between ${minLength} and ${maxLength} characters.`);
      return false;
    }

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      toast.error('Password must include uppercase, lowercase, number, and special character.');
      return false;
    }

    return true;
  };

  const { strength, color, percent } = passwordStrength;

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url("https://png.pngtree.com/thumb_back/fw800/background/20231001/pngtree-vibrant-unisex-sneakers-blue-and-green-canvas-with-elevated-soles-captivating-image_13530311.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const formStyle = {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  };

  const formGroupStyle = {
    marginBottom: '1rem',
  };

  const inputStyle = {
    padding: '0.5rem',
    border: '1px solid #ced4da',
    borderRadius: '0.25rem',
    width: '100%',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#0000FF',
    color: 'white',
    padding: '0.5rem 0',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  };

  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create an Account!</h1>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label>Firstname</label>
            <input 
              style={inputStyle}
              onChange={changeFirstName} 
              type="text" 
              placeholder="Enter your firstname" 
              required 
            />
          </div>
          <div style={formGroupStyle}>
            <label>Lastname</label>
            <input 
              style={inputStyle}
              onChange={changeLastName} 
              type="text" 
              placeholder="Enter your lastname" 
              required 
            />
          </div>
          <div style={formGroupStyle}>
            <label>Email</label>
            <input 
              style={inputStyle}
              onChange={changeEmail} 
              type="email" 
              placeholder="Enter your email" 
              required 
            />
          </div>
          <div style={formGroupStyle}>
            <label>Password</label>
            <input 
              style={inputStyle}
              onChange={changePassword} 
              type="password" 
              placeholder="Enter your password" 
              required 
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
              
            {/* Display password strength */}
            <div style={{ color, marginBottom: "10px" }}>
              Password Strength: {strength}
            </div>
            <div style={{
              height: "10px",
              width: "100%",
              backgroundColor: "#e0e0e0",
              borderRadius: "5px",
              marginBottom: "10px"
            }}>
              <div
                style={{
                  height: "100%",
                  width: `${percent}%`,
                  backgroundColor: color,
                  borderRadius: "5px",
                }}
              ></div>
            </div>
          </div>
          <div style={formGroupStyle}>
            <label>Confirm Password</label>
            <input 
              style={inputStyle}
              onChange={changeConfirmPassword} 
              type="password" 
              placeholder="Confirm your password" 
              required 
            />
          </div>
          <button style={buttonStyle} type="submit">Submit</button>
          <p style={{ marginTop: '1rem', textAlign: 'center' }}>
            Already have an account? <a href="login" style={linkStyle}>Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;



// import React, { useState } from 'react';
// import { registerApi } from '../apis/Api';
// import { toast } from 'react-toastify';
// import zxcvbn from 'zxcvbn';

// const Register = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [passwordStrength, setPasswordStrength] = useState({ strength: "None", color: "black", percent: 0 });
//   const [errors, setErrors] = useState({});

//   const changeFirstName = (e) => {
//     const value = e.target.value;
//     if (/^[a-zA-Z\s]*$/.test(value)) {
//       setFirstName(value);
//       setErrors((prevErrors) => ({ ...prevErrors, firstName: '' }));
//     } else {
//       setErrors((prevErrors) => ({ ...prevErrors, firstName: 'First name can only contain letters' }));
//     }
//   };

//   const changeLastName = (e) => {
//     const value = e.target.value;
//     if (/^[a-zA-Z\s]*$/.test(value)) {
//       setLastName(value);
//       setErrors((prevErrors) => ({ ...prevErrors, lastName: '' }));
//     } else {
//       setErrors((prevErrors) => ({ ...prevErrors, lastName: 'Last name can only contain letters' }));
//     }
//   };

//   const changeEmail = (e) => setEmail(e.target.value);

//   const changePassword = (e) => {
//     const value = e.target.value;
//     setPassword(value);

//     const result = zxcvbn(value);
//     const score = result.score;

//     const strengthData = {
//       0: { strength: "Weak", color: "red", percent: 25 },
//       1: { strength: "Weak", color: "red", percent: 50 },
//       2: { strength: "Medium", color: "yellow", percent: 75 },
//       3: { strength: "Strong", color: "blue", percent: 100 },
//       4: { strength: "Very Strong", color: "green", percent: 100 }
//     };

//     setPasswordStrength(strengthData[score] || { strength: "None", color: "black", percent: 0 });

//     if (value.length < 8 || value.length > 12) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         password: 'Password must be between 8 and 12 characters long',
//       }));
//     } else if (
//       !/[A-Z]/.test(value) ||
//       !/[a-z]/.test(value) ||
//       !/\d/.test(value) ||
//       !/[!@#$%^&*]/.test(value)
//     ) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         password: 'Password must include uppercase, lowercase, number, and special character',
//       }));
//     } else {
//       setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
//     }
//   };

//   const changeConfirmPassword = (e) => {
//     setConfirmPassword(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!firstName || !lastName || !email || !password || !confirmPassword) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     if (errors.firstName || errors.lastName || errors.password) {
//       toast.error('Please fix the errors before submitting');
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("Password and confirmation password don't match");
//       return;
//     }

//     const data = {
//       firstName,
//       lastName,
//       email,
//       password,
//     };

//     registerApi(data)
//       .then((res) => {
//         if (res.data.success === true) {
//           toast.success(res.data.message);
//         } else {
//           toast.error(res.data.message);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error('Internal Server Error!');
//       });
//   };

//   const { strength, color, percent } = passwordStrength;

//   return (
//     <div className="container-fluid vh-100">
//       <div className="row h-100">
//         <div className="col-md-6 d-none d-md-block" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/still-life-with-indoor-plants_23-2151024954.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
//           {/* This div is for the background image */}
//         </div>
//         <div className="col-md-6 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#FFFFFF' }}>
//           <div className="col-md-8 col-lg-6">
//             <div className="card p-4" style={{ backgroundColor: '#FFFFFF', borderRadius: '15px', boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', border: '2px solid black' }}>
//               <h1 className="mb-4 text-center" style={{ color: '#008000', fontSize: '2.5rem', fontWeight: 'bold' }}>Plant Shop</h1>
//               <h2 className="mb-4 text-center" style={{ color: '#000000', fontSize: '1rem' }}>Create an account</h2>
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label className="form-label" style={{ color: '#6D6875', fontWeight: 'bold' }}>First Name</label>
//                   <input 
//                     onChange={changeFirstName} 
//                     className="form-control" 
//                     type="text" 
//                     placeholder="Enter your first name" 
//                     required 
//                   />
//                   {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label" style={{ color: '#6D6875', fontWeight: 'bold' }}>Last Name</label>
//                   <input 
//                     onChange={changeLastName} 
//                     className="form-control" 
//                     type="text" 
//                     placeholder="Enter your last name" 
//                     required 
//                   />
//                   {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label" style={{ color: '#6D6875', fontWeight: 'bold' }}>Email Address</label>
//                   <input 
//                     onChange={changeEmail} 
//                     className="form-control" 
//                     type="email" 
//                     placeholder="Enter your email" 
//                     required 
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label" style={{ color: '#6D6875', fontWeight: 'bold' }}>Password</label>
//                   <input 
//                     onChange={changePassword} 
//                     className="form-control" 
//                     type="password" 
//                     placeholder="Enter your password" 
//                     required 
//                   />
//                   {errors.password && <div className="text-danger">{errors.password}</div>}
                  
//                   {/* Display password strength */}
//                   <div style={{ color, marginBottom: "10px" }}>
//                     Password Strength: {strength}
//                   </div>
//                   <div style={{
//                     height: "10px",  // Thinner bar height
//                     width: "100%",
//                     backgroundColor: "#e0e0e0",
//                     borderRadius: "5px",
//                     marginBottom: "10px"
//                   }}>
//                     <div
//                       style={{
//                         height: "100%",
//                         width: `${percent}%`, // Corrected here
//                         backgroundColor: color,
//                         borderRadius: "5px",
//                       }}
//                     ></div>
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label" style={{ color: '#6D6875', fontWeight: 'bold' }}>Confirm Password</label>
//                   <input 
//                     onChange={changeConfirmPassword} 
//                     className="form-control" 
//                     type="password" 
//                     placeholder="Confirm your password" 
//                     required 
//                   />
//                 </div>
//                 <button className="btn btn-danger w-100" type="submit" style={{ background: '#F0575D', border: 'none', fontWeight: 'bold', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>Submit</button>
//                 <p className="mt-3 text-center" style={{ color: '#000000', fontSize: '0.9rem' }}>Already have an account? <a href="login" className="text-decoration-none" style={{ color: '#000000' }}>Login here</a></p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
