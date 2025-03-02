import React, { useEffect, useState } from "react";
import axios from "axios";
import "./options.css";
const Options = ({ filter }) => {
  const [Show, setShow] = useState(false);
  // const [showProd, setProd] = useState([]);
  const [checkList, setCheck] = useState([]);
  const sizes = [
    "default",
    "sales1",
    "sales2",
    "0-2 Years",
    "10",
    "10-16 Years",
    "2-5 Years",
    "2.4",
    "2.6",
    "2.8",
    "26",
    "28",
    "28A",
  ];
  const ItemGotClicked = (item) => {
    setCheck((e) => {
      if (e.includes(item)) {
        return e.filter((e) => e !== item);
      } else {
        return [...e, item];
      }
    });
  };
  useEffect(() => {
    if (filter) {
      filter(checkList); 
    }
  }, [checkList,filter]);

  return (
    <div id="opt" className="Options filter-section">
      <div className="opt-name">
        <span>Size</span>
        <span className="filter-header" onClick={() => setShow(!Show)}>
          {Show === true ? (
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
          ) : (
            <i class="fa fa-arrow-down" aria-hidden="true"></i>
          )}
        </span>
      </div>
      {Show === true && (
        <div className="filter-content">
          <ul className="checkbox-list">
            {sizes.map((size, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={size}
                    onClick={() => ItemGotClicked(size)}
                  />{" "}
                  &nbsp;&nbsp;{size}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Options;
