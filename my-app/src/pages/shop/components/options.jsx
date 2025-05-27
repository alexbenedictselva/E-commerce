import React, { useEffect, useState } from "react";
import axios from "axios";
import "./options.css";
const Options = ({ filter }) => {
  const [Show, setShow] = useState(new Array(5).fill(false));
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
  const gender = ["Boy", "Girl", "Male", "Female"];
  const price = [
    "Under 149",
    "Under 199",
    "Under 249",
    "Under 299",
    "Under 349",
    "Under 399",
    "Under 499",
    "Under 999",
  ];
  const color = ["Red", "Blue", "Green", "Yellow", "Black", "White"];

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
  }, [checkList, filter]);

  return (
    <div id="opt" className="Options filter-section">
      <div>
        <div className="opt-name">
          <span>Size</span>
          <span
            className="filter-header"
            onClick={() => {
              setShow((prev) => {
                const updated = [...prev];
                updated[0] = !updated[0];
                return updated;
              });
            }}
          >
            {Show[0] === true ? (
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
            ) : (
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
            )}
          </span>
        </div>
        {Show[0] === true && (
          <div className="filter-content">
            <ul className="checkbox-list">
              {sizes.map((size, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      value={size}
                      checked={checkList.includes(size)}
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
      <div>
        <div className="opt-name">
          <span>Gender</span>
          <span
            className="filter-header"
            onClick={() => {
              setShow((prev) => {
                const updated = [...prev];
                updated[1] = !updated[1];
                return updated;
              });
            }}
          >
            {Show[1] === true ? (
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
            ) : (
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
            )}
          </span>
        </div>
        {Show[1] === true && (
          <div className="filter-content">
            <ul className="checkbox-list">
              {gender.map((size, index) => (
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
      <div>
        <div className="opt-name">
          <span>Price</span>
          <span
            className="filter-header"
            onClick={() => {
              setShow((prev) => {
                const updated = [...prev];
                updated[2] = !updated[2];
                return updated;
              });
            }}
          >
            {Show[2] === true ? (
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
            ) : (
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
            )}
          </span>
        </div>
        {Show[2] === true && (
          <div className="filter-content">
            <ul className="checkbox-list">
              {price.map((size, index) => (
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
      <div>
        <div className="opt-name">
          <span>Color</span>
          <span
            className="filter-header"
            onClick={() => {
              setShow((prev) => {
                const updated = [...prev];
                updated[3] = !updated[3];
                return updated;
              });
            }}
          >
            {Show[3] === true ? (
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
            ) : (
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
            )}
          </span>
        </div>
        {Show[3] === true && (
          <div className="filter-content">
            <ul className="checkbox-list">
              {color.map((size, index) => (
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
    </div>
  );
};

export default Options;
