import React, { useState, useEffect } from 'react'
import { createProductApi, deleteProductApi, getAllProductsApi } from '../../apis/Api'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {

    // Make useState
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [productCategory, setProductCategory] = useState('')

    // make useState for image
    const [productImage, setProductImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)

    // image upload function
    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        console.log(file)
        setProductImage(file)
        setPreviewImage(URL.createObjectURL(file))
    }

    // Load all products when page loads
    const [products, setProducts] = useState([])
    useEffect(() => {
        getAllProductsApi().then((res) => {
            setProducts(res.data.products)
        })
    }, [])

    // submit function
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('productName', productName)
        formData.append('productPrice', productPrice)
        formData.append('productDescription', productDescription)
        formData.append('productCategory', productCategory)
        formData.append('productImage', productImage)

        // send request to backend API
        createProductApi(formData).then((res) => {
            if (res.data.success == false) {
                toast.error(res.data.message)
            } else {
                toast.success(res.data.message)
            }
        }).catch((err) => {
            console.log(err)
            toast.error('Internal Server Error!')
        })

    }


    // delete product function
    const handleDelete = (id) => {

        // confirm dialog box
        const confirm = window.confirm("Are you sure you want to delete this product?")
        if(!confirm){
            return
        } else {
            deleteProductApi(id).then((res) => {
                if(res.data.success == false){
                    toast.error(res.data.message)
                } else{
                    toast.success(res.data.message)
                    window.location.reload()
                }
            })

        }

    }






    return (
        <>
            <div className='m-4'>
                <div className='d-flex justify-content-between'>
                    <h1>Admin Panel</h1>

                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add Product
                    </button>

                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Create a new product!</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                    <label>Product Name</label>
                                    <input onChange={(e) => setProductName(e.target.value)} className='form-control mb-2' type="text" name="" id="" placeholder='Enter product name' />

                                    <label htmlFor="">Product Description</label>
                                    <textarea onChange={(e) => setProductDescription(e.target.value)} className='form-control mb-2' placeholder={"Enter description"} cols="4" rows="4"></textarea>

                                    <label htmlFor="">Price</label>
                                    <input onChange={(e) => setProductPrice(e.target.value)} type="number" className='form-control mb-2' placeholder='Enter your price' />

                                    <label htmlFor="">Select category</label>
                                    <select onChange={(e) => setProductCategory(e.target.value)} className='form-control mb-2'>
                                        <option value="cartoon">cartoon</option>
                                        <option value="animation">animation</option>
                                        <option value="jokes">jokes</option>
                                        <option value="research">research</option>
                                    </select>

                                    <label>Product Image</label>
                                    <input onChange={handleImageUpload} type="file" className='form-control' />

                                    {/* Preview Image */}

                                    {
                                        previewImage && <img src={previewImage} className='img-fluid rounded object-cover mt-2' />
                                    }


                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={handleSubmit} type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <table className='table mt-2'>
                    <thead className='table-light-grey'>
                        <tr>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Product Category</th>
                            <th>Product Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        <img src={item.productImageUrl} height={40} width={40} />
                                    </td>
                                    <td>{item.productName}</td>
                                    <td>NPR.{item.productPrice}</td>
                                    <td>{item.productCategory}</td>
                                    <td>{item.productDescription.slice(0,10)}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <Link to={`/admin/edit/${item._id}`} type="button" className="btn btn-success">Edit</Link>
                                            <button onClick={() => handleDelete(item._id)} type="button" className="btn btn-danger">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        
                    </tbody>
                </table>

            </div>

        </>
    )
}

export default AdminDashboard
// import React, { useState, useEffect } from 'react';
// import { createProductApi, deleteProductApi, getAllProductsApi } from '../../apis/Api';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';

// const AdminDashboard = () => {
//     const [productName, setProductName] = useState('');
//     const [productPrice, setProductPrice] = useState('');
//     const [productDescription, setProductDescription] = useState('');
//     const [productCategory, setProductCategory] = useState('');
//     const [productImage, setProductImage] = useState(null);
//     const [previewImage, setPreviewImage] = useState(null);
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         loadProducts();
//     }, []);

//     const loadProducts = async () => {
//         try {
//             const res = await getAllProductsApi();
//             setProducts(res.data.products);
//         } catch (error) {
//             console.error('Error loading products:', error);
//             toast.error('Failed to load products');
//         }
//     };

//     const handleImageUpload = (event) => {
//         const file = event.target.files[0];
//         setProductImage(file);
//         setPreviewImage(URL.createObjectURL(file));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('productName', productName);
//         formData.append('productPrice', productPrice);
//         formData.append('productDescription', productDescription);
//         formData.append('productCategory', productCategory);
//         formData.append('productImage', productImage);

//         try {
//             const res = await createProductApi(formData);
//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 loadProducts();
//             } else {
//                 toast.error(res.data.message);
//             }
//         } catch (error) {
//             console.error('Error creating product:', error);
//             toast.error('Failed to create product');
//         }
//     };

//     const handleDelete = async (id) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this product?');
//         if (!confirmDelete) return;

//         try {
//             const res = await deleteProductApi(id);
//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 loadProducts();
//             } else {
//                 toast.error(res.data.message);
//             }
//         } catch (error) {
//             console.error('Error deleting product:', error);
//             toast.error('Failed to delete product');
//         }
//     };

//     // Placeholder function for handling View Orders
//     const handleViewOrders = () => {
//         // Implement your logic for viewing orders here
//         console.log('View Orders clicked');
//     };

//     return (
//         <div className="m-4">
//             <div className='d-flex justify-content-between'>
//                 <h1>Admin Panel</h1>

//                 <div>
//                     <button type="button" className="btn btn-success me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
//                         Add Product
//                     </button>
//                     <button type="button" className="btn btn-primary" onClick={handleViewOrders}>
//                         View Orders
//                     </button>
//                 </div>
//             </div>

//             {/* Add Product Modal */}
//             <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 {/* Modal content */}
//             </div>

//             {/* Product Table */}
//             <table className='table mt-2'>
//                 {/* Table header */}
//                 <thead className='table-dark'>
//                     <tr>
//                         <th>Product Image</th>
//                         <th>Product Name</th>
//                         <th>Product Price</th>
//                         <th>Product Category</th>
//                         <th>Product Description</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 {/* Table body */}
//                 <tbody>
//                     {/* Render products */}
//                     {products.map((item) => (
//                         <tr key={item._id}>
//                             <td>
//                                 <img src={item.productImageUrl} height={40} width={40} alt="Product" />
//                             </td>
//                             <td>{item.productName}</td>
//                             <td>NPR.{item.productPrice}</td>
//                             <td>{item.productCategory}</td>
//                             <td>{item.productDescription.slice(0, 10)}</td>
//                             <td>
//                                 <div className="btn-group" role="group" aria-label="Basic example">
//                                     <Link to={`/admin/edit/${item._id}`} type="button" className="btn btn-success">Edit</Link>
//                                     <button onClick={() => handleDelete(item._id)} type="button" className="btn btn-danger">Delete</button>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminDashboard;
