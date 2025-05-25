import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PopUp from "../../pop-up/popUp";
import "./ProdContent.css";
const ProdContents = () => {
  const [prod, setProd] = useState([]);
  const [Acc, setAcc] = useState(Array(5).fill(true));
  const [previewImage, setPreviewImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [popUp, setPop] = useState("");

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click(); // Programmatically click the hidden input
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Store base64 string as preview
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    const getProdDetails = async () => {
      try {
        const ProdDetails = await axios.get(
          `http://localhost:5000/api/getProd/${id}`
        );
        setProd(ProdDetails.data.message);
      } catch (e) {
        console.log("Error in displaying product details : ", e);
      }
    };
    getProdDetails();
  }, []);
  const accessable = (ind) => {
    setAcc((prev) => {
      const val = [...prev];
      val[ind] = !val[ind];
      return val;
    });
  };
  const giveToBackEnd = async () => {
    try {
      const DetailsPass = await axios.post(
        `http://localhost:5000/api/admin/updateProd/${id}`,
        {
          product: prod.product,
          image: prod.image,
          category: prod.category,
          price: prod.price,
          stock: prod.stock,
          tags: prod.tags,
        }
      );

      if (DetailsPass) {
        setPop("Updated successfully.");
        navigate(-1);
      }
    } catch (e) {
      console.log("Error at giving updated info of product :", e);
    }
  };
  const ChangePhoto = () => {};
  return (
    <div id="MainProd">
      <div id="AProdContent">
        <div className="left-side">
          <div className="contentArea alice">
            <img
              className="mainImg"
              src={previewImage || prod.image}
              alt="no img"
            />
            <i class="icon fas fa-pen" onClick={handleIconClick}></i>{" "}
            <div></div>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="right-side">
          <div className="content">
            <div className="detailsBox">
              <div className="textBox">
                <p style={{ paddingRight: "54px" }}>Name : </p>
                <div className="cen">
                  <div class="input-wrapper">
                    <input
                      type="text"
                      disabled={Acc[0]}
                      style={
                        Acc[0] ? { backgroundColor: "rgb(245, 241, 241)" } : {}
                      }
                      value={prod.product}
                      onChange={(e) =>
                        setProd({
                          ...prod,
                          product: e.target.value,
                        })
                      }
                    />
                    <i class="fas fa-pen" onClick={() => accessable(0)}></i>{" "}
                  </div>
                </div>
              </div>
              <div className="textBox">
                <p style={{ paddingRight: "20px" }}>Category : </p>
                <div className="cen">
                  <div class="input-wrapper">
                    <input
                      type="text"
                      disabled={Acc[1]}
                      style={
                        Acc[1] ? { backgroundColor: "rgb(245, 241, 241)" } : {}
                      }
                      value={prod.category}
                      onChange={(e) =>
                        setProd({
                          ...prod,
                          category: e.target.value,
                        })
                      }
                    />
                    <i class="fas fa-pen" onClick={() => accessable(1)}></i>{" "}
                  </div>
                </div>
              </div>
              <div className="textBox">
                <p style={{ paddingRight: "63px" }}>Price : </p>
                <div className="cen">
                  <div class="input-wrapper">
                    <input
                      type="number"
                      disabled={Acc[2]}
                      style={
                        Acc[2] ? { backgroundColor: "rgb(245, 241, 241)" } : {}
                      }
                      value={prod.price}
                      onChange={(e) =>
                        setProd({
                          ...prod,
                          price: e.target.value,
                        })
                      }
                    />
                    <i class="fas fa-pen" onClick={() => accessable(2)}></i>{" "}
                  </div>
                </div>
              </div>
              <div className="textBox">
                <p style={{ paddingRight: "58px" }}>Stock : </p>
                <div className="cen">
                  <div class="input-wrapper">
                    <input
                      type="number"
                      disabled={!Acc[3]}
                      style={
                        Acc[3] ? { backgroundColor: "rgb(245, 241, 241)" } : {}
                      }
                      value={prod.stock}
                      onChange={(e) =>
                        setProd({
                          ...prod,
                          stock: e.target.value,
                        })
                      }
                    />
                    <i class="fas fa-pen" onClick={() => accessable(3)}></i>{" "}
                  </div>
                </div>
              </div>
              <div className="textBox">
                <p style={{ paddingRight: "64px" }}>Tags : </p>
                <div className="cen">
                  <div class="input-wrapper">
                    <input
                      type="text"
                      disabled={Acc[4]}
                      style={
                        Acc[4] ? { backgroundColor: "rgb(245, 241, 241)" } : {}
                      }
                      value={prod.tags}
                    />
                    <i class="fas fa-pen" onClick={() => accessable(4)}></i>{" "}
                  </div>
                </div>
              </div>
              <div className="Update-div">
                <button className="Update-button" onClick={giveToBackEnd}>
                  Update details
                </button>
              </div>
            </div>
          </div>
        </div>
        {popUp && (
          <PopUp
            message="Updated Successfully"
            key={`${popUp}`}
            onClose={() => setPop("")}
          />
        )}
      </div>
    </div>
  );
};

export default ProdContents;
