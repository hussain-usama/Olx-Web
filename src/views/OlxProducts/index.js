import { useNavigate } from "react-router-dom";
import React from "react";
import { logoutUser } from "../../config/firebase";

function OlxProducts() {

  const navigate=useNavigate()
  return (
    <div className="">
      <h1>OLX HOME ALL PRODUCTS</h1>
      <button onClick={()=>logoutUser()}>Sign Out</button>
      <button onClick={()=>navigate('/addProduct')}>Add Products</button>
    </div>
  );
}

export default OlxProducts;
