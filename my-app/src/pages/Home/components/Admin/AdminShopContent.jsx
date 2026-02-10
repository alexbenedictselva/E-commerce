import React, { useCallback, useEffect, useState } from "react";
import "../../../shop/ShopContent.css"
// import Options from "./components/options";
// import SalesBox from "../../Home/components/Sales-box";
import axios from "axios";
import Options from "../../../shop/components/options";

import AdSales from "./component/AdSalexBox";
const AdminShopContent = () => {
  const [dispProd, setProd] = useState([]);
  const [filterProd, setFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterProd.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filterProd.length / itemsPerPage);

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
        const GetProducts = await axios.get(`${process.env.REACT_APP_API_URL}/api/getAll`);
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
      <h3>Available products</h3>
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
            currentItems.map((e) => {
              return (
                <div className="pro" key={e._id}>
                  <AdSales
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
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "active-page" : ""}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminShopContent;
