import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PopUp from "../../pop-up/popUp";
import "./ProdPage.css";
const ProdPage = () => {
  const [prod, setProd] = useState([]);
  const [Acc, setAcc] = useState(Array(5).fill(true));
  const [previewImage, setPreviewImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [popUp, setPop] = useState("");
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const ChangeImage = async () => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image URL:", res.data.imageUrl);
      //   setProd({ ...prod, image: res.data.imageUrl });
      return res.data.imageUrl;
    } catch (e) {
      console.log("Error in uploading image to cloudinary :", e);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click(); // Programmatically click the hidden input
  };

  const handleFileChange = (e) => {
    const file1 = e.target.files[0];
    setFile(file1);
    if (file1) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Store base64 string as preview
      };
      reader.readAsDataURL(file1);
    }
  };
//   useEffect(() => {
//     const getProdDetails = async () => {
//       try {
//         const ProdDetails = await axios.get(
//           `http://localhost:5000/api/getProd/${id}`
//         );
//         setProd(ProdDetails.data.message);
//       } catch (e) {
//         console.log("Error in displaying product details : ", e);
//       }
//     };
//     getProdDetails();
//   }, []);
  useEffect(() => {
    console.log(prod);
  }, [prod]);
  const accessable = (ind) => {
    setAcc((prev) => {
      const val = [...prev];
      val[ind] = !val[ind];
      return val;
    });
  };
  const giveToBackEnd = async () => {
      try {
          setLoading(true);
          let GetImage = await ChangeImage();

      const data = {
        product: prod.product,
        image: GetImage,
        category: prod.category,
        price: prod.price,
        stock: prod.stock,
        tags: prod.tags,
          };
          console.log(data);

      const DetailsPass = await axios.post(
        `http://localhost:5000/api/admin/UploadProd`,
        {
          product: prod.product,
          image: GetImage,
          category: prod.category,
          price: prod.price,
          stock: prod.stock,
          tags: prod.tags,
        }
      );
          const id = DetailsPass.data.product._id;
      if (DetailsPass) {
        setPop("Added successfully.");
        navigate(`/admin/product/${id}`);
      }
    } catch (e) {
      console.log("Error at giving updated info of product :", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div id="MainProd">
      <div id="AProdContent">
        <div className="left-side">
          <div className="contentArea alice">
            <img
              className="mainImg"
              src={
                previewImage ||
                "https://res.cloudinary.com/dni5usgip/image/upload/v1748240856/6d2edb13-3168-4be7-abb2-2d53a0d35809.png"
              }
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
            required
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
                      onChange={(e) =>
                        setProd({
                          ...prod,
                          product: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="textBox">
                <p style={{ paddingRight: "20px" }}>Category : </p>
                <div className="cen">
                  <div class="input-wrapper">
                    <input
                      type="text"
                      onChange={(e) =>
                        setProd({
                          ...prod,
                          category: e.target.value,
                        })
                      }
                      required
                    />

                    {/* <i class="fas fa-pen" onClick={() => accessable(1)}></i>{" "} */}
                  </div>
                </div>
              </div>
              <div className="textBox">
                <p style={{ paddingRight: "63px" }}>Price : </p>
                <div className="cen">
                  <div class="input-wrapper">
                    <input
                      type="number"
                      //   disabled={Acc[2]}
                      //   style={
                      //     Acc[2] ? { backgroundColor: "rgb(245, 241, 241)" } : {}
                      //   }
                      //   value={prod.price}
                      onChange={(e) =>
                        setProd({
                          ...prod,
                          price: e.target.value,
                        })
                      }
                      required
                    />
                    {/* <i class="fas fa-pen" onClick={() => accessable(2)}></i>{" "} */}
                  </div>
                </div>
              </div>
              <div className="textBox">
                <p style={{ paddingRight: "58px" }}>Stock : </p>
                <div className="cen">
                  <div class="input-wrapper">
                    <input
                      type="number"
                      //   disabled={!Acc[3]}
                      //   style={
                      //     Acc[3] ? { backgroundColor: "rgb(245, 241, 241)" } : {}
                      //   }
                      //   value={prod.stock}
                      onChange={(e) =>
                        setProd({
                          ...prod,
                          stock: e.target.value,
                        })
                      }
                      required
                    />
                    {/* <i class="fas fa-pen" onClick={() => accessable(3)}></i>{" "} */}
                  </div>
                </div>
              </div>
              <div className="textBox">
                <p style={{ paddingRight: "64px" }}>Tags : </p>
                <div className="cen">
                  <div class="input-wrapper">
                    <input
                      type="text"
                      //   disabled={Acc[4]}
                      //   style={
                      //     Acc[4] ? { backgroundColor: "rgb(245, 241, 241)" } : {}
                      //   }
                      //   value={prod.tags}
                      onChange={(e) =>
                        setProd({
                          ...prod,
                          tags: e.target.value,
                        })
                      }
                      required
                    />
                    {/* <i class="fas fa-pen" onClick={() => accessable(4)}></i>{" "} */}
                  </div>
                </div>
              </div>
              <div className="Update-div">
                <button className="Update-button" onClick={giveToBackEnd}>
                  Add Product
                </button>
              </div>
              {loading && (
                <div className="loading-overlay">
                  <div className="spinner"></div>
                </div>
              )}
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

export default ProdPage;
