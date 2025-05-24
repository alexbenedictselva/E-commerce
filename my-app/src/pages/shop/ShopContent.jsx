import React, { useCallback, useEffect, useState } from "react";
import "./ShopContent.css";
import Options from "./components/options";
import SalesBox from "../Home/components/Sales-box";
import axios from "axios";
const ShopContent = () => {
  const [dispProd, setProd] = useState([]);
  const [filterProd, setFilter] = useState([]);
  const options = [
    "Relevance",
    "New Arrivals",
    "Price (High to Low)",
    "Price (Low to High)",
    "Ratings",
    "Discount",
  ];
  useEffect(() => {
    const DisplayAllProducts = async () => {
      try {
        const GetProducts = await axios.get("http://localhost:5000/api/getAll");
        if (GetProducts.status === 200) {
          setProd(GetProducts.data.message);
          setFilter(GetProducts.data.message);
        }
      } catch (e) {
        console.log("Error in displaing all products : ", e);
      }
    };
    DisplayAllProducts();
  }, []);
    
    const FilterProd = useCallback(
        (arr = []) => {
          const filtered = dispProd.filter((product) =>
            arr.every((tag) => product.tags.includes(tag))
          );
          setFilter(filtered);
        },
        [dispProd] 
      );
  return (
    <div id="salesPage">
      <h3>Products for you</h3>
      <div className="contents">
        <div className="filters">
          <div className="sortBy">
            <label>Sort By :</label>
            <select className="options">
              {options.map((e, i) => {
                return (
                  <option key={i} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>
          <Options filter={FilterProd} />
        </div>
        <div className="items pro-container">
          {filterProd.length > 0 &&
            filterProd.map((e) => {
              return (
                <div className="pro">
                  <SalesBox
                    key={e._id}
                    name={e.product}
                    brand="Adidas"
                    cost={e.price}
                    img={e.image}
                    id={e._id}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ShopContent;
