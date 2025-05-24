import React, { useEffect, useState } from "react";
import "./Sales1.css";
import SalesBox from "./Sales-box";

const Sales1 = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/GetForSalesOne")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
  return (
    <div>
      <section id="product2" class="section-p1">
        <h2>Summer Sale</h2>
        <p>Bringing You the Elements of Style</p>
        <div class="pro-container">
          {products.length > 1 && products.map((e) => {
            return <div className="pro">
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
          })}
        </div>
      </section>
    </div>
  );
};

export default Sales1;
