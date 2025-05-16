import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const SideBar = ({
  showFirmHandler,
  showProductHandler,
  showAllProductsHandler,
  showFirmTitle
}) => {
  return (
    <div className="sideBarSection">
      <ul>
        {showFirmTitle && (
          <li onClick={showFirmHandler}>
            <Link to="#">Add Firm</Link>
          </li>
        )}
        <li onClick={showProductHandler}>
          <Link to="#">Add Product</Link>
        </li>
        <li onClick={showAllProductsHandler}>
          <Link to="#">All Products</Link>
        </li>
        <li>
          <Link to="#">User Details</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
