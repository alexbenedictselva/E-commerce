import React, { useCallback, useEffect, useState } from "react";
import "./ShopContent.css";
import Options from "./components/options";
import SalesBox from "../Home/components/Sales-box";
import axios from "axios";
const ShopContent = () => {
  const [dispProd, setProd] = useState([]);
  const [filterProd, setFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [filterProd, setFilter] = useState([]);
  // useEffect(() => {
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterProd.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filterProd.length / itemsPerPage);

  // },[filterProd])

  const [SearchData, setData] = useState("");
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
        const GetProducts = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/getAll`,
        );
        if (GetProducts.status === 200) {
          setProd(GetProducts.data.message);
          setFilter(GetProducts.data.message);
          const data = GetProducts.data.message.map((e) => {
            return e.product;
          });
          setFilter(data);
        }
      } catch (e) {
        console.log("Error in displaing all products : ", e);
      }
    };
    DisplayAllProducts();
  }, []);

  const SearchItem = (e) => {
    setData(e.target.value);
  };
  useEffect(() => {
    console.log(filterProd);
  }, [filterProd]);

  // useEffect(() => {
  //   console.log(SearchData.length);
  //   const vari = SearchData.toLowerCase();
  //   const data = dispProd.filter((e) => {
  //     return e.product.toLowerCase().includes(vari);
  //   });
  //   setFilter(data);
  // }, [SearchData]);
  useEffect(() => {
    const vari = SearchData.toLowerCase();
    const data = dispProd.filter((e) => e.product.toLowerCase().includes(vari));
    setFilter(data);
  }, [SearchData, dispProd]);

  const FilterProd = useCallback(
    (arr = []) => {
      const filtered = dispProd.filter((product) =>
        arr.every((tag) => product.tags.includes(tag)),
      );
      setFilter(filtered);
    },
    [dispProd],
  );
  return (
    <div id="salesPage">
      <h3>Products for you</h3>
      <div className="contents">
        <div className="filters">
          <input
            className="search"
            type="text"
            placeholder="🔍︎  Search"
            onChange={SearchItem}
          />
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
          {SearchData !== "" &&
            filterProd.map((e) => {
              return (
                <div className="pro" key={e._id}>
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
          {SearchData === "" &&
            filterProd.length > 0 &&
            currentItems.map((e) => {
              return (
                <div className="pro" key={e._id}>
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

export default ShopContent;
