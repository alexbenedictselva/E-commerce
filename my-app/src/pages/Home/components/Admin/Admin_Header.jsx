import React from 'react'

import '../Header.css';
import LOGO from '../../../image/logo.dr.png'
import { Link,useNavigate } from 'react-router-dom';

const Admin_Header = () => {
  const navigate = useNavigate();
  const GotoHome = () => {
    navigate('/');
  }
  return (
    <div>
      <section id="header">
        <img onClick={GotoHome} src={LOGO} alt='' />
        <div >
            <ul id="navbar" className="navAdmin">
                <Link to='/admin' className='link'><li>Home</li></Link>
                <Link to='/admin/addProduct' className='link'><li>Add Products</li></Link>
                {/* <Link to='/shop' className='link'><li>Update Products</li></Link> */}
                {/* <Link to='/' className='link'><li>Delete Products</li></Link> */}
            </ul>
        </div>
          </section>
    </div>
  )
}

export default Admin_Header

// UploadImage.js
// import React, { useState } from "react";
// import axios from "axios";

// const Admin_Header = () => {
//   const [image, setImage] = useState(null);
//   const [uploadedUrl, setUploadedUrl] = useState("");

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!image) return alert("Please select an image");

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const res = await axios.post("http://localhost:5000/api/upload-image", formData);
//       setUploadedUrl(res.data.url); 
//       alert("Image uploaded successfully");
//     } catch (err) {
//       console.error("Upload error", err);
//       alert("Upload failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Upload Image to Cloudinary</h2>
//       <input type="file" onChange={handleImageChange} />
//       <button onClick={handleUpload}>Upload</button>

//       {uploadedUrl && (
//         <div>
//           <h4>Image Preview:</h4>
//           <img src={uploadedUrl} alt="Uploaded" width="300" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default  Admin_Header;
