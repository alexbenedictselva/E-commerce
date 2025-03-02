import React, { useEffect, useState } from "react";
import "./Sales1.css";
import SalesBox from "./Sales-box";
const Sales2 = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/GetForSalesTwo")
      .then((response) => response.json())
      .then((d) => {
        setProducts(d.data);
      })
      .catch((e) => console.log("Error in fetching products : ", e));
  }, []);
  return (
    <div>
      <section id="product2" class="section-p1">
        <h2>New Collection</h2>
        <p>Brand New Summer Collections</p>
        <div class="pro-container">
          {products.length > 1 &&
            products.map((e) => {
              return (
                <div className="pro">
                  {
                    <SalesBox
                      name={e.product}
                      brand="Adidas"
                      cost={e.price}
                      img={e.image}
                      id={e._id}
                    />
                  }
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default Sales2;
