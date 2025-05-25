import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import './delete.css';
const DeletePop_up = ({ product, deleteProduct ,SetDel,del}) => {
  const [showConfirm, setShowConfirm] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const confirmDelete = async () => {
        try {
            const DelProd = await axios.delete(`http://localhost:5000/api/admin/deleteProd/${id}`)

            if (DelProd) {
                navigate(-2);
            }
        } catch (e) {
            console.log("Error in deleting product : ",e);
        }
    }
  const handleDeleteClick = () => {
    // setShowConfirm(true);
  };

  const cancelDelete = () => {
      SetDel(!del);
  };

  return (
    <div className="product-card">
      <h3>{product}</h3>

      <div className="popup-overlay">
        <div className="popup-box">
                  <p>Do you really want to delete {product}</p>
          <button className="Yes" onClick={confirmDelete}>
            Yes
          </button>
          <button className="No" onClick={cancelDelete}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePop_up;
